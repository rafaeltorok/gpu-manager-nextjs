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
export default function StandardRow({
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
      {/* Render an input field to allow the user to edit the row data */}
      {editMode || calculateMode ? (
        <div className="flex w-full sm:flex-1">
          <div className="text-left font-normal bg-[#252525] border-1 border-gray-600 px-2 py-1 w-2/5">
            <label htmlFor={name}>{header}</label>
          </div>
          <div
            className={`text-left font-bold bg-black border-1 border-gray-600 px-2 py-1 w-3/5 ${gpuClass}`}
          >
            {name === "vram" ? (
              <div className="flex">
                {/* Display two inputs fields for the VRAM, one for the memory amount and other for the type */}
                <input
                  id="vram"
                  className="bg-black text-white border-[inset] w-1/2"
                  name="vram"
                  value={originalData["vram"] || ""}
                  type="number"
                  onChange={(e) => {
                    if (
                      Number(e.target.value) < 0 ||
                      isNaN(Number(e.target.value))
                    ) {
                      setData({ ...originalData, vram: 0 });
                    } else {
                      setData({
                        ...originalData,
                        vram: Number(e.target.value),
                      });
                    }
                  }}
                />
                <input
                  id="memtype"
                  className="bg-black text-white border-[inset] w-1/2"
                  name="memtype"
                  value={originalData["memtype"] || ""}
                  type="text"
                  onChange={(e) =>
                    setData({ ...originalData, memtype: e.target.value.trim() })
                  }
                />
              </div>
            ) : (
              <>
                {/* For all other fields, display the standard input field for numeric values */}
                <input
                  id={name}
                  className="w-full bg-black text-white border-[inset]"
                  name={name}
                  value={originalData[name] || ""}
                  type="number"
                  onChange={(e) => {
                    if (
                      Number(e.target.value) < 0 ||
                      isNaN(Number(e.target.value))
                    ) {
                      setData({ ...originalData, [name]: 0 });
                    } else {
                      setData({
                        ...originalData,
                        [name]: Number(e.target.value),
                      });
                    }
                  }}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Render a read-only field to display the data */}
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
        </>
      )}
    </>
  );
}
