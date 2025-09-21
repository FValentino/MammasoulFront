import { useState } from "react";
import type { ProductImage } from "../../types";
import Image from "../common/ui/image";

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(images[0].url);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="w-20 h-20 flex flex-row gap-2 md:flex-col">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(img.url)}
            className={`border rounded-lg overflow-hidden ${
              selected === img.url ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <Image src={img.url} alt={`miniatura-${idx}`} styles="w-full aspect-square object-cover" />
            
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={selected}
          alt="imagen principal"
          className="w-[90%] h-auto max-h-[600px] object-contain rounded-lg border"
        />
      </div>
    </div>
  );
}
