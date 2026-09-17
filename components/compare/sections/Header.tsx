interface HeaderProps {
  header: string;
}

export default function Header({ header }: HeaderProps) {
  return <div className="w-1/4 p-2 bg-[#252525]/50">{header}</div>;
}
