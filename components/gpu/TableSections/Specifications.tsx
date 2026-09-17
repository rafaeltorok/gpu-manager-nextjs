// Components
import Division from "../TableRows/Division";
import StandardRow from "../TableRows/StandardRow";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface SpecificationsProps {
  gpuData: GpuType;
  setGpuData: (data: GpuType) => void;
  editMode: boolean;
  gpuClass: string;
}

export default function Specifications({
  gpuData,
  setGpuData,
  editMode,
  gpuClass,
}: SpecificationsProps) {
  // Format the VRAM suffix in either MB or GB
  const vramToDisplay =
    gpuData.vram < 1 ? `${gpuData.vram * 1000}MB` : `${gpuData.vram}GB`;

  return (
    <div className="sm:flex sm:flex-col">
      <Division title="Specifications" />
      <StandardRow
        header="Cores"
        data={gpuData.cores}
        gpuClass={gpuClass}
        editMode={editMode}
        originalData={gpuData}
        setData={setGpuData}
        name="cores"
      />
      <StandardRow
        header="TMUs"
        data={gpuData.tmus}
        gpuClass={gpuClass}
        editMode={editMode}
        originalData={gpuData}
        setData={setGpuData}
        name="tmus"
      />
      <StandardRow
        header="ROPs"
        data={gpuData.rops}
        gpuClass={gpuClass}
        editMode={editMode}
        originalData={gpuData}
        setData={setGpuData}
        name="rops"
      />
      <StandardRow
        header="VRAM"
        data={`${vramToDisplay} ${gpuData.memtype}`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalData={gpuData}
        setData={setGpuData}
        name="vram"
      />
      <StandardRow
        header="Bus Width"
        data={`${gpuData.bus} bit`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalData={gpuData}
        setData={setGpuData}
        name="bus"
      />
    </div>
  );
}
