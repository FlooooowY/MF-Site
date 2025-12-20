import HeroSection from '@/components/home/HeroSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import DealsSection from '@/components/home/DealsSection'
import PopularProductsSection from '@/components/home/PopularProductsSection'
import ReviewsSection from '@/components/home/ReviewsSection'
import AdvantagesSection from '@/components/home/AdvantagesSection'

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<CategoriesSection />
			<DealsSection />
			<PopularProductsSection />
			<ReviewsSection />
			<AdvantagesSection />
		</>
	)
}
