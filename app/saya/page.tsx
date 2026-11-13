import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ekskul, JAM_SESI } from "@/data/ekskul";
import { batalkanEkskul } from "@/app/ekskul/[id]/actions";

export const metadata: Metadata = {
  title: "Ekskul Saya",
};

export const instant = false;

type EkskulTerdaftar = {
  ekskulId: number;
  nomor: number;
};

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function SayaPage({ searchParams }: Props) {
  const cookieStore = await cookies();
  const params = await searchParams;

  const nama = cookieStore.get("nama")?.value ?? "";
  const kelas = cookieStore.get("kelas")?.value ?? "";

  let daftarSaya: EkskulTerdaftar[] = [];

  try {
    const dataCookie = cookieStore.get("ekskulSaya")?.value;
    const parsed = dataCookie ? JSON.parse(dataCookie) : [];

    if (Array.isArray(parsed)) {
      daftarSaya = parsed.filter(
        (item): item is EkskulTerdaftar =>
          Number.isInteger(item?.ekskulId) && Number.isInteger(item?.nomor),
      );
    }
  } catch {
    daftarSaya = [];
  }

  const ekskulSaya = daftarSaya
    .map((item) => ({
      pendaftaran: item,
      data: ekskul.find((e) => e.id === item.ekskulId),
    }))
    .filter(
      (
        item,
      ): item is {
        pendaftaran: EkskulTerdaftar;
        data: (typeof ekskul)[number];
      } => Boolean(item.data),
    );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-10 sm:px-8 lg:px-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-bold tracking-wider text-blue-600 uppercase">
          Area Anggota
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Ekskul Saya
        </h1>

        <p className="mt-2 text-slate-600">
          Lihat dan kelola daftar ekstrakurikuler yang sudah kamu ikuti.
        </p>

        {nama && kelas && (
          <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm">
            <span className="font-semibold text-slate-600">Nama:</span>
            <span className="font-bold text-blue-700">{nama}</span>

            <span className="mx-1 text-slate-300">|</span>

            <span className="font-semibold text-slate-600">Kelas:</span>
            <span className="font-bold text-blue-700">{kelas}</span>
          </div>
        )}
      </div>

      {/* Pesan pembatalan */}
      {params.status === "dibatalkan" && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          Pendaftaran berhasil dibatalkan. Daftar ekskul dan kuota telah
          diperbarui.
        </div>
      )}

      {params.status === "gagal" && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          Pembatalan gagal. Data pendaftaran tidak ditemukan atau bukan milikmu.
        </div>
      )}

      {/* Belum memiliki cookie identitas */}
      {!nama || !kelas ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            📚
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Kamu Belum Mendaftar Apa Pun
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Silakan pilih ekstrakurikuler yang ingin kamu ikuti.
          </p>

          <Link
            href="/ekskul"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Lihat Daftar Ekskul →
          </Link>
        </div>
      ) : ekskulSaya.length > 0 ? (
        <>
          {/* Ringkasan */}
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Ekstrakurikuler yang Diikuti
            </h2>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              {ekskulSaya.length} Ekskul
            </span>
          </div>

          {/* Kartu Ekskul */}
          <div className="grid gap-5 md:grid-cols-2">
            {ekskulSaya.map(({ pendaftaran, data }) => (
              <div
                key={pendaftaran.nomor}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {data.kategori}
                    </span>

                    <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                      {data.nama}
                    </h3>
                  </div>

                  <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                    Terdaftar
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Hari</span>
                    <span className="font-semibold text-slate-800">
                      {data.hari}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Waktu</span>
                    <span className="font-semibold text-slate-800">
                      {JAM_SESI[data.sesi]}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Pembina</span>
                    <span className="font-semibold text-slate-800">
                      {data.pembina}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Nomor Pendaftaran</span>
                    <span className="font-bold text-blue-700">
                      #{pendaftaran.nomor}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/ekskul/${data.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-blue-200 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Lihat Detail Ekskul →
                </Link>

                {/* Tombol Batalkan */}
                <form action={batalkanEkskul} className="mt-3">
                  <input type="hidden" name="ekskulId" value={data.id} />

                  <input type="hidden" name="nomor" value={pendaftaran.nomor} />

                  <button
                    type="submit"
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    Batalkan Pendaftaran
                  </button>
                </form>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Cookie ada, tetapi belum ada pendaftaran */
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            📚
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Belum Ada Ekskul yang Diikuti
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Saat ini kamu belum memiliki pendaftaran ekstrakurikuler. Yuk,
            temukan kegiatan yang sesuai dengan minat dan bakatmu!
          </p>

          <Link
            href="/ekskul"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Lihat Daftar Ekskul →
          </Link>
        </div>
      )}
    </main>
  );
}
