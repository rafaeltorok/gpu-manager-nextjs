"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <div>
      <nav className="bg-black/50 text-white px-6 py-3 flex items-center gap-4 overflow-auto">
        <section className="MOBILE-MENU flex lg:hidden w-full">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-gray-500"></span>
            <span className="block h-0.5 w-8 bg-gray-500"></span>
            <span className="block h-0.5 w-8 bg-gray-500"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <div
              className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]"
              onClick={() => setIsNavOpen(false)}
            >
              <Link href="/">Home</Link>
              <Link href="/gpus">GPUs</Link>
              <Link href="/gpus/compare">Compare</Link>
              <Link href="/gpus/add">Add new</Link>
            </div>
          </div>
        </section>

        <div className="DESKTOP-MENU hidden lg:flex items-center w-full">
          <div className="space-x-8">
            <Link href="/">Home</Link>
            <Link href="/gpus">GPUs</Link>
            <Link href="/gpus/compare">Compare</Link>
            <Link href="/gpus/add">Add new</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
