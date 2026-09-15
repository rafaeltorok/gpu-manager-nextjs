interface ComponentProps {
  header: string;
  data: string;
  gpuClass: string;
}

export default function PerformanceRow({
  header,
  data,
  gpuClass,
}: ComponentProps) {
  return (
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
  );
}
