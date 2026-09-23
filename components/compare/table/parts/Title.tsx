interface TitleProps {
  firstModelName: string;
  secondModelName: string;
  firstGpuClass: string;
  secondGpuClass: string;
}

export default function Title({
  firstModelName,
  secondModelName,
  firstGpuClass,
  secondGpuClass,
}: TitleProps) {
  return (
    <div className="flex mx-auto">
      <div className="w-1/4"></div>

      <div
        className={`
          w-1/4
          bg-black/25
          p-5
          text-2xl font-extrabold
          rounded-tl-xl
          text-center
          overflow-auto
          scrollbar-none
          ${firstGpuClass}
        `}
      >
        {firstModelName}
      </div>
      <div
        className={`
          w-1/4
          bg-black/25
          p-5
          text-2xl font-extrabold
          rounded-tr-xl
          text-center
          overflow-auto
          scrollbar-none
          ${secondGpuClass}
        `}
      >
        {secondModelName}
      </div>

      <div
        className="
          w-1/4
          bg-black/25
          p-5
          text-md font-extrabold
          rounded-tr-xl
          text-center
        "
      >
        Difference (in %)
      </div>
    </div>
  );
}
