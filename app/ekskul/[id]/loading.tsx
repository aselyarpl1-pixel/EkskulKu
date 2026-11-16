export default function LoadingDetailEkskul() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8 animate-pulse">
      {/* Tombol kembali */}
      <div className="mb-7 h-10 w-64 rounded-xl bg-slate-200" />

      {/* Kerangka Informasi Ekskul */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 bg-linear-to-r from-blue-50 via-white to-indigo-50 px-6 py-8 sm:px-9">
          <div className="h-7 w-24 rounded-full bg-blue-100" />

          <div className="mt-4 h-10 w-2/3 rounded-lg bg-slate-200 sm:w-1/2" />

          <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-200" />
          <div className="mt-2 h-4 w-4/5 max-w-md rounded bg-slate-200" />
        </div>

        {/* Detail Informasi */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-9">
          {/* Kategori */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-32 rounded bg-slate-300" />
          </div>

          {/* Hari */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="h-3 w-28 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-24 rounded bg-slate-300" />
          </div>

          {/* Sesi */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-28 rounded bg-slate-300" />
            <div className="mt-2 h-4 w-32 rounded bg-slate-200" />
          </div>

          {/* Pembina */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-36 rounded bg-slate-300" />
          </div>

          {/* Kapasitas */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:col-span-2">
            <div className="h-3 w-32 rounded bg-blue-200" />
            <div className="mt-3 h-8 w-28 rounded bg-blue-200" />
            <div className="mt-2 h-4 w-64 max-w-full rounded bg-blue-100" />
          </div>
        </div>
      </section>

      {/* Kerangka Formulir Pendaftaran */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-7 w-56 rounded bg-slate-200" />

        <div className="mt-6 space-y-5">
          <div>
            <div className="mb-2 h-4 w-24 rounded bg-slate-200" />
            <div className="h-11 w-full rounded-xl bg-slate-100" />
          </div>

          <div>
            <div className="mb-2 h-4 w-20 rounded bg-slate-200" />
            <div className="h-11 w-full rounded-xl bg-slate-100" />
          </div>

          <div className="h-11 w-full rounded-xl bg-blue-200" />
        </div>
      </section>

      {/* Kerangka Daftar Anggota */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-7 w-48 rounded bg-slate-200" />

        <div className="mt-5 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"
            >
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="flex-1">
                <div className="h-4 w-36 max-w-full rounded bg-slate-200" />
                <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
