import React, { useState, useEffect, useRef } from 'react'

const AnimatedCounter = ({
	end,
	duration = 2000,
	delay = 0,
	prefix = '',
	suffix = '',
}) => {
	const [count, setCount] = useState(0)
	const [hasStarted, setHasStarted] = useState(false)
	const elementRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasStarted) {
					setHasStarted(true)
				}
			},
			{ threshold: 0.5 }
		)

		if (elementRef.current) {
			observer.observe(elementRef.current)
		}

		return () => observer.disconnect()
	}, [hasStarted])

	useEffect(() => {
		if (!hasStarted) return

		const timeout = setTimeout(() => {
			const startTime = performance.now()
			const startValue = 0

			const animate = currentTime => {
				const elapsed = currentTime - startTime
				const progress = Math.min(elapsed / duration, 1)

				// Ease out cubic
				const easeProgress = 1 - Math.pow(1 - progress, 3)
				const currentValue = Math.floor(
					startValue + (end - startValue) * easeProgress
				)

				setCount(currentValue)

				if (progress < 1) {
					requestAnimationFrame(animate)
				}
			}

			requestAnimationFrame(animate)
		}, delay)

		return () => clearTimeout(timeout)
	}, [hasStarted, end, duration, delay])

	const formatNumber = num => {
		if (num >= 1000) {
			return num.toLocaleString('ru-RU')
		}
		return num
	}

	return (
		<span ref={elementRef}>
			{prefix}
			{formatNumber(count)}
			{suffix}
		</span>
	)
}

export default AnimatedCounter
