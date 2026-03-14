"use client"

import { motion } from "framer-motion";

export default function TitleCategories() {
  return (
    <div className="flex flex-col items-center justify-center mb-8 space-y-2">
      <motion.h2
        className="text-3xl font-bold text-foreground text-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Categorias
      </motion.h2>
    </div>
  );
}