'use client'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioPreviewSection } from '@/components/sections/PortfolioPreviewSection'
import { AdvantagesSection } from '@/components/sections/AdvantagesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export default function Home() {
	return (
		<>
			<Header />
			<main style={{ paddingTop: '120px' }}>
				<HeroSection />
				<ServicesSection />
				<AdvantagesSection />
				<PortfolioPreviewSection />
				<TestimonialsSection />
			</main>
			<Footer />
		</>
	)
}
