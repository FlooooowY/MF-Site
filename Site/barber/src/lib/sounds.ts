'use client'

class SoundManager {
	private sounds: Map<string, HTMLAudioElement> = new Map()
	private enabled: boolean = true
	private volume: number = 0.15
	private initialized: boolean = false

	constructor() {
		if (typeof window !== 'undefined') {
			// Check localStorage for sound preference
			const savedPreference = localStorage.getItem('sound-enabled')
			this.enabled = savedPreference !== 'false'
		}
	}

	private async init() {
		if (this.initialized || typeof window === 'undefined') return

		// Create audio elements with base64 encoded sounds
		// These are minimal audio files to avoid external dependencies

		// Tick sound - a short click
		const tickSound = new Audio()
		tickSound.volume = this.volume
		this.sounds.set('tick', tickSound)

		// Swoosh sound
		const swooshSound = new Audio()
		swooshSound.volume = this.volume
		this.sounds.set('swoosh', swooshSound)

		// Success sound
		const successSound = new Audio()
		successSound.volume = this.volume
		this.sounds.set('success', successSound)

		this.initialized = true
	}

	setEnabled(enabled: boolean) {
		this.enabled = enabled
		if (typeof window !== 'undefined') {
			localStorage.setItem('sound-enabled', String(enabled))
		}
	}

	isEnabled() {
		return this.enabled
	}

	setVolume(volume: number) {
		this.volume = Math.max(0, Math.min(1, volume))
		this.sounds.forEach(sound => {
			sound.volume = this.volume
		})
	}

	async play(soundName: 'tick' | 'swoosh' | 'success') {
		if (!this.enabled) return

		await this.init()

		const sound = this.sounds.get(soundName)
		if (sound) {
			sound.currentTime = 0
			try {
				// Use Web Audio API for better performance
				const AudioContext =
					window.AudioContext ||
					(
						window as typeof window & {
							webkitAudioContext: typeof AudioContext
						}
					).webkitAudioContext
				if (AudioContext) {
					const ctx = new AudioContext()
					const oscillator = ctx.createOscillator()
					const gain = ctx.createGain()

					oscillator.connect(gain)
					gain.connect(ctx.destination)

					switch (soundName) {
						case 'tick':
							oscillator.frequency.value = 800
							oscillator.type = 'sine'
							gain.gain.value = this.volume * 0.1
							oscillator.start()
							oscillator.stop(ctx.currentTime + 0.05)
							break
						case 'swoosh':
							oscillator.frequency.setValueAtTime(400, ctx.currentTime)
							oscillator.frequency.exponentialRampToValueAtTime(
								100,
								ctx.currentTime + 0.15
							)
							oscillator.type = 'sine'
							gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime)
							gain.gain.exponentialRampToValueAtTime(
								0.01,
								ctx.currentTime + 0.15
							)
							oscillator.start()
							oscillator.stop(ctx.currentTime + 0.15)
							break
						case 'success':
							// Play a pleasant chord
							const freqs = [523.25, 659.25, 783.99] // C5, E5, G5
							freqs.forEach((freq, i) => {
								const osc = ctx.createOscillator()
								const g = ctx.createGain()
								osc.connect(g)
								g.connect(ctx.destination)
								osc.frequency.value = freq
								osc.type = 'sine'
								g.gain.setValueAtTime(this.volume * 0.08, ctx.currentTime)
								g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
								osc.start(ctx.currentTime + i * 0.05)
								osc.stop(ctx.currentTime + 0.4)
							})
							break
					}
				}
			} catch {
				// Audio not supported, silently fail
			}
		}
	}

	// Convenience methods with debouncing
	private lastTickTime = 0
	tick() {
		const now = Date.now()
		if (now - this.lastTickTime > 50) {
			this.lastTickTime = now
			this.play('tick')
		}
	}

	swoosh() {
		this.play('swoosh')
	}

	success() {
		this.play('success')
	}
}

// Singleton instance
export const soundManager =
	typeof window !== 'undefined' ? new SoundManager() : null

// React hook for sound
import { useCallback } from 'react'

export function useSound() {
	const playTick = useCallback(() => {
		soundManager?.tick()
	}, [])

	const playSwoosh = useCallback(() => {
		soundManager?.swoosh()
	}, [])

	const playSuccess = useCallback(() => {
		soundManager?.success()
	}, [])

	const setEnabled = useCallback((enabled: boolean) => {
		soundManager?.setEnabled(enabled)
	}, [])

	const isEnabled = useCallback(() => {
		return soundManager?.isEnabled() ?? false
	}, [])

	return {
		playTick,
		playSwoosh,
		playSuccess,
		setEnabled,
		isEnabled,
	}
}
