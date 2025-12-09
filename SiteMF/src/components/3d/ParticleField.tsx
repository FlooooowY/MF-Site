'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
	count?: number
	mousePosition: { x: number; y: number }
}

function Particles({ count = 2000, mousePosition }: ParticlesProps) {
	const meshRef = useRef<THREE.Points>(null)
	const initialPositions = useRef<Float32Array | null>(null)

	const [positions, colors] = useMemo(() => {
		const positions = new Float32Array(count * 3)
		const colors = new Float32Array(count * 3)

		for (let i = 0; i < count; i++) {
			// Sphere distribution
			const theta = Math.random() * Math.PI * 2
			const phi = Math.acos(2 * Math.random() - 1)
			const radius = 3 + Math.random() * 2

			positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
			positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
			positions[i * 3 + 2] = radius * Math.cos(phi)

			// Grayscale colors
			const gray = 0.3 + Math.random() * 0.4
			colors[i * 3] = gray
			colors[i * 3 + 1] = gray
			colors[i * 3 + 2] = gray
		}

		return [positions, colors]
	}, [count])

	// Store initial positions
	useMemo(() => {
		initialPositions.current = new Float32Array(positions)
	}, [positions])

	useFrame(state => {
		if (!meshRef.current || !initialPositions.current) return

		const time = state.clock.getElapsedTime()
		const positionAttribute = meshRef.current.geometry.attributes.position

		for (let i = 0; i < count; i++) {
			const i3 = i * 3

			// Get initial position
			const ix = initialPositions.current[i3]
			const iy = initialPositions.current[i3 + 1]
			const iz = initialPositions.current[i3 + 2]

			// Add wave motion
			const wave = Math.sin(time * 0.5 + ix * 0.5) * 0.1

			// Mouse influence
			const mouseInfluence = 0.3
			const dx = mousePosition.x * mouseInfluence
			const dy = mousePosition.y * mouseInfluence

			positionAttribute.array[i3] = ix + wave + dx * 0.5
			positionAttribute.array[i3 + 1] =
				iy + Math.cos(time * 0.3 + iy * 0.5) * 0.1 + dy * 0.5
			positionAttribute.array[i3 + 2] =
				iz + Math.sin(time * 0.4 + iz * 0.5) * 0.1
		}

		positionAttribute.needsUpdate = true
		meshRef.current.rotation.y = time * 0.05
		meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
	})

	return (
		<points ref={meshRef}>
			<bufferGeometry>
				<bufferAttribute
					attach='attributes-position'
					count={count}
					array={positions}
					itemSize={3}
				/>
				<bufferAttribute
					attach='attributes-color'
					count={count}
					array={colors}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.02}
				vertexColors
				transparent
				opacity={0.8}
				sizeAttenuation
				depthWrite={false}
			/>
		</points>
	)
}

interface ParticleFieldProps {
	className?: string
}

export function ParticleField({ className }: ParticleFieldProps) {
	const mousePosition = useRef({ x: 0, y: 0 })

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect()
		mousePosition.current = {
			x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
			y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
		}
	}

	return (
		<div className={className} onMouseMove={handleMouseMove}>
			<Canvas
				camera={{ position: [0, 0, 6], fov: 60 }}
				dpr={[1, 2]}
				gl={{ alpha: true, antialias: true }}
			>
				<ambientLight intensity={0.5} />
				<Particles mousePosition={mousePosition.current} />
			</Canvas>
		</div>
	)
}
