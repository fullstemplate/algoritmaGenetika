"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import style from "../../../style/kelas.module.css";
import Style from '@/style/sesi.module.css';
import { Button } from "@/components/ui/button";


const CreateJadwal = () => {
  const [hari, setHari ] = useState("");
  const [jumlah_sesi, setJumlahSesi] = useState("");
  const [jam, setJam] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
     setIsloading(true);

    try {
      const response = await fetch("/api/jadwal", {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hari, jumlah_sesi, jam }),
      });
      
          setHari("");
          setJumlahSesi("");          
          setJam("");
          setIsloading(false);
          router.push("/"); 

      
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: "Terjadi kesalahan. Silakan coba lagi nanti.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.input}>
      <input
        type="text"
        placeholder="Hari"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={hari}
        onChange={(e) => setHari(e.target.value)}
      />
      <input
        type="text"
        placeholder="jumlah sesi"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={jumlah_sesi}
        onChange={(e) => setJumlahSesi(e.target.value)}
      />
      <input
        type="text"
        placeholder="Jam"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={jam}
        onChange={(e) => setJam(e.target.value)}
      />
      <Button type="submit" disabled={isLoading} >{isLoading ? 'Wait.' : 'add'}</Button>
      {/* <div className="pt-10 px-10">
        <a
          href="/"
          className={Style.conferm}
        >
          Selesai😁😉
        </a>
      </div> */}
    </form>
  );
};

export default CreateJadwal;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}


      
      
      
      
      
