import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { request } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { guru, hari, mapel, kelas } = body;

  if (!guru || !hari || !mapel || !kelas) {
    return NextResponse.json(
      
      { message: "Nama kelas dan ruangan tidak boleh kosong" },
      { status: 400 }
    );
  }

  try {
    await db.insert(request).values({
      guru,  
      hari,
      mapel,
      kelas,
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

// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json(); // Ambil ID dari body request

//     // Hapus data dari database
//     await db.delete(kelas).where(kelas.id_kelas.eq(id));

//     return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
//   } catch (error) {
//     console.error('Error deleting data:', error);
//     return NextResponse.json({ success: false, message: 'Gagal menghapus data' }, { status: 500 });
//   }
// }