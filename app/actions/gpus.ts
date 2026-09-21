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

export type State = {
  errors?: {
    manufacturer?: string[];
    model?: string[];
    cores?: string[];
    tmus?: string[];
    rops?: string[];
    vram?: string[];
    bus?: string[];
    memtype?: string[];
    baseclock?: string[];
    boostclock?: string[];
    memclock?: string[];
  };
  message?: string | null;
  values?: {
    manufacturer?: string;
    gpuline?: string;
    model?: string;
    cores?: string;
    tmus?: string;
    rops?: string;
    vram?: string;
    bus?: string;
    memtype?: string;
    baseclock?: string;
    boostclock?: string;
    memclock?: string;
  };
};

// Zod validation
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  manufacturer: z.string().min(3, "Manufacturer name must be at least 3 chars long."),
  gpuline: z.string().default(""),
  model: z.string().min(3, "Model must be at least 3 chars long."),
  cores: z.coerce.number().gt(0, { message: "Cores must be greater than 0" }),
  tmus: z.coerce.number().gt(0, { message: "TMUs must be greater than 0" }),
  rops: z.coerce.number().gt(0, { message: "ROPs must be greater than 0" }),
  vram: z.coerce.number().gt(0, { message: "VRAM must be greater than 0" }),
  bus: z.coerce.number().gt(0, { message: "Bus width must be greater than 0" }),
  memtype: z.string().min(3, "Memory type must be at least 3 chars long."),
  baseclock: z.coerce.number().gt(0, { message: "Base clock must be greater than 0" }),
  boostclock: z.coerce.number().gt(0, { message: "Boost clock must be greater than 0" }),
  memclock: z.coerce.number().gt(0, { message: "Memory clock must be greater than 0" }),
});

const CreateGpu = FormSchema.omit({ id: true });

// Create and store a new graphics card into MongoDB
export async function createGpu(prevState: State, formData: FormData): Promise<State> {
  // Validate fields with Zod
  const validatedFields = CreateGpu.safeParse({
    manufacturer: formData.get("manufacturer"),
    gpuline: formData.get("gpuline"),
    model: formData.get("model"),
    cores: formData.get("cores"),
    tmus: formData.get("tmus"),
    rops: formData.get("rops"),
    vram: formData.get("vram"),
    bus: formData.get("bus"),
    memtype: formData.get("memtype"),
    baseclock: formData.get("baseclock"),
    boostclock: formData.get("boostclock"),
    memclock: formData.get("memclock"),
  });

  // If any required fields are invalid, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields, failed to add new graphics card.",
      // prevent the values from being erased during a validation error
      values: {
        manufacturer: formData.get("manufacturer") as string,
        gpuline: formData.get("gpuline") as string,
        model: formData.get("model") as string,
        cores: formData.get("cores") as string,
        tmus: formData.get("tmus") as string,
        rops: formData.get("rops") as string,
        vram: formData.get("vram") as string,
        bus: formData.get("bus") as string,
        memtype: formData.get("memtype") as string,
        baseclock: formData.get("baseclock") as string,
        boostclock: formData.get("boostclock") as string,
        memclock: formData.get("memclock") as string,
      },
    };
  }

  // Prepare the data to be inserted into the database
  const {
    manufacturer,
    gpuline,
    model,
    cores,
    tmus,
    rops,
    vram,
    bus,
    memtype,
    baseclock,
    boostclock,
    memclock,
  } = validatedFields.data;

  let storedGpu;

  try {
    // Store the new graphics card into MongoDB
    storedGpu = await addGpu({
      manufacturer,
      gpuline,
      model,
      cores,
      tmus,
      rops,
      vram,
      bus,
      memtype,
      baseclock,
      boostclock,
      memclock,
    }) as GpuType;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
    } else {
      console.error(String(err));
    }
  }

  // If the card has been successfully stored, redirect to its data page
  if (storedGpu) {
    revalidatePath("/gpus");
    redirect(
      `/gpus/${generateSlug(`${storedGpu.manufacturer} ${storedGpu.gpuline} ${storedGpu.model}`)}`,
    );
  }

  // On an unsuccessful database storage, return a proper error message
  return {
    message: "Database Error: Failed to add graphics card.",
  };
}

// Update an existing graphics card specs
export async function editGpu(formData: FormData) {
  const id = formData.get("id") as string;

  // Extract the graphics card data from the form
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

  // Update its database specs
  const updatedGpu = await updateSpecs(data);

  // On a successful updated, redirect to the card's data page
  if (updatedGpu) {
    const slug = generateSlug(
      `${updatedGpu.manufacturer} ${updatedGpu.gpuline} ${updatedGpu.model}`,
    );
    revalidatePath(`/gpus/${slug}`);
    redirect(`/gpus/${slug}`);
  }
}

// Remove a graphics card from the database
export async function deleteGpu(id: string) {
  await removeGpu(id);
  revalidatePath("/gpus");
}
