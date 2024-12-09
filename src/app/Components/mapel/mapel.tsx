import { db } from '@/lib/db/db';
import { index } from 'drizzle-orm/pg-core';
import { mapel } from '@/lib/db/schema';
import Style from '../../../style/kelas.module.css';
import React from 'react';
import CreateMapel from '@/app/create/mapel/form';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function Maple() {
  const dataMapel = await db.query.mapel.findMany();
  return (
    <div className={Style.form}>
      <label className="font-sans font-bold">MAPEL</label>
      <CreateMapel/>
      <Table>
        <TableCaption >Masukkan data <span className='text-orange-600'>Mapel</span> dengan benar..</TableCaption>
        <TableHeader>
          <TableRow> 
            <TableHead className="w-[100px]">iD</TableHead>
            <TableHead>Nama Mapel</TableHead>
            {/* <TableHead>Kelas</TableHead> */}
            <TableHead>Kode Mapel</TableHead>
            <TableHead className="text-right">*******</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataMapel.map((mapel, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{mapel.id_mapel}</TableCell>
            <TableCell>{mapel.nama_mapel}</TableCell>
            {/* <TableCell>{mapel.kelas}</TableCell> */}
            <TableCell>{mapel.kode_mapel}</TableCell>
            <TableCell className="text-righ text-red-600">Delete</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
