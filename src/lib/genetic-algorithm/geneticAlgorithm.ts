import { db } from "@/lib/db/db";
import { kelas, guru, mapel, jadwal } from "@/lib/db/schema";

type ScheduleGene = {
  classId: number;
  teacherId: number;
  subjectId: number;
  day: string;
  session: number;
  time: string;
};

// Ambil data dari database
async function fetchData() {
  const classes = await db.query.kelas.findMany(); // Data kelas
  const teachers = await db.query.guru.findMany(); // Data guru
  const subjects = await db.query.mapel.findMany(); // Data mata pelajaran
  const scheduleData = await db.query.jadwal.findMany(); // Data jadwal (hari, jam, sesi)

  return { classes, teachers, subjects, scheduleData };
}

export async function runGeneticAlgorithm() {
  const { classes, teachers, subjects, scheduleData } = await fetchData();

  const times = scheduleData.map((item) => ({
    day: item.hari,
    session: item.sesi,
    time: item.jam,
  }));

  // Inisialisasi populasi
  let population = Array.from({ length: 50 }, () =>
    classes.map((cls) => ({
      classId: cls.id,
      teacherId: teachers[Math.floor(Math.random() * teachers.length)].id,
      subjectId: subjects[Math.floor(Math.random() * subjects.length)].id,
      day: times[Math.floor(Math.random() * times.length)].day,
      session: times[Math.floor(Math.random() * times.length)].session,
      time: times[Math.floor(Math.random() * times.length)].time,
    }))
  );

  // Iterasi Generasi Algoritma Genetika
  for (let generation = 0; generation < 100; generation++) {
    const fitnessResults = population.map((schedule) => {
      let penalty = 0;

      // Deteksi Konflik Jadwal (Guru dan Kelas)
      const timeConflicts = new Map<string, Set<number>>();
      schedule.forEach(({ day, session, classId, teacherId }) => {
        const key = `${day}-${session}`;
        if (!timeConflicts.has(key)) timeConflicts.set(key, new Set());
        if (timeConflicts.get(key)?.has(teacherId) || timeConflicts.get(key)?.has(classId)) {
          penalty++;
        } else {
          timeConflicts.get(key)?.add(teacherId);
          timeConflicts.get(key)?.add(classId);
        }
      });

      return { penalty, schedule };
    });

    // Seleksi: Ambil individu terbaik
    const parents = fitnessResults
      .sort((a, b) => a.penalty - b.penalty)
      .slice(0, population.length / 2)
      .map((result) => result.schedule);

    // Crossover dan Mutasi
    population = [];
    while (population.length < 50) {
      const [parent1, parent2] = [
        parents[Math.floor(Math.random() * parents.length)],
        parents[Math.floor(Math.random() * parents.length)],
      ];

      // Crossover
      const child = parent1.map((gene, i) =>
        i < parent1.length / 2 ? gene : parent2[i]
      );

      // Mutasi
      const mutatedChild = child.map((gene) => {
        if (Math.random() < 0.1) {
          const newTime = times[Math.floor(Math.random() * times.length)];
          return {
            ...gene,
            day: newTime.day,
            session: newTime.session,
            time: newTime.time,
          };
        }
        return gene;
      });

      population.push(mutatedChild);
    }
  }

  // Hasil terbaik
  return fitnessResults.sort((a, b) => a.penalty - b.penalty)[0].schedule;
}
