// Components
import Division from "../TableRows/Division";
import PerformanceRow from "../TableRows/PerformanceRow";

// TypeScript types
interface PerformanceProps {
  performance: string[];
  gpuClass: string;
}

export default function Performance({ performance, gpuClass }: PerformanceProps) {
  return (
    <div className="sm:flex sm:flex-col">
      <Division title="Theoretical Performance" />
      <PerformanceRow
        header="FP32(float)"
        data={performance[0]}
        gpuClass={gpuClass}
      />
      <PerformanceRow
        header="Texture Rate"
        data={performance[1]}
        gpuClass={gpuClass}
      />
      <PerformanceRow
        header="Pixel Rate"
        data={performance[2]}
        gpuClass={gpuClass}
      />
      <PerformanceRow
        header="Bandwidth"
        data={performance[3]}
        gpuClass={gpuClass}
      />
    </div>
  );
}
