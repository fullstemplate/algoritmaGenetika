import { db } from "@/lib/db/db";
import { guru, kelas, mapel, request } from "@/lib/db/schema";

type ScheduleGene = {
  classId: number;
  teacherId: number;
  subjectId: number;
  time: string;
};

// Ambil data dari database
async function fetchData() {
  const classes = await db.query.kelas.findMany();
  const teachers = await db.query.guru.findMany();
  const subjects = await db.query.mapel.findMany();
  const requests = await db.query.request.findMany();
  return { classes, teachers, subjects, requests };
}

// Algoritma Genetika
export async function runGeneticAlgorithm() {
  const { classes, teachers, subjects, requests } = await fetchData();
  const times = ["08:00", "10:00", "12:00"]; // Waktu

  // Inisialisasi populasi
  let population = Array.from({ length: 50 }, () =>
    classes.map((cls) => ({
      classId: cls.id,
      teacherId: teachers[Math.floor(Math.random() * teachers.length)].id,
      subjectId: subjects[Math.floor(Math.random() * subjects.length)].id,
      time: times[Math.floor(Math.random() * times.length)],
    }))
  );

  for (let generation = 0; generation < 100; generation++) {
    // Evaluasi fitness
    const fitnessResults = population.map((schedule) => {
      let penalty = 0;

      // Cek konflik waktu
      const timeConflicts = new Map<string, Set<number>>();
      schedule.forEach(({ time, classId, teacherId }) => {
        const key = `${time}`;
        if (!timeConflicts.has(key)) timeConflicts.set(key, new Set());
        if (timeConflicts.get(key)?.has(teacherId) || timeConflicts.get(key)?.has(classId)) {
          penalty++;
        } else {
          timeConflicts.get(key)?.add(teacherId);
          timeConflicts.get(key)?.add(classId);
        }
      });

      // Cek request terpenuhi
      requests.forEach((req) => {
        const match = schedule.find(
          (gene) =>
            gene.classId === req.classId &&
            gene.teacherId === req.teacherId &&
            gene.subjectId === req.subjectId &&
            gene.time === req.preferredTime
        );
        if (!match) penalty++;
      });

      return { penalty, schedule };
    });

    // Seleksi
    const parents = fitnessResults
      .sort((a, b) => a.penalty - b.penalty)
      .slice(0, population.length / 2)
      .map((result) => result.schedule);

    // Crossover dan mutasi
    population = [];
    while (population.length < 50) {
      const [parent1, parent2] = [
        parents[Math.floor(Math.random() * parents.length)],
        parents[Math.floor(Math.random() * parents.length)],
      ];
      const child = parent1.map((gene, i) => (i < parent1.length / 2 ? gene : parent2[i]));
      population.push(child);
    }
  }

  // Hasil terbaik
  return fitnessResults.sort((a, b) => a.penalty - b.penalty)[0].schedule;
}
