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
  const [ id_guru, setIdGuru ] = useState('');
  const [ hari, setHari ] = useState('');
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
        body: JSON.stringify({ id_guru, hari }),
      });
      setIdGuru('');
      setHari('');
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
          <DialogDescription>Masukkan data guru yang ingin reQuest</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="name"
              className="text-right"
            >
              id_guru
            </label>
            <Input
              type="number"
              min={1}
              max={100}
              id="number"
              value={id_guru} 
              onChange={(e) => setIdGuru(e.target.value)}
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
              Hari
            </label>
            <Input
              id="hari"
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              placeholder="Request mapel"
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
