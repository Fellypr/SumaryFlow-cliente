"use client";

import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MessageLogout from"@/app/components/message/messageLogout";
import { useState, useEffect } from "react";
export default function Navbar() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  useEffect(() => {
    if (!isLogoutOpen) return;

    const originalOverflowX = document.body.style.overflowX;
    const originalOverflowY = document.body.style.overflowY;

    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowX = originalOverflowX;
      document.body.style.overflowY = originalOverflowY;
    };
  }, [isLogoutOpen]);

  return (
    <>
    <nav className="w-full bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 text-white">
        <div className="flex items-center gap-2">
          <Image
            src="/img/logo/logopequeno.png"
            alt="logo"
            width={150}
            height={150}
            className="h-10 w-auto object-contain sm:h-12"
          />
          <p className="bg-linear-to-r from-sky-500 to-emerald-400 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Summy
            <span className="bg-linear-to-r from-sky-500 to-emerald-400 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
              Flow
            </span>
          </p>
        </div>

        <ul className="flex items-center gap-3 sm:gap-5  w-[300px] relative right-[-100px]">
          <li>
            <Link
              href="https://github.com/Fellypr"
              target="_blank"
              aria-label="Github"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:border-white hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white/80 transition group-hover:text-white"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48
                  0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63
                  1 .07 1.53 1.06 1.53 1.06.9 1.57 2.37 1.12 2.95.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5
                  0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.03A9.18 9.18 0 0 1 12 6.34
                  c.85 0 1.71.12 2.51.35 1.9-1.3 2.74-1.03 2.74-1.03.55 1.4.2 2.44.1 2.7.64.71 1.02 1.61 1.02 2.72
                  0 3.87-2.34 4.73-4.57 4.98.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/fellype-kenned-05bb94319"
              aria-label="LinkedIn"
              target="_blank"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:border-sky-400 hover:bg-sky-500/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white/80 transition group-hover:text-white"
              >
                <path
                  fill="currentColor"
                  d="M6.09 6.5a2.09 2.09 0 1 1 0-4.18 2.09 2.09 0 0 1 0 4.18ZM4.25 8h3.7V21H4.25V8Zm6.18 0h3.55v1.78h.05c.5-.95 1.7-1.96 3.5-1.96 3.75 0 4.44 2.47 4.44 5.68V21h-3.7v-6.13c0-1.46-.03-3.34-2.04-3.34-2.05 0-2.36 1.6-2.36 3.23V21h-3.7V8Z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <button className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:border-white hover:bg-white/10  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70  hover:text-red-500 cursor-pointer relative left-15"
            onClick={() => setIsLogoutOpen(true)}
            >
              <LogOutIcon className="w-5 h-5 text-white/80 transition group-hover:text-white" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
    {isLogoutOpen && (
        <div className="flex justify-center items-center fixed inset-0 w-full h-full bg-black/70 z-20">
          <MessageLogout onCancel={() => setIsLogoutOpen(false)} />
        </div>
    )}
    </>
  );
}