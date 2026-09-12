"use client";

import { useState } from "react";

// TypeScript types
interface ComponentProps {
  header: string;
  data: string | number;
  gpuClass: string;
  editMode: boolean;
  originalValue: number;
  name: string;
}

// Client component
export default function GpuTableRow({
  header,
  data,
  gpuClass,
  editMode,
  originalValue,
  name,
}: ComponentProps) {
  const [value, setValue] = useState<number>(originalValue);

  return (
    <>
      {editMode ? (
        <div className="flex w-full md:flex-1">
          <div className="text-left font-normal bg-[#252525] border-1 border-gray-600 px-2 py-1 w-2/5">
            {header}
          </div>
          <div
            className={`text-left font-bold bg-black border-1 border-gray-600 px-2 py-1 w-3/5 ${gpuClass}`}
          >
            <input
              className="w-full bg-black text-white border-[inset]"
              name={name}
              value={value}
              type="number"
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full md:flex-1">
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
