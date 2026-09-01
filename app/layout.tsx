import NavBar from "@/components/NavBar";
import localFont from "next/font/local";

import "./globals.css";

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
      <body className={`${customFont.className} min-w-[300px]`}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
