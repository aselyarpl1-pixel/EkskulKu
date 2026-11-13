import { cookies } from "next/headers";
import { ambilAnggota } from "@/data/ambil";

type Props = {
  ekskulId: number;
  kuota: number;
};

export default async function DaftarAnggota({ ekskulId, kuota }: Props) {
  // Mengambil data anggota
  const anggota = await ambilAnggota(ekskulId);

  // Mengambil nama dari cookie
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value;

  const sisaTempat = Math.max(0, kuota - anggota.length);
  const penuh = sisaTempat === 0;

  return (
    <>
      {/* Informasi kapasitas */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Jumlah Pendaftar</p>
          <p className="mt-1 font-semibold text-gray-900">
            {anggota.length} orang
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Sisa Tempat</p>
          <p
            className={`mt-1 font-semibold ${
              penuh ? "text-red-600" : "text-green-700"
            }`}
          >
            {penuh ? "Penuh" : `${sisaTempat} dari ${kuota} tempat`}
          </p>
        </div>
      </div>

      {/* Daftar anggota */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">Anggota Terdaftar</h2>

        <p className="mt-1 text-sm text-gray-500">
          {anggota.length} dari {kuota} tempat terisi.
        </p>

        {anggota.length > 0 ? (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600">
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Kelas</th>
                </tr>
              </thead>

              <tbody>
                {anggota.map((item) => {
                  const adalahKamu =
                    namaCookie?.trim().toLowerCase() ===
                    item.nama.trim().toLowerCase();

                  return (
                    <tr key={item.nomor} className="border-b last:border-0">
                      <td className="px-4 py-3">{item.nomor}</td>

                      <td className="px-4 py-3 font-medium text-gray-900">
                        <div className="flex flex-wrap items-center gap-2">
                          {item.nama}

                          {adalahKamu && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                              Kamu
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-600">{item.kelas}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-5 rounded-lg bg-gray-50 p-5 text-center text-gray-500">
            Belum ada anggota.
          </p>
        )}
      </section>
    </>
  );
}
