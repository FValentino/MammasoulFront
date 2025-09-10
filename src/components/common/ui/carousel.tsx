"use client";

import { useState, useEffect,  type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Data<T> = T | null;

interface CarouselProps<T> {
  items: Data<T>[];
  description?: string;
  buttons?: string[];
  renderItem: (item: T, index: number) => ReactNode;
}

export default function Carousel<T>({
  items,
  renderItem,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = Math.max(0, items.length - itemsPerView);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, items.length - itemsPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const maxIndex = Math.max(0, items.length - itemsPerView);

  return (
    <div className="container mx-auto px-4">

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm border-2 rounded-full p-1 text-white transition-all duration-300 hover:bg-black/80 hover:cursor-pointer hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm border-2 rounded-full p-1 text-white transition-all duration-300 hover:bg-black/80 hover:cursor-pointer hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="overflow-hidden mx-12">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            animate={{
              x: `${-currentIndex * (100 / itemsPerView)}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {items.map((item, index) =>
              item ? (
                <motion.div
                  key={index}
                  className="flex-shrink-0 px-4 mx-auto"
                  style={{ width: `${100 / itemsPerView}%` }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {renderItem(item, index)}
                </motion.div>
              ) : null
            )}
          </motion.div>
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                currentIndex === index
                  ? "bg-[#313030] border-[#313030]"
                  : "bg-transparent border-[#313030]/50 hover:border-[#313030]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
