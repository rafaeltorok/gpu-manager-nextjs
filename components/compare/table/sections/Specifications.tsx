// Components
import Division from "@/components/gpu/TableRows/Division";
import ComparisonRow from "../parts/ComparisonRow";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface SpecificationsProps {
  firstGpuData: GpuType | undefined;
  secondGpuData: GpuType | undefined;
  firstGpuClass: string;
  secondGpuClass: string;
}

export default function Specifications({
  firstGpuData, secondGpuData,
  firstGpuClass, secondGpuClass
}: SpecificationsProps) {
  // Format the VRAM output in either MB or GB
  const vramAmount = (vram: number | undefined) => {
    if (vram) {
      return vram < 1 ? `${vram * 1000}MB` : `${vram}GB`;
    }
    return null;
  };

  return (
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
  );
}
