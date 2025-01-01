import { MdOutlineBloodtype } from "react-icons/md";
import { lusitana } from "@/fonts";
import Link from "next/link";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-between w-full p-4 leading-none text-white `}
    >
      <div className="flex flex-row items-center">
        <MdOutlineBloodtype className="h-12 w-12" />
        <p className="text-[44px]">Wiser</p>
      </div>
    </div>
  );
}