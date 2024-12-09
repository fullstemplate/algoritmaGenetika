"use client"
import React, { useEffect, useState } from "react";
import ScheduleTable from "@/app/Components/Schedule/ScheduleTable";

interface Schedule {
  id_waktu: number;
  hari: string;
  jam: number;
  jumlah_sesi: number;
  nama_kelas: string;
  nama_guru: string;
  nama_mapel: string;
}

export default function OutputPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch("/api/schedule");
        if (!res.ok) {
          throw new Error("Failed to fetch schedule");
        }
        const data = await res.json();
        setSchedules(data); // Set data jadwal terbaik
      } catch (err) {
        setError("Failed to load schedule data");
        console.error(err);
      }
    }

    fetchSchedule();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jadwal Terbaik</h1>
      <ScheduleTable schedules={schedules} />
    </div>
  );
}
