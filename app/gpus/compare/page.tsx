// Services
import { getGpu, getGpus } from "@/services/gpus";

// Utils
import { mapSlugs } from "@/utils/slug";

// Components
import Selection from "@/components/compare/CardsSelection";
import ComparisonTable from "@/components/compare/ComparisonTable";

// TypeScript types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Specs and Performance | GPUs Manager"
}

export default async function Page(props: {
  searchParams?: Promise<{
    first?: string;
    second?:string;
  }>;
}) {
  // Get all available cards for the selection list
  const allGpus = await getGpus();
  const mappedSlugs = mapSlugs(allGpus);

  // Get each of the cards names from the URL
  const searchParams = await props.searchParams;
  const firstSlug = searchParams?.first;
  const secondSlug = searchParams?.second;

  // Get the cards data
  const firstGpuData = await getGpu(firstSlug || "");
  const secondGpuData = await getGpu(secondSlug || "");

  return (
    <div>
      <Selection gpus={mappedSlugs} />

      <ComparisonTable
        firstGpuData={firstGpuData}
        secondGpuData={secondGpuData}
      />
    </div>
  );
}
