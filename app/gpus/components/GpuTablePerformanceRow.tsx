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
    <tr>
      <th className="row-label">{header}</th>
      <td className={`row-data ${gpuClass}`}>{String(data)}</td>
    </tr>
  );
}
