import React from 'react'
import HeroSection from '../components/sections/HeroSection'
import AdvantagesSection from '../components/sections/AdvantagesSection'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import TeamSection from '../components/sections/TeamSection'
import ReviewsSection from '../components/sections/ReviewsSection'
import CTASection from '../components/sections/CTASection'
import './HomePage.css'

const HomePage = ({ onBookingClick, onCalculatorClick }) => {
	return (
		<div className='home-page'>
			<HeroSection
				onBookingClick={onBookingClick}
				onCalculatorClick={onCalculatorClick}
			/>
			<AdvantagesSection />
			<ServicesSection />
			<ProcessSection />
			<TeamSection />
			<ReviewsSection />
			<CTASection onBookingClick={onBookingClick} />
		</div>
	)
}

export default HomePage
