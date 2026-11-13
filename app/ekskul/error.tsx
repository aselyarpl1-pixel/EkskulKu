"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">Terjadi Kesalahan</h2>

      <p className="mt-2 text-gray-600">
        {error.message || "Gagal memuat daftar ekskul."}
      </p>

      <button
        onClick={() => reset()}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Coba lagi
      </button>
    </div>
  );
}
