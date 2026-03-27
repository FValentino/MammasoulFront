"use client";

import { useState } from "react";

interface Props {
  products: { price: number }[];
  selectedMinPrice: number;
  selectedMaxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onClearFilters: () => void;
}

export default function ProductFilters({
  products,
  selectedMinPrice,
  selectedMaxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
}: Props) {
  const [localMin, setLocalMin] = useState(selectedMinPrice);
  const [localMax, setLocalMax] = useState(selectedMaxPrice);

  const applyPriceFilter = () => {
    onMinPriceChange(localMin);
    onMaxPriceChange(localMax);
  };

  const handleClearFilters = () => {
    setLocalMin(0);
    setLocalMax(0);
    onMinPriceChange(0);
    onMaxPriceChange(0);
    onClearFilters();
  };

  const hasActiveFilters = selectedMinPrice > 0 || selectedMaxPrice > 0;

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div>
        <h4 className="font-medium mb-2">Precio</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={localMin || ""}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            min={0}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={localMax || ""}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            min={0}
          />
          <button
            onClick={applyPriceFilter}
            className="ml-2 px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}