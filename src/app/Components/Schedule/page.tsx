"use client";

import React, { useEffect, useState } from "react";

type ScheduleEntry = {
  classId: number;
  teacherId: number;
  subjectId: number;
  time: string;
};

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil jadwal dari API
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("/api/schedule");
        const data = await response.json();
        setSchedule(data.schedule);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jadwal Sekolah</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Kelas</th>
              <th className="border px-4 py-2">Guru</th>
              <th className="border px-4 py-2">Mata Pelajaran</th>
              <th className="border px-4 py-2">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.classId}</td>
                <td className="border px-4 py-2">{entry.teacherId}</td>
                <td className="border px-4 py-2">{entry.subjectId}</td>
                <td className="border px-4 py-2">{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}