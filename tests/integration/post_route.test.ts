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
const initialDataLength: number = 0;

beforeAll(async () => {
  // Send a request to the UI to initialize the MongoDB connection
  await api.get("/gpus");
});

// Clear the database after the test suite has finished
afterAll(async () => {
  await Gpu.deleteMany({});
});

// Tests
describe("POST route", () => {
  beforeEach(async () => {
    // Clear the database and insert the sample data
    await Gpu.deleteMany({});
  });

  test("A new GPU can be added", async () => {
    // Get the first card from the list
    const gpuData = { ...gpuList[0] };

    // Create a new card
    const postResponse = await api
      .post("/api/gpus")
      .send(gpuData)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // Assert that the returned object has an id (auto-generated)
    assert.ok(postResponse.body.data.id);

    // Remove the id from the returned object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...returnedObject } = postResponse.body.data;

    // Compare all fields
    assert.deepStrictEqual(returnedObject, gpuData);

    // Check if the total document count has increased
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength + 1);
  });

  test("The GPU Line field is optional", async () => {
    // Get a card from the list that does not have a specific line
    const gpuData = { ...gpuList[4] };

    // Create a new card
    const postResponse = await api
      .post("/api/gpus")
      .send(gpuData)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // Assert that the returned object has an id (auto-generated)
    assert.ok(postResponse.body.data.id);

    // Remove the id from the returned object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...returnedObject } = postResponse.body.data;

    // Compare all fields
    assert.deepStrictEqual(returnedObject, gpuData);

    // Check if the total document count has increased
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength + 1);
  });

  test("Invalid specifications", async () => {
    // Add the invalid specifications
    const gpuData = {
      ...gpuList[0],
      cores: 0,
      tmus: -1,
      rops: "a",
    };

    // Try to create the new card
    const postResponse = await api.post("/api/gpus").send(gpuData).expect(400);

    // Checks if the error response messages contains the invalid fields
    assert.ok(postResponse.body.error.toLowerCase().includes("cores"));
    assert.ok(postResponse.body.error.toLowerCase().includes("tmus"));
    assert.ok(postResponse.body.error.toLowerCase().includes("rops"));

    // Checks if the number of objects on the database has not been increased
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength);
  });

  test("Invalid clock speeds", async () => {
    // Add the invalid clock speeds
    const gpuData = {
      ...gpuList[0],
      baseclock: 0,
      boostclock: -1,
      memclock: "a",
    };

    // Try to create the new card
    const postResponse = await api.post("/api/gpus").send(gpuData).expect(400);

    // Checks if the error response messages contains the invalid fields
    assert.ok(postResponse.body.error.toLowerCase().includes("base clock"));
    assert.ok(postResponse.body.error.toLowerCase().includes("boost clock"));
    assert.ok(postResponse.body.error.toLowerCase().includes("memclock"));
    assert.ok(
      postResponse.body.error.toLowerCase().includes("cast to number failed"),
    );

    // Checks if the number of objects on the database has not been increased
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength);
  });

  test("Missing required fields", async () => {
    // Remove unnecessary fields
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cores, tmus, rops, ...otherFields } = gpuList[0];
    const gpuData = otherFields;

    // Try to add the new card
    const postResponse = await api.post("/api/gpus").send(gpuData).expect(400);

    // Checks if the error response messages contains the invalid fields
    assert.ok(postResponse.body.error.toLowerCase().includes("cores"));
    assert.ok(postResponse.body.error.toLowerCase().includes("tmus"));
    assert.ok(postResponse.body.error.toLowerCase().includes("rops"));

    // Checks if the number of objects on the database has not been increased
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength);
  });

  test("Empty required fields", async () => {
    // Make all required string fields empty
    const gpuData = {
      ...gpuList[0],
      manufacturer: "",
      model: "",
      memtype: "",
    };

    // Try to add the new card
    const postResponse = await api.post("/api/gpus").send(gpuData).expect(400);

    // Checks if the error response messages contains the invalid fields
    assert.ok(postResponse.body.error.toLowerCase().includes("manufacturer"));
    assert.ok(postResponse.body.error.toLowerCase().includes("model"));
    assert.ok(postResponse.body.error.toLowerCase().includes("memory type"));

    // Checks if the number of objects on the database has not been increased
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, initialDataLength);
  });

  test("A duplicated graphics card will not be added", async () => {
    // Add a new card
    const gpuData = { ...gpuList[0] };
    await api
      .post("/api/gpus")
      .send(gpuData)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // Get the current total number of cards
    const currentDataLength = await api.get("/api/gpus");

    // Tries to add an already existing card to the database
    const postResponse = await api
      .post("/api/gpus")
      .send(gpuData)
      .expect(409)
      .expect("Content-Type", /application\/json/);

    // Assert that the response message properly warns the user of the issue
    assert.strictEqual(
      postResponse.body.error,
      "The graphics card has already been added to the list",
    );

    // Check if the total document count remained the same
    const getResponse = await api.get("/api/gpus");
    assert.strictEqual(getResponse.body.length, currentDataLength.body.length);
  });
});
