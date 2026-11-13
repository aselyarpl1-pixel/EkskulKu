import Link from "next/link";
import { JAM_SESI } from "@/data/ekskul";

type Props = {
  ekskul: {
    id: number;
    nama: string;
    kategori: string;
    hari: string;
    sesi: number;
    pembina: string;
    kuota: number;
  };
  jumlahPendaftar: number;
};

export default function KartuEkskul({ ekskul, jumlahPendaftar }: Props) {
  const sisaTempat = Math.max(0, ekskul.kuota - jumlahPendaftar);
  const penuh = sisaTempat === 0;
  const persentase =
    ekskul.kuota > 0
      ? Math.min(100, (jumlahPendaftar / ekskul.kuota) * 100)
      : 100;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700">
          {ekskul.kategori}
        </span>

        <span
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${
            penuh ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {penuh ? "Penuh" : "Tersedia"}
        </span>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 transition group-hover:text-blue-600 sm:text-2xl">
          {ekskul.nama}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Kegiatan ekstrakurikuler {ekskul.kategori.toLowerCase()}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <span aria-hidden="true">◷</span>
          </span>
          <div>
            <p className="text-xs text-slate-500">Jadwal</p>
            <p className="text-sm font-semibold text-slate-800">
              {ekskul.hari}, Sesi {ekskul.sesi}
            </p>
            <p className="text-xs text-slate-500">{JAM_SESI[ekskul.sesi]}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <span aria-hidden="true">♙</span>
          </span>
          <div>
            <p className="text-xs text-slate-500">Pembina</p>
            <p className="text-sm font-semibold text-slate-800">
              {ekskul.pembina}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <span aria-hidden="true">♧</span>
          </span>
          <div>
            <p className="text-xs text-slate-500">Jumlah pendaftar</p>
            <p className="text-sm font-semibold text-slate-800">
              {jumlahPendaftar} orang
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className={`text-sm font-bold ${
              penuh ? "text-red-600" : "text-emerald-700"
            }`}
          >
            {penuh ? "Kuota sudah penuh" : `${sisaTempat} tempat tersisa`}
          </span>

          <span className="text-xs font-medium text-slate-500">
            {jumlahPendaftar}/{ekskul.kuota}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all ${
              penuh ? "bg-red-500" : "bg-emerald-500"
            }`}
            style={{ width: `${persentase}%` }}
          />
        </div>

        <Link
          href={`/ekskul/${ekskul.id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Lihat Detail
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
