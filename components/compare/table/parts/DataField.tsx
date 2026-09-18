interface DataFieldProps {
  value: string;
  gpuClass: string;
}

export default function Data({ value, gpuClass }: DataFieldProps) {
  return <div className={`${gpuClass} w-1/4 p-2`}>{value}</div>;
}
