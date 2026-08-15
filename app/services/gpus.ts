// Mongoose
import Gpu from "@/lib/models/gpu";
import connectToDatabase from "@/lib/mongodb";

// Utils
import { mapSlugs } from "../utils/slug";

// TypeScript types
import type { NewGpu } from "../types/gpu";

// Fetch all cards from the database
export async function getGpus() {
  await connectToDatabase();

  const response = await Gpu.find();
  const gpus = response.map((gpu) => gpu.toJSON());

  return mapSlugs(gpus);
}

// Fetch a single card based on its slug
export async function getGpu(slug: string) {
  await connectToDatabase();

  const response = await Gpu.find();
  const gpus = mapSlugs(response.map((gpu) => gpu.toJSON()));

  return gpus.find((gpu) => gpu.slug === slug);
}

export async function addGpu(data: NewGpu) {
  const newGpu = new Gpu(data);
  const storedGpu = await newGpu.save();
  return storedGpu;
}
