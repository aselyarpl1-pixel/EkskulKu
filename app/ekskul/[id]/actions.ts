"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ekskul, pendaftar, tambahPendaftar, JAM_SESI } from "@/data/ekskul";

export type StateDaftar = {
  berhasil: boolean;
  pesan: string;
  galat: {
    nama?: string;
    kelas?: string;
  };
  isian: {
    nama: string;
    kelas: string;
  };
};

type EkskulTerdaftar = {
  ekskulId: number;
  nomor: number;
};

const MAKSIMAL_EKSKUL = 2;

const normalisasi = (teks: string) => teks.trim().toLowerCase();

// ==========================================
// SERVER ACTION PENDAFTARAN EKSKUL
// ==========================================

export async function daftarEkskul(
  _sebelum: StateDaftar,
  formData: FormData,
): Promise<StateDaftar> {
  const nama = String(formData.get("nama") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const ekskulId = Number(formData.get("ekskulId"));

  const hasilGagal = (
    pesan: string,
    galat: StateDaftar["galat"] = {},
  ): StateDaftar => ({
    berhasil: false,
    pesan,
    galat,
    isian: { nama, kelas },
  });

  const target = ekskul.find((e) => e.id === ekskulId);

  if (!Number.isInteger(ekskulId) || !target) {
    return hasilGagal("Ekstrakurikuler tidak ditemukan.");
  }

  // Validasi nama dan kelas
  const galat: StateDaftar["galat"] = {};

  if (nama.length < 3) {
    galat.nama = "Nama minimal 3 huruf.";
  }

  if (kelas.length < 3) {
    galat.kelas = "Kelas minimal 3 karakter.";
  }

  if (galat.nama || galat.kelas) {
    return hasilGagal("", galat);
  }

  const namaSama = (p: (typeof pendaftar)[number]) =>
    normalisasi(p.nama) === normalisasi(nama) &&
    normalisasi(p.kelas) === normalisasi(kelas);

  const cookieStore = await cookies();

  // Membaca daftar ekskul dari cookie
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

  // Menyimpan cookie identitas dan pendaftaran
  const simpanCookie = (nomor: number) => {
    if (!daftarSaya.some((item) => item.ekskulId === ekskulId)) {
      daftarSaya.push({ ekskulId, nomor });
    }

    cookieStore.set("nama", nama, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });

    cookieStore.set("kelas", kelas, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });

    cookieStore.set("ekskulSaya", JSON.stringify(daftarSaya), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  };

  // Memeriksa apakah sudah terdaftar di ekskul yang sama
  const pendaftaranLama = pendaftar.find(
    (p) => p.ekskulId === ekskulId && namaSama(p),
  );

  if (pendaftaranLama) {
    simpanCookie(pendaftaranLama.nomor);

    revalidatePath("/saya");

    return {
      berhasil: true,
      pesan: `Kamu sudah terdaftar di ${target.nama}. Data pendaftaran berhasil ditampilkan.`,
      galat: {},
      isian: { nama, kelas },
    };
  }

  // ==========================================
  // BATAS MAKSIMAL 2 EKSKUL PER MURID
  // ==========================================

  const ekskulDiikuti = new Set(
    pendaftar.filter(namaSama).map((p) => p.ekskulId),
  );

  if (ekskulDiikuti.size >= MAKSIMAL_EKSKUL) {
    return hasilGagal(
      `Kamu sudah mengikuti ${MAKSIMAL_EKSKUL} ekstrakurikuler. Maksimal pendaftaran hanya ${MAKSIMAL_EKSKUL} ekskul. Batalkan salah satu ekskul jika ingin mendaftar yang lain.`,
    );
  }

  // Memeriksa kuota
  const jumlahAnggota = pendaftar.filter((p) => p.ekskulId === ekskulId).length;

  if (jumlahAnggota >= target.kuota) {
    return hasilGagal("Kuota ekskul sudah penuh.");
  }

  // Memeriksa jadwal bentrok
  const bentrok = pendaftar.some((p) => {
    if (!namaSama(p) || p.ekskulId === ekskulId) {
      return false;
    }

    const ekskulLain = ekskul.find((e) => e.id === p.ekskulId);

    return ekskulLain?.hari === target.hari && ekskulLain?.sesi === target.sesi;
  });

  if (bentrok) {
    return hasilGagal(
      "Jadwal ekskul bentrok dengan ekskul lain yang sudah diikuti.",
    );
  }

  // Menambahkan pendaftar baru
  const nomor = tambahPendaftar({
    ekskulId,
    nama,
    kelas,
  });

  simpanCookie(nomor);

  // Memperbarui halaman
  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${ekskulId}`);
  revalidatePath("/saya");

  return {
    berhasil: true,
    pesan: `Pendaftaran #${nomor} berhasil: ${target.nama}, ${target.hari}, sesi ${target.sesi} (${JAM_SESI[target.sesi]}).`,
    galat: {},
    isian: { nama, kelas },
  };
}

// ==========================================
// SERVER ACTION PEMBATALAN EKSKUL
// ==========================================

export async function batalkanEkskul(formData: FormData) {
  const ekskulId = Number(formData.get("ekskulId"));
  const nomor = Number(formData.get("nomor"));

  const cookieStore = await cookies();

  // Mengambil identitas siswa dari cookie
  const nama = cookieStore.get("nama")?.value ?? "";
  const kelas = cookieStore.get("kelas")?.value ?? "";

  // Validasi data awal
  if (
    !nama ||
    !kelas ||
    !Number.isInteger(ekskulId) ||
    !Number.isInteger(nomor) ||
    ekskulId <= 0 ||
    nomor <= 0
  ) {
    redirect("/saya?status=gagal");
  }

  // Memastikan ekskul tersedia
  const target = ekskul.find((e) => e.id === ekskulId);

  if (!target) {
    redirect("/saya?status=gagal");
  }

  // Membaca daftar ekskul milik siswa
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
    redirect("/saya?status=gagal");
  }

  // Memeriksa apakah pendaftaran ada di cookie
  const terdaftarDiCookie = daftarSaya.some(
    (item) => item.ekskulId === ekskulId && item.nomor === nomor,
  );

  if (!terdaftarDiCookie) {
    redirect("/saya?status=gagal");
  }

  // Memeriksa ulang kepemilikan pendaftaran
  const indexPendaftar = pendaftar.findIndex(
    (item) =>
      item.ekskulId === ekskulId &&
      item.nomor === nomor &&
      normalisasi(item.nama) === normalisasi(nama) &&
      normalisasi(item.kelas) === normalisasi(kelas),
  );

  if (indexPendaftar === -1) {
    redirect("/saya?status=gagal");
  }

  // Menghapus data pendaftar
  pendaftar.splice(indexPendaftar, 1);

  // Menghapus ekskul dari cookie
  const daftarBaru = daftarSaya.filter(
    (item) => !(item.ekskulId === ekskulId && item.nomor === nomor),
  );

  cookieStore.set("ekskulSaya", JSON.stringify(daftarBaru), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  // Memperbarui halaman dan kuota ekskul
  revalidatePath("/saya");
  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${ekskulId}`);

  // Kembali ke halaman Ekskul Saya
  redirect("/saya?status=dibatalkan");
}
