"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  const menu = [
    { nama: "Beranda", href: "/" },
    { nama: "Daftar Ekskul", href: "/ekskul" },
  ];

  function menuAktif(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuTerbuka(false)}
          className="flex items-center gap-3"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-extrabold text-white shadow-md shadow-blue-200">
            E
          </div>

          <div>
            <p className="text-xl font-extrabold tracking-tight text-slate-900">
              Ekskul<span className="text-blue-600">Ku</span>
            </p>
            <p className="text-[10px] font-medium tracking-wider text-slate-500">
              EKSTRAKURIKULER SEKOLAH
            </p>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {menu.map((item) => {
            const aktif = menuAktif(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  aktif
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {item.nama}
              </Link>
            );
          })}
        </div>

        {/* Tombol Menu Mobile */}
        <button
          type="button"
          onClick={() => setMenuTerbuka(!menuTerbuka)}
          aria-label={menuTerbuka ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuTerbuka}
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          {menuTerbuka ? (
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Menu Mobile */}
      {menuTerbuka && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {menu.map((item) => {
              const aktif = menuAktif(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuTerbuka(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    aktif
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.nama}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
