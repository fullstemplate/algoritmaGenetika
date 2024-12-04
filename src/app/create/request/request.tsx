"use client";
import Image from 'next/image';
import Style from '@/style/sesi.module.css';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CreateRequest = () => {
  const [ guru, setGuru ] = useState('');
  const [ hari, setHari ] = useState('');
  const [ mapel, setMapel ] = useState('');
  const [ kelas, setKelas ] = useState('');
  const [ isLoading, setIsloading ] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      setIsloading(true);
    try{
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guru, hari, mapel, kelas }),
      });
      setGuru('');
      setHari('');
      setMapel('');
      setKelas('');
      setIsloading(false);
      router.push('/');
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
    <Dialog>
      <DialogTrigger asChild>
        <button>reQuest</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>reQuest</DialogTitle>
          <DialogDescription>Masukkan data guru yang ingin <span className='text-orange-600'>reQuest</span>
          <br />
          <span className='text-red-700'>*data wajib di isi, agar bisa terkirim ke db</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="name"
              className="text-right"
            >
              Guru
            </label>
            <Input
              min={1}
              max={100}
              id="guru"
              value={guru} 
              onChange={(e) => setGuru(e.target.value)}
              // defaultValue="Pedro Duarte"
              placeholder="Request guru"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="username"
              className="text-right"
            >
              Mapel
            </label>
            <Input
              id="mapel"
              value={mapel}
              onChange={(e) => setMapel(e.target.value)}
              placeholder="Request mapel"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="username"
              className="text-right"
            >
              Kelas
            </label>
            <Input
              id="kelas"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              placeholder="Request kelas"
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="username"
              className="text-right"
            >
              Hari
            </label>
            <Input
              id="hari"
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              placeholder="Request hari"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} type="submit">{isLoading ? 'loading..' : 'Add'}</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRequest;
