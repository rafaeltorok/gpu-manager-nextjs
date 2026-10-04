"use client";

import Link from "next/link";

interface NavArrowsProps {
  previous: string;
  next: string;
}

export default function NavArrows({ previous, next }: NavArrowsProps) {
  return (
    <div>
      {/* Previous arrow */}
      {previous && (
        <div
          className="
            hidden sm:block
            absolute
            text-4xl
            p-1
            rounded
            bg-gray-900
            hover:bg-gray-700 active:bg-gray-600
            sm:top-1/2 sm:right-full -translate-y-1/2
            sm:mr-1
          "
        >
          <Link href={`/gpus/${previous}`}>◀</Link>
        </div>
      )}

      {/* Next arrow */}
      {next && (
        <div
          className="
            hidden sm:block
            absolute
            text-4xl
            p-1
            rounded
            bg-gray-900
            hover:bg-gray-700 active:bg-gray-600
            sm:top-1/2 sm:left-full -translate-y-1/2
            sm:ml-1
          "
        >
          <Link href={`/gpus/${next}`}>▶</Link>
        </div>
      )}
    </div>
  );
}
