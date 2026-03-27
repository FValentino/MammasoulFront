"use client";

import { useState } from "react";
import BackButton  from "@/components/common/ui/buttons/BackButton";
import ImagesGalery from "@/components/products/ImageGalery";
import AddCartButton from "@/components/common/ui/buttons/AddCartButton";
import { ProductDTO } from "@/types";
import { Share2, Facebook, Link2, X } from "lucide-react";

interface Props {
  product: ProductDTO;
}

export default function ProductPage({ product }: Props) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const MAX_LENGTH = 150;
  const isLongDescription = product.description.length > MAX_LENGTH;
  const displayDescription = isLongDescription && !showFullDescription
    ? product.description.slice(0, MAX_LENGTH) + "..."
    : product.description.replace(/\.\.\.$/, '');

  const productUrl = typeof window !== "undefined" ? window.location.href : "";
  const productName = product.name;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Mira este producto: ${productName} - ${productUrl}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Mira este producto: ${productName}`)}&url=${encodeURIComponent(productUrl)}`,
  };

  console.log("ProductDetail -> product", product);

  return (
    <main className="container mx-auto">
      <div className="w-[90%] mx-auto my-4">
        <BackButton />
      </div>

      <div className="w-[90%] flex flex-col rounded-lg mx-auto md:flex-row md:items-center">
        <div className="w-full p-2">
          <ImagesGalery images={product.product_images ?? []} />
        </div>

        <div className="w-full mt-3">
          <div className="w-[90%] mx-auto">
            <h1 className="text-3xl text-center font-bold lowercase first-letter:uppercase">
              {product.name}
            </h1>

            <p className="text-lg mt-3 text-center font-medium">
              {displayDescription}
            
              {isLongDescription && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="ms-4 text-cyan-600 hover:text-cyan-800 text-sm mt-1 font-semibold cursor-pointer"
                >
                  {showFullDescription ? "Ver menos" : "Leer más"}
                </button>
              )}
            </p>
          </div>

          <div className="border-t my-4" />

          <div className="w-full flex justify-around my-2">
            <p className="text-xl font-bold">$ {product.price}</p>
            <p className="text-xl">Disponibles: {product.stock}</p>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
              {showShareMenu && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[160px]">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </a>
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">W</span>
                    WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(productUrl);
                      setShowShareMenu(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded w-full"
                  >
                    <Link2 className="w-4 h-4" />
                    Copiar enlace
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center mt-4">
            <div className="w-auto md:w-[50%]">
              <AddCartButton product={{...product, quantity: 1, subtotal: product.price}} />
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
