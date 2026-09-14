"use client";

import { useRouter } from "next/navigation";

// React
import { useState, useEffect } from "react";

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

// Client component
export default function GpuTable({ gpu, gpuClass }: ComponentProps) {
  // Define the table modes
  const [editMode, setEditMode] = useState(false);
  const [calculateMode, setCalculateMode] = useState(false);
  const router = useRouter();

  // Create a copy of the original GPU data to modify it
  const [gpuData, setGpuData] = useState(gpu);

  // Sync the data of the copy after a successful database update
  useEffect(() => {
    async function handleUpdate() {
      setGpuData(gpu);
    }
    handleUpdate();
  }, [gpu]);

  // Handle removing the graphics card from the list
  async function handleDelete() {
    const removeConfirm = window.confirm(
      `Remove ${gpu.manufacturer} ${gpu.gpuline} ${gpu.model} from the list?`,
    );

    if (!removeConfirm) return;

    try {
      await deleteGpu(gpu.id);
      router.push("/gpus");
    } catch (err: unknown) {
      console.error(err);
      window.alert("Failed to remove the graphics card");
    }
  }

  // Generate a slug to be used on the edit action
  const slug = generateSlug(gpu);

  // Get the theoretical performance for a card
  const performance = calculatePerformance(gpuData);

  // Format the VRAM suffix in either MB or GB
  const vramToDisplay =
    gpuData.vram < 1 ? `${gpuData.vram * 1000}MB` : `${gpuData.vram}GB`;

  return (
    <div>
      {/* Wrapper for the entire data table */}
      <div className="sm:grid sm:grid-cols-3 lg:h-[250px] sm:h-[300px]">
        {/* Wrapper for the Specifications section */}
        <div className="sm:flex sm:flex-col">
          <GpuTableDivision title="Specifications" />
          <GpuTableRow
            header="Cores"
            data={gpuData.cores}
            gpuClass={gpuClass}
            editMode={editMode}
            originalData={gpuData}
            setData={setGpuData}
            name="cores"
          />
          <GpuTableRow
            header="TMUs"
            data={gpuData.tmus}
            gpuClass={gpuClass}
            editMode={editMode}
            originalData={gpuData}
            setData={setGpuData}
            name="tmus"
          />
          <GpuTableRow
            header="ROPs"
            data={gpuData.rops}
            gpuClass={gpuClass}
            editMode={editMode}
            originalData={gpuData}
            setData={setGpuData}
            name="rops"
          />
          <GpuTableRow
            header="VRAM"
            data={`${vramToDisplay} ${gpuData.memtype}`}
            gpuClass={gpuClass}
            editMode={editMode}
            originalData={gpuData}
            setData={setGpuData}
            name="vram"
          />
          <GpuTableRow
            header="Bus Width"
            data={`${gpuData.bus} bit`}
            gpuClass={gpuClass}
            editMode={editMode}
            originalData={gpuData}
            setData={setGpuData}
            name="bus"
          />
        </div>

        {/* Wrapper for the Clock speeds section */}
        <div className="sm:flex sm:flex-col">
          <GpuTableDivision title="Clock Speeds" />
          <GpuTableRow
            header="Base Clock"
            data={`${gpuData.baseclock} MHz`}
            gpuClass={gpuClass}
            editMode={editMode}
            originalData={gpuData}
            setData={setGpuData}
            name="baseclock"
          />
          <GpuTableRow
            header="Boost Clock"
            data={`${gpuData.boostclock} MHz`}
            gpuClass={gpuClass}
            editMode={editMode}
            calculateMode={calculateMode}
            originalData={gpuData}
            setData={setGpuData}
            name="boostclock"
          />
          <GpuTableRow
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

        {/* Wrapper for the Performance section */}
        <div className="sm:flex sm:flex-col">
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
        </div>
      </div>

      {/* Wrapper for the table controls */}
      <div
        className="
        flex flex-col
        sm:flex-row
        w-full
        my-1
        font-bold
        gap-1"
      >
        {/* Calculate mode */}
        {!editMode && (
          <>
            {calculateMode ? (
              <button
                className="
                  w-full
                  px-1 py-1
                  bg-black
                  border-1 border-gray-700
                  hover:bg-gray-900
                  rounded-xl
                "
                type="submit"
                formAction={() => {
                  setCalculateMode(false);
                }}
              >
                Confirm
              </button>
            ) : (
              <button
                className="
                  w-full
                  px-1 py-1
                  bg-black
                  border-1 border-gray-700
                  hover:bg-gray-900
                  rounded-xl
                "
                type="submit"
                formAction={() => setCalculateMode(true)}
              >
                Calculate performance
              </button>
            )}
          </>
        )}

        {/* Edit mode */}
        {!calculateMode && (
          <>
            {editMode ? (
              <button
                className="
                  w-full
                  px-1 py-1
                  bg-black
                  border-1 border-gray-700
                  hover:bg-gray-900
                  rounded-xl
                "
                type="submit"
                formAction={async (formData) => {
                  setEditMode(false);
                  await editGpu(formData, slug);
                }}
              >
                Save
              </button>
            ) : (
              <button
                className="
                  w-full
                  px-1 py-1
                  bg-black
                  border-1 border-gray-700
                  hover:bg-gray-900
                  rounded-xl
                "
                type="submit"
                formAction={() => setEditMode(true)}
              >
                Edit
              </button>
            )}
          </>
        )}

        {/* When using any table modes, show the "Cancel" button instead of the "Remove" one */}
        {editMode || calculateMode ? (
          <button
            className="
              w-full
              px-1 py-1
              bg-black
              border-1 border-gray-700
              hover:bg-gray-900
              rounded-xl
            "
            type="submit"
            formAction={() => {
              setEditMode(false);
              setCalculateMode(false);
              setGpuData(gpu);
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className="
              w-full
              px-1 py-1
              bg-black
              border-1 border-gray-700
              hover:bg-gray-900
              rounded-xl
            "
            type="button"
            onClick={handleDelete}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
