"use client";

import Link from "next/link";

// Utils
import getManufacturerColor from "@/utils/getManufacturerColor";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface GpuListProps {
  paginatedGpus: GpuType[];
}

export default function GpuList({ paginatedGpus }: GpuListProps) {
  return (
    <div>
      {paginatedGpus.map((gpu) => (
        <div key={gpu.id}>
          <Link href={`/gpus/${gpu.slug}`}>
            <button
              className={`
                mx-auto my-1
                font-bold
                py-3 px-2
                min-w-[300px] w-[350px] max-w-[80%]
                border-1 border-gray-700 rounded
                bg-black hover:bg-gray-800
                text-xl
                hover:underline
                ${getManufacturerColor(`${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`)}
              `}
            >
              {gpu.manufacturer} {gpu.gpuline} {gpu.model}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
