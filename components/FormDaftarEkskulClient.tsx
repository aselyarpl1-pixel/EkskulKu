"use client";

import { useActionState, useState } from "react";
import { daftarEkskul, type StateDaftar } from "@/app/ekskul/[id]/actions";

type Props = {
  ekskulId: number;
  namaAwal: string;
  kelasAwal: string;
};

const stateAwal: StateDaftar = {
  berhasil: false,
  pesan: "",
  galat: {},
  isian: {
    nama: "",
    kelas: "",
  },
};

export default function FormDaftarEkskulClient({
  ekskulId,
  namaAwal,
  kelasAwal,
}: Props) {
  const [state, formAction, pending] = useActionState(daftarEkskul, stateAwal);

  const [nama, setNama] = useState(namaAwal);
  const [kelas, setKelas] = useState(kelasAwal);

  const handleSubmit = () => {
    // Data input tetap dikelola oleh state masing-masing.
  };

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-gray-900">Daftar Ekskul Ini</h2>

      <p className="mt-1 text-sm text-gray-500">
        Isi data dirimu untuk mendaftar ekstrakurikuler.
      </p>

      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <input type="hidden" name="ekskulId" value={ekskulId} />

        <div>
          <label htmlFor="nama" className="mb-2 block text-sm font-semibold">
            Nama Lengkap
          </label>

          <input
            id="nama"
            name="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama lengkap"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            disabled={pending}
          />

          {state.galat.nama && (
            <p className="mt-2 text-sm text-red-600">{state.galat.nama}</p>
          )}
        </div>

        <div>
          <label htmlFor="kelas" className="mb-2 block text-sm font-semibold">
            Kelas
          </label>

          <input
            id="kelas"
            name="kelas"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            placeholder="Contoh: XII RPL 1"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            disabled={pending}
          />

          {state.galat.kelas && (
            <p className="mt-2 text-sm text-red-600">{state.galat.kelas}</p>
          )}
        </div>

        {state.pesan && (
          <div
            className={`rounded-xl p-4 text-sm ${
              state.berhasil
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {state.pesan}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Memproses..." : "Daftar Sekarang"}
        </button>
      </form>
    </section>
  );
}
