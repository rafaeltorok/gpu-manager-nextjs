import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import "./globals.css";

// Custom font
import localFont from "next/font/local";

const customFont = localFont({
  src: "./fonts/naked-power.bold.otf",
});

export const metadata: Metadata = {
  title: "GPUs Manager",
  description: "Add your favorite cards and calculate their theoretical performance",
};

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
