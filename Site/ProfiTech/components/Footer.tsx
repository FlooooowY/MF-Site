'use client'

import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer id="contacts" className="bg-primary-dark text-white py-12 border-t-4 border-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent to-primary"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              <span className="text-white">Profi</span><span className="text-accent-light">Tech</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Оптовый поставщик премиального коммерческого оборудования для HoReCa
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/catalog" className="hover:text-accent transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-accent transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-accent transition-colors">
                  Админ-панель
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+79991234567" className="hover:text-accent transition-colors">
                  +7 (999) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@profitech.ru" className="hover:text-accent transition-colors">
                  info@profitech.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span>Москва, ул. Примерная, д. 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} ProfiTech. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

