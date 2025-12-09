<template>
	<div class="confetti-container" ref="containerRef">
		<canvas ref="canvasRef"></canvas>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const canvasRef = ref(null)

let animationId = null
let confettiPieces = []
let isActive = false

const colors = [
	'#FFD1DC', // Pink
	'#FFB6C1', // Light pink
	'#FFF8E1', // Cream
	'#D4AF37', // Gold
	'#E57373', // Cherry
	'#8BC34A', // Green
	'#64B5F6', // Blue
]

const shapes = ['circle', 'square', 'triangle', 'star']

class ConfettiPiece {
	constructor(canvas, x, y) {
		this.canvas = canvas
		this.x = x || Math.random() * canvas.width
		this.y = y || canvas.height + 10
		this.size = Math.random() * 10 + 5
		this.speedY = -(Math.random() * 15 + 10)
		this.speedX = (Math.random() - 0.5) * 10
		this.gravity = 0.3
		this.rotation = Math.random() * 360
		this.rotationSpeed = (Math.random() - 0.5) * 15
		this.color = colors[Math.floor(Math.random() * colors.length)]
		this.shape = shapes[Math.floor(Math.random() * shapes.length)]
		this.opacity = 1
		this.life = 1
	}

	update() {
		this.speedY += this.gravity
		this.y += this.speedY
		this.x += this.speedX
		this.speedX *= 0.99
		this.rotation += this.rotationSpeed
		this.life -= 0.008
		this.opacity = this.life

		return this.life > 0
	}

	draw(ctx) {
		ctx.save()
		ctx.translate(this.x, this.y)
		ctx.rotate((this.rotation * Math.PI) / 180)
		ctx.globalAlpha = this.opacity
		ctx.fillStyle = this.color

		switch (this.shape) {
			case 'circle':
				ctx.beginPath()
				ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
				ctx.fill()
				break
			case 'square':
				ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
				break
			case 'triangle':
				ctx.beginPath()
				ctx.moveTo(0, -this.size / 2)
				ctx.lineTo(-this.size / 2, this.size / 2)
				ctx.lineTo(this.size / 2, this.size / 2)
				ctx.closePath()
				ctx.fill()
				break
			case 'star':
				this.drawStar(ctx, 0, 0, 5, this.size / 2, this.size / 4)
				break
		}

		ctx.restore()
	}

	drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
		let rot = (Math.PI / 2) * 3
		let x = cx
		let y = cy
		const step = Math.PI / spikes

		ctx.beginPath()
		ctx.moveTo(cx, cy - outerRadius)

		for (let i = 0; i < spikes; i++) {
			x = cx + Math.cos(rot) * outerRadius
			y = cy + Math.sin(rot) * outerRadius
			ctx.lineTo(x, y)
			rot += step

			x = cx + Math.cos(rot) * innerRadius
			y = cy + Math.sin(rot) * innerRadius
			ctx.lineTo(x, y)
			rot += step
		}

		ctx.lineTo(cx, cy - outerRadius)
		ctx.closePath()
		ctx.fill()
	}
}

function fire(x, y) {
	const canvas = canvasRef.value
	if (!canvas) return

	const centerX = x || canvas.width / 2
	const centerY = y || canvas.height

	// Create confetti burst
	const count = 50
	for (let i = 0; i < count; i++) {
		const angle = (Math.PI * 2 * i) / count
		const velocity = Math.random() * 5 + 5
		const piece = new ConfettiPiece(canvas, centerX, centerY)
		piece.speedX = Math.cos(angle) * velocity + (Math.random() - 0.5) * 5
		piece.speedY = Math.sin(angle) * velocity - 10 - Math.random() * 5
		confettiPieces.push(piece)
	}

	if (!isActive) {
		isActive = true
		animate()
	}
}

function animate() {
	const canvas = canvasRef.value
	if (!canvas) return

	const ctx = canvas.getContext('2d')
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	confettiPieces = confettiPieces.filter(piece => {
		const alive = piece.update()
		if (alive) {
			piece.draw(ctx)
		}
		return alive
	})

	if (confettiPieces.length > 0) {
		animationId = requestAnimationFrame(animate)
	} else {
		isActive = false
	}
}

function initCanvas() {
	const canvas = canvasRef.value
	if (!canvas) return

	const resize = () => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	resize()
	window.addEventListener('resize', resize)

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

// Expose fire method
defineExpose({ fire })
</script>

<style scoped>
.confetti-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 9999;
}

canvas {
	display: block;
	width: 100%;
	height: 100%;
}
</style>
