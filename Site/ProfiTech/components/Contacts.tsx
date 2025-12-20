'use client'

import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi'

export default function Contacts() {
  return (
    <section className="py-20 bg-background-light animated-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Контакты
          </h1>
          <p className="text-lg text-text-primary max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-background-card rounded-card shadow-card p-6 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPhone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Телефон</h3>
            <a
              href="tel:+79991234567"
              className="text-text-primary hover:text-primary transition-colors"
            >
              +7 (999) 123-45-67
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-background-card rounded-card shadow-card p-6 text-center"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Email</h3>
            <a
              href="mailto:info@profitech.ru"
              className="text-text-primary hover:text-primary transition-colors"
            >
              info@profitech.ru
            </a>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-background-card rounded-card shadow-card p-6 text-center"
          >
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMapPin className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Адрес</h3>
            <p className="text-text-primary">Москва, ул. Примерная, д. 1</p>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-background-card rounded-card shadow-card p-6 text-center"
          >
            <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiClock className="w-8 h-8 text-purple" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Режим работы</h3>
            <p className="text-text-primary">Пн-Пт: 9:00 - 18:00</p>
            <p className="text-text-primary">Сб-Вс: Выходной</p>
          </motion.div>
        </div>

        {/* Map or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-background-card rounded-card shadow-card p-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Как нас найти</h2>
          <p className="text-text-primary mb-4">
            Наш офис расположен в центре Москвы. Мы работаем с понедельника по пятницу с 9:00 до
            18:00. Для посещения офиса рекомендуется предварительно связаться с нами по телефону
            или email.
          </p>
          <div className="mt-6 p-4 bg-background-light rounded-card">
            <p className="text-sm text-text-secondary">
              <strong>Обратите внимание:</strong> Для оформления заказа и консультации вы можете
              воспользоваться формой на сайте или связаться с нами любым удобным способом.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

