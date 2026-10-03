"use client";

import Link from "next/link";

// React
import { useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { RotatingLines } from "react-loader-spinner";

// Utils
import getManufacturerColor from "@/utils/getManufacturerColor";

// TypeScript types
import type { GpuType } from "@/types/gpu";
import type { SwipeEventData } from "react-swipeable";

interface GpuListProps {
  paginatedGpus: GpuType[];
  currentPage: number;
  totalPages: number;
  isPending: boolean;
  navigate: (pageNumber: number) => void;
}

export default function GpuList({
  paginatedGpus,
  currentPage,
  totalPages,
  isPending,
  navigate,
}: GpuListProps) {
  // Handles keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (event.key === "ArrowLeft" && currentPage > 1) {
        navigate(currentPage - 1);
      }

      // Right arrow key
      if (event.key === "ArrowRight" && currentPage < totalPages) {
        navigate(currentPage + 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, totalPages, navigate]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      // Previous page
      if (eventData.dir === "Right" && currentPage > 1) {
        navigate(currentPage - 1);
      }

      // Next page
      if (eventData.dir === "Left" && currentPage < totalPages) {
        navigate(currentPage + 1);
      }
    },
    delta: 50, // Define the min amount of pixels before a swipe is registered
  });

  return (
    <div className="flex flex-col gap-1 relative" {...swipeHandler}>
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
            ${isPending && "opacity-40 pointer-events-none"}
          `}
        >
          {gpu.manufacturer} {gpu.gpuline} {gpu.model}
        </Link>
      ))}

      {/* Renders a loading spinner when navigating through pages */}
      {isPending && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="48"
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
