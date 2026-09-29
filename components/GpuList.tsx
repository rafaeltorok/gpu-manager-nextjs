"use client";

import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// React
import { useEffect } from "react";
import { useSwipeable } from "react-swipeable";

// Utils
import getManufacturerColor from "@/utils/getManufacturerColor";

// TypeScript types
import type { GpuType } from "@/types/gpu";
import type { SwipeEventData } from "react-swipeable";

interface GpuListProps {
  paginatedGpus: GpuType[];
  currentPage: number;
  totalPages: number;
  searchQuery: string | undefined;
}

export default function GpuList({
  paginatedGpus,
  currentPage,
  totalPages,
  searchQuery
}: GpuListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handles keyboard navigation
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (
        event.key === "ArrowLeft" && currentPage > 1
      ) {
        params.set("page", (currentPage - 1).toString());
        if (searchQuery) params.set("query", searchQuery);
        router.push(`${pathname}?${params.toString()}`);
      }

      // Right arrow key
      if (
        event.key === "ArrowRight" && currentPage < totalPages
      ) {
        params.set("page", (currentPage + 1).toString());
        if (searchQuery) params.set("query", searchQuery);
        router.push(`${pathname}?${params.toString()}`);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, totalPages, searchQuery, router, pathname, searchParams]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      const params = new URLSearchParams(searchParams);

      // Previous page
      if (
        eventData.dir === "Right" && currentPage > 1
      ) {
        params.set("page", (currentPage - 1).toString());
        if (searchQuery) params.set("query", searchQuery);
        router.push(`${pathname}?${params.toString()}`);
      }

      // Next page
      if (
        eventData.dir === "Left" && currentPage < totalPages
      ) {
        params.set("page", (currentPage + 1).toString());
        if (searchQuery) params.set("query", searchQuery);
        router.push(`${pathname}?${params.toString()}`);
      }
    },
  });

  return (
    <div
      {...swipeHandler}
    >
      {paginatedGpus.map((gpu) => (
        <div
          key={gpu.id}
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
          <Link href={`/gpus/${gpu.slug}`}>
            {gpu.manufacturer} {gpu.gpuline} {gpu.model}
          </Link>
        </div>
      ))}
    </div>
  );
}
