// Utils
import generatePagination from "@/utils/generatePagination";

// Components
import PaginationNumber from "./PaginationNumber";
import PaginationArrow from "./PaginationArrow";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  isPending: boolean;
  navigate: (pageNumber: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  isPending,
  navigate,
}: PaginationProps) {
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className={`inline-flex mb-5 ${isPending && "opacity-40 pointer-events-none"}`}>
      <PaginationArrow
        direction="left"
        currentPage={currentPage}
        navigate={navigate}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              page={page}
              navigate={navigate}
              currentPage={currentPage}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        navigate={navigate}
        currentPage={currentPage}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}
