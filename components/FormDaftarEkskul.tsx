import { cookies } from "next/headers";
import FormDaftarEkskulClient from "@/components/FormDaftarEkskulClient";

type Props = {
  ekskulId: number;
};

export default async function FormDaftarEkskul({ ekskulId }: Props) {
  const cookieStore = await cookies();

  const nama = cookieStore.get("nama")?.value ?? "";
  const kelas = cookieStore.get("kelas")?.value ?? "";

  return (
    <FormDaftarEkskulClient
      ekskulId={ekskulId}
      namaAwal={nama}
      kelasAwal={kelas}
    />
  );
}
