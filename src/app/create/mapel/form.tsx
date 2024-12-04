"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import style from "../../../style/kelas.module.css";
import { Button } from "@/components/ui/button";

const CreateMapel = () => {
  const [nama_mapel, setNama_mapel] = useState("");
  const [kelas, setKelas] = useState("");
  const [beban_jam, setBeban_jam] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsloading(true);

    try {
      const response = await fetch("/api/mapel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama_mapel, kelas, beban_jam }),
      });
      
          setNama_mapel("");
          setKelas("");
          setBeban_jam("");
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
        placeholder="Mapel"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={nama_mapel}
        onChange={(e) => setNama_mapel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kelas"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={kelas}
        onChange={(e) => setKelas(e.target.value)}
      />
      <input
        type="number"
        placeholder="Beban Jam"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={beban_jam}
        onChange={(e) => setBeban_jam(e.target.value)}
      />
      <Button type="submit" disabled={isLoading} >{isLoading ? 'wait.' : 'add'}</Button>
    </form>
  );
};

export default CreateMapel;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

