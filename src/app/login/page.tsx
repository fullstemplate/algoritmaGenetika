"use client";
import Image from "next/image";
import Swal from 'sweetalert2'
import { deflate } from "zlib";
import style from "../../style/login.module.css"
import { buttonVariants } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import tunggu from "@/app/img/tunggu.png"


export default function Login() {

  return (
    <div className={style.form}>
      {/* <Image src={tunggu} alt="logo" width={400} height={400} className={style.img}/> */}
      <h1 className="text-4xl font-bold text-center text-white font-sans py-10">Login.</h1>
      <form action="submit" className="flex flex-col items-center justify-center px-12 gap-2 ">
        <input type="username" name="username" placeholder="Login with gmail" className="px-6 py-1 font-sans rounded-md border-2 text-black" />
        <input type="password" name="password" placeholder="Click button gmail" className="px-6 py-1 font-sans rounded-md border-2 text-black" />
        <a href="/api/auth/signin"  id="login" className={buttonVariants({ variant: "destructive" })}>Gmail</a> 
      </form>
    </div>
  );
}


