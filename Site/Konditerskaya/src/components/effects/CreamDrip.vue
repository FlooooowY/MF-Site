<template>
	<div class="cream-drip" :style="{ opacity: dripOpacity }">
		<svg viewBox="0 0 1440 150" preserveAspectRatio="none" class="cream-svg">
			<defs>
				<linearGradient id="creamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="#FFF8E1" />
					<stop offset="100%" stop-color="#F5E6C8" />
				</linearGradient>
				<filter id="creamShadow" x="-20%" y="-20%" width="140%" height="140%">
					<feDropShadow
						dx="0"
						dy="4"
						stdDeviation="8"
						flood-color="rgba(255, 182, 193, 0.4)"
					/>
				</filter>
			</defs>

			<path
				:d="dripPath"
				fill="url(#creamGradient)"
				filter="url(#creamShadow)"
				class="cream-path"
			/>
		</svg>

		<!-- Animated drips -->
		<div class="drips-container">
			<div
				v-for="drip in drips"
				:key="drip.id"
				class="drip"
				:style="{
					left: drip.x + '%',
					animationDelay: drip.delay + 's',
					animationDuration: drip.duration + 's',
					height: drip.height + 'px',
				}"
			></div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
	scrollProgress: {
		type: Number,
		default: 0,
	},
})

const drips = ref([])

// Generate random drips
onMounted(() => {
	const dripCount = 8
	for (let i = 0; i < dripCount; i++) {
		drips.value.push({
			id: i,
			x: Math.random() * 100,
			delay: Math.random() * 5,
			duration: 3 + Math.random() * 4,
			height: 20 + Math.random() * 40,
		})
	}
})

const dripOpacity = computed(() => {
	return Math.min(1, props.scrollProgress * 3)
})

const dripPath = computed(() => {
	const progress = props.scrollProgress
	const baseY = 20
	const maxDrip = 80

	// Create wavy cream edge with drips
	let path = `M0,0 L0,${baseY} `

	// Generate control points for smooth curve
	const points = 12
	for (let i = 0; i <= points; i++) {
		const x = (i / points) * 1440
		const variation = Math.sin(i * 0.8 + progress * 10) * 15
		const dripFactor =
			Math.sin(i * 1.5) > 0.7
				? (Math.sin(i * 1.5) - 0.7) * maxDrip * progress
				: 0
		const y = baseY + variation + dripFactor

		if (i === 0) {
			path += `Q${x + 60},${y} `
		} else {
			path += `${x},${y} `
			if (i < points) {
				path += `Q${x + 60},${y + Math.sin(i) * 10} `
			}
		}
	}

	path += `L1440,0 Z`
	return path
})
</script>

<style scoped>
.cream-drip {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 150px;
	pointer-events: none;
	z-index: 100;
	transition: opacity 0.5s ease;
}

.cream-svg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.cream-path {
	transition: d 0.3s ease;
}

.drips-container {
	position: absolute;
	top: 20px;
	left: 0;
	right: 0;
	height: 100px;
	overflow: hidden;
}

.drip {
	position: absolute;
	width: 8px;
	background: linear-gradient(180deg, #fff8e1 0%, rgba(255, 248, 225, 0) 100%);
	border-radius: 0 0 4px 4px;
	animation: dripAnimation ease-in-out infinite;
	opacity: 0;
}

@keyframes dripAnimation {
	0%,
	100% {
		transform: translateY(0) scaleY(0);
		opacity: 0;
	}
	10% {
		opacity: 0.8;
	}
	50% {
		transform: translateY(20px) scaleY(1);
		opacity: 0.8;
	}
	90% {
		opacity: 0;
	}
	100% {
		transform: translateY(60px) scaleY(1.5);
		opacity: 0;
	}
}

@media (max-width: 768px) {
	.cream-drip {
		height: 100px;
	}
}
</style>
