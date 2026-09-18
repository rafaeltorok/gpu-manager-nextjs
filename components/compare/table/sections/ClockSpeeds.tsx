// Components
import Division from "@/components/gpu/TableRows/Division";
import Header from "../parts/Header";
import PercentageDifference from "../parts/PercentageDifference";

// TypeScript types
interface CardClocks {
  baseclock: number;
  boostclock: number;
  memclock: number;
}

interface ClockSpeedsProps {
  firstGpuClockSpeeds: CardClocks;
  secondGpuClockSpeeds: CardClocks;
  firstGpuClass: string;
  secondGpuClass: string;
  editMode: boolean;
}

export default function ClockSpeeds({
  firstGpuClockSpeeds,
  secondGpuClockSpeeds,
  firstGpuClass,
  secondGpuClass,
  editMode,
}: ClockSpeedsProps) {
  return (
    <div>
      <Division title="Clock Speeds" />
      {/* Base Clock */}
      <div className="flex mx-auto text-center align-center">
        <Header header={"Base Clock"} />
        <div className={`${firstGpuClass} w-1/4 p-2`}>
          {String(firstGpuClockSpeeds.baseclock || "N/A")} MHz
        </div>
        <div className={`${secondGpuClass} w-1/4 p-2`}>
          {String(secondGpuClockSpeeds.baseclock || "N/A")} MHz
        </div>
        <PercentageDifference
          firstValue={firstGpuClockSpeeds.baseclock || 0}
          secondValue={secondGpuClockSpeeds.baseclock || 0}
        />
      </div>

      {/* Boost Clock */}
      <div className="flex mx-auto text-center align-center">
        <Header header={"Boost Clock"} />
        {editMode ? (
          <>
            <input
              name="f-boostclock"
              type="number"
              defaultValue={firstGpuClockSpeeds.boostclock || ""}
              className="w-1/4 p-2"
            />
            <input
              name="s-boostclock"
              type="number"
              defaultValue={secondGpuClockSpeeds.boostclock || ""}
              className="w-1/4 p-2"
            />
          </>
        ) : (
          <>
            <div className={`${firstGpuClass} w-1/4 p-2`}>
              {String(firstGpuClockSpeeds.boostclock || "N/A")} MHz
            </div>
            <div className={`${secondGpuClass} w-1/4 p-2`}>
              {String(secondGpuClockSpeeds.boostclock || "N/A")} MHz
            </div>
            <PercentageDifference
              firstValue={firstGpuClockSpeeds.boostclock || 0}
              secondValue={secondGpuClockSpeeds.boostclock || 0}
            />
          </>
        )}
      </div>

      {/* Memory Clock */}
      <div className="flex mx-auto text-center align-center">
        <Header header={"Memory Clock"} />
        {editMode ? (
          <>
            <input
              name="f-memclock"
              type="number"
              step="any"
              defaultValue={firstGpuClockSpeeds.memclock || ""}
              className="w-1/4 p-2"
            />
            <input
              name="s-memclock"
              type="number"
              step="any"
              defaultValue={secondGpuClockSpeeds.memclock || ""}
              className="w-1/4 p-2"
            />
          </>
        ) : (
          <>
            <div className={`${firstGpuClass} w-1/4 p-2`}>
              {String(firstGpuClockSpeeds.memclock || "N/A")} Gbps effective
            </div>
            <div className={`${secondGpuClass} w-1/4 p-2`}>
              {String(secondGpuClockSpeeds.memclock || "N/A")} Gbps effective
            </div>
            <PercentageDifference
              firstValue={firstGpuClockSpeeds.memclock || 0}
              secondValue={secondGpuClockSpeeds.memclock || 0}
            />
          </>
        )}
      </div>
    </div>
  );
}
