import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden bg-slate-50">
      <section className="relative min-h-[calc(100vh-80px)]">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 md:grid-cols-2 md:py-12 lg:px-10 lg:py-12">
          {/* BAGIAN KIRI */}
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <span className="size-2 rounded-full bg-blue-600" />
              Platform Ekstrakurikuler Sekolah
            </div>

            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Kembangkan
              <span className="block">Bakat,</span>
              <span className="block text-blue-600">Raih Prestasi!</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Temukan kegiatan ekstrakurikuler yang sesuai dengan minat dan
              bakatmu. Mulai pengalaman baru, kembangkan kemampuan, dan ciptakan
              prestasi bersama EkskulKu.
            </p>

            {/* Tombol */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/ekskul"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                Lihat Daftar Ekskul
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/saya"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Pendaftaran Saya
              </Link>
            </div>
          </div>

          {/* BAGIAN KANAN */}
          <div className="relative mx-auto w-full max-w-lg">
            {/* Dekorasi Background */}
            <div className="absolute -left-5 top-8 size-24 rounded-full bg-blue-200/50 blur-2xl" />
            <div className="absolute -right-5 bottom-8 size-32 rounded-full bg-indigo-200/60 blur-2xl" />

            {/* Kartu Utama */}
            <div className="relative overflow-hidden rounded-4xl border border-white bg-white p-6 shadow-2xl shadow-blue-100 sm:p-9">
              {/* Header Kartu */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Selamat Datang di
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                    Ekskul<span className="text-blue-600">Ku</span>
                  </h2>
                </div>

                <div className="flex size-13 items-center justify-center rounded-2xl bg-blue-600 text-xl font-extrabold text-white shadow-sm">
                  E
                </div>
              </div>

              {/* Keunggulan Ekskul */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {/* Kreativitas */}
                <div className="rounded-2xl bg-blue-50 p-5">
                  <div className="text-3xl">🎨</div>

                  <p className="mt-4 font-bold text-slate-800">Kreativitas</p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Ekspresikan ide dan bakatmu.
                  </p>
                </div>

                {/* Prestasi */}
                <div className="rounded-2xl bg-indigo-50 p-5">
                  <div className="text-3xl">🏆</div>

                  <p className="mt-4 font-bold text-slate-800">Prestasi</p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Raih pencapaian terbaikmu.
                  </p>
                </div>

                {/* Kebersamaan */}
                <div className="rounded-2xl bg-sky-50 p-5">
                  <div className="text-3xl">🤝</div>

                  <p className="mt-4 font-bold text-slate-800">Kebersamaan</p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Belajar dan berkembang bersama.
                  </p>
                </div>

                {/* Pengembangan Diri */}
                <div className="rounded-2xl bg-violet-50 p-5">
                  <div className="text-3xl">🚀</div>

                  <p className="mt-4 font-bold text-slate-800">
                    Pengembangan Diri
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Bangun kemampuan dan percaya diri.
                  </p>
                </div>
              </div>

              {/* Banner Bawah */}
              <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-sm font-semibold text-blue-300">
                  Waktunya Berkembang!
                </p>

                <p className="mt-1 text-lg font-bold">
                  Temukan potensi terbaikmu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
