<script setup lang="ts">
const containerRef = ref<HTMLElement | null>(null)
const isLoading = ref(true)
const loadingProgress = ref(0)

onMounted(async () => {
	if (!process.client || !containerRef.value) return

	const THREE = await import('three')
	const { GLTFLoader } = await import(
		'three/examples/jsm/loaders/GLTFLoader.js'
	)
	const { DRACOLoader } = await import(
		'three/examples/jsm/loaders/DRACOLoader.js'
	)

	const scene = new THREE.Scene()

	// Камера ближе к модели
	const camera = new THREE.PerspectiveCamera(
		45,
		containerRef.value.clientWidth / containerRef.value.clientHeight,
		0.1,
		1000
	)
	camera.position.set(6, 2, 6)
	camera.lookAt(0, 0, 0)

	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		powerPreference: 'high-performance',
	})
	renderer.setSize(
		containerRef.value.clientWidth,
		containerRef.value.clientHeight
	)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 1.5
	renderer.outputColorSpace = THREE.SRGBColorSpace
	renderer.setClearColor(0x000000, 0) // Прозрачный фон
	containerRef.value.appendChild(renderer.domElement)

	// Яркое освещение
	const ambientLight = new THREE.AmbientLight(0xffffff, 1)
	scene.add(ambientLight)

	const mainLight = new THREE.DirectionalLight(0xffffff, 2.5)
	mainLight.position.set(10, 20, 10)
	scene.add(mainLight)

	const fillLight = new THREE.DirectionalLight(0x88aaff, 1.2)
	fillLight.position.set(-10, 10, -10)
	scene.add(fillLight)

	const backLight = new THREE.DirectionalLight(0xffffff, 1.5)
	backLight.position.set(0, 5, -15)
	scene.add(backLight)

	// Синяя подсветка
	const blueLight = new THREE.PointLight(0x2196f3, 3, 30)
	blueLight.position.set(-5, 0, 5)
	scene.add(blueLight)

	const blueLight2 = new THREE.PointLight(0x00e5ff, 2, 25)
	blueLight2.position.set(5, 0, -5)
	scene.add(blueLight2)

	// Загрузчик
	const dracoLoader = new DRACOLoader()
	dracoLoader.setDecoderPath(
		'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
	)

	const loader = new GLTFLoader()
	loader.setDRACOLoader(dracoLoader)

	let carModel: THREE.Group | null = null
	let isDragging = false
	let previousMouseX = 0
	let rotationVelocity = 0

	// Загрузка модели
	loader.load(
		'/models/bmw_m5__the_carbon_storm.glb',
		gltf => {
			carModel = gltf.scene

			// Размеры и центрирование
			const box = new THREE.Box3().setFromObject(carModel)
			const center = box.getCenter(new THREE.Vector3())
			const size = box.getSize(new THREE.Vector3())

			// БОЛЬШОЙ масштаб
			const maxDim = Math.max(size.x, size.y, size.z)
			const scale = 5 / maxDim
			carModel.scale.setScalar(scale)

			// Центр модели
			carModel.position.set(
				-center.x * scale,
				-center.y * scale,
				-center.z * scale
			)

			// Улучшаем материалы
			carModel.traverse(child => {
				if (child instanceof THREE.Mesh && child.material) {
					const mat = child.material as THREE.MeshStandardMaterial
					mat.envMapIntensity = 2
					mat.needsUpdate = true
				}
			})

			scene.add(carModel)
			isLoading.value = false
		},
		progress => {
			if (progress.total > 0) {
				loadingProgress.value = Math.round(
					(progress.loaded / progress.total) * 100
				)
			}
		},
		error => {
			console.error('Ошибка загрузки:', error)
			isLoading.value = false
		}
	)

	// Управление мышью - вращение МОДЕЛИ
	const handleMouseDown = (e: MouseEvent) => {
		isDragging = true
		previousMouseX = e.clientX
		rotationVelocity = 0
	}

	const handleMouseUp = () => {
		isDragging = false
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging || !carModel) return
		const deltaX = e.clientX - previousMouseX
		rotationVelocity = deltaX * 0.005
		carModel.rotation.y += rotationVelocity
		previousMouseX = e.clientX
	}

	// Touch
	const handleTouchStart = (e: TouchEvent) => {
		isDragging = true
		previousMouseX = e.touches[0].clientX
		rotationVelocity = 0
	}

	const handleTouchEnd = () => {
		isDragging = false
	}

	const handleTouchMove = (e: TouchEvent) => {
		if (!isDragging || !carModel) return
		const deltaX = e.touches[0].clientX - previousMouseX
		rotationVelocity = deltaX * 0.005
		carModel.rotation.y += rotationVelocity
		previousMouseX = e.touches[0].clientX
	}

	containerRef.value.addEventListener('mousedown', handleMouseDown)
	window.addEventListener('mouseup', handleMouseUp)
	window.addEventListener('mousemove', handleMouseMove)
	containerRef.value.addEventListener('touchstart', handleTouchStart, {
		passive: true,
	})
	window.addEventListener('touchend', handleTouchEnd)
	window.addEventListener('touchmove', handleTouchMove, { passive: true })

	// Анимация
	const animate = () => {
		requestAnimationFrame(animate)

		if (carModel) {
			// Инерция вращения
			if (!isDragging) {
				// Автовращение + затухание инерции
				if (Math.abs(rotationVelocity) > 0.0001) {
					carModel.rotation.y += rotationVelocity
					rotationVelocity *= 0.98
				} else {
					// Медленное автовращение
					carModel.rotation.y += 0.003
				}
			}
		}

		renderer.render(scene, camera)
	}

	animate()

	const handleResize = () => {
		if (!containerRef.value) return
		camera.aspect =
			containerRef.value.clientWidth / containerRef.value.clientHeight
		camera.updateProjectionMatrix()
		renderer.setSize(
			containerRef.value.clientWidth,
			containerRef.value.clientHeight
		)
	}

	window.addEventListener('resize', handleResize)

	onUnmounted(() => {
		window.removeEventListener('resize', handleResize)
		window.removeEventListener('mouseup', handleMouseUp)
		window.removeEventListener('mousemove', handleMouseMove)
		window.removeEventListener('touchend', handleTouchEnd)
		window.removeEventListener('touchmove', handleTouchMove)
		renderer.dispose()
		dracoLoader.dispose()
	})
})
</script>

<template>
	<div ref="containerRef" class="car-3d">
		<div v-if="isLoading" class="car-3d__loading">
			<div class="car-3d__loading-spinner"></div>
			<span>{{ loadingProgress }}%</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.car-3d {
	width: 100%;
	height: 100%;
	position: relative;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}

	:deep(canvas) {
		display: block;
	}

	&__loading {
		position: absolute;
		inset: 0;
		@include flex-center;
		flex-direction: column;
		gap: $space-sm;
		color: $electric-blue;
		font-size: 18px;
		font-family: $font-tech;

		&-spinner {
			width: 50px;
			height: 50px;
			border: 3px solid rgba($electric-blue, 0.2);
			border-top-color: $electric-blue;
			border-radius: 50%;
			animation: spin 0.8s linear infinite;
		}
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
