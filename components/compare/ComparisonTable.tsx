"use client";

import { useState, useEffect } from "react";

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

export default function ComparisonTable({
  firstGpuData,
  secondGpuData,
}: ComparisonTableProps) {
  const [editMode, setEditMode] = useState(false);

  // Allow the user to modify the clock speeds during edit mode
  const [firstCardClockSpeeds, setFirstCardClockSpeeds] = useState({
    baseclock: firstGpuData?.baseclock || 0,
    boostclock: firstGpuData?.boostclock || 0,
    memclock: firstGpuData?.memclock || 0,
  });
  const [secondCardClockSpeeds, setSecondCardClockSpeeds] = useState({
    baseclock: secondGpuData?.baseclock || 0,
    boostclock: secondGpuData?.boostclock || 0,
    memclock: secondGpuData?.memclock || 0,
  });

  // The effects keep both clock speeds at sync after selecting a different card
  useEffect(() => {
    setFirstCardClockSpeeds({
      baseclock: firstGpuData?.baseclock || 0,
      boostclock: firstGpuData?.boostclock || 0,
      memclock: firstGpuData?.memclock || 0,
    })
  }, [firstGpuData]);

  useEffect(() => {
    setFirstCardClockSpeeds({
      baseclock: firstGpuData?.baseclock || 0,
      boostclock: firstGpuData?.boostclock || 0,
      memclock: firstGpuData?.memclock || 0,
    })
  }, [firstGpuData]);

  // Store the original clock speed values
  const firstOriginalClocks = {
    baseclock: firstGpuData?.baseclock || 0,
    boostclock: firstGpuData?.boostclock || 0,
    memclock: firstGpuData?.memclock || 0,
  };
  const secondOriginalClocks = {
    baseclock: secondGpuData?.baseclock || 0,
    boostclock: secondGpuData?.boostclock || 0,
    memclock: secondGpuData?.memclock || 0,
  };

  // Calculate the performance for both cards
  let firstGpuDisplayPerformance: string[] = ["N/A", "N/A", "N/A", "N/A"];
  let secondGpuDisplayPerformance: string[] = ["N/A", "N/A", "N/A", "N/A"];
  let firstGpuRawPerformance: number[] = [0, 0, 0, 0];
  let secondGpuRawPerformance: number[] = [0, 0, 0, 0];

  let firstGpuClass = "";
  let secondGpuClass = "";

  if (firstGpuData) {
    firstGpuDisplayPerformance = calculatePerformance({ ...firstGpuData, ...firstCardClockSpeeds });
    firstGpuRawPerformance = getRawPerformance({ ...firstGpuData, ...firstCardClockSpeeds });
    firstGpuClass = getManufacturerColor(
      `${firstGpuData.manufacturer} ${firstGpuData.gpuline} ${firstGpuData.model}`,
    );
  }

  if (secondGpuData) {
    secondGpuDisplayPerformance = calculatePerformance({ ...secondGpuData, ...secondCardClockSpeeds });
    secondGpuRawPerformance = getRawPerformance({ ...secondGpuData, ...secondCardClockSpeeds });
    secondGpuClass = getManufacturerColor(
      `${secondGpuData.manufacturer} ${secondGpuData.gpuline} ${secondGpuData.model}`,
    );
  }

  function handleClocksReset() {
    setFirstCardClockSpeeds({ ...firstOriginalClocks });
    setSecondCardClockSpeeds({ ...secondOriginalClocks });
  }

  function handleClocksUpdate(formData: FormData) {
    const firstBoostClock = Number(formData.get("f-boostclock"));
    const firstMemClock = Number(formData.get("f-memclock"));
    const secondBoostClock = Number(formData.get("s-boostclock"));
    const secondMemClock = Number(formData.get("s-memclock"));

    if (firstBoostClock > 0 && firstMemClock > 0) {
      setFirstCardClockSpeeds((previous) => ({
        ...previous,
        boostclock: firstBoostClock,
        memclock: firstMemClock,
      }));
    }

    if (secondBoostClock > 0 && secondMemClock > 0) {
      setSecondCardClockSpeeds((previous) => ({
        ...previous,
        boostclock: secondBoostClock,
        memclock: secondMemClock,
      }));
    }

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
        firstGpuClockSpeeds={firstCardClockSpeeds}
        secondGpuClockSpeeds={secondCardClockSpeeds}
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
