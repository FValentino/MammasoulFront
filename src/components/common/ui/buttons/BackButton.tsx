"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton () {
  const navigate = useRouter();
  return (
    <div>
      <button 
        onClick={() => navigate.push("/")}
        className="flex items-center border-3 rounded-[50%] text-[#313030] hover:scale-110 hover:cursor-pointer">
        <ArrowLeft className="w-8 h-8"/>
      </button>
    </div>
  );
}