import { db } from "@/lib/db/db"; // Koneksi ke database
import { Kelas, Guru, Mapel, Waktu } from "@/lib/genetic-algorithm/types"; // Tipe data untuk TypeScript
import { mapel, kelas, guru, waktu } from "@/lib/db/schema"; // Skema tabel ORM
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

// Fungsi untuk algoritma genetika
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

    console.log("Schedules data sebelum pemrosesan genetika:", schedulesData); // Log data sebelum diproses

    // Tahapan algoritma genetika
    const populationSize = 100; // Ukuran populasi
    const generations = 50; // Jumlah generasi
    const mutationRate = 0.1; // Peluang mutasi

    // Inisialisasi populasi awal
    let population: { schedule: Schedule[]; fitness: number }[] = Array.from(
      { length: populationSize },
      () => ({
        schedule: randomizeSchedule(schedulesData),
        fitness: 0,
      })
    );

    for (let gen = 0; gen < generations; gen++) {
      // Evaluasi fitness
      population = evaluateFitness(population);

      // Seleksi
      const selectedPopulation = selectParents(population);

      // Crossover
      const offspring = crossover(selectedPopulation);

      // Mutasi
      const mutatedOffspring = mutate(offspring, mutationRate);

      // Generasi baru
      population = [...selectedPopulation, ...mutatedOffspring];
    }

    // Ambil jadwal terbaik berdasarkan fitness
    const bestSchedule = population.sort((a, b) => b.fitness - a.fitness)[0];
    console.log("Jadwal terbaik:", bestSchedule); // Log jadwal terbaik

    return bestSchedule.schedule;
  } catch (error) {
    console.error("Error in geneticAlgorithm:", error);
    throw error;
  }
}

// Fungsi tambahan untuk algoritma genetika
function randomizeSchedule(schedules: Schedule[]): Schedule[] {
  return schedules.sort(() => Math.random() - 0.5); // Mengacak jadwal
}

function evaluateFitness(
  population: { schedule: Schedule[]; fitness: number }[]
): { schedule: Schedule[]; fitness: number }[] {
  return population.map((individual) => {
    // Logika evaluasi fitness
    let fitness = 0;

    // Contoh aturan evaluasi sederhana: tidak ada bentrok waktu
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
  // Seleksi berdasarkan fitness (roulette wheel selection)
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
