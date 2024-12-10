import { db } from "@/lib/db/db";
import { Kelas, Guru, Mapel, Waktu } from "@/lib/genetic-algorithm/types";
import { mapel, kelas, guru, waktu } from "@/lib/db/schema";
import { NotNull } from "drizzle-orm";

// Tipe data untuk jadwal
export interface Schedule {
  id_waktu: number;
  hari: string;
  jam: number;
  jumlah_sesi: number;
  nama_kelas: string;
  nama_guru: string;
  nama_mapel: string;
}

export async function geneticAlgorithm(): Promise<Schedule[]> {
  try {
    const dataMapel: Mapel[] = await db.query.mapel.findMany();
    const dataKelas: Kelas[] = await db.query.kelas.findMany();
    const dataGuru: Guru[] = await db.query.guru.findMany();
    const dataWaktu: Waktu[] = await db.query.waktu.findMany();

    // Gabungkan data untuk membuat jadwal awal
    const schedulesData: Schedule[] = dataWaktu.flatMap((waktuItem) =>
      dataKelas.flatMap((kelasItem) =>
        dataGuru.flatMap((guruItem) =>
          dataMapel.map((mapelItem) => ({
            id_waktu: waktuItem.id_waktu!,
            hari: waktuItem.hari || "Unknown",
            jam: waktuItem.jam || 0,
            jumlah_sesi: waktuItem.jumlah_sesi || 0,
            nama_kelas: kelasItem.nama_kelas || "Unknown",
            nama_guru: guruItem.nama_guru || "Unknown",
            nama_mapel: mapelItem.nama_mapel || "Unknown",
          }))
        )
      )
    );

    const populationSize = 100; // Ukuran populasi
    const generations = 50; // Jumlah generasi
    const mutationRate = 0.1; // Peluang mutasi

    let population: { schedule: Schedule[]; fitness: number }[] = Array.from(
      { length: populationSize },
      () => ({
        schedule: randomizeSchedule(schedulesData),
        fitness: 0,
      })
    );

    for (let gen = 0; gen < generations; gen++) {
      population = evaluateFitness(population);
      const selectedPopulation = selectParents(population);
      const offspring = crossover(selectedPopulation);
      const mutatedOffspring = mutate(offspring, mutationRate);
      population = [...selectedPopulation, ...mutatedOffspring];
    }

    const bestSchedule = population.sort((a, b) => b.fitness - a.fitness)[0];

    // Urutkan jadwal berdasarkan hari, jam, dan sesi (id_waktu)
    const sortedSchedule = bestSchedule.schedule
      .sort((a, b) => a.id_waktu - b.id_waktu) // Mengurutkan berdasarkan id_waktu untuk memastikan urutan yang benar
      .map((entry, index, array) => ({
        ...entry,
        sesi: array.findIndex((e) => e.id_waktu === entry.id_waktu) + 1, // Menambahkan sesi berdasarkan urutan id_waktu
      }));

    // Filter untuk mengambil hanya satu sesi per hari dan menghindari bentrok
    const uniqueDays = new Set<string>();
    const filteredSchedule = sortedSchedule.filter((entry) => {
      if (!uniqueDays.has(entry.hari)) {
        uniqueDays.add(entry.hari);
        return true; // Masukkan hanya sesi pertama per hari
      }
      return false; // Abaikan sesi lain di hari yang sama
    });

    return filteredSchedule; // Kembalikan hanya jadwal terbaik yang sudah diurutkan
  } catch (error) {
    console.error("Error in geneticAlgorithm:", error);
    throw error;
  }
}

function randomizeSchedule(schedules: Schedule[]): Schedule[] {
  return schedules.sort(() => Math.random() - 0.5); // Mengacak jadwal
}

function evaluateFitness(
  population: { schedule: Schedule[]; fitness: number }[]
): { schedule: Schedule[]; fitness: number }[] {
  return population.map((individual) => {
    let fitness = 0;

    const usedTimes = new Set();
    for (const entry of individual.schedule) {
      const key = `${entry.hari}-${entry.jam}-${entry.nama_kelas}`;
      if (!usedTimes.has(key)) {
        fitness += 1; // Poin untuk tidak ada bentrok
        usedTimes.add(key);
      }
    }

    return { ...individual, fitness };
  });
}

function selectParents(
  population: { schedule: Schedule[]; fitness: number }[]
): { schedule: Schedule[]; fitness: number }[] {
  population.sort((a, b) => b.fitness - a.fitness);
  return population.slice(0, population.length / 2); // Pilih separuh terbaik
}

function crossover(
  parents: { schedule: Schedule[]; fitness: number }[]
): { schedule: Schedule[]; fitness: number }[] {
  const offspring: { schedule: Schedule[]; fitness: number }[] = [];

  for (let i = 0; i < parents.length; i += 2) {
    const parent1 = parents[i];
    const parent2 = parents[i + 1] || parents[0];

    const splitPoint = Math.floor(parent1.schedule.length / 2);
    const childSchedule = [
      ...parent1.schedule.slice(0, splitPoint),
      ...parent2.schedule.slice(splitPoint),
    ];

    offspring.push({ schedule: childSchedule, fitness: 0 });
  }

  return offspring;
}

function mutate(
  population: { schedule: Schedule[]; fitness: number }[],
  mutationRate: number
): { schedule: Schedule[]; fitness: number }[] {
  return population.map((individual) => {
    const mutatedSchedule = individual.schedule.map((entry) => {
      if (Math.random() < mutationRate) {
        // Mutasi: Mengacak data waktu
        entry.jam = Math.floor(Math.random() * 8) + 7; // Contoh: jam antara 7-14
      }
      return entry;
    });

    return { ...individual, schedule: mutatedSchedule };
  });
}
