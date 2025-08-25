"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Card from "./productCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  isOnSale?: boolean
}

interface ProductCarouselProps {
  title: string
  id: string
  products: Product[]
}

export default function ProductCarousel({ title, id, products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const maxIndex = Math.max(0, products.length - itemsPerView)

  return (
    <section id={id} className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            className="text-3xl font-bold text-foreground font-space-grotesk"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
        </div>

        <div
          className="relative"
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm border-2 rounded-full p-1 text-[white] transition-all duration-300 hover:bg-black/80 hover:cursor-pointer hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm border-2  rounded-full p-1 text-[white] transition-all duration-300 hover:bg-black/80 hover:cursor-pointer hover:scale-110"
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
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className={`flex-shrink-0 px-4`}
                  style={{ width: `${100 / itemsPerView}%` }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card name={product.name} price={product.price} image={product.image} />
                </motion.div>
              ))}
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
    </section>
  )
}
