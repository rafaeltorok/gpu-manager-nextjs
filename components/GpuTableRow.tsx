"use client";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ComponentProps {
  header: string;
  data: string | number;
  gpuClass: string;
  editMode: boolean;
  calculateMode?: boolean;
  originalData: GpuType;
  name: keyof GpuType;
  setData: (gpuData: GpuType) => void;
}

// Client component
export default function GpuTableRow({
  header,
  data,
  gpuClass,
  editMode,
  calculateMode,
  originalData,
  name,
  setData,
}: ComponentProps) {
  return (
    <>
      {editMode || calculateMode ? (
        <div className="flex w-full sm:flex-1">
          <div className="text-left font-normal bg-[#252525] border-1 border-gray-600 px-2 py-1 w-2/5">
            {header}
          </div>
          <div
            className={`text-left font-bold bg-black border-1 border-gray-600 px-2 py-1 w-3/5 ${gpuClass}`}
          >
            <input
              className="w-full bg-black text-white border-[inset]"
              name={name}
              value={originalData[name] || ""}
              type="number"
              onChange={
                (e) => {
                  if (Number(e.target.value) < 0 || isNaN(Number(e.target.value))) {
                    setData({ ...originalData, [name]: 0 });
                  } else {
                    setData({ ...originalData, [name]: Number(e.target.value) });
                  }
                }
              }
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full sm:flex-1">
          <div className="text-left font-normal bg-[#252525] border-1 border-gray-600 px-2 py-1 w-2/5">
            {header}
          </div>
          <div
            className={`text-left font-bold bg-black border-1 border-gray-600 px-2 py-1 w-3/5`}
          >
            <span className={`${gpuClass}`}>{String(data)}</span>
          </div>
        </div>
      )}
    </>
  );
}
