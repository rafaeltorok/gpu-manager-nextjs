"use client";

import { useTransition } from "react";

// Components
import GpuList from "./GpuList";
import Pagination from "./Pagination";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ListContainerProps {
  paginatedGpus: GpuType[];
  currentPage: number;
  totalPages: number;
  searchQuery: string | undefined;
}

export default function ListContainer({
  paginatedGpus,
  currentPage,
  totalPages,
  searchQuery,
}: ListContainerProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <GpuList
        paginatedGpus={paginatedGpus}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
        startTransition={startTransition}
        isPending={isPending}
      />

      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={totalPages}
          startTransition={startTransition}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
