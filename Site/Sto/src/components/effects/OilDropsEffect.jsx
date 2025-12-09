import React, { useEffect, useRef, useState } from 'react'
import './OilDropsEffect.css'

const OilDropsEffect = () => {
	const canvasRef = useRef(null)
	const [isEnabled, setIsEnabled] = useState(true)

	useEffect(() => {
		if (!isEnabled) return

		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		let animationId
		let drops = []

		const resizeCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)

		class OilDrop {
			constructor() {
				this.reset()
			}

			reset() {
				// Position on edges
				const side = Math.random() < 0.5 ? 'left' : 'right'
				this.x =
					side === 'left'
						? Math.random() * 20
						: canvas.width - Math.random() * 20
				this.y = -20 - Math.random() * 100
				this.size = Math.random() * 8 + 4
				this.speed = Math.random() * 1.5 + 0.5
				this.opacity = Math.random() * 0.15 + 0.05
				this.wobble = Math.random() * 2 - 1
				this.wobbleSpeed = Math.random() * 0.02 + 0.01
				this.wobbleOffset = Math.random() * Math.PI * 2
			}

			update() {
				this.y += this.speed
				this.speed += 0.02 // Gravity

				// Wobble effect
				this.wobbleOffset += this.wobbleSpeed
				this.x += Math.sin(this.wobbleOffset) * this.wobble * 0.3

				// Reset when off screen
				if (this.y > canvas.height + 50) {
					this.reset()
				}
			}

			draw(ctx) {
				ctx.save()

				// Main drop
				const gradient = ctx.createRadialGradient(
					this.x,
					this.y,
					0,
					this.x,
					this.y,
					this.size
				)
				gradient.addColorStop(0, `rgba(20, 20, 20, ${this.opacity * 1.5})`)
				gradient.addColorStop(0.5, `rgba(30, 30, 30, ${this.opacity})`)
				gradient.addColorStop(1, `rgba(40, 40, 40, 0)`)

				ctx.fillStyle = gradient
				ctx.beginPath()

				// Teardrop shape
				ctx.moveTo(this.x, this.y - this.size * 1.5)
				ctx.bezierCurveTo(
					this.x + this.size,
					this.y - this.size,
					this.x + this.size,
					this.y + this.size * 0.5,
					this.x,
					this.y + this.size
				)
				ctx.bezierCurveTo(
					this.x - this.size,
					this.y + this.size * 0.5,
					this.x - this.size,
					this.y - this.size,
					this.x,
					this.y - this.size * 1.5
				)
				ctx.fill()

				// Highlight
				ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`
				ctx.beginPath()
				ctx.ellipse(
					this.x - this.size * 0.3,
					this.y - this.size * 0.3,
					this.size * 0.2,
					this.size * 0.15,
					-Math.PI / 4,
					0,
					Math.PI * 2
				)
				ctx.fill()

				ctx.restore()
			}
		}

		// Initialize drops
		for (let i = 0; i < 8; i++) {
			const drop = new OilDrop()
			drop.y = Math.random() * canvas.height // Spread initial positions
			drops.push(drop)
		}

		let lastScrollY = window.scrollY
		let scrollVelocity = 0

		const handleScroll = () => {
			scrollVelocity = window.scrollY - lastScrollY
			lastScrollY = window.scrollY

			// Add more drops on scroll
			if (Math.abs(scrollVelocity) > 10 && drops.length < 20) {
				drops.push(new OilDrop())
			}
		}

		window.addEventListener('scroll', handleScroll)

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			drops.forEach(drop => {
				drop.update()
				drop.draw(ctx)
			})

			// Remove excess drops
			if (drops.length > 12 && scrollVelocity === 0) {
				drops.pop()
			}

			scrollVelocity *= 0.95 // Decay

			animationId = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			cancelAnimationFrame(animationId)
			window.removeEventListener('resize', resizeCanvas)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [isEnabled])

	if (!isEnabled) return null

	return (
		<canvas ref={canvasRef} className='oil-drops-canvas' aria-hidden='true' />
	)
}

export default OilDropsEffect
