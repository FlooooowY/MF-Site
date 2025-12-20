<script setup lang="ts">
// Регистрация GSAP плагинов на клиенте
onMounted(async () => {
	if (process.client) {
		const gsap = (await import('gsap')).default
		const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
		gsap.registerPlugin(ScrollTrigger)
	}
})
</script>

<template>
	<div class="app">
		<TheHeader />
		<main>
			<NuxtPage />
		</main>
		<TheFooter />
		<ClientOnly>
			<CursorGlow />
		</ClientOnly>
	</div>
</template>

<style lang="scss">
.app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	main {
		flex: 1;
	}
}
</style>
