import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { jadwal } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { hari, jumlah_sesi, jam } = body;

  if (!hari || !jumlah_sesi || !jam) {
    return NextResponse.json(
      { message: "Nama kelas dan ruangan tidak boleh kosong" },
      { status: 400 }
    );
  }

  try {
    await db.insert(jadwal).values({
      hari,
      jumlah_sesi,
      jam,
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
 
// export const DELETE = async (req: NextRequesst) => {
//   const url = new URL(req.url).searchParams
//   const id = Number(url.get('id')) || 0

//   const post di= await db.delete(jadwal).where(eq(jadwal.id_jadwal, id));
//   if (!post) {
//     return NextResponse.json({post})
// }
    