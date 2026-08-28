interface ComponentProps {
  header: string;
  data: string;
  gpuClass: string;
}

export default function GpuTablePerformanceRow({
  header,
  data,
  gpuClass,
}: ComponentProps) {
  return (
    <tr className="flex w-full">
      <th className="text-left font-normal bg-[#252525] border-1 border-gray-600 px-2 py-1 w-2/5">
        {header}
      </th>
      <td
        className={`text-left font-bold bg-black border-1 border-gray-600 px-2 py-1 w-3/5`}
      >
        <span className={`${gpuClass}`}>{String(data)}</span>
      </td>
    </tr>
  );
}
