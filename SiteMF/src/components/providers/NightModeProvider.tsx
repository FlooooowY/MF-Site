'use client'

import { useEffect, ReactNode } from 'react'
import { useNightMode } from '@/hooks/useNightMode'

interface NightModeProviderProps {
	children: ReactNode
}

export function NightModeProvider({ children }: NightModeProviderProps) {
	const isNight = useNightMode()

	useEffect(() => {
		if (isNight) {
			document.documentElement.classList.add('night-mode')
		} else {
			document.documentElement.classList.remove('night-mode')
		}
	}, [isNight])

	return <>{children}</>
}
