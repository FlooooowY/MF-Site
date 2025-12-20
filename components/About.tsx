'use client'

import { motion } from 'framer-motion'
import { FiCheckCircle, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'

const features = [
  {
    icon: FiTruck,
    title: 'Быстрая доставка',
    description: 'Оптовые поставки по всей России. Собственный логистический отдел.',
  },
  {
    icon: FiShield,
    title: 'Гарантия качества',
    description: 'Официальная гарантия на всё оборудование. Сервисное обслуживание.',
  },
  {
    icon: FiHeadphones,
    title: 'Профессиональная поддержка',
    description: 'Консультации специалистов и помощь в подборе оборудования.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-background-light animated-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              О компании ProfiTech
            </h2>
            <p className="text-lg text-text-primary mb-6 leading-relaxed">
              ProfiTech — ведущий оптовый поставщик премиального коммерческого оборудования для
              ресторанов, кафе, столовых и других предприятий HoReCa. Мы работаем только с
              проверенными производителями и предлагаем оборудование высочайшего качества.
            </p>
            <p className="text-lg text-text-primary mb-8 leading-relaxed">
              Наша команда специалистов поможет подобрать оптимальное решение для вашего бизнеса,
              обеспечит быструю доставку и профессиональную установку.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{feature.title}</h3>
                    <p className="text-text-primary">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-card overflow-hidden shadow-card">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=600&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

