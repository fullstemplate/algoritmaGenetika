"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import style from "../../../style/kelas.module.css";
import { Button } from "@/components/ui/button";

const CreateKelas = () => {
  const [nama_kelas, setNamaKelas] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsloading(true);

    try {
      const response = await fetch("/api/kelas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama_kelas, ruangan }),
      });
      
          setNamaKelas("");
          setRuangan("");
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
        placeholder="Kelas"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={nama_kelas}
        onChange={(e) => setNamaKelas(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ruangan"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={ruangan}
        onChange={(e) => setRuangan(e.target.value)}
      />
      <Button type="submit" disabled={isLoading} >{isLoading ? 'wait.' : 'add'}</Button>
    </form>
  );
};

export default CreateKelas;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

