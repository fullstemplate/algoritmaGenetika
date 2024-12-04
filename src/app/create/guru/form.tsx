"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import style from "../../../style/kelas.module.css";
import { Button } from "@/components/ui/button";

const CreateGuru = () => {
  const [nama_guru, setNamaGuru] = useState("");
  const [email, setEmail] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsloading(true);

    try {
      const response = await fetch("/api/guru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama_guru, email, pendidikan }),
      });
      
          setNamaGuru("");
          setEmail("");
          setPendidikan(""); 
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
        placeholder="Nama Guru"
        className="rounded-md px-2 text-green-950 font-sans"
        value={nama_guru}
        onChange={(e) => setNamaGuru(e.target.value)}
      />
      <input
        type="text"
        placeholder="example@gmail.com"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Pendidikan"
        className="rounded-md px-2 py-1 text-green-950 font-sans"
        value={pendidikan}
        onChange={(e) => setPendidikan(e.target.value)}
      />
      <Button type="submit" disabled={isLoading} >{isLoading ? 'Wait.' : 'add'}</Button>
    </form>
  );
};

export default CreateGuru;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
 
