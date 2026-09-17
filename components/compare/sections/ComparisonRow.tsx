// Components
import Header from "./Header";
import Data from "./Data";
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
  firstGpuDisplayData, firstGpuValue, firstGpuClass,
  secondGpuDisplayData, secondGpuValue, secondGpuClass,
}: ComparisonRowProps) {
  return (
    <div className="flex mx-auto text-center align-center">
      <Header header={header} />
      <Data value={firstGpuDisplayData} gpuClass={firstGpuClass} />
      <Data value={secondGpuDisplayData} gpuClass={secondGpuClass} />
      <PercentageDifference
        firstValue={firstGpuValue || 0}
        secondValue={secondGpuValue || 0}
      />
    </div>
  );
}
