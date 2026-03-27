"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CategorySelector from "@/components/products/CategorySelector";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductsGrid";
import BackButton from "@/components/common/ui/buttons/BackButton";
import { ProductDTO } from "@/types/product.type";
import { CategoryDTO } from "@/types/category.type";
import { Search } from "lucide-react";

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
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>(() =>
    categories
      .filter(cat => initialSelectedCategorySlugs.includes(cat.slug))
      .map(cat => cat.id)
  );

  const [sortBy, setSortBy] = useState<string>("");
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const clearFilters = () => {
    setSelectedMinPrice(0);
    setSelectedMaxPrice(0);
  };

  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category_id)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    if (selectedMinPrice > 0) {
      filtered = filtered.filter(product => product.price >= selectedMinPrice);
    }

    if (selectedMaxPrice > 0) {
      filtered = filtered.filter(product => product.price <= selectedMaxPrice);
    }

    return filtered;
  }, [selectedCategories, initialProducts, searchQuery, selectedMinPrice, selectedMaxPrice]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sorted.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  
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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }
    router.replace(`/productos?${params.toString()}`, {
      scroll: false,
    });
  }

  function clearSearch() {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.replace(`/productos?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <section className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <BackButton />
        <h1 className="ms-4 text-2xl font-bold">Productos</h1>
      </div>

      <div className="flex w-full flex-col md:flex-row md:justify-around">
        {/* Sidebar */}
        <div className="w-full mb-4 md:w-1/5 space-y-4">
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />
          <ProductFilters
            products={initialProducts}
            selectedMinPrice={selectedMinPrice}
            selectedMaxPrice={selectedMaxPrice}
            onMinPriceChange={setSelectedMinPrice}
            onMaxPriceChange={setSelectedMaxPrice}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Grid de productos */}
        <div className="w-full md:w-4/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 p-4 rounded-lg">
            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 bg-white"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Limpiar
                </button>
              )}
            </form>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
                Ordenar por:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white min-w-45"
              >
                <option value="">Todos</option>
                <option value="newest">Más recientes</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="name_asc">Nombre: A-Z</option>
                <option value="name_desc">Nombre: Z-A</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ProductGrid products={sortedProducts} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </section>
  );
}