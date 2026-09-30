"use client";

import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// React
import { useEffect, useCallback } from "react";
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
  searchQuery,
}: GpuListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Navigates to either the previous or next page within the GPUs list
  const handlePageNavigation = useCallback(
    (direction: "prev" | "next") => {
      const params = new URLSearchParams(searchParams);
      let goToPage = 1;

      if (direction === "prev") {
        goToPage = currentPage - 1;
      } else if (direction === "next") {
        goToPage = currentPage + 1;
      }

      // Set the page number into the URL
      params.set("page", goToPage.toString());

      // If a search term is available, insert it into the URL
      if (searchQuery) params.set("query", searchQuery);

      // Navigate to the new route
      router.push(`${pathname}?${params.toString()}`);
    },
    [currentPage, pathname, searchParams, router, searchQuery],
  );

  // Handles keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (event.key === "ArrowLeft" && currentPage > 1) {
        handlePageNavigation("prev");
      }

      // Right arrow key
      if (event.key === "ArrowRight" && currentPage < totalPages) {
        handlePageNavigation("next");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, totalPages, handlePageNavigation]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      // Previous page
      if (eventData.dir === "Right" && currentPage > 1) {
        handlePageNavigation("prev");
      }

      // Next page
      if (eventData.dir === "Left" && currentPage < totalPages) {
        handlePageNavigation("next");
      }
    },
    delta: 50, // Define the min amount of pixels before a swipe is registered
  });

  return (
    <div className="flex flex-col gap-1" {...swipeHandler}>
      {paginatedGpus.map((gpu) => (
        <Link
          key={gpu.id}
          href={`/gpus/${gpu.slug}`}
          className={`
            mx-auto
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
        </Link>
      ))}
    </div>
  );
}
