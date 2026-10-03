import clsx from "clsx";

export default function PaginationArrow({
  direction,
  navigate,
  currentPage,
  isDisabled,
}: {
  direction: "left" | "right";
  navigate: (pageNumber: number) => void;
  currentPage: number;
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border border-gray-600",
    {
      "pointer-events-none text-gray-700 border-gray-800": isDisabled,
      "hover:bg-gray-700": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  const icon = direction === "left" ? <div>◄</div> : <div>►</div>;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button
      type="button"
      className={className}
      onClick={() => { 
        if (direction === "left") {
          navigate(currentPage - 1)
        } else if (direction === "right") {
          navigate(currentPage + 1);
        }
      }}
    >
      {icon}
    </button>
  );
}
