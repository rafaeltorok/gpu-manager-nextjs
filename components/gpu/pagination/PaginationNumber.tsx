import clsx from "clsx";

export default function PaginationNumber({
  page,
  navigate,
  currentPage,
  position,
  isActive,
}: {
  page: number | string;
  navigate: (pageNumber: number) => void;
  currentPage: number;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border border-gray-600",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 border-blue-600 text-white": isActive,
      "hover:bg-gray-700": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button
      type="button"
      className={className}
      onClick={() => { 
        if (currentPage !== Number(page)) {
          navigate(Number(page))
        }
      }}
    >
      {page}
    </button>
  );
}
