"use client";

import { useRouter } from "next/navigation";

// Server actions
import { deleteGpu } from "@/app/actions/gpus";

// React
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

// Utils
import calculatePerformance from "@/utils/calculatePerformance";

// Components
import Title from "./TableSections/Title";
import Specifications from "./TableSections/Specifications";
import ClockSpeeds from "./TableSections/ClockSpeeds";
import Performance from "./TableSections/Performance";
import Controls from "./TableSections/Controls";
import ConfirmMessage from "./ConfirmMessage";

// TypeScript types
import type { GpuType } from "../../types/gpu";
import type { SwipeEventData } from "react-swipeable";

interface ComponentProps {
  gpu: GpuType;
  gpuClass: string;
  previous: GpuType | null;
  next: GpuType | null;
}

// Client component
export default function GpuTable({ gpu, gpuClass, previous, next }: ComponentProps) {
  // Define the table modes
  const [editMode, setEditMode] = useState(false);
  const [overrideMode, setOverrideMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  // Create a copy of the original GPU data to modify it
  const [gpuData, setGpuData] = useState(gpu);

  // Get the theoretical performance for the current graphics card
  const performance = calculatePerformance(gpuData);

  // Sync the data of the copy after a successful database update
  useEffect(() => {
    async function handleUpdate() {
      setGpuData(gpu);
    }
    handleUpdate();
  }, [gpu]);

  // Handles keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (
        event.key === "ArrowLeft" && previous && !openModal
      ) {
        router.push(`/gpus/${previous.slug}`);
      }

      // Right arrow key
      if (
        event.key === "ArrowRight" && next && !openModal
      ) {
        router.push(`/gpus/${next.slug}`);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previous, next, router, openModal]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      // Previous page
      if (
        eventData.dir === "Right" && previous && !openModal
      ) {
        router.push(`/gpus/${previous.slug}`);
      }

      // Next page
      if (
        eventData.dir === "Left" && next  && !openModal
      ) {
        router.push(`/gpus/${next.slug}`);
      }
    },
  });

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
      {...swipeHandler}
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
          overrideMode={overrideMode}
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
        overrideMode={overrideMode}
        setOverrideMode={setOverrideMode}
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
