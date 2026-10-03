"use client";

// Hooks
import useNavigation from "@/hooks/useNavigation";

// Components
import GpuList from "./GpuList";
import Pagination from "./gpu/pagination/Pagination";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ListContainerProps {
  paginatedGpus: GpuType[];
  currentPage: number;
  totalPages: number;
}

export default function ListContainer({
  paginatedGpus,
  currentPage,
  totalPages,
}: ListContainerProps) {
  const { isPending, navigate } = useNavigation();

  return (
    <div>
      <GpuList
        paginatedGpus={paginatedGpus}
        currentPage={currentPage}
        totalPages={totalPages}
        isPending={isPending}
        navigate={navigate}
      />

      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          isPending={isPending}
          navigate={navigate}
        />
      </div>
    </div>
  );
}
