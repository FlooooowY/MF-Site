<script setup lang="ts">
useSeoMeta({
	title: 'APEX Detailing — Премиум детейлинг в Москве',
	description:
		'Защитная пленка PPF, виниловая оклейка, керамическое покрытие. Интерактивный 3D-конфигуратор. Гарантия 5 лет.',
})
</script>

<template>
	<div class="home">
		<SectionHero />
		<SectionServices />
		<SectionGallery />
		<SectionCalculator />
		<SectionAbout />
		<SectionReviews />
		<SectionContacts />
	</div>
</template>

<style lang="scss" scoped>
.home {
	overflow-x: hidden;
}
</style>
