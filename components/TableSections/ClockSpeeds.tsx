// Components
import Division from "../TableRows/Division";
import StandardRow from "../TableRows/StandardRow";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ClockSpeedsProps {
  gpuData: GpuType;
  setGpuData: (data: GpuType) => void;
  editMode: boolean;
  calculateMode: boolean;
  gpuClass: string;
}

export default function ClockSpeeds({ gpuData, setGpuData, editMode, calculateMode, gpuClass }: ClockSpeedsProps) {
  return (
    <div className="sm:flex sm:flex-col">
      <Division title="Clock Speeds" />
      <StandardRow
        header="Base Clock"
        data={`${gpuData.baseclock} MHz`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalData={gpuData}
        setData={setGpuData}
        name="baseclock"
      />
      <StandardRow
        header="Boost Clock"
        data={`${gpuData.boostclock} MHz`}
        gpuClass={gpuClass}
        editMode={editMode}
        calculateMode={calculateMode}
        originalData={gpuData}
        setData={setGpuData}
        name="boostclock"
      />
      <StandardRow
        header="Memory Clock"
        data={`${gpuData.memclock} Gbps effective`}
        gpuClass={gpuClass}
        editMode={editMode}
        calculateMode={calculateMode}
        originalData={gpuData}
        setData={setGpuData}
        name="memclock"
      />
    </div>
  );
}
