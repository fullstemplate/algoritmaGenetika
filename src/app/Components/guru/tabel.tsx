import Image from 'next/image';
import { db } from "../../../lib/db/db";
import { guru, kelas } from '@/lib/db/schema';
import { eq } from "drizzle-orm";


export default async function TabelGuru() {      

    const deleteDataKelas = await db.delete(guru).where(eq(guru.id_guru, guru.id_guru));
   
  const dataGuru = await db.query.guru.findMany()
  return (
    <div>
        <table className="flex flex-col justify-center items-center ">
      <thead >
        <tr >
          <th className="font-sans">Id Guru</th>
          <th className="font-sans">Guru</th>
          <th className="font-sans">Email</th>
          <th className="font-sans">Pendidikan</th>
        </tr>
      </thead>
      <tbody className="able-group-divider">
        {dataGuru.map((guru) => (
          <tr className="font-sans">
            <td >{guru.id_guru}</td>
            <td >{guru.nama_guru}</td>
            <td >{guru.email}</td>
            <td >{guru.pendidikan}</td>
            <td><button id="delete">delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}