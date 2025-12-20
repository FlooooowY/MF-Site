'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart, toggleCart } = useStore()
  const pathname = usePathname()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Profi</span><span className="text-accent">Tech</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === '/'
                  ? 'text-primary font-semibold'
                  : 'text-text-primary hover:text-primary'
              }`}
            >
              Главная
            </Link>
            <Link
              href="/catalog"
              className={`transition-colors ${
                pathname === '/catalog'
                  ? 'text-primary font-semibold'
                  : 'text-text-primary hover:text-primary'
              }`}
            >
              Каталог
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                pathname === '/about'
                  ? 'text-primary font-semibold'
                  : 'text-text-primary hover:text-primary'
              }`}
            >
              О нас
            </Link>
            <Link
              href="/contacts"
              className={`transition-colors ${
                pathname === '/contacts'
                  ? 'text-primary font-semibold'
                  : 'text-text-primary hover:text-primary'
              }`}
            >
              Контакты
            </Link>
          </nav>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-12 h-12 rounded-button bg-white border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            <FiShoppingCart className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-button bg-white border border-primary/20 hover:bg-primary hover:text-white transition-all"
          >
            {isMenuOpen ? (
              <FiX className="w-5 h-5 text-primary" />
            ) : (
              <FiMenu className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-text-primary hover:text-primary transition-colors"
              >
                Главная
              </Link>
              <Link
                href="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className="text-text-primary hover:text-primary transition-colors"
              >
                Каталог
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-text-primary hover:text-primary transition-colors"
              >
                О нас
              </Link>
              <Link
                href="/contacts"
                onClick={() => setIsMenuOpen(false)}
                className="text-text-primary hover:text-primary transition-colors"
              >
                Контакты
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

