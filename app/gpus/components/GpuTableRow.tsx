interface ComponentProps {
  header: string;
  data: string | number;
  gpuClass: string;
}

export default function GpuTableRow({
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
