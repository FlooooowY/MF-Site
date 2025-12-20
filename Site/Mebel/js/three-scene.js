/* ============================================
   ДРЕВО МАСТЕРОВ - Three.js 3D Scene
   Hero section 3D visualization
   ============================================ */

class Hero3DScene {
	constructor(containerId) {
		this.container = document.getElementById(containerId)
		if (!this.container) return

		this.scene = null
		this.camera = null
		this.renderer = null
		this.furniture = null
		this.lights = []
		this.materials = {}
		this.isAnimating = true
		this.mouseX = 0
		this.mouseY = 0

		this.init()
	}

	init() {
		this.setupScene()
		this.setupCamera()
		this.setupRenderer()
		this.setupLights()
		this.createMaterials()
		this.createFurniture()
		this.setupEventListeners()
		this.animate()
	}

	setupScene() {
		this.scene = new THREE.Scene()
		this.scene.fog = new THREE.Fog(0xfdf8f0, 5, 15)
	}

	setupCamera() {
		const aspect = this.container.clientWidth / this.container.clientHeight
		this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100)
		this.camera.position.set(3, 2, 5)
		this.camera.lookAt(0, 0.5, 0)
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		})
		this.renderer.setSize(
			this.container.clientWidth,
			this.container.clientHeight
		)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
		this.renderer.outputEncoding = THREE.sRGBEncoding
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping
		this.renderer.toneMappingExposure = 1.2

		this.container.appendChild(this.renderer.domElement)
	}

	setupLights() {
		// Ambient light
		const ambientLight = new THREE.AmbientLight(0xfdf8f0, 0.4)
		this.scene.add(ambientLight)

		// Main directional light
		const mainLight = new THREE.DirectionalLight(0xffffff, 1)
		mainLight.position.set(5, 8, 5)
		mainLight.castShadow = true
		mainLight.shadow.mapSize.width = 2048
		mainLight.shadow.mapSize.height = 2048
		mainLight.shadow.camera.near = 0.5
		mainLight.shadow.camera.far = 50
		mainLight.shadow.camera.left = -10
		mainLight.shadow.camera.right = 10
		mainLight.shadow.camera.top = 10
		mainLight.shadow.camera.bottom = -10
		this.scene.add(mainLight)
		this.lights.push(mainLight)

		// Fill light
		const fillLight = new THREE.DirectionalLight(0xd2b48c, 0.3)
		fillLight.position.set(-3, 3, -3)
		this.scene.add(fillLight)
		this.lights.push(fillLight)

		// Rim light
		const rimLight = new THREE.DirectionalLight(0x8b4513, 0.2)
		rimLight.position.set(0, 2, -5)
		this.scene.add(rimLight)
		this.lights.push(rimLight)
	}

	createMaterials() {
		// Oak material
		this.materials.oak = new THREE.MeshStandardMaterial({
			color: 0xc4a35a,
			roughness: 0.7,
			metalness: 0.1,
		})

		// Walnut material
		this.materials.walnut = new THREE.MeshStandardMaterial({
			color: 0x5d4037,
			roughness: 0.6,
			metalness: 0.1,
		})

		// Ash material
		this.materials.ash = new THREE.MeshStandardMaterial({
			color: 0xe8dcc8,
			roughness: 0.75,
			metalness: 0.05,
		})

		// Cherry material
		this.materials.cherry = new THREE.MeshStandardMaterial({
			color: 0x8b4513,
			roughness: 0.65,
			metalness: 0.1,
		})

		// Glass material
		this.materials.glass = new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			roughness: 0,
			metalness: 0,
			transmission: 0.95,
			thickness: 0.5,
			transparent: true,
		})
	}

	createFurniture() {
		// Create a wardrobe/cabinet
		this.furniture = new THREE.Group()

		const woodMaterial = this.materials.oak

		// Main body
		const bodyGeometry = new THREE.BoxGeometry(2, 2.4, 0.6)
		const body = new THREE.Mesh(bodyGeometry, woodMaterial)
		body.position.y = 1.2
		body.castShadow = true
		body.receiveShadow = true
		this.furniture.add(body)

		// Left door
		const doorGeometry = new THREE.BoxGeometry(0.95, 2.2, 0.05)
		const leftDoor = new THREE.Mesh(doorGeometry, woodMaterial)
		leftDoor.position.set(-0.5, 1.2, 0.325)
		leftDoor.castShadow = true
		this.furniture.add(leftDoor)

		// Right door
		const rightDoor = new THREE.Mesh(doorGeometry, woodMaterial)
		rightDoor.position.set(0.5, 1.2, 0.325)
		rightDoor.castShadow = true
		this.furniture.add(rightDoor)

		// Door handles
		const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 16)
		const handleMaterial = new THREE.MeshStandardMaterial({
			color: 0x8b7355,
			roughness: 0.3,
			metalness: 0.7,
		})

		const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial)
		leftHandle.rotation.x = Math.PI / 2
		leftHandle.position.set(-0.15, 1.2, 0.38)
		this.furniture.add(leftHandle)

		const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial)
		rightHandle.rotation.x = Math.PI / 2
		rightHandle.position.set(0.15, 1.2, 0.38)
		this.furniture.add(rightHandle)

		// Top crown molding
		const crownGeometry = new THREE.BoxGeometry(2.1, 0.1, 0.7)
		const crown = new THREE.Mesh(crownGeometry, woodMaterial)
		crown.position.y = 2.45
		crown.castShadow = true
		this.furniture.add(crown)

		// Base
		const baseGeometry = new THREE.BoxGeometry(2.1, 0.1, 0.7)
		const base = new THREE.Mesh(baseGeometry, woodMaterial)
		base.position.y = 0.05
		base.castShadow = true
		this.furniture.add(base)

		// Legs
		const legGeometry = new THREE.BoxGeometry(0.08, 0.1, 0.08)
		const legPositions = [
			[-0.9, 0.05, 0.25],
			[0.9, 0.05, 0.25],
			[-0.9, 0.05, -0.25],
			[0.9, 0.05, -0.25],
		]

		legPositions.forEach(pos => {
			const leg = new THREE.Mesh(legGeometry, woodMaterial)
			leg.position.set(...pos)
			leg.castShadow = true
			this.furniture.add(leg)
		})

		// Add decorative panels on doors
		const panelGeometry = new THREE.BoxGeometry(0.7, 0.9, 0.02)

		const leftTopPanel = new THREE.Mesh(panelGeometry, woodMaterial)
		leftTopPanel.position.set(-0.5, 1.7, 0.36)
		this.furniture.add(leftTopPanel)

		const leftBottomPanel = new THREE.Mesh(panelGeometry, woodMaterial)
		leftBottomPanel.position.set(-0.5, 0.7, 0.36)
		this.furniture.add(leftBottomPanel)

		const rightTopPanel = new THREE.Mesh(panelGeometry, woodMaterial)
		rightTopPanel.position.set(0.5, 1.7, 0.36)
		this.furniture.add(rightTopPanel)

		const rightBottomPanel = new THREE.Mesh(panelGeometry, woodMaterial)
		rightBottomPanel.position.set(0.5, 0.7, 0.36)
		this.furniture.add(rightBottomPanel)

		// Position furniture
		this.furniture.position.set(0, 0, 0)
		this.furniture.rotation.y = -0.3

		this.scene.add(this.furniture)

		// Floor shadow plane
		const floorGeometry = new THREE.PlaneGeometry(10, 10)
		const floorMaterial = new THREE.ShadowMaterial({
			opacity: 0.2,
		})
		const floor = new THREE.Mesh(floorGeometry, floorMaterial)
		floor.rotation.x = -Math.PI / 2
		floor.receiveShadow = true
		this.scene.add(floor)
	}

	changeMaterial(materialName) {
		if (!this.materials[materialName] || !this.furniture) return

		const newMaterial = this.materials[materialName]

		this.furniture.traverse(child => {
			if (child.isMesh && child.material !== this.materials.glass) {
				// Animate material change
				const oldColor = child.material.color.clone()
				const newColor = newMaterial.color.clone()

				// Smooth transition
				let progress = 0
				const animate = () => {
					progress += 0.05
					if (progress <= 1) {
						const r = oldColor.r + (newColor.r - oldColor.r) * progress
						const g = oldColor.g + (newColor.g - oldColor.g) * progress
						const b = oldColor.b + (newColor.b - oldColor.b) * progress
						child.material.color.setRGB(r, g, b)
						requestAnimationFrame(animate)
					} else {
						child.material = newMaterial.clone()
					}
				}
				animate()
			}
		})
	}

	setupEventListeners() {
		// Mouse move for subtle rotation
		document.addEventListener('mousemove', e => {
			this.mouseX = (e.clientX / window.innerWidth) * 2 - 1
			this.mouseY = (e.clientY / window.innerHeight) * 2 - 1
		})

		// Resize handler
		window.addEventListener('resize', () => this.onResize())

		// Visibility change
		document.addEventListener('visibilitychange', () => {
			this.isAnimating = !document.hidden
		})
	}

	onResize() {
		if (!this.container) return

		const width = this.container.clientWidth
		const height = this.container.clientHeight

		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(width, height)
	}

	animate() {
		if (!this.isAnimating) {
			requestAnimationFrame(() => this.animate())
			return
		}

		requestAnimationFrame(() => this.animate())

		// Subtle furniture rotation based on mouse
		if (this.furniture) {
			this.furniture.rotation.y +=
				(-0.3 + this.mouseX * 0.2 - this.furniture.rotation.y) * 0.02
			this.furniture.rotation.x +=
				(this.mouseY * 0.1 - this.furniture.rotation.x) * 0.02
		}

		// Subtle camera movement
		this.camera.position.x +=
			(3 + this.mouseX * 0.5 - this.camera.position.x) * 0.01
		this.camera.position.y +=
			(2 + this.mouseY * 0.2 - this.camera.position.y) * 0.01
		this.camera.lookAt(0, 0.5, 0)

		this.renderer.render(this.scene, this.camera)
	}

	dispose() {
		this.isAnimating = false

		if (this.renderer) {
			this.renderer.dispose()
			this.container.removeChild(this.renderer.domElement)
		}

		// Dispose geometries and materials
		this.scene.traverse(object => {
			if (object.geometry) object.geometry.dispose()
			if (object.material) {
				if (Array.isArray(object.material)) {
					object.material.forEach(mat => mat.dispose())
				} else {
					object.material.dispose()
				}
			}
		})
	}
}

// Initialize hero 3D scene
document.addEventListener('DOMContentLoaded', () => {
	// Only initialize on desktop
	if (window.innerWidth >= 1200) {
		window.hero3D = new Hero3DScene('hero3d')
	}
})
