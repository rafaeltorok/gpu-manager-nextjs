// Node testing library dependencies
import {
  test,
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  assert,
} from "vitest";

// Requirements for running HTTP requests to the MongoDB server
import request from "supertest";
import Gpu from "../../lib/models/gpu";

// Import the sample data
import { gpuList } from "../data/data.js";

const api = request("http://localhost:3000");

// Store the initial amount of objects
const initialDataLength: number = gpuList.length;

beforeAll(async () => {
  // Send a request to the UI to initialize the MongoDB connection
  await api.get("/gpus");
});

// Clear the database after the test suite has finished
afterAll(async () => {
  await Gpu.deleteMany({});
});

// Tests
describe("DELETE route", () => {
  beforeEach(async () => {
    // Clear the database and insert the sample data
    await Gpu.deleteMany({});
    await Gpu.insertMany(gpuList);
  });

  test("A GPU can be deleted", async () => {
    const gpuData = {
      manufacturer: "AMD",
      gpuline: "Radeon",
      model: "RX 6700 XT",
      cores: 2560,
      tmus: 160,
      rops: 64,
      vram: 12,
      bus: 192,
      memtype: "GDDR6",
      baseclock: 2321,
      boostclock: 2581,
      memclock: 16,
    };

    // Add the card to be removed
    const postResponse = await api
      .post("/api/gpus")
      .send(gpuData)
      .expect(201)
      .expect("Content-type", /application\/json/);

    // Confirm the total amount of cards has been increased
    let getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength + 1);

    // Get the ID value for the newly created card
    const id = postResponse.body.data.id;

    // Send a delete request
    await api.delete(`/api/gpus/${id}`).expect(204);

    // Check if the GPU has been removed from the server
    await api.get(`/api/gpus/${id}`).expect(404);

    // Confirm the total amount has decreased
    getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength);
  });

  test("A non-existing id won't remove any cards", async () => {
    await api.delete("/api/gpus/0000a00a0a00aaa000000aa0").expect(404);

    // Confirm no cards have been removed
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength);
  });

  test("An invalid id returns a proper error message", async () => {
    const deleteResponse = await api.delete("/api/gpus/abc").expect(400);

    // Confirm an error message is properly returned
    assert.match(deleteResponse.body.error, /invalid id format/i);

    // Confirms no cards have been removed
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength);
  });
});
