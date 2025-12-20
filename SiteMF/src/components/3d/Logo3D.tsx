'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface LogoMeshProps {
	mousePosition: { x: number; y: number }
	isHovered: boolean
}

function LogoMesh({ mousePosition, isHovered }: LogoMeshProps) {
	const meshRef = useRef<THREE.Group>(null)
	const targetRotation = useRef({ x: 0, y: 0 })

	useFrame(() => {
		if (!meshRef.current) return

		// Smooth rotation towards target
		targetRotation.current.x = mousePosition.y * 0.3
		targetRotation.current.y = mousePosition.x * 0.3

		meshRef.current.rotation.x +=
			(targetRotation.current.x - meshRef.current.rotation.x) * 0.1
		meshRef.current.rotation.y +=
			(targetRotation.current.y - meshRef.current.rotation.y) * 0.1

		// Scale effect on hover
		const targetScale = isHovered ? 1.1 : 1
		meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1
		meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1
		meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1
	})

	return (
		<group ref={meshRef}>
			<Center>
				<Text3D
					font='/fonts/Inter_Bold.json'
					size={0.8}
					height={0.2}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={5}
				>
					M&F
					<meshStandardMaterial
						color='#000000'
						metalness={0.8}
						roughness={0.2}
					/>
				</Text3D>
			</Center>
		</group>
	)
}

interface Logo3DProps {
	className?: string
}

export function Logo3D({ className }: Logo3DProps) {
	const [isHovered, setIsHovered] = useState(false)
	const mousePosition = useRef({ x: 0, y: 0 })

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect()
		mousePosition.current = {
			x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
			y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
		}
	}

	return (
		<div
			className={className}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Canvas
				camera={{ position: [0, 0, 3], fov: 50 }}
				dpr={[1, 2]}
				gl={{ alpha: true, antialias: true }}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 5, 5]} intensity={1} />
				<directionalLight position={[-5, -5, -5]} intensity={0.5} />
				<LogoMesh mousePosition={mousePosition.current} isHovered={isHovered} />
			</Canvas>
		</div>
	)
}
