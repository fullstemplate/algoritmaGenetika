import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { kelas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nama_kelas, ruangan } = body;

  if (!nama_kelas || !ruangan) {
    return NextResponse.json(
      { message: "Nama kelas dan ruangan tidak boleh kosong" },
      { status: 400 }
    );
  }

  try {
    await db.insert(kelas).values({
      nama_kelas,
      ruangan,
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

// export async function DELETE(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');

//   if (!id) {
//     return NextResponse.json({ message: 'ID tidak ditemukan' }, { status: 400 });
//   }

//   try {
//     await db.delete(kelas).where(eq(kelas.id_kelas, Number(id)));
//     return NextResponse.json({ message: 'Data berhasil dihapus' });
//   } catch (error) {
//     console.error('Error saat menghapus data:', error);
//     return NextResponse.json({ message: 'Gagal menghapus data' }, { status: 500 });
//   }
// }

