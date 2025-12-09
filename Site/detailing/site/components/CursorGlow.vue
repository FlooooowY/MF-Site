<script setup lang="ts">
const cursorX = ref(0)
const cursorY = ref(0)
const isVisible = ref(false)

onMounted(() => {
	// Только на десктопе
	if (window.matchMedia('(hover: hover)').matches) {
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseenter', () => (isVisible.value = true))
		document.addEventListener('mouseleave', () => (isVisible.value = false))
	}
})

onUnmounted(() => {
	document.removeEventListener('mousemove', handleMouseMove)
})

function handleMouseMove(e: MouseEvent) {
	cursorX.value = e.clientX
	cursorY.value = e.clientY
	isVisible.value = true
}
</script>

<template>
	<div
		class="cursor-glow"
		:class="{ 'cursor-glow--visible': isVisible }"
		:style="{
			'--x': `${cursorX}px`,
			'--y': `${cursorY}px`,
		}"
	/>
</template>

<style lang="scss" scoped>
.cursor-glow {
	position: fixed;
	top: 0;
	left: 0;
	width: 400px;
	height: 400px;
	pointer-events: none;
	z-index: 9999;
	opacity: 0;
	transition: opacity 0.3s ease;
	transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%));
	background: radial-gradient(
		circle at center,
		rgba($electric-blue, 0.15) 0%,
		rgba($electric-blue, 0.05) 30%,
		transparent 70%
	);
	mix-blend-mode: screen;

	&--visible {
		opacity: 1;
	}

	@media (hover: none) {
		display: none;
	}
}
</style>
