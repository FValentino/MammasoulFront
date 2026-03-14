"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CategorySelector from "@/components/products/CategorySelector";
import ProductGrid from "./ProductsGrid";
import BackButton from "@/components/common/ui/buttons/BackButton";
import { ProductDTO } from "@/types/product.type";
import { CategoryDTO } from "@/types/category.type";

interface Props {
  initialProducts: ProductDTO[];
  categories: Omit<CategoryDTO, "product_count">[];
  initialSelectedCategorySlugs: string[];
}

export default function ProductsClient({
  initialProducts,
  categories,
  initialSelectedCategorySlugs,
}: Props) {
  const router = useRouter();

  
  const [selectedCategories, setSelectedCategories] = useState<number[]>(() =>
    categories
      .filter(cat => initialSelectedCategorySlugs.includes(cat.slug))
      .map(cat => cat.id)
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return initialProducts;

    return initialProducts.filter(product =>
      selectedCategories.includes(product.category_id)
    );
  }, [selectedCategories, initialProducts]);

  
  function toggleCategory(id: number) {
    setSelectedCategories(prev => {
      const next = prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id];

      const slugs = categories
        .filter(c => next.includes(c.id))
        .map(c => c.slug);

      const params = new URLSearchParams();
      if (slugs.length > 0) {
        params.set("categoria", slugs.join(","));
      }

      router.replace(`/productos?${params.toString()}`, {
        scroll: false,
      });

      return next;
    });
  }

  useEffect(()=>{
    if (initialSelectedCategorySlugs.length > 0) {
      filteredProducts;
    }
  }, []);

  return (
    <section className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <BackButton />
        <h1 className="ms-4 text-2xl font-bold">Productos</h1>
      </div>

      <div className="flex w-full flex-col md:flex-row md:justify-around">
        {/* Sidebar categorías */}
        <div className="w-full mb-4 md:w-1/5">
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />
        </div>

        {/* Grid de productos */}
        <div className="w-full md:w-4/5 flex items-center justify-center">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}
