"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import banner1Desktop from "/images/banner1Desktop.jpg"
import banner1Mobile from "/images/banner1Mobile.jpg"
import banner2Desktop from "/images/banner2Desktop.jpg"
import banner2Mobile from "/images/banner2Mobile.jpg"
import banner3Desktop from "/images/banner3Desktop.jpg"
import banner3Mobile from "/images/banner3Mobile.jpg"

interface Banner {
  id: number;
  title: string;
  imageDesktop: string;
  imageMobile: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Transformamos bolsas plasticas en marroquineria",
    imageDesktop: banner1Desktop,
    imageMobile: banner1Mobile
  },
  {
    id: 2,
    title: "Hacemos envios a todo el pais",
    imageDesktop: banner2Desktop,
    imageMobile: banner2Mobile
    
  },
  {
    id: 3,
    title: "Nuestros logros incluyen un reconocimiento en la feria 'Puro diseño' y un reconocimiento en 'DiseñoTeca 2025'",
    imageDesktop: banner3Desktop,
    imageMobile: banner3Mobile
  },
]

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  const nextBanner = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section
      className="relative w-full h-auto md:h-[calc(100vh-10rem)] my-[2rem] overflow-hidden "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full relative overflow-hidden h-full flex items-center"
        >

          <picture>
            <source media="(max-width: 768px)" srcSet={banners[current].imageMobile} />
            <img
              src={banners[current].imageDesktop}
              alt={banners[current].title}
              className="w-full object-cover md:object-contain"
            />
          </picture>
          <h1 className="sr-only"> Mammasoul - Diseño sustentable </h1>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={nextBanner}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 bg-opacity-50 text-white p-2 rounded cursor-pointer"
      >
        <ChevronRight/>
      </button>

      <button
        onClick={prevBanner}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 bg-opacity-50 text-white p-2 rounded"
      >
        <ChevronLeft/>
      </button>
    </section>
  );
}
