"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { BannerDTO } from "@/types/banner.type"
import Image from "next/image"

interface Props{
  allBanners: BannerDTO[];
}

function getDevice(): string {
  if (typeof window === "undefined") return "desktop"
  return window.innerWidth <= 768 ? "mobile" : "desktop"
}

export default function BannerSlider({allBanners}: Props) {
  const [current, setCurrent] = useState(0)
  const [device, setDevice] = useState<string>("desktop")
  const [banners, setBanners] = useState<BannerDTO[]>(allBanners.filter((banner)=>banner.device == device))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice())
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    async function loadBanners() {
      setLoading(true)
      const bannerAux = allBanners.filter((banner)=>banner.device == getDevice());
      setBanners(bannerAux)
      setLoading(false)
    }
    loadBanners()
  }, [device])

  const nextBanner = () => {
    if (banners.length === 0) return
    setCurrent((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    if (banners.length === 0) return
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (loading || banners.length === 0) {
    return (
      <section className="relative w-full h-auto md:h-[calc(100vh-10rem)] my-8 overflow-hidden bg-gray-100">
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Cargando banners...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-auto md:h-[calc(100vh-10rem)] my-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-[calc(100vh-10rem)] relative overflow-hidden flex items-center"
        >
          <Image
            src={banners[current].imageUrl}
            alt={`Banner ${banners[current].id}`}
            fill
            className="object-cover md:object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {banners.length > 1 && (
        <>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 bg-opacity-50 text-white p-2 rounded cursor-pointer"
          >
            <ChevronRight />
          </button>

          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 bg-opacity-50 text-white p-2 rounded"
          >
            <ChevronLeft />
          </button>
        </>
      )}
    </section>
  )
}
