"use client";

import { useState } from "react";
import BackButton  from "@/components/common/ui/buttons/BackButton";
import ImagesGalery from "@/components/products/ImageGalery";
import AddCartButton from "@/components/common/ui/buttons/AddCartButton";
import { ProductDTO } from "@/types";

interface Props {
  product: ProductDTO;
}

export default function ProductPage({ product }: Props) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_LENGTH = 150;
  const isLongDescription = product.description.length > MAX_LENGTH;
  const displayDescription = isLongDescription && !showFullDescription
    ? product.description.slice(0, MAX_LENGTH) + "..."
    : product.description.replace(/\.\.\.$/, '');

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
