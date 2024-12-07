import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { mapel } from "@/lib/db/schema";

export async function POST(req: Request) {
  const body = await req.json();
  const { nama_mapel, kode_mapel } = body;

  if (!nama_mapel || !kode_mapel) {
    return NextResponse.json(
      { message: "Nama kelas dan ruangan tidak boleh kosong" },
      { status: 400 }
    );
  }

  try {
    await db.insert(mapel).values({
      nama_mapel,
      kode_mapel
    });
    return NextResponse.json({ message: "Kelas berhasil ditambahkan!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menambahkan kelas" },
      { status: 500 }
    );
  }
}

