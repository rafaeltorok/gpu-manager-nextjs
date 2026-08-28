interface ComponentProps {
  title: string;
}

export default function GpuTableDivision({ title }: ComponentProps) {
  return (
    <tr>
      <th
        colSpan={2}
        className="bg-[#161616] font-bold text-xl text-center p-2"
      >
          {title}
        </th>
    </tr>
  );
}
