import Link from "next/link";
import "./layout.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/gpus">GPUs</Link>
          {" | "}
          <Link href="/gpus/add">Add new</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
