interface ComponentProps {
  title: string;
}

export default function GpuTableDivision({ title }: ComponentProps) {
  return (
    <div className="bg-[#161616] font-bold text-xl text-center p-2 w-full">
      {title}
    </div>
  );
}
