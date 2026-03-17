"use client"

import { useState } from "react";
import Image from "next/image";
import type { ProductImageDTO } from "@/types";

interface ProductGalleryProps {
  images: ProductImageDTO[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(images && images.length > 0 ? images[0].url : "");

  if (!images || images.length === 0) {
    return <div className="flex items-center justify-center h-80 bg-gray-100">Sin imágenes</div>;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="w-20 flex flex-row gap-2 md:flex-col md:justify-between ">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelected(img.url)}
            className={`w-20 h-20 border rounded-lg overflow-hidden cursor-pointer ${
              selected === img.url ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div  className="w-20 h-20 aspect-square object-cover relative">
              <Image 
                src={img.url} 
                alt={`miniatura-${index + 1}`}
                fill 
              />
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-[90%] h-80 max-h-150 object-contain rounded-lg border relative">
          <Image
            src={selected}
            alt="imagen principal"
            fill
            className="border"
          />
        </div>
      </div>
    </div>
  );
}
