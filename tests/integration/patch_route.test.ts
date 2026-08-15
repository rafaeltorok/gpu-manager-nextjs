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

beforeAll(async () => {
  // Send a request to the UI to initialize the MongoDB connection
  await api.get("/gpus");
});

// Clear the database after the test suite has finished
afterAll(async () => {
  await Gpu.deleteMany({});
});

// Tests
describe("PATCH route", () => {
  beforeEach(async () => {
    // Clear the database and insert the sample data
    await Gpu.deleteMany({});
    await Gpu.insertMany(gpuList);
  });

  test("A card can be updated", async () => {
    const getResponse = await api.get("/api/gpus").expect(200);

    // Fetch the card to be updated
    const rtx3060 = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Data to be updated
    const newSpecs = {
      cores: 3840,
      tmus: 128,
      rops: 64,
      vram: 16,
      bus: 256,
    };

    // Send the updated data
    const updatedGpu = await api
      .patch(`/api/gpus/${rtx3060.body.id}`)
      .send(newSpecs)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Check if the data has been correctly updated
    assert.deepStrictEqual(updatedGpu.body, {
      ...rtx3060.body,
      ...newSpecs,
    });
  });

  test("Invalid specs returns a proper error message", async () => {
    const getResponse = await api.get("/api/gpus").expect(200);

    // Fetch the original specs from the database for the latter comparison
    const originalSpecs = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Data to be updated
    const newSpecs = {
      cores: 0,
      tmus: -1,
      rops: 0,
    };

    // Send an update request with invalid data
    const patchResponse = await api
      .patch(`/api/gpus/${originalSpecs.body.id}`)
      .send(newSpecs)
      .expect(400);

    // Assert a proper error response message is returned
    assert.ok(
      patchResponse.body.error.toLowerCase().includes("validation failed"),
    );
    assert.ok(patchResponse.body.error.toLowerCase().includes("cores"));
    assert.ok(patchResponse.body.error.toLowerCase().includes("tmus"));
    assert.ok(patchResponse.body.error.toLowerCase().includes("rops"));

    // Fetch the original card data to make sure it hasn't been updated
    const rtx3060 = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200);
    assert.deepStrictEqual(rtx3060.body, originalSpecs.body);
  });

  test("Invalid data format", async () => {
    const getResponse = await api.get("/api/gpus").expect(200);

    // Fetch the original specs from the database for the latter comparison
    const originalSpecs = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Data to be updated
    const gpuData = {
      cores: "cores",
    };

    // Send an update request with invalid data
    const patchResponse = await api
      .patch(`/api/gpus/${originalSpecs.body.id}`)
      .send(gpuData)
      .expect(400);

    // Assert a proper error response message is returned
    assert.ok(
      patchResponse.body.error.toLowerCase().includes("cast to number failed"),
    );
    assert.ok(patchResponse.body.error.toLowerCase().includes("cores"));

    // Fetch the card data to make sure it hasn't been updated
    const rtx3060 = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200);
    assert.deepStrictEqual(rtx3060.body, originalSpecs.body);
  });

  test("Sending an empty update request does not update any fields", async () => {
    const getResponse = await api.get("/api/gpus").expect(200);

    // Fetch the original specs from the database for the latter comparison
    const originalSpecs = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // Send an empty update request to the server
    await api.patch(`/api/gpus/${originalSpecs.body.id}`).expect(400);

    // Fetch the card again to check if the data remained the same
    const updatedGpu = await api
      .get(`/api/gpus/${getResponse.body[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.deepStrictEqual(updatedGpu.body, originalSpecs.body);
  });

  test("A non-existing id returns a proper error message", async () => {
    // Create a dummy data in order for the PUT request to work
    const gpuData = {
      cores: 1000,
    };

    // Send the updated request with a non-existing id
    await api
      .patch("/api/gpus/0000a00a0a00aaa000000aa0")
      .send(gpuData)
      .expect(404);
  });

  test("An invalid id returns a proper error message", async () => {
    // Create a dummy data in order for the PUT request to work
    const gpuData = {
      cores: 1000,
    };

    // Send the updated request with a non-existing id
    const patchResponse = await api
      .patch("/api/gpus/abc")
      .send(gpuData)
      .expect(400);

    // Check if an error message is properly returned
    assert.match(patchResponse.body.error, /invalid id format/i);
  });
});
