'use client'

import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden gradient-hero animated-bg">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6">
            Профессиональное оборудование
            <br />
            <span className="text-accent">для HoReCa</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-primary mb-8 max-w-2xl mx-auto">
            Оптовые поставки премиального коммерческого оборудования для ресторанов, кафе и столовых
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/catalog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 gradient-button text-white rounded-button font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ripple-effect"
            >
              Смотреть каталог
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-button font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              О компании
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiArrowDown className="w-6 h-6 text-text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

