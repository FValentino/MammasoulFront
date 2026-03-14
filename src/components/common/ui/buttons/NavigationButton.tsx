"use client"

import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export default function NavigationButton ({ href, label }: Props) {

  return (
    <Link href={href}
      className={`flex items-center justify-around w-full text-md bg-[#525126] text-white font-bold 
        py-2 my-2 px-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors`} 
    >
      {label}
    </Link>
  );
}