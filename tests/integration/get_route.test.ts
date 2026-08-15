// Node testing library dependencies
import { test, beforeAll, afterAll, describe, assert } from "vitest";

// Requirements for running HTTP requests to the MongoDB server
import request from "supertest";
import Gpu from "../../lib/models/gpu";

// Import the initial data
import { gpuList } from "../data/data";

// Create an api instance
const api = request("http://localhost:3000");

// Store the initial amount of objects
const initialDataLength: number = gpuList.length;

beforeAll(async () => {
  // Send a request to the UI to initialize the MongoDB connection
  await api.get("/gpus");

  // Clear the database and insert the sample data
  await Gpu.deleteMany({});
  await Gpu.insertMany(gpuList);
});

// Clear the database after the test suite has finished
afterAll(async () => {
  await Gpu.deleteMany({});
});

// Tests
describe("GET route", () => {
  test("GPUs are returned as JSON", async () => {
    await api
      .get("/api/gpus")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("All GPUs are returned", async () => {
    const response = await api.get("/api/gpus");
    assert.strictEqual(response.body.length, initialDataLength);
  });

  test("Returning a GPU by its id", async () => {
    const getResponse = await api.get("/api/gpus");
    const rtx3060 = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const gpuData = {
      ...gpuList[0],
      id: rtx3060.body.id,
    };

    assert.deepStrictEqual(rtx3060.body, gpuData);
  });

  test("A non-existing id returns a proper status code", async () => {
    await api.get("/api/gpus/0000a00a0a00aaa000000aa0").expect(404);
  });

  test("An invalid id returns a proper error message", async () => {
    const getResponse = await api.get("/api/gpus/abc").expect(400);

    assert.match(getResponse.body.error, /invalid id format/i);
  });
});
