import { notFound } from "next/navigation";

// Services
import { getGpu } from "@/services/gpus";

// Utils
import getManufacturerColor from "@/utils/getManufacturerColor";

// Components
import GpuTable from "@/components/gpu/GpuTable";

// TypeScript types
import type { Metadata } from "next";

// Generate a custom page title based on the model name
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gpu = await getGpu(slug);

  if (gpu) {
    return {
      title: `${gpu.model} | GPUs Manager`,
    };
  } else {
    return {
      title: "GPUs Manager",
    };
  }
}

// Server component
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Fetch the GPU from the database
  const { slug } = await params;
  const gpu = await getGpu(slug);

  // Handle invalid urls
  if (!gpu) notFound();

  // Add the manufacturer color scheme to the data table
  const gpuClass = getManufacturerColor(`${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`);

  return (
    <div>
      <form>
        <input type="hidden" name="id" value={gpu.id} />

        <GpuTable gpu={gpu} gpuClass={gpuClass} />
      </form>
    </div>
  );
}
