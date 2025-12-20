'use client'

import { useState, useEffect } from 'react'

export function useNightMode(): boolean {
	const [isNight, setIsNight] = useState(false)

	useEffect(() => {
		const checkTime = () => {
			const hour = new Date().getHours()
			setIsNight(hour >= 20 || hour < 6)
		}

		checkTime()
		const interval = setInterval(checkTime, 60000) // Check every minute

		return () => clearInterval(interval)
	}, [])

	return isNight
}
