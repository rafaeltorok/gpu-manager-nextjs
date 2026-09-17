interface DataProps {
  value: string;
  gpuClass: string;
}

export default function Data({ value, gpuClass }: DataProps) {
  return <div className={`${gpuClass} w-1/4 p-2`}>{value}</div>;
}
