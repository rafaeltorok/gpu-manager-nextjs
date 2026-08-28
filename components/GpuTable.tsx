"use client";

// React
import { useState } from "react";

// Services
import { deleteGpu, editGpu } from "@/app/actions/gpus";

// Utils
import calculatePerformance from "@/utils/calculatePerformance";
import { generateSlug } from "@/utils/slug";

// Components
import GpuTableRow from "./GpuTableRow";
import GpuTableDivision from "./GpuTableDivision";
import GpuTablePerformanceRow from "./GpuTablePerformanceRow";

// TypeScript types
import type { GpuType } from "../types/gpu";

interface ComponentProps {
  gpu: GpuType;
  gpuClass: string;
}

export default function GpuTable({ gpu, gpuClass }: ComponentProps) {
  const [editMode, setEditMode] = useState(false);

  // Generate a slug to be used on the edit action
  const slug = generateSlug(gpu);

  // Get the theoretical performance for a card
  const performance = calculatePerformance(gpu);

  // Format the VRAM suffix in either MB or GB
  const vramToDisplay = gpu.vram < 1 ? `${gpu.vram * 1000}MB` : `${gpu.vram}GB`;

  return (
    <tbody>
      <GpuTableDivision title="Specifications" />
      <GpuTableRow
        header="Cores"
        data={gpu.cores}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.cores}
        name="cores"
      />
      <GpuTableRow
        header="TMUs"
        data={gpu.tmus}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.tmus}
        name="tmus"
      />
      <GpuTableRow
        header="ROPs"
        data={gpu.rops}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.rops}
        name="rops"
      />
      <GpuTableRow
        header="VRAM"
        data={`${vramToDisplay} ${gpu.memtype}`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.vram}
        name="vram"
      />
      <GpuTableRow
        header="Bus Width"
        data={`${gpu.bus} bit`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.bus}
        name="bus"
      />

      <GpuTableDivision title="Clock Speeds" />
      <GpuTableRow
        header="Base Clock"
        data={`${gpu.baseclock} MHz`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.baseclock}
        name="baseclock"
      />
      <GpuTableRow
        header="Boost Clock"
        data={`${gpu.boostclock} MHz`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.boostclock}
        name="boostclock"
      />
      <GpuTableRow
        header="Memory Clock"
        data={`${gpu.memclock} Gbps effective`}
        gpuClass={gpuClass}
        editMode={editMode}
        originalValue={gpu.memclock}
        name="memclock"
      />

      <GpuTableDivision title="Theoretical Performance" />
      <GpuTablePerformanceRow
        header="FP32(float)"
        data={performance[0]}
        gpuClass={gpuClass}
      />
      <GpuTablePerformanceRow
        header="Texture Rate"
        data={performance[1]}
        gpuClass={gpuClass}
      />
      <GpuTablePerformanceRow
        header="Pixel Rate"
        data={performance[2]}
        gpuClass={gpuClass}
      />
      <GpuTablePerformanceRow
        header="Bandwidth"
        data={performance[3]}
        gpuClass={gpuClass}
      />

      <tr>
        <th colSpan={2}>
          {editMode ? (
            <button
              className="w-full mt-1 px-1 py-1 bg-black font-bold border-1 border-gray-700 hover:bg-gray-900"
              type="submit"
              formAction={(formData) => {
                setEditMode(false);
                editGpu(formData, slug);
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="w-full mt-1 px-1 py-1 bg-black font-bold border-1 border-gray-700 hover:bg-gray-900"
              type="submit"
              formAction={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
        </th>
      </tr>

      <tr>
        <th colSpan={2}>
          <button
            className="w-full mt-1 mb-1 px-1 py-1 bg-black font-bold border-1 border-gray-700 hover:bg-gray-900"
            type="submit"
            formAction={deleteGpu}
          >
            Remove
          </button>
        </th>
      </tr>
    </tbody>
  );
}
