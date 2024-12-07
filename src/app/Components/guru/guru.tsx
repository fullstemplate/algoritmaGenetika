import { db } from '@/lib/db/db';
import { index } from 'drizzle-orm/pg-core';
import Style from '../../../style/kelas.module.css';
import React from 'react';
import CreateGuru from '@/app/create/guru/form';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function Guru() {
  const dataGuru = await db.query.guru.findMany();
  return (
    <div className={Style.form}>
      <label className="font-sans font-bold">GURU</label>
      <CreateGuru />
      <Table>
        <TableCaption >Masukkan data <span  className='text-orange-600'>Guru</span> dengan benar..</TableCaption>
        <TableHeader>
          <TableRow> 
            <TableHead className="w-[100px]">iD</TableHead>
            <TableHead>Nama Guru</TableHead>
            {/* <TableHead>Email</TableHead> */}
            <TableHead>Pendidikan</TableHead>
            <TableHead className="text-right">*******</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataGuru.map((guru, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{guru.id_guru}</TableCell>
            <TableCell>{guru.nama_guru}</TableCell>
            {/* <TableCell>{guru.email}</TableCell> */}
            <TableCell>{guru.pendidikan}</TableCell>
            <TableCell className="text-right text-red-600">Delete</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
