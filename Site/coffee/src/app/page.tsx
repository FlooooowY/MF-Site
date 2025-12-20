'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import Menu from '@/components/Menu'
import Loyalty from '@/components/Loyalty'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TelegramButton from '@/components/TelegramButton'
import MobileNav from '@/components/MobileNav'
import ScrollToTop from '@/components/ScrollToTop'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import FloatingCart from '@/components/FloatingCart'

export default function Home() {
	return (
		<main className='relative'>
			<Header />
			<Hero />
			<Philosophy />
			<Menu />
			<Loyalty />
			<Reviews />
			<Contact />
			<Footer />
			<TelegramButton />
			<MobileNav />
			<ScrollToTop />
			<Cart />
			<Checkout />
			<FloatingCart />
		</main>
	)
}
