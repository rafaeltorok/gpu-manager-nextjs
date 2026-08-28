// Dependencies
import { beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";
import connectToDatabase from "../../lib/mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
