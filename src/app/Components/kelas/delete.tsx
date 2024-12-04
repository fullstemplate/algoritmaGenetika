
// import Image from 'next/image';
// import { db } from "../../../lib/db/db"
// import { kelas } from '@/lib/db/schema';
// import { eq} from "drizzle-orm";
// import Style from "../../../style/kelas.module.css"

// export default async function TabelKelas() {      

//     // const deleteDataKelas = await db.delete(kelas).where(eq(kelas.id_kelas, "1"));
//     const dataKelas = await db.query.kelas.findMany()

//   return (
//     <div>
//     <table className='flex flex-col'>
//       <thead>
//         <tr className={Style.tehead}>
//           <th className="font-sans">id kelas</th>
//           <th className="font-sans">Kelas </th>
//           <th className="font-sans">Ruangan</th>
//         </tr>
//       </thead>
//       <tbody>
//       {dataKelas.map((item, index) => (
//             <tr key={index}>
//               <td>{item.id_kelas}</td>
//               <td>{item.nama_kelas}</td>
//               <td>{item.ruangan}</td>
//             </tr>
//           ))}

//       </tbody>
//     </table>
//     </div>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Style from "../../../style/kelas.module.css";
// import { db } from "../../../lib/db/db";
// import { kelas } from "@/lib/db/schema";
// import TabelKelas from "./tabel";

// export default function Kelas() {
//   const [nama_kelas, setKelas] = useState("");
//   const [ruangan, setRuangan] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     // Validasi input
//     if (!nama_kelas.trim() || !ruangan.trim()) {
//       alert("Semua field harus diisi.");
//       return;
//     }

//     try {
//       // Insert data ke database
//       await db.insert(kelas).values({
//         nama_kelas,
//         ruangan,
//       });

//       alert("Data berhasil ditambahkan!");
//       setKelas("");
//       setRuangan("");

//       // Redirect ke halaman lain
//       router.push("/kelas");
//     } catch (error) {
//       console.error("Error saat menambahkan data:", error);
//       alert("Terjadi kesalahan saat menyimpan data.");
//     }
//   };

//   return (
//     <form className={Style.form} onSubmit={handleSubmit}>
//       <label className="font-sans">Kelas</label>
//       <div className={Style.input}>
//         <input
//           type="text"
//           className="rounded-md px-2 text-green-950 font-sans"
//           placeholder="Nama Kelas"
//           value={nama_kelas}
//           onChange={(e) => setKelas(e.target.value)}
//         />
//         <input
//           type="text"
//           className="rounded-md px-2 text-green-950 font-sans"
//           placeholder="Ruangan"
//           value={ruangan}
//           onChange={(e) => setRuangan(e.target.value)}
//         />
//         <button
//           id="submit"
//           className="px-2 py-0 font-small border rounded-md text-black"
//         >
//           Tambah
//         </button>
//       </div>
//       <TabelKelas />
//     </form>
//   );
// }
