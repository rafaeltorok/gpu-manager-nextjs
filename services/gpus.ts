// Mongoose
import Gpu from "@/lib/models/gpu";
import connectToDatabase from "@/lib/mongodb";

// Utils
import { mapSlugs } from "../utils/slug";

// TypeScript types
import type { NewGpu, GpuType } from "../types/gpu";

// Fetch all cards from the database
export async function getGpus() {
  await connectToDatabase();

  const response = await Gpu.find();
  const gpus = response.map((gpu) => gpu.toJSON());

  return mapSlugs(gpus);
}

// Fetch a single card based on its slug
export async function getGpu(slug: string): Promise<GpuType | undefined> {
  await connectToDatabase();

  const response = await Gpu.find();
  const gpus = mapSlugs(response.map((gpu) => gpu.toJSON()));

  return gpus.find((gpu) => gpu.slug === slug);
}

export async function addGpu(data: NewGpu): Promise<GpuType | null> {
  const newGpu = new Gpu(data);
  const storedGpu = await newGpu.save();
  return storedGpu;
}

export async function updateSpecs(gpu: GpuType): Promise<GpuType | null> {
  const updatedGpu = await Gpu.findByIdAndUpdate(gpu.id, gpu, {
    new: true,
    runValidators: true,
  });
  return updatedGpu;
}

export async function removeGpu(id: string): Promise<void> {
  await Gpu.findByIdAndDelete(id);
}
