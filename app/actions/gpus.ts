"use server";

// Next
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Services
import { addGpu, updateSpecs, removeGpu } from "@/services/gpus";

// Utils
import { generateSlug } from "@/utils/slug";

// TypeScript types
import type { GpuType } from "@/types/gpu";

// Create and store a new graphics card into MongoDB
export async function createGpu(formData: FormData) {
  const data = {
    manufacturer: formData.get("manufacturer") as string,
    gpuline: formData.get("gpuline") as string,
    model: formData.get("model") as string,
    cores: Number(formData.get("cores")),
    tmus: Number(formData.get("tmus")),
    rops: Number(formData.get("rops")),
    vram: Number(formData.get("vram")),
    bus: Number(formData.get("bus")),
    memtype: formData.get("memtype") as string,
    baseclock: Number(formData.get("baseclock")),
    boostclock: Number(formData.get("boostclock")),
    memclock: Number(formData.get("memclock")),
  };

  const storedGpu = await addGpu(data);

  if (storedGpu) {
    revalidatePath("/gpus");
    redirect(`/gpus/${generateSlug(storedGpu)}`);
  }
}

export async function editGpu(formData: FormData) {
  const id = formData.get("id") as string;

  // Extract the GPU data from the form
  const data: GpuType = {
    id: id,
    manufacturer: formData.get("manufacturer") as string,
    gpuline: formData.get("gpuline") as string,
    model: formData.get("model") as string,
    cores: Number(formData.get("cores")),
    tmus: Number(formData.get("tmus")),
    rops: Number(formData.get("rops")),
    vram: Number(formData.get("vram")),
    bus: Number(formData.get("bus")),
    memtype: formData.get("memtype") as string,
    baseclock: Number(formData.get("baseclock")),
    boostclock: Number(formData.get("boostclock")),
    memclock: Number(formData.get("memclock")),
  };

  // Update the database GPU specs
  const updatedGpu = await updateSpecs(data);

  console.log(updatedGpu)

  // On a successful updated, redirect to the GPU data page
  if (updatedGpu) {
    const slug = generateSlug(updatedGpu);
    revalidatePath(`/gpus/${slug}`);
    redirect(`/gpus/${slug}`);
  }
}

// Remove a graphics card from the database
export async function deleteGpu(id: string) {
  await removeGpu(id);
  revalidatePath("/gpus");
}
