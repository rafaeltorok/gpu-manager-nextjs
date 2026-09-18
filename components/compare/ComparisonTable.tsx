// Utils
import calculatePerformance from "@/utils/calculatePerformance";
import getRawPerformance from "@/utils/getRawPerformance";
import getManufacturerColor from "@/utils/getManufacturerColor";

// Components
import ComparisonTitle from "./table/Title";
import ComparisonRow from "./table/ComparisonRow";
import Division from "../gpu/TableRows/Division";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ComparisonTableProps {
  firstGpuData: GpuType | undefined;
  secondGpuData: GpuType | undefined;
}

export default function ComparisonTable({
  firstGpuData,
  secondGpuData,
}: ComparisonTableProps) {
  // Calculate the performance for both cards
  let firstGpuDisplayPerformance: string[] = ["N/A", "N/A", "N/A", "N/A"];
  let secondGpuDisplayPerformance: string[] = ["N/A", "N/A", "N/A", "N/A"];
  let firstGpuRawPerformance: number[] = [0, 0, 0, 0];
  let secondGpuRawPerformance: number[] = [0, 0, 0, 0];
  let firstGpuClass = "";
  let secondGpuClass = "";

  if (firstGpuData) {
    firstGpuDisplayPerformance = calculatePerformance(firstGpuData);
    firstGpuRawPerformance = getRawPerformance(firstGpuData);
    firstGpuClass = getManufacturerColor(
      `${firstGpuData.manufacturer} ${firstGpuData.gpuline} ${firstGpuData.model}`,
    );
  }

  if (secondGpuData) {
    secondGpuDisplayPerformance = calculatePerformance(secondGpuData);
    secondGpuRawPerformance = getRawPerformance(secondGpuData);
    secondGpuClass = getManufacturerColor(
      `${secondGpuData.manufacturer} ${secondGpuData.gpuline} ${secondGpuData.model}`,
    );
  }

  const vramAmount = (vram: number | undefined) => {
    if (vram) {
      return vram < 1 ? `${vram * 1000}MB` : `${vram}GB`;
    }
    return null;
  };

  return (
    <div
      className="
        flex flex-col
        overflow-auto
        min-w-[300px]
        max-w-[500px]
        mx-auto
        p-1
        bg-black/50
        border-4 border-gray-700 rounded-xl
      "
    >
      <ComparisonTitle
        firstModelName={firstGpuData?.model || "N/A"}
        secondModelName={secondGpuData?.model || "N/A"}
        firstGpuClass={firstGpuClass}
        secondGpuClass={secondGpuClass}
      />

      {/* Wrapper for the Specifications section */}
      <div>
        <Division title="Specifications" />
        <ComparisonRow
          header="Cores"
          firstGpuDisplayData={String(firstGpuData?.cores || "N/A")}
          firstGpuValue={firstGpuData?.cores}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={String(secondGpuData?.cores || "N/A")}
          secondGpuValue={secondGpuData?.cores}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="TMUs"
          firstGpuDisplayData={String(firstGpuData?.tmus || "N/A")}
          firstGpuValue={firstGpuData?.tmus}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={String(secondGpuData?.tmus || "N/A")}
          secondGpuValue={secondGpuData?.tmus}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="ROPs"
          firstGpuDisplayData={String(firstGpuData?.rops || "N/A")}
          firstGpuValue={firstGpuData?.rops}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={String(secondGpuData?.rops || "N/A")}
          secondGpuValue={secondGpuData?.rops}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="VRAM"
          firstGpuDisplayData={`${vramAmount(firstGpuData?.vram) || "N/A"} ${firstGpuData?.memtype || ""}`}
          firstGpuValue={firstGpuData?.vram}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={`${vramAmount(secondGpuData?.vram) || "N/A"} ${secondGpuData?.memtype || ""}`}
          secondGpuValue={secondGpuData?.vram}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="Bus Width"
          firstGpuDisplayData={`${String(firstGpuData?.bus || "N/A")} bit`}
          firstGpuValue={firstGpuData?.bus}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={`${String(secondGpuData?.bus || "N/A")} bit`}
          secondGpuValue={secondGpuData?.bus}
          secondGpuClass={secondGpuClass}
        />
      </div>

      {/* Wrapper for the Clock Speeds section */}
      <div>
        <Division title="Clock Speeds" />
        <ComparisonRow
          header="Base Clock"
          firstGpuDisplayData={`${String(firstGpuData?.baseclock || "N/A")} MHz`}
          firstGpuValue={firstGpuData?.baseclock}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={`${String(secondGpuData?.baseclock || "N/A")} MHz`}
          secondGpuValue={secondGpuData?.baseclock}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="Boost Clock"
          firstGpuDisplayData={`${String(firstGpuData?.boostclock || "N/A")} MHz`}
          firstGpuValue={firstGpuData?.boostclock}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={`${String(secondGpuData?.boostclock || "N/A")} MHz`}
          secondGpuValue={secondGpuData?.boostclock}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="Memory Clock"
          firstGpuDisplayData={`${String(firstGpuData?.memclock || "N/A")} Gbps effective`}
          firstGpuValue={firstGpuData?.memclock}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={`${String(secondGpuData?.memclock || "N/A")} Gbps effective`}
          secondGpuValue={secondGpuData?.memclock}
          secondGpuClass={secondGpuClass}
        />
      </div>

      {/* Wrapper for the Theoretical Performance section */}
      <div>
        <Division title="Theoretical Performance" />
        <ComparisonRow
          header="FP32(float)"
          firstGpuDisplayData={String(firstGpuDisplayPerformance[0])}
          firstGpuValue={firstGpuRawPerformance[0]}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={String(secondGpuDisplayPerformance[0])}
          secondGpuValue={secondGpuRawPerformance[0]}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="Texture Rate"
          firstGpuDisplayData={String(firstGpuDisplayPerformance[1])}
          firstGpuValue={firstGpuRawPerformance[1]}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={String(secondGpuDisplayPerformance[1])}
          secondGpuValue={secondGpuRawPerformance[1]}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="Pixel Rate"
          firstGpuDisplayData={String(firstGpuDisplayPerformance[2])}
          firstGpuValue={firstGpuRawPerformance[2]}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={String(secondGpuDisplayPerformance[2])}
          secondGpuValue={secondGpuRawPerformance[2]}
          secondGpuClass={secondGpuClass}
        />
        <ComparisonRow
          header="Bandwidth"
          firstGpuDisplayData={String(firstGpuDisplayPerformance[3])}
          firstGpuValue={firstGpuRawPerformance[3]}
          firstGpuClass={firstGpuClass}
          secondGpuDisplayData={String(secondGpuDisplayPerformance[3])}
          secondGpuValue={secondGpuRawPerformance[3]}
          secondGpuClass={secondGpuClass}
        />
      </div>
    </div>
  );
}
