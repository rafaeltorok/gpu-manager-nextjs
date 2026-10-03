// Services
import { getGpus } from "@/lib/data";

// Components
import SearchBar from "@/components/SearchBar";
import ListContainer from "@/components/ListContainer";

// TypeScript types
import type { GpuType } from "@/types/gpu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPUs | GPUs Manager",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // Fetch all graphics cards from the database
  const gpus: GpuType[] = await getGpus();
  let filteredGpus: GpuType[] = gpus;

  const ITEMS_PER_PAGE = 8;

  // Extract the query search term
  const searchParams = await props.searchParams;
  const query = searchParams?.query;

  // If the database is empty, display a proper message
  if (gpus.length === 0 && !query) {
    return (
      <h3 className="text-center text-xl font-bold mt-10">
        No graphics cards are available
      </h3>
    );
  }

  // Filter the list if there is a search term
  if (query) {
    filteredGpus = gpus.filter((g) => {
      return `${g.manufacturer} ${g.gpuline} ${g.model}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }

  // Define the amount of pages to be displayed
  const totalPages = Math.ceil(filteredGpus.length / ITEMS_PER_PAGE);

  // Get the current page number
  const requestedPage = Number(searchParams?.page);
  const currentPage =
    Number.isInteger(requestedPage) &&
    requestedPage > 0 &&
    requestedPage <= totalPages
      ? requestedPage
      : 1;

  // Define the offset
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = offset + ITEMS_PER_PAGE;

  // Divide the amount of cards based on the pagination number
  const paginatedGpus = filteredGpus.slice(offset, endIndex);

  return (
    <div className="my-2 text-center">
      <SearchBar />

      {filteredGpus.length === 0 ? (
        <h3 className="text-center text-xl font-bold mt-10">
          No graphics cards were found...
        </h3>
      ) : (
        <ListContainer
          paginatedGpus={paginatedGpus}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={query}
        />        
      )}
    </div>
  );
}
