import Link from "next/link";
import { ambilSemuaEkskul } from "@/data/ambil";
import {
  pendaftar,
  DAFTAR_KATEGORI,
  DAFTAR_HARI,
  type Kategori,
} from "@/data/ekskul";

import KartuEkskul from "@/components/KartuEkskul";

type SearchParams = {
  kategori?: string | string[];
  hari?: string | string[];
};

type Props = {
  searchParams: Promise<SearchParams>;
};

function ambilNilai(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DaftarEkskul({ searchParams }: Props) {
  const params = await searchParams;

  const kategoriParam = ambilNilai(params.kategori);
  const hariParam = ambilNilai(params.hari);

  const kategori: string = DAFTAR_KATEGORI.includes(kategoriParam as Kategori)
    ? kategoriParam!
    : "";

  const hari: string = DAFTAR_HARI.includes(hariParam ?? "") ? hariParam! : "";

  const semuaEkskul = await ambilSemuaEkskul();

  const hasil = semuaEkskul.filter((item) => {
    const cocokKategori = !kategori || item.kategori === kategori;
    const cocokHari = !hari || item.hari === hari;

    return cocokKategori && cocokHari;
  });

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 lg:px-10">
      <section className="mb-9">
        <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
          KEGIATAN SEKOLAH
        </span>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Daftar Ekstrakurikuler
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Temukan kegiatan ekstrakurikuler yang sesuai dengan minat dan bakatmu.
          Kembangkan kemampuan, pengalaman, dan kreativitas bersama teman-teman.
        </p>
      </section>

      <form
        action="/ekskul"
        method="GET"
        className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end"
      >
        <div>
          <label
            htmlFor="kategori"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Kategori
          </label>

          <select
            id="kategori"
            name="kategori"
            defaultValue={kategori}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Semua kategori</option>
            {DAFTAR_KATEGORI.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="hari"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Hari
          </label>

          <select
            id="hari"
            name="hari"
            defaultValue={hari}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Semua hari</option>
            {DAFTAR_HARI.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Terapkan Filter
        </button>

        <Link
          href="/ekskul"
          className="rounded-xl border border-slate-200 px-6 py-3 text-center text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Reset
        </Link>
      </form>

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Pilihan Ekskul</h2>
          <p className="mt-1 text-sm text-slate-500">
            {hasil.length} ekstrakurikuler ditemukan
          </p>
        </div>
      </div>

      {hasil.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((item) => {
            const jumlahPendaftar = pendaftar.filter(
              (p) => p.ekskulId === item.id,
            ).length;

            return (
              <KartuEkskul
                key={item.id}
                ekskul={item}
                jumlahPendaftar={jumlahPendaftar}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-bold text-slate-800">
            Tidak ada ekskul yang cocok
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Coba ubah kategori atau hari yang kamu pilih.
          </p>

          <Link
            href="/ekskul"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Reset Filter
          </Link>
        </div>
      )}
    </main>
  );
}
