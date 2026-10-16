"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Limit() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleLimit(limit: string) {
    const params = new URLSearchParams(searchParams);

    // Reset the pagination to 1
    params.set("page", "1");

    // Add the limit value into the url
    params.set("limit", limit);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <label htmlFor="limit-choice">Items per page:</label>
      <select
        className="bg-black color-white border border-gray-700 rounded px-1 ml-2 mt-2"
        name="limit-choice"
        id="limit-choice"
        defaultValue={searchParams.get("limit")?.toString() || "8"}
        onChange={(e) => handleLimit(e.target.value)}
      >
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
