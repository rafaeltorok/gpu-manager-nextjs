// Utils
import getPercentage from "@/utils/getPercentage";

// TypeScript types
interface PercentageDifferenceProps {
  firstValue: number;
  secondValue: number;
}

export default function PercentageDifference({
  firstValue,
  secondValue,
}: PercentageDifferenceProps) {
  return (
    <div className="w-1/4 p-2 bg-[#252525]/50">
      {firstValue === 0 || secondValue === 0 ? (
        <div>N/A</div>
      ) : (
        <div>{getPercentage(firstValue, secondValue)}</div>
      )}
    </div>
  );
}
