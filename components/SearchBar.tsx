"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    // Reset the pagination to 1
    params.set("page", "1");

    // Set the search term on the URL
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Add the search term to the url
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <input
        className="bg-black p-4 mx-auto my-2 rounded"
        type="search"
        placeholder="Search model name..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value.trimStart());
        }}
      />
    </div>
  );
}
