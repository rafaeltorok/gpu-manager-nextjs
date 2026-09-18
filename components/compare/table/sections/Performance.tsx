// Components
import Division from "@/components/gpu/TableRows/Division";
import ComparisonRow from "../parts/ComparisonRow";

// TypeScript types
interface PerformanceProps {
  firstGpuClass: string;
  secondGpuClass: string;
  firstGpuDisplayPerformance: string[];
  secondGpuDisplayPerformance: string[];
  firstGpuRawPerformance: number[];
  secondGpuRawPerformance: number[];
}

export default function Performance({
  firstGpuClass, secondGpuClass,
  firstGpuDisplayPerformance, secondGpuDisplayPerformance,
  firstGpuRawPerformance, secondGpuRawPerformance,
}: PerformanceProps) {
  return (
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
  );
}
