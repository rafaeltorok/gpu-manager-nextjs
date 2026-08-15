import Link from "next/link";

// Services
import { getGpus } from "@/app/services/gpus";

// Utils
import getManufacturerColor from "../utils/getManufacturerColor";

// Components
import SearchBar from "@/components/SearchBar";

// CSS styles
import "../styles/manufacturer-colors.css";

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
    <div className="gpus-list">
      <SearchBar />

      {gpus.map((gpu) => (
        <div key={gpu.id}>
          <Link href={`/gpus/${gpu.slug}`}>
            <button className={`${getManufacturerColor(gpu)} gpus-list-card`}>
              {gpu.manufacturer} {gpu.gpuline} {gpu.model}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
