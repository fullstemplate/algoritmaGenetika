import Image from 'next/image';
import { db } from '../../../lib/db/db';
import { mapel } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Style from '../../../style/kelas.module.css';

export default async function TabelMapel() {
  // const deleteDataKelas = await db.delete(kelas).where(eq(kelas.id_kelas, "1"));

  const dataMapel = await db.query.mapel.findMany();
  return (
    <div>
      <table>
        <thead>
          <tr className={Style.table}>
            <th className="font-sans">Id Mapel</th>
            <th className="font-sans">Nama Mapel</th>
          </tr>
        </thead>
        <tbody className="able-group-divider">
          {dataMapel.map((mapel) => (
            <tr className="font-sans">
              <td>{mapel.id_mapel}</td>
              <td>{mapel.nama_mapel}</td>
              <td>
                <button id="delete">delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
