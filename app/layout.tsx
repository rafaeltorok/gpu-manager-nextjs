import NavBar from "@/components/NavBar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-w-[300px]">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
