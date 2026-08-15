"use server";

// Next
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Services
import { addGpu, removeGpu } from "../services/gpus";

// Utils
import { generateSlug } from "../utils/slug";

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
  revalidatePath("/gpus");
  redirect(`/gpus/${generateSlug(storedGpu)}`);
}

// Remove a graphics card form the database
export async function deleteGpu(formData: FormData) {
  const id = formData.get("id") as string;
  await removeGpu(id);
  revalidatePath("/gpus");
  redirect("/gpus");
}
