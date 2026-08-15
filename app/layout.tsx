import Link from "next/link";
import "./styles/layout.css";

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
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
