// Components
import Header from "./Header";
import DataField from "./DataField";
import PercentageDifference from "./PercentageDifference";

// TypeScript Types
interface ComparisonRowProps {
  header: string;
  firstGpuDisplayData: string;
  firstGpuValue: number | undefined;
  firstGpuClass: string;
  secondGpuDisplayData: string;
  secondGpuValue: number | undefined;
  secondGpuClass: string;
}

export default function ComparisonRow({
  header,
  firstGpuDisplayData,
  firstGpuValue,
  firstGpuClass,
  secondGpuDisplayData,
  secondGpuValue,
  secondGpuClass,
}: ComparisonRowProps) {
  return (
    <div className="flex mx-auto text-center align-center">
      <Header header={header} />
      <DataField value={firstGpuDisplayData} gpuClass={firstGpuClass} />
      <DataField value={secondGpuDisplayData} gpuClass={secondGpuClass} />
      <PercentageDifference
        firstValue={firstGpuValue || 0}
        secondValue={secondGpuValue || 0}
      />
    </div>
  );
}
