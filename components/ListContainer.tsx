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
  return (
    <div>
      <GpuList
        paginatedGpus={paginatedGpus}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
      />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
