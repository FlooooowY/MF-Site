<template>
	<div class="home-page">
		<!-- Hero Section -->
		<HeroSection />

		<!-- Popular Products -->
		<PopularProducts />

		<!-- Categories Gallery -->
		<CategoriesGallery />

		<!-- Our Philosophy -->
		<PhilosophySection />

		<!-- Cake Constructor Preview -->
		<ConstructorPreview />

		<!-- Reviews -->
		<ReviewsSection />

		<!-- Order Form -->
		<OrderFormSection />
	</div>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import PopularProducts from '../components/home/PopularProducts.vue'
import CategoriesGallery from '../components/home/CategoriesGallery.vue'
import PhilosophySection from '../components/home/PhilosophySection.vue'
import ConstructorPreview from '../components/home/ConstructorPreview.vue'
import ReviewsSection from '../components/home/ReviewsSection.vue'
import OrderFormSection from '../components/home/OrderFormSection.vue'
</script>

<style scoped>
.home-page {
	overflow: hidden;
}
</style>
