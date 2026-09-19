"use client";

import { useState } from "react";

// Utils
import calculatePerformance from "@/utils/calculatePerformance";
import getRawPerformance from "@/utils/getRawPerformance";
import getManufacturerColor from "@/utils/getManufacturerColor";

// Components
import ComparisonTitle from "./table/parts/Title";
import Specifications from "./table/sections/Specifications";
import ClockSpeeds from "./table/sections/ClockSpeeds";
import Performance from "./table/sections/Performance";
import Controls from "./table/sections/Controls";

// TypeScript types
import type { GpuType } from "@/types/gpu";

interface ComparisonTableProps {
  firstGpuData: GpuType | undefined;
  secondGpuData: GpuType | undefined;
}

type Clocks = { baseclock: number; boostclock: number; memclock: number };
type ClockOverride = { slug: string; boostclock: number; memclock: number };

export default function ComparisonTable({
  firstGpuData,
  secondGpuData,
}: ComparisonTableProps) {
  const [editMode, setEditMode] = useState(false);

  // Define the clock override during the "Edit" mode
  const [firstOverride, setFirstOverride] = useState<ClockOverride | null>(
    null,
  );
  const [secondOverride, setSecondOverride] = useState<ClockOverride | null>(
    null,
  );

  // Define the initial clocks speeds for both cards
  const firstClocks = getClocks(firstGpuData, firstOverride);
  const secondClocks = getClocks(secondGpuData, secondOverride);

  // Calculate the performance for the graphics cards
  let firstGpuDisplayPerformance: string[] = ["N/A", "N/A", "N/A", "N/A"];
  let secondGpuDisplayPerformance: string[] = ["N/A", "N/A", "N/A", "N/A"];
  let firstGpuRawPerformance: number[] = [0, 0, 0, 0];
  let secondGpuRawPerformance: number[] = [0, 0, 0, 0];

  // Define the color scheme for each card based on their manufacturer
  let firstGpuClass = "";
  let secondGpuClass = "";

  // Apply the performance calculation only if the first card has been selected
  if (firstGpuData) {
    firstGpuDisplayPerformance = calculatePerformance({
      ...firstGpuData,
      ...firstClocks,
    });
    firstGpuRawPerformance = getRawPerformance({
      ...firstGpuData,
      ...firstClocks,
    });
    firstGpuClass = getManufacturerColor(
      `${firstGpuData.manufacturer} ${firstGpuData.gpuline} ${firstGpuData.model}`,
    );
  }

  // Apply the performance calculation only if the second card has been selected
  if (secondGpuData) {
    secondGpuDisplayPerformance = calculatePerformance({
      ...secondGpuData,
      ...secondClocks,
    });
    secondGpuRawPerformance = getRawPerformance({
      ...secondGpuData,
      ...secondClocks,
    });
    secondGpuClass = getManufacturerColor(
      `${secondGpuData.manufacturer} ${secondGpuData.gpuline} ${secondGpuData.model}`,
    );
  }

  // Handle the "Reset" button from the table controls
  function handleClocksReset() {
    setFirstOverride(null);
    setSecondOverride(null);
  }

  // Handle the user clock override input on the "Edit" mode
  function handleClocksUpdate(formData: FormData) {
    const firstBoostClock = Number(formData.get("f-boostclock"));
    const firstMemClock = Number(formData.get("f-memclock"));
    const secondBoostClock = Number(formData.get("s-boostclock"));
    const secondMemClock = Number(formData.get("s-memclock"));

    // Allow only valid values (positive and non-zero)
    if (firstGpuData && firstBoostClock > 0 && firstMemClock > 0) {
      setFirstOverride({
        slug: firstGpuData.slug || "",
        boostclock: firstBoostClock,
        memclock: firstMemClock,
      });
    }

    if (secondGpuData && secondBoostClock > 0 && secondMemClock > 0) {
      setSecondOverride({
        slug: secondGpuData.slug || "",
        boostclock: secondBoostClock,
        memclock: secondMemClock,
      });
    }

    // After clicking on "Confirm", return the table to the standard display mode
    setEditMode(false);
  }

  return (
    <form
      action={handleClocksUpdate}
      className="
        flex flex-col
        overflow-auto
        min-w-[300px]
        max-w-[500px]
        mx-auto
        p-1
        bg-black/50
        border-4 border-gray-700 rounded-xl
      "
    >
      {/* Wrapper to the main title containing both cards' model names */}
      <ComparisonTitle
        firstModelName={firstGpuData?.model || "N/A"}
        secondModelName={secondGpuData?.model || "N/A"}
        firstGpuClass={firstGpuClass}
        secondGpuClass={secondGpuClass}
      />

      {/* Wrapper for the Specifications section */}
      <Specifications
        firstGpuData={firstGpuData}
        secondGpuData={secondGpuData}
        firstGpuClass={firstGpuClass}
        secondGpuClass={secondGpuClass}
      />

      {/* Wrapper for the Clock Speeds section */}
      <ClockSpeeds
        firstGpuClockSpeeds={firstClocks}
        secondGpuClockSpeeds={secondClocks}
        firstGpuClass={firstGpuClass}
        secondGpuClass={secondGpuClass}
        editMode={editMode}
      />

      {/* Wrapper for the Theoretical Performance section */}
      <Performance
        firstGpuClass={firstGpuClass}
        secondGpuClass={secondGpuClass}
        firstGpuDisplayPerformance={firstGpuDisplayPerformance}
        secondGpuDisplayPerformance={secondGpuDisplayPerformance}
        firstGpuRawPerformance={firstGpuRawPerformance}
        secondGpuRawPerformance={secondGpuRawPerformance}
      />

      {/* Wrapper for the table controls */}
      <Controls
        editMode={editMode}
        setEditMode={setEditMode}
        handleClocksReset={handleClocksReset}
      />
    </form>
  );
}

// Handle the clocks speeds on the table "Edit" mode
function getClocks(
  gpu: GpuType | undefined,
  override: ClockOverride | null,
): Clocks {
  const original = {
    baseclock: gpu?.baseclock || 0,
    boostclock: gpu?.boostclock || 0,
    memclock: gpu?.memclock || 0,
  };

  // Apply the user clock override only if that edit was made for this exact card
  if (gpu && override && override.slug === gpu.slug) {
    return {
      ...original,
      boostclock: override.boostclock,
      memclock: override.memclock,
    };
  }

  // Otherwise, return the original clock speeds
  return original;
}
