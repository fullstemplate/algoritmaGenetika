export interface Mapel {
  id_mapel: number;
  nama_mapel: string | null; // Perbolehkan null
  kode_mapel: string | null;
}

export interface Kelas {
  id_kelas: number;
  nama_kelas: string | null;
  ruangan: string | null;
}

export interface Guru {
  id_guru: number;
  nama_guru: string | null;
  pendidikan: string | null;
}

export interface Waktu {
  id_waktu: number;
  hari: string | null;
  jumlah_sesi: number | null;
  jam: number | null;
}
