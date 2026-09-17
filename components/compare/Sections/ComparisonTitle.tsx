interface ComparisonTitleProps {
  firstModelName: string;
  secondModelName: string;
  firstGpuClass: string;
  secondGpuClass: string;
}

export default function ComparisonTitle({ 
  firstModelName, secondModelName,
  firstGpuClass, secondGpuClass
}: ComparisonTitleProps) {
  return (
    <div className="flex mx-auto">
      <div
        className={`
          bg-black/25
          p-5
          text-2xl font-extrabold
          rounded-tl-xl
          text-center
          ${firstGpuClass}
        `}
      >
        {firstModelName}
      </div>
      <div
        className={`
          bg-black/25
          p-5
          text-2xl font-extrabold
          rounded-tr-xl
          text-center
          ${secondGpuClass}
        `}
      >
        {secondModelName}
      </div>
    </div>
  );
}