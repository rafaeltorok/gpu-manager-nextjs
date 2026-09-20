import NavBar from "@/components/NavBar";
import "./globals.css";

// Custom font
import localFont from "next/font/local";

const customFont = localFont({
  src: "./fonts/naked-power.bold.otf",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${customFont.className} min-w-[300px] flex flex-col min-h-screen`}>
        <NavBar />
        <main className="flex flex-col flex-1">{children}</main>
      </body>
    </html>
  );
}
