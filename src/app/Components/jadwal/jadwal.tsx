import { db } from '@/lib/db/db';
import { index } from 'drizzle-orm/pg-core';
import Style from '../../../style/kelas.module.css';
import React from 'react';
import CreateJadwal from '@/app/create/jadwal/form';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function jadwal() {
  const dataJadwal = await db.query.jadwal.findMany();
  return (
    <div className={Style.form}>
      <label className="font-sans font-bold ">JADWAL</label>
      <CreateJadwal />
      <Table>
        <TableCaption >Masukkan data <span className='text-orange-600'>jadwal</span> dengan benar..</TableCaption>
        <TableHeader>
          <TableRow> 
            <TableHead className="w-[100px]">iD</TableHead>
            <TableHead>Hari</TableHead>
            <TableHead>Jumlah Sesi</TableHead>
            <TableHead>Jam</TableHead>
            <TableHead className="text-right">*******</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataJadwal.map((jadwal, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{jadwal.id_jadwal}</TableCell>
            <TableCell>{jadwal.hari}</TableCell>
            <TableCell>{jadwal.jumlah_sesi}</TableCell>
            <TableCell>{jadwal.jam}</TableCell>
            <TableCell className="text-right">Delete</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
