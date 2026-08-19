interface ComponentProps {
  title: string;
}

export default function GpuTableDivision({ title }: ComponentProps) {
  return (
    <tr className="table-division-header">
      <th colSpan={2}>{title}</th>
    </tr>
  );
}
