import Link from "next/link";

// Services
import { getGpus } from "@/app/services/gpus";

// Utils
import getManufacturerColor from "../utils/getManufacturerColor";

// Components
import SearchBar from "@/app/gpus/components/SearchBar";

export default async function Gpus(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  let gpus = await getGpus();

  // Extract the query search term
  const searchParams = await props.searchParams;
  const query = searchParams?.query;

  // Filter the list if there is a search term
  if (query) {
    gpus = gpus.filter((g) => {
      return `${g.manufacturer} ${g.gpuline} ${g.model}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }

  return (
    <div className="my-2 text-center">
      <SearchBar />

      {gpus.map((gpu) => (
        <div key={gpu.id}>
          <Link href={`/gpus/${gpu.slug}`}>
            <button
              className={`mx-auto font-bold p-2 my-1 w-[300px] border-1 border-gray-700 rounded bg-black text-xl hover:bg-gray-800 hover:underline ${getManufacturerColor(gpu)}`}
            >
              {gpu.manufacturer} {gpu.gpuline} {gpu.model}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
