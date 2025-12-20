<template>
	<div class="sugar-background" ref="containerRef">
		<canvas ref="canvasRef"></canvas>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const canvasRef = ref(null)

let animationId = null
let particles = []

class Particle {
	constructor(canvas) {
		this.canvas = canvas
		this.reset()
	}

	reset() {
		this.x = Math.random() * this.canvas.width
		this.y = Math.random() * -100
		this.size = Math.random() * 3 + 1
		this.speedY = Math.random() * 0.5 + 0.2
		this.speedX = (Math.random() - 0.5) * 0.3
		this.opacity = Math.random() * 0.5 + 0.3
		this.rotation = Math.random() * 360
		this.rotationSpeed = (Math.random() - 0.5) * 2
	}

	update() {
		this.y += this.speedY
		this.x += this.speedX
		this.rotation += this.rotationSpeed

		if (this.y > this.canvas.height + 10) {
			this.reset()
		}
	}

	draw(ctx) {
		ctx.save()
		ctx.translate(this.x, this.y)
		ctx.rotate((this.rotation * Math.PI) / 180)
		ctx.globalAlpha = this.opacity
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
		ctx.beginPath()
		ctx.arc(0, 0, this.size, 0, Math.PI * 2)
		ctx.fill()
		ctx.restore()
	}
}

function initCanvas() {
	const canvas = canvasRef.value
	const container = containerRef.value
	if (!canvas || !container) return

	const ctx = canvas.getContext('2d')

	const resize = () => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	resize()
	window.addEventListener('resize', resize)

	// Create particles
	const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))
	particles = []
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle(canvas))
		// Distribute initial positions
		particles[i].y = Math.random() * canvas.height
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		particles.forEach(particle => {
			particle.update()
			particle.draw(ctx)
		})

		animationId = requestAnimationFrame(animate)
	}

	animate()

	return () => {
		window.removeEventListener('resize', resize)
	}
}

onMounted(() => {
	initCanvas()
})

onUnmounted(() => {
	if (animationId) {
		cancelAnimationFrame(animationId)
	}
})
</script>

<style scoped>
.sugar-background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: -1;
	overflow: hidden;
}

canvas {
	display: block;
	width: 100%;
	height: 100%;
}
</style>
