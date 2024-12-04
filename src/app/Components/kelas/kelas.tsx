import { db } from '@/lib/db/db';
import { kelas } from '@/lib/db/schema';
import { index } from 'drizzle-orm/pg-core';
import Style from '../../../style/kelas.module.css';
import React from 'react';
import CreateKelas from '@/app/create/kelas/form';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function Kelas() {
  const dataKelas = await db.query.kelas.findMany();
  return (
    <div className={Style.form}>
      <label className="font-sans font-bold">KELAS</label> 
      <CreateKelas />
      <Table>
        <TableCaption >Masukkan data <span className='text-orange-600'>kelas</span> dengan benar..</TableCaption>
        <TableHeader>
          <TableRow> 
            <TableHead className="w-[100px]">iD</TableHead>
            <TableHead>Nama Kelas</TableHead>
            <TableHead>Ruangan</TableHead>
            <TableHead className="text-right">*******</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataKelas.map((kelas, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{kelas.id_kelas}</TableCell>
            <TableCell>{kelas.nama_kelas}</TableCell>
            <TableCell>{kelas.ruangan}</TableCell>
            <TableCell className="text-right">Delete</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
