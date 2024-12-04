import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { guru } from "@/lib/db/schema";

export async function POST(req: Request) {
  const body = await req.json();
  const { nama_guru, email, pendidikan } = body;

  if (!nama_guru || !email || !pendidikan) {
    return NextResponse.json(
      { message: "Nama kelas dan ruangan tidak boleh kosong" },
      { status: 400 }
    );
  }

  try {
    await db.insert(guru).values({
      nama_guru,
      email,
      pendidikan,
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

