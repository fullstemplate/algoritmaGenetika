import { integer, text, sqliteTable, primaryKey, } from "drizzle-orm/sqlite-core";
import Email from "next-auth/providers/email";
import {drizzle } from "drizzle-orm/libsql"
import { AdapterAccountType } from "next-auth/adapters";
import { createClient } from "@libsql/client";
import { index } from "drizzle-orm/mysql-core";
import { varchar } from "drizzle-orm/pg-core";



//Oauth
  export const users = sqliteTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
  })
   
  export const accounts = sqliteTable(
    "account",
    {
      userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )
   
  export const sessions = sqliteTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  })
   
//elone
const kelas = sqliteTable("kelas",  {
    id_kelas: integer("id_kelas").primaryKey(),
    nama_kelas: text("nama_kelas"),
    ruangan: text("ruangan"),
});

const guru = sqliteTable("guru",{
    id_guru: integer("id_guru").primaryKey(),
    nama_guru: text("nama_guru"),
    email: text("email"),
    pendidikan: text ("pendidikan"),
    status: text("status") 
});

const request = sqliteTable("request", { 
    id_request: integer("id_request").primaryKey(), 
    guru: integer("guru"),                                                                    
    mapel: text("mapel"),
    kelas: text("kelas"),
    hari: text("hari"), 
});
 
const tugasGuru = sqliteTable("tugas_guru", {
  id_tugas: integer("id_tugas").primaryKey(),
  id_guru: integer("id_guru"),
  id_mapel: integer("id_mapel"),
  kode_mapel: integer("kode_mapel"),
  id_kelas: integer("id_kelas"),
  tahun_ajaran: integer("tahun_ajaran"),
  sisa_jam: integer("sisa_jam"),
  beban_jam: integer("beban_jam"),
});

 const mapel = sqliteTable("mapel", { 
    id_mapel: integer("id_mapel").primaryKey(),
    nama_mapel: text("nama_mapel"),
    kode_mapel: integer("kode_mapel"),
    kelas: text("kelas"),
    beban_jam: text("beban_jam"),
});

const jadwal = sqliteTable("jadwal", {
    id_jadwal: integer("id_jadwal").primaryKey(),
    hari: text("hari"),
    jumlah_sesi: integer ("jumlah_sesi"),    
    jam: integer("jam"),
});


export {kelas, guru, request, mapel, jadwal, tugasGuru };