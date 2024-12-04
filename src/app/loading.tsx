import Image from 'next/image';
import Style from "@/style/loading.module.css";

export default function Loading() {
  return (
    <div className={Style.LoadingText}></div>
  );
}