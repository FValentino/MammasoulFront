"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Banner {
  id: number
  title: string
  subtitle: string
  image: string
  cta: string
  ctaLink: string
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Marroquinería Sostenible",
    subtitle: "Descubre nuestra colección de bolsos y accesorios hechos con materiales reciclados",
    image: "/placeholder-7h7bj.png",
    cta: "Ver Colección",
    ctaLink: "/productos",
  },
  {
    id: 2,
    title: "Nueva Temporada",
    subtitle: "Estilos únicos que combinan elegancia y responsabilidad ambiental",
    image: "/minimalist-leather-accessories.png",
    cta: "Explorar",
    ctaLink: "/categorias",
  },
  {
    id: 3,
    title: "Envío Gratis",
    subtitle: "En compras superiores a $50.000. Cuida el planeta con cada compra",
    image: "/eco-friendly-leather-packaging.png",
    cta: "Comprar Ahora",
    ctaLink: "/productos",
  },
]

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src="/minimalist-leather-accessories.png"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-center text-white max-w-2xl px-4">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-4 font-space-grotesk"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {banners[currentIndex].title}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl mb-8 opacity-90"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {banners[currentIndex].subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <button  className="bg-primary hover:bg-primary/90">
                    {banners[currentIndex].cta}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <button onClick={prevSlide} className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
          <ChevronLeft className="w-8 h-8" />
        </button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <button onClick={nextSlide} className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
          <ChevronRight className="w-8 h-8" />
        </button>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  )
}
