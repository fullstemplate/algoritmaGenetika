 import React from "react";

interface Schedule {
  id_waktu: number;
  hari: string;
  jam: number;
  jumlah_sesi: number;
  nama_kelas: string;
  nama_guru: string;
  nama_mapel: string;
}

interface Props {
  schedules: Schedule[];
}

const ScheduleTable: React.FC<Props> = ({ schedules }) => {
  return (
    <table className="table-auto w-full border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border text-white">Hari</th>
          <th className="px-4 py-2 border text-white">Jam</th>
          <th className="px-4 py-2 border text-white">Jumlah Sesi</th>
          <th className="px-4 py-2 border text-white">Kelas</th>
          <th className="px-4 py-2 border text-white">Guru</th>
          <th className="px-4 py-2 border text-white">Mata Pelajaran</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border text-white">{schedule.hari}</td>
            <td className="px-4 py-2 border text-white">{schedule.jam}</td>
            <td className="px-4 py-2 border text-white">{schedule.jumlah_sesi}</td>
            <td className="px-4 py-2 border text-white">{schedule.nama_kelas}</td>
            <td className="px-4 py-2 border text-white">{schedule.nama_guru}</td>
            <td className="px-4 py-2 border text-white">{schedule.nama_mapel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;