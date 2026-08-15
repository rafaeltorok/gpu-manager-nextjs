// Dependencies
import { beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";
import connectToDatabase from "../../lib/mongodb";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
