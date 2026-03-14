"use client";

import ProductCard from "@/components/products/ProductCard";
import { ProductDTO } from "@/types";

export default function ProductGrid({ products }: { products: ProductDTO[] }) {
  if (products.length === 0) {
    return (
      <p className="text-gray-500 col-span-full text-center">
        No hay productos para estas categorías
      </p>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 gap-6 lg:w-4/5 md:grid-cols-2 xl:grid-cols-3">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
