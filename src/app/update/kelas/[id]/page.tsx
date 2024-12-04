"use client";
import { useRouter } from "next/navigation";
import React, {useState} from "react";

 const UpdateKelas = ( ) => {
  const [kelas, setKelas] = React.useState('')
  const [ruangan, setRuangan] = React.useState('')
  const router = useRouter()

  const handleSubmit = (e: any) => {
    e.preventDefault();

    router.push('/');
  }
  return (
    <form className='' onSubmit={handleSubmit}>
      <input type="text" placeholder="Masukkan nama Kelas" value={kelas} onChange={(e) => setKelas(e.target.value)} />
      <input type="text" placeholder="Masukkan Ruangan" value={ruangan} onChange={(e) => setRuangan(e.target.value)} /> 
      <button>Update</button>
    </form>
  );
}


export default UpdateKelas;