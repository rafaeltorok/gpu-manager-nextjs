import { notFound } from "next/navigation";
import Link from "next/link";

// Services
import { getGpu, getGpus } from "@/lib/data";

// Utils
import getManufacturerColor from "@/utils/getManufacturerColor";
import { mapSlugs } from "@/utils/slug";

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

  // Fetch all available graphics cards for the arrows navigation
  const gpus = await getGpus();
  const mappedSlugs = mapSlugs(gpus);

  // Get the index position for the current graphics card
  const currentIndex = mappedSlugs.findIndex((g) => g.id === gpu.id);

  // Determine the previous and next cards, if available
  const previous = mappedSlugs[currentIndex - 1] || null;
  const next = mappedSlugs[currentIndex + 1] || null;

  // Add the manufacturer color scheme to the data table
  const gpuClass = getManufacturerColor(
    `${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`,
  );

  return (
    <div>
      <form>
        <input type="hidden" name="id" value={gpu.id} />

        <GpuTable
          gpu={gpu}
          gpuClass={gpuClass}
          previous={previous}
          next={next}
        />
      </form>

      <Link
        href={"/gpus"}
        className="
          w-[300px]
          block
          mx-auto text-center
          py-2 mb-5 mt-2
          bg-black/50
          border-1 border-gray-700
          hover:bg-gray-900 active:bg-gray-900
          rounded-md
        "
      >
        Return
      </Link>
    </div>
  );
}
