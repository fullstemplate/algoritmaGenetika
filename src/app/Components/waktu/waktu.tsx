import { db } from '@/lib/db/db';
import { index } from 'drizzle-orm/pg-core';
import Style from '../../../style/kelas.module.css';
import React from 'react';
import CreateJadwal from '@/app/create/waktu/form';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function waktu() {
  const dataJadwal = await db.query.waktu.findMany();
  return (
    <div className={Style.form}>
      <label className="font-sans font-bold ">JADWAL</label>
      <CreateJadwal />
      <Table>
        <TableCaption >Masukkan data <span className='text-orange-600'>waktu</span> dengan benar..</TableCaption>
        <TableHeader>
          <TableRow> 
            <TableHead className="w-[100px]">iD</TableHead>
            <TableHead>Hari</TableHead>
            <TableHead>Sesi</TableHead>
            <TableHead>Jam</TableHead>
            <TableHead className="text-right">*******</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataJadwal.map((waktu, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{waktu.id_waktu}</TableCell>
            <TableCell>{waktu.hari}</TableCell>
            <TableCell>{waktu.jumlah_sesi}</TableCell>
            <TableCell>{waktu.jam}</TableCell>
            <TableCell className="text-right text-red-600">Delete</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
