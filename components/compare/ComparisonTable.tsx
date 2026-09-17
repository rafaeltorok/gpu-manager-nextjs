// Utils
import getRawPerformance from "@/utils/getRawPerformance";
import getManufacturerColor from "@/utils/getManufacturerColor";

// Components
import Header from "./Sections/Header";
import GpuDataRow from "./Sections/DataRow";
import PercentageDifference from "./Sections/PercentageDifference";
import ComparisonTitle from "./Sections/ComparisonTitle";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ComparisonTableProps {
  firstGpuData: GpuType | undefined;
  secondGpuData: GpuType | undefined;
}

export default function ComparisonTable({ firstGpuData, secondGpuData }: ComparisonTableProps) {
  // Calculate the performance for both cards
  let firstGpuPerformance: number[] = [0, 0, 0, 0];
  let secondGpuPerformance: number[] = [0, 0, 0, 0];
  let firstGpuClass = "";
  let secondGpuClass = "";

  if (firstGpuData) {
    firstGpuPerformance = getRawPerformance(firstGpuData);
    firstGpuClass = getManufacturerColor(firstGpuData);
  }

  if (secondGpuData) {
    secondGpuPerformance = getRawPerformance(secondGpuData);
    secondGpuClass = getManufacturerColor(secondGpuData);
  }

  return (
    <div className="flex flex-col overflow-auto">
      <ComparisonTitle
        firstModelName={firstGpuData?.model || "N/A"}
        secondModelName={secondGpuData?.model || "N/A"}
        firstGpuClass={firstGpuClass}
        secondGpuClass={secondGpuClass}
      />
    </div>
  );
}