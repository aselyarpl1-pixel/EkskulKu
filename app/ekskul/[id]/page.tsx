import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { ambilEkskul } from "@/data/ambil";
import { JAM_SESI } from "@/data/ekskul";

import FormDaftarEkskul from "@/components/FormDaftarEkskul";
import DaftarAnggota from "@/components/DaftarAnggota";

export const instant = false;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Mengatur judul tab berdasarkan nama ekskul
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const nomorId = Number(id);

  const ekskul =
    Number.isInteger(nomorId) && nomorId > 0
      ? await ambilEkskul(nomorId)
      : undefined;

  return {
    title: ekskul?.nama ?? "Ekskul tidak ditemukan",
  };
}

// Halaman detail ekskul
export default async function DetailEkskul({ params }: Props) {
  const { id } = await params;
  const nomorId = Number(id);

  // Validasi ID
  if (!Number.isInteger(nomorId) || nomorId < 1) {
    notFound();
  }

  // Mengambil data ekskul
  const ekskul = await ambilEkskul(nomorId);

  if (!ekskul) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8">
      {/* Tombol kembali */}
      <Link
        href="/ekskul"
        className="mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      >
        <span aria-hidden="true">←</span>
        Kembali ke Daftar Ekskul
      </Link>

      {/* Informasi Ekskul */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-linear-to-r from-blue-50 via-white to-indigo-50 px-6 py-8 sm:px-9">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700">
            {ekskul.kategori}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {ekskul.nama}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Kenali informasi kegiatan, jadwal latihan, pembina, dan kesempatan
            bergabung dengan ekstrakurikuler ini.
          </p>
        </div>

        {/* Detail Informasi */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-9">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Kategori
            </p>
            <p className="mt-2 text-base font-bold text-slate-800">
              {ekskul.kategori}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Hari kegiatan
            </p>
            <p className="mt-2 text-base font-bold text-slate-800">
              {ekskul.hari}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Jadwal sesi
            </p>
            <p className="mt-2 text-base font-bold text-slate-800">
              Sesi {ekskul.sesi}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {JAM_SESI[ekskul.sesi]}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Pembina
            </p>
            <p className="mt-2 text-base font-bold text-slate-800">
              {ekskul.pembina}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Kapasitas anggota
            </p>
            <p className="mt-2 text-2xl font-extrabold text-blue-700">
              {ekskul.kuota} orang
            </p>
            <p className="mt-1 text-sm text-blue-600">
              Kuota maksimal peserta ekstrakurikuler ini.
            </p>
          </div>
        </div>
      </section>

      {/* Formulir Pendaftaran */}
      <div className="mt-8">
        <Suspense
          fallback={
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-center text-sm text-slate-500">
                Memuat formulir pendaftaran...
              </p>
            </section>
          }
        >
          <FormDaftarEkskul ekskulId={nomorId} />
        </Suspense>
      </div>

      {/* Daftar Anggota */}
      <div className="mt-8">
        <Suspense
          fallback={
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Anggota Terdaftar
              </h2>

              <p className="mt-5 rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                Memuat anggota...
              </p>
            </section>
          }
        >
          <DaftarAnggota ekskulId={nomorId} kuota={ekskul.kuota} />
        </Suspense>
      </div>
    </main>
  );
}
