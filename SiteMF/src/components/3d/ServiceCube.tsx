'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Html } from '@react-three/drei'
import * as THREE from 'three'

interface CubeFace {
	icon: string
	title: string
	color: string
}

const faces: CubeFace[] = [
	{ icon: '🌐', title: 'Веб', color: '#000000' },
	{ icon: '🤖', title: 'ИИ', color: '#121212' },
	{ icon: '💬', title: 'Боты', color: '#1a1a1a' },
	{ icon: '⚙️', title: 'ПО', color: '#000000' },
	{ icon: '📊', title: 'Рост', color: '#121212' },
	{ icon: '💰', title: 'ROI', color: '#1a1a1a' },
]

function Cube() {
	const meshRef = useRef<THREE.Mesh>(null)
	const [hoveredFace, setHoveredFace] = useState<number | null>(null)

	useFrame(state => {
		if (!meshRef.current) return
		const time = state.clock.getElapsedTime()
		meshRef.current.rotation.y = time * 0.2
		meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
	})

	return (
		<group>
			<RoundedBox
				ref={meshRef}
				args={[2, 2, 2]}
				radius={0.1}
				smoothness={4}
				onPointerOver={() => setHoveredFace(0)}
				onPointerOut={() => setHoveredFace(null)}
			>
				<meshStandardMaterial
					color={hoveredFace !== null ? '#1a1a1a' : '#000000'}
					metalness={0.9}
					roughness={0.1}
				/>

				{/* Front face */}
				<Html position={[0, 0, 1.01]} center transform occlude>
					<div className='text-white text-center pointer-events-none select-none'>
						<span className='text-4xl'>{faces[0].icon}</span>
						<p className='text-xs mt-1 font-[family-name:var(--font-heading)]'>
							{faces[0].title}
						</p>
					</div>
				</Html>

				{/* Back face */}
				<Html
					position={[0, 0, -1.01]}
					center
					transform
					occlude
					rotation={[0, Math.PI, 0]}
				>
					<div className='text-white text-center pointer-events-none select-none'>
						<span className='text-4xl'>{faces[1].icon}</span>
						<p className='text-xs mt-1 font-[family-name:var(--font-heading)]'>
							{faces[1].title}
						</p>
					</div>
				</Html>

				{/* Right face */}
				<Html
					position={[1.01, 0, 0]}
					center
					transform
					occlude
					rotation={[0, Math.PI / 2, 0]}
				>
					<div className='text-white text-center pointer-events-none select-none'>
						<span className='text-4xl'>{faces[2].icon}</span>
						<p className='text-xs mt-1 font-[family-name:var(--font-heading)]'>
							{faces[2].title}
						</p>
					</div>
				</Html>

				{/* Left face */}
				<Html
					position={[-1.01, 0, 0]}
					center
					transform
					occlude
					rotation={[0, -Math.PI / 2, 0]}
				>
					<div className='text-white text-center pointer-events-none select-none'>
						<span className='text-4xl'>{faces[3].icon}</span>
						<p className='text-xs mt-1 font-[family-name:var(--font-heading)]'>
							{faces[3].title}
						</p>
					</div>
				</Html>

				{/* Top face */}
				<Html
					position={[0, 1.01, 0]}
					center
					transform
					occlude
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<div className='text-white text-center pointer-events-none select-none'>
						<span className='text-4xl'>{faces[4].icon}</span>
						<p className='text-xs mt-1 font-[family-name:var(--font-heading)]'>
							{faces[4].title}
						</p>
					</div>
				</Html>

				{/* Bottom face */}
				<Html
					position={[0, -1.01, 0]}
					center
					transform
					occlude
					rotation={[Math.PI / 2, 0, 0]}
				>
					<div className='text-white text-center pointer-events-none select-none'>
						<span className='text-4xl'>{faces[5].icon}</span>
						<p className='text-xs mt-1 font-[family-name:var(--font-heading)]'>
							{faces[5].title}
						</p>
					</div>
				</Html>
			</RoundedBox>
		</group>
	)
}

interface ServiceCubeProps {
	className?: string
}

export function ServiceCube({ className }: ServiceCubeProps) {
	return (
		<div className={className}>
			<Canvas
				camera={{ position: [3, 2, 3], fov: 50 }}
				dpr={[1, 2]}
				gl={{ alpha: true, antialias: true }}
			>
				<ambientLight intensity={0.4} />
				<directionalLight position={[5, 5, 5]} intensity={1} />
				<directionalLight position={[-5, 5, -5]} intensity={0.3} />
				<Cube />
			</Canvas>
		</div>
	)
}
