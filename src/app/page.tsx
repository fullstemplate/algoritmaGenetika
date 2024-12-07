import Image from 'next/image';
import Kelas from './Components/kelas/kelas';
import Guru from './Components/guru/guru';
import Mapel from './Components/mapel/mapel';
import Jadwal from './Components/jadwal/jadwal';
import style from '../style/section.module.css';
import Login from './login/page';
import { auth } from '@/lib/auth';
import Request from '@/app/create/request/request';


export default async function Home() {
  
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col">
        <Login/>
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      <nav className={style.nav}>
        <a
          type="button"
          className="justify-end border px-2 rounded-md shadow-md text-white"
        >
          <Request/>
        </a>
        <a
          href="/api/auth/signout"
          type="button"
          className="justify-end border px-2 rounded-md shadow-md text-white"
          id="session"
        >
          SignOut
        </a>
      </nav>
      <div className={style.section}>
        <Jadwal/>
        <Kelas />
        <Mapel />
        <Guru />
      </div>
      <div className={style.proses}>
        <a
          href="/Components/Schedule"
          className=" font-sans"
        >
          Schadule
        </a>
      </div>
    </div>
  );
}
