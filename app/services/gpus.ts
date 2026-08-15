// Mongoose
import Gpu from "@/lib/models/gpu";
import connectToDatabase from "@/lib/mongodb";

// Utils
import { mapSlugs } from "../utils/slug";

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
