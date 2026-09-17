"use client";

import { useRouter } from "next/navigation";

// Server actions
import { deleteGpu } from "@/app/actions/gpus";

// React
import { useState, useEffect } from "react";

// Utils
import calculatePerformance from "@/utils/calculatePerformance";

// Components
import Title from "./TableSections/Title";
import Specifications from "./TableSections/Specifications";
import ClockSpeeds from "./TableSections/ClockSpeeds";
import Performance from "./TableSections/Performance";
import Controls from "./TableSections/Controls";

// TypeScript types
import type { GpuType } from "../../types/gpu";
import ConfirmMessage from "./ConfirmMessage";

interface ComponentProps {
  gpu: GpuType;
  gpuClass: string;
}

// Client component
export default function GpuTable({ gpu, gpuClass }: ComponentProps) {
  // Define the table modes
  const [editMode, setEditMode] = useState(false);
  const [calculateMode, setCalculateMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  // Get the theoretical performance for a card
  const performance = calculatePerformance(gpuData);

  // Handle removing a graphics card from the list
  async function handleDelete(id: string) {
    try {
      await deleteGpu(id);
      router.push("/gpus");
    } catch (err: unknown) {
      console.error(err);
      window.alert("Failed to remove the graphics card");
    }
  }

  return (
    <div
      className="
        w-full
        min-w-[300px] max-w-[400px] lg:max-w-[900px] md:max-w-[700px] sm:max-w-[600px]
        border-5 border-gray-700
        mx-auto my-6
        rounded-xl
        wrap-break-word
      "
    >
      <Title
        gpuData={gpuData}
        setGpuData={setGpuData}
        editMode={editMode}
        gpuClass={gpuClass}
      />

      {/* Wrapper for the data section of the table */}
      <div className="sm:grid sm:grid-cols-3 lg:h-[250px] sm:h-[300px]">
        {/* Wrapper for the Specifications section */}
        <Specifications
          gpuData={gpuData}
          setGpuData={setGpuData}
          editMode={editMode}
          gpuClass={gpuClass}
        />

        {/* Wrapper for the Clock speeds section */}
        <ClockSpeeds
          gpuData={gpuData}
          setGpuData={setGpuData}
          editMode={editMode}
          calculateMode={calculateMode}
          gpuClass={gpuClass}
        />

        {/* Wrapper for the Performance section */}
        <Performance performance={performance} gpuClass={gpuClass} />
      </div>

      {/* Wrapper for the table controls */}
      <Controls
        gpu={gpu}
        setGpuData={setGpuData}
        editMode={editMode}
        setEditMode={setEditMode}
        calculateMode={calculateMode}
        setCalculateMode={setCalculateMode}
        setOpenModal={setOpenModal}
      />

      <ConfirmMessage
        id={gpu.id}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={handleDelete}
        fullModelName={`${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`}
        gpuClass={gpuClass}
      />
    </div>
  );
}
