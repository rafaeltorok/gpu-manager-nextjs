'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Add the search term to the url
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <input
        className="search-field"
        type="search"
        placeholder="Search model name..."
        onChange={(e) => { handleSearch(e.target.value.trimStart()) }}
      />
    </div>
  );
}
