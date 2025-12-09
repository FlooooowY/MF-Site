/* ============================================
   ДРЕВО МАСТЕРОВ - 3D Furniture Constructor
   Interactive furniture configurator
   ============================================ */

class FurnitureConstructor {
	constructor(containerId) {
		this.container = document.getElementById(containerId)
		if (!this.container) return

		// Three.js components
		this.scene = null
		this.camera = null
		this.renderer = null
		this.controls = null
		this.furniture = null

		// Configuration state
		this.config = {
			type: 'wardrobe',
			width: 180,
			height: 220,
			depth: 60,
			material: 'oak',
			options: {
				lighting: false,
				softClose: false,
				mirror: false,
			},
		}

		// Pricing
		this.basePrices = {
			wardrobe: 85000,
			table: 45000,
			bed: 120000,
			shelf: 35000,
		}

		this.materialMultipliers = {
			oak: 1.0,
			walnut: 1.4,
			ash: 0.85,
			cherry: 1.2,
		}

		this.optionPrices = {
			lighting: 15000,
			softClose: 8000,
			mirror: 12000,
		}

		// Materials cache
		this.materials = {}

		// Animation state
		this.isAnimating = true
		this.autoRotate = true

		this.init()
	}

	init() {
		this.setupScene()
		this.setupCamera()
		this.setupRenderer()
		this.setupLights()
		this.createMaterials()
		this.createFurniture()
		this.setupControls()
		this.bindEvents()
		this.animate()
		this.updatePrice()
	}

	setupScene() {
		this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(0x2d2d2d)
	}

	setupCamera() {
		const aspect = this.container.clientWidth / this.container.clientHeight
		this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100)
		this.camera.position.set(4, 3, 4)
		this.camera.lookAt(0, 1, 0)
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

		this.container.appendChild(this.renderer.domElement)
	}

	setupLights() {
		// Ambient
		const ambient = new THREE.AmbientLight(0x404040, 0.6)
		this.scene.add(ambient)

		// Main light
		const mainLight = new THREE.DirectionalLight(0xffffff, 0.8)
		mainLight.position.set(5, 10, 5)
		mainLight.castShadow = true
		mainLight.shadow.mapSize.width = 2048
		mainLight.shadow.mapSize.height = 2048
		this.scene.add(mainLight)

		// Fill light
		const fillLight = new THREE.DirectionalLight(0xd2b48c, 0.3)
		fillLight.position.set(-5, 5, -5)
		this.scene.add(fillLight)

		// Top light
		const topLight = new THREE.DirectionalLight(0xffffff, 0.2)
		topLight.position.set(0, 10, 0)
		this.scene.add(topLight)
	}

	createMaterials() {
		this.materials = {
			oak: new THREE.MeshStandardMaterial({
				color: 0xc4a35a,
				roughness: 0.7,
				metalness: 0.1,
			}),
			walnut: new THREE.MeshStandardMaterial({
				color: 0x5d4037,
				roughness: 0.6,
				metalness: 0.1,
			}),
			ash: new THREE.MeshStandardMaterial({
				color: 0xe8dcc8,
				roughness: 0.75,
				metalness: 0.05,
			}),
			cherry: new THREE.MeshStandardMaterial({
				color: 0x8b4513,
				roughness: 0.65,
				metalness: 0.1,
			}),
			metal: new THREE.MeshStandardMaterial({
				color: 0x8b7355,
				roughness: 0.3,
				metalness: 0.8,
			}),
			glass: new THREE.MeshPhysicalMaterial({
				color: 0xffffff,
				roughness: 0,
				metalness: 0,
				transmission: 0.9,
				thickness: 0.5,
				transparent: true,
			}),
			mirror: new THREE.MeshStandardMaterial({
				color: 0xcccccc,
				roughness: 0,
				metalness: 1,
			}),
		}
	}

	createFurniture() {
		// Clear existing furniture
		if (this.furniture) {
			this.scene.remove(this.furniture)
			this.furniture.traverse(child => {
				if (child.geometry) child.geometry.dispose()
			})
		}

		this.furniture = new THREE.Group()

		switch (this.config.type) {
			case 'wardrobe':
				this.createWardrobe()
				break
			case 'table':
				this.createTable()
				break
			case 'bed':
				this.createBed()
				break
			case 'shelf':
				this.createShelf()
				break
		}

		this.scene.add(this.furniture)

		// Add floor
		this.createFloor()
	}

	createWardrobe() {
		const w = this.config.width / 100
		const h = this.config.height / 100
		const d = this.config.depth / 100
		const mat = this.materials[this.config.material]

		// Main body
		const bodyGeo = new THREE.BoxGeometry(w, h, d)
		const body = new THREE.Mesh(bodyGeo, mat)
		body.position.y = h / 2
		body.castShadow = true
		body.receiveShadow = true
		this.furniture.add(body)

		// Doors
		const doorWidth = w / 2 - 0.02
		const doorGeo = new THREE.BoxGeometry(doorWidth, h - 0.1, 0.03)

		const leftDoor = new THREE.Mesh(doorGeo, mat)
		leftDoor.position.set(-w / 4, h / 2, d / 2 + 0.02)
		leftDoor.castShadow = true
		this.furniture.add(leftDoor)

		// Right door (or mirror)
		if (this.config.options.mirror) {
			const rightDoor = new THREE.Mesh(doorGeo, this.materials.mirror)
			rightDoor.position.set(w / 4, h / 2, d / 2 + 0.02)
			rightDoor.castShadow = true
			this.furniture.add(rightDoor)
		} else {
			const rightDoor = new THREE.Mesh(doorGeo, mat)
			rightDoor.position.set(w / 4, h / 2, d / 2 + 0.02)
			rightDoor.castShadow = true
			this.furniture.add(rightDoor)
		}

		// Handles
		const handleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 16)

		const leftHandle = new THREE.Mesh(handleGeo, this.materials.metal)
		leftHandle.rotation.x = Math.PI / 2
		leftHandle.position.set(-0.08, h / 2, d / 2 + 0.06)
		this.furniture.add(leftHandle)

		const rightHandle = new THREE.Mesh(handleGeo, this.materials.metal)
		rightHandle.rotation.x = Math.PI / 2
		rightHandle.position.set(0.08, h / 2, d / 2 + 0.06)
		this.furniture.add(rightHandle)

		// Crown molding
		const crownGeo = new THREE.BoxGeometry(w + 0.06, 0.06, d + 0.06)
		const crown = new THREE.Mesh(crownGeo, mat)
		crown.position.y = h + 0.03
		crown.castShadow = true
		this.furniture.add(crown)

		// Base
		const baseGeo = new THREE.BoxGeometry(w + 0.04, 0.08, d + 0.04)
		const base = new THREE.Mesh(baseGeo, mat)
		base.position.y = 0.04
		base.castShadow = true
		this.furniture.add(base)

		// LED lighting
		if (this.config.options.lighting) {
			const lightGeo = new THREE.BoxGeometry(w - 0.1, 0.02, d - 0.1)
			const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffcc })
			const light = new THREE.Mesh(lightGeo, lightMat)
			light.position.y = h - 0.05
			this.furniture.add(light)

			// Add point light
			const pointLight = new THREE.PointLight(0xffffcc, 0.5, 2)
			pointLight.position.y = h - 0.1
			this.furniture.add(pointLight)
		}
	}

	createTable() {
		const w = this.config.width / 100
		const h = 0.75 // Standard table height
		const d = this.config.depth / 100
		const mat = this.materials[this.config.material]

		// Table top
		const topGeo = new THREE.BoxGeometry(w, 0.04, d)
		const top = new THREE.Mesh(topGeo, mat)
		top.position.y = h
		top.castShadow = true
		top.receiveShadow = true
		this.furniture.add(top)

		// Legs
		const legGeo = new THREE.BoxGeometry(0.06, h - 0.04, 0.06)
		const legPositions = [
			[-(w / 2) + 0.08, (h - 0.04) / 2, -(d / 2) + 0.08],
			[w / 2 - 0.08, (h - 0.04) / 2, -(d / 2) + 0.08],
			[-(w / 2) + 0.08, (h - 0.04) / 2, d / 2 - 0.08],
			[w / 2 - 0.08, (h - 0.04) / 2, d / 2 - 0.08],
		]

		legPositions.forEach(pos => {
			const leg = new THREE.Mesh(legGeo, mat)
			leg.position.set(...pos)
			leg.castShadow = true
			this.furniture.add(leg)
		})

		// Support beams
		const beamGeoX = new THREE.BoxGeometry(w - 0.2, 0.04, 0.04)
		const beamFront = new THREE.Mesh(beamGeoX, mat)
		beamFront.position.set(0, h - 0.1, d / 2 - 0.1)
		this.furniture.add(beamFront)

		const beamBack = new THREE.Mesh(beamGeoX, mat)
		beamBack.position.set(0, h - 0.1, -(d / 2) + 0.1)
		this.furniture.add(beamBack)
	}

	createBed() {
		const w = this.config.width / 100
		const d = this.config.depth / 100 + 1 // Beds are longer
		const mat = this.materials[this.config.material]

		// Frame
		const frameGeo = new THREE.BoxGeometry(w, 0.3, d)
		const frame = new THREE.Mesh(frameGeo, mat)
		frame.position.set(0, 0.15, 0)
		frame.castShadow = true
		frame.receiveShadow = true
		this.furniture.add(frame)

		// Headboard
		const headGeo = new THREE.BoxGeometry(w, 1.2, 0.1)
		const headboard = new THREE.Mesh(headGeo, mat)
		headboard.position.set(0, 0.6, -d / 2 + 0.05)
		headboard.castShadow = true
		this.furniture.add(headboard)

		// Footboard
		const footGeo = new THREE.BoxGeometry(w, 0.4, 0.08)
		const footboard = new THREE.Mesh(footGeo, mat)
		footboard.position.set(0, 0.2, d / 2 - 0.04)
		footboard.castShadow = true
		this.furniture.add(footboard)

		// Mattress
		const mattressGeo = new THREE.BoxGeometry(w - 0.1, 0.25, d - 0.2)
		const mattressMat = new THREE.MeshStandardMaterial({
			color: 0xf5f5f5,
			roughness: 0.9,
		})
		const mattress = new THREE.Mesh(mattressGeo, mattressMat)
		mattress.position.set(0, 0.425, 0)
		mattress.castShadow = true
		this.furniture.add(mattress)

		// Pillows
		const pillowGeo = new THREE.BoxGeometry(0.5, 0.15, 0.3)
		const pillowMat = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			roughness: 0.8,
		})

		const pillow1 = new THREE.Mesh(pillowGeo, pillowMat)
		pillow1.position.set(-0.35, 0.6, -d / 2 + 0.3)
		this.furniture.add(pillow1)

		const pillow2 = new THREE.Mesh(pillowGeo, pillowMat)
		pillow2.position.set(0.35, 0.6, -d / 2 + 0.3)
		this.furniture.add(pillow2)
	}

	createShelf() {
		const w = this.config.width / 100
		const h = this.config.height / 100
		const d = this.config.depth / 100
		const mat = this.materials[this.config.material]

		const shelfCount = Math.floor(h / 0.4)
		const shelfSpacing = h / shelfCount

		// Shelves
		const shelfGeo = new THREE.BoxGeometry(w, 0.025, d)
		for (let i = 0; i <= shelfCount; i++) {
			const shelf = new THREE.Mesh(shelfGeo, mat)
			shelf.position.y = i * shelfSpacing
			shelf.castShadow = true
			shelf.receiveShadow = true
			this.furniture.add(shelf)
		}

		// Side panels
		const sideGeo = new THREE.BoxGeometry(0.025, h, d)

		const leftSide = new THREE.Mesh(sideGeo, mat)
		leftSide.position.set(-w / 2 + 0.0125, h / 2, 0)
		leftSide.castShadow = true
		this.furniture.add(leftSide)

		const rightSide = new THREE.Mesh(sideGeo, mat)
		rightSide.position.set(w / 2 - 0.0125, h / 2, 0)
		rightSide.castShadow = true
		this.furniture.add(rightSide)

		// Back panel
		const backGeo = new THREE.BoxGeometry(w, h, 0.01)
		const back = new THREE.Mesh(backGeo, mat)
		back.position.set(0, h / 2, -d / 2 + 0.005)
		this.furniture.add(back)
	}

	createFloor() {
		// Remove old floor
		const oldFloor = this.scene.getObjectByName('floor')
		if (oldFloor) {
			this.scene.remove(oldFloor)
		}

		// Grid helper
		const gridHelper = new THREE.GridHelper(10, 20, 0x444444, 0x333333)
		gridHelper.name = 'floor'
		this.scene.add(gridHelper)

		// Shadow plane
		const shadowGeo = new THREE.PlaneGeometry(10, 10)
		const shadowMat = new THREE.ShadowMaterial({ opacity: 0.3 })
		const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
		shadowPlane.rotation.x = -Math.PI / 2
		shadowPlane.position.y = 0.001
		shadowPlane.receiveShadow = true
		shadowPlane.name = 'shadowPlane'
		this.scene.add(shadowPlane)
	}

	setupControls() {
		// Simple orbit-like controls without OrbitControls library
		this.isDragging = false
		this.previousMousePosition = { x: 0, y: 0 }
		this.rotationSpeed = 0.005

		this.container.addEventListener('mousedown', e => {
			this.isDragging = true
			this.autoRotate = false
		})

		this.container.addEventListener('mousemove', e => {
			if (this.isDragging && this.furniture) {
				const deltaX = e.clientX - this.previousMousePosition.x
				this.furniture.rotation.y += deltaX * this.rotationSpeed
			}
			this.previousMousePosition = { x: e.clientX, y: e.clientY }
		})

		this.container.addEventListener('mouseup', () => {
			this.isDragging = false
		})

		this.container.addEventListener('mouseleave', () => {
			this.isDragging = false
		})

		// Touch controls
		this.container.addEventListener('touchstart', e => {
			this.isDragging = true
			this.autoRotate = false
			this.previousMousePosition = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			}
		})

		this.container.addEventListener('touchmove', e => {
			if (this.isDragging && this.furniture) {
				const deltaX = e.touches[0].clientX - this.previousMousePosition.x
				this.furniture.rotation.y += deltaX * this.rotationSpeed
				this.previousMousePosition = {
					x: e.touches[0].clientX,
					y: e.touches[0].clientY,
				}
			}
		})

		this.container.addEventListener('touchend', () => {
			this.isDragging = false
		})
	}

	bindEvents() {
		// Type buttons
		document.querySelectorAll('.type-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				document
					.querySelectorAll('.type-btn')
					.forEach(b => b.classList.remove('active'))
				btn.classList.add('active')
				this.config.type = btn.dataset.type
				this.createFurniture()
				this.updatePrice()
				this.animateAssembly()
			})
		})

		// Dimension sliders
		const widthSlider = document.getElementById('dimWidth')
		const heightSlider = document.getElementById('dimHeight')
		const depthSlider = document.getElementById('dimDepth')

		if (widthSlider) {
			widthSlider.addEventListener('input', e => {
				this.config.width = parseInt(e.target.value)
				document.getElementById('dimWidthValue').textContent = e.target.value
				this.createFurniture()
				this.updatePrice()
			})
		}

		if (heightSlider) {
			heightSlider.addEventListener('input', e => {
				this.config.height = parseInt(e.target.value)
				document.getElementById('dimHeightValue').textContent = e.target.value
				this.createFurniture()
				this.updatePrice()
			})
		}

		if (depthSlider) {
			depthSlider.addEventListener('input', e => {
				this.config.depth = parseInt(e.target.value)
				document.getElementById('dimDepthValue').textContent = e.target.value
				this.createFurniture()
				this.updatePrice()
			})
		}

		// Material buttons
		document.querySelectorAll('.material-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				document
					.querySelectorAll('.material-btn')
					.forEach(b => b.classList.remove('active'))
				btn.classList.add('active')
				this.config.material = btn.dataset.material
				this.updateMaterial()
				this.updatePrice()
			})
		})

		// Option checkboxes
		const lightingCheck = document.getElementById('optLighting')
		const softCloseCheck = document.getElementById('optSoftClose')
		const mirrorCheck = document.getElementById('optMirror')

		if (lightingCheck) {
			lightingCheck.addEventListener('change', e => {
				this.config.options.lighting = e.target.checked
				this.createFurniture()
				this.updatePrice()
			})
		}

		if (softCloseCheck) {
			softCloseCheck.addEventListener('change', e => {
				this.config.options.softClose = e.target.checked
				this.updatePrice()
			})
		}

		if (mirrorCheck) {
			mirrorCheck.addEventListener('change', e => {
				this.config.options.mirror = e.target.checked
				this.createFurniture()
				this.updatePrice()
			})
		}

		// Control buttons
		document.getElementById('rotateLeft')?.addEventListener('click', () => {
			this.rotateFurniture(-Math.PI / 4)
		})

		document.getElementById('rotateRight')?.addEventListener('click', () => {
			this.rotateFurniture(Math.PI / 4)
		})

		document.getElementById('zoomIn')?.addEventListener('click', () => {
			this.zoom(0.8)
		})

		document.getElementById('zoomOut')?.addEventListener('click', () => {
			this.zoom(1.2)
		})

		document.getElementById('arView')?.addEventListener('click', () => {
			window.DM?.showModal('arModal')
		})

		// Order button
		document.getElementById('orderBtn')?.addEventListener('click', () => {
			this.saveConfiguration()
			window.location.href = '#contact'
		})

		// Save configuration
		document.getElementById('saveConfigBtn')?.addEventListener('click', () => {
			this.saveConfiguration()
			alert('Конфигурация сохранена! Вы можете поделиться ссылкой на неё.')
		})

		// Resize handler
		window.addEventListener('resize', () => this.onResize())
	}

	updateMaterial() {
		const mat = this.materials[this.config.material]
		if (!this.furniture || !mat) return

		this.furniture.traverse(child => {
			if (child.isMesh) {
				// Don't change special materials
				if (
					child.material === this.materials.metal ||
					child.material === this.materials.glass ||
					child.material === this.materials.mirror ||
					child.material.color.getHex() === 0xf5f5f5 || // Mattress
					child.material.color.getHex() === 0xffffff || // Pillows
					child.material.color.getHex() === 0xffffcc
				) {
					// LED
					return
				}
				child.material = mat
			}
		})
	}

	updatePrice() {
		const basePrice = this.basePrices[this.config.type]
		const materialMultiplier = this.materialMultipliers[this.config.material]

		// Size factor
		const sizeFactor =
			(this.config.width * this.config.height * this.config.depth) /
			(180 * 220 * 60)

		// Base calculation
		let price = basePrice * materialMultiplier * sizeFactor

		// Add options
		Object.keys(this.config.options).forEach(opt => {
			if (this.config.options[opt]) {
				price += this.optionPrices[opt]
			}
		})

		// Round to nearest 1000
		price = Math.round(price / 1000) * 1000

		// Update display with animation
		const priceEl = document.getElementById('totalPrice')
		if (priceEl) {
			priceEl.classList.add('updating')
			priceEl.textContent = price.toLocaleString('ru-RU') + ' ₽'
			setTimeout(() => priceEl.classList.remove('updating'), 400)
		}
	}

	rotateFurniture(angle) {
		if (!this.furniture) return

		const startRotation = this.furniture.rotation.y
		const endRotation = startRotation + angle
		const duration = 500
		const startTime = Date.now()

		const animate = () => {
			const elapsed = Date.now() - startTime
			const progress = Math.min(elapsed / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic

			this.furniture.rotation.y =
				startRotation + (endRotation - startRotation) * eased

			if (progress < 1) {
				requestAnimationFrame(animate)
			}
		}

		animate()
	}

	zoom(factor) {
		const currentPos = this.camera.position
		const direction = currentPos.clone().normalize()
		const distance = currentPos.length() * factor

		// Clamp distance
		const newDistance = Math.max(2, Math.min(10, distance))

		const targetPos = direction.multiplyScalar(newDistance)

		// Animate
		const startPos = currentPos.clone()
		const duration = 300
		const startTime = Date.now()

		const animate = () => {
			const elapsed = Date.now() - startTime
			const progress = Math.min(elapsed / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3)

			this.camera.position.lerpVectors(startPos, targetPos, eased)

			if (progress < 1) {
				requestAnimationFrame(animate)
			}
		}

		animate()
	}

	animateAssembly() {
		if (!this.furniture) return

		const children = []
		this.furniture.traverse(child => {
			if (child.isMesh) {
				children.push(child)
			}
		})

		// Animate each part
		children.forEach((child, index) => {
			const finalY = child.position.y
			child.position.y = finalY + 2
			child.scale.set(0, 0, 0)

			setTimeout(() => {
				const startY = child.position.y
				const duration = 600
				const startTime = Date.now()

				const animate = () => {
					const elapsed = Date.now() - startTime
					const progress = Math.min(elapsed / duration, 1)
					const eased = 1 - Math.pow(1 - progress, 3)

					child.position.y = startY + (finalY - startY) * eased
					const scale = eased
					child.scale.set(scale, scale, scale)

					if (progress < 1) {
						requestAnimationFrame(animate)
					}
				}

				animate()
			}, index * 100)
		})
	}

	saveConfiguration() {
		const configString = JSON.stringify(this.config)
		const encoded = btoa(configString)

		// Update URL
		const url = new URL(window.location.href)
		url.searchParams.set('config', encoded)
		window.history.replaceState({}, '', url)

		// Also save to localStorage
		localStorage.setItem('furnitureConfig', configString)

		return encoded
	}

	loadConfiguration() {
		// Try URL first
		const url = new URL(window.location.href)
		const urlConfig = url.searchParams.get('config')

		if (urlConfig) {
			try {
				const decoded = atob(urlConfig)
				this.config = JSON.parse(decoded)
				this.applyConfigToUI()
				return
			} catch (e) {
				console.log('Invalid URL config')
			}
		}

		// Try localStorage
		const saved = localStorage.getItem('furnitureConfig')
		if (saved) {
			try {
				this.config = JSON.parse(saved)
				this.applyConfigToUI()
			} catch (e) {
				console.log('Invalid saved config')
			}
		}
	}

	applyConfigToUI() {
		// Type buttons
		document.querySelectorAll('.type-btn').forEach(btn => {
			btn.classList.toggle('active', btn.dataset.type === this.config.type)
		})

		// Sliders
		const widthSlider = document.getElementById('dimWidth')
		const heightSlider = document.getElementById('dimHeight')
		const depthSlider = document.getElementById('dimDepth')

		if (widthSlider) {
			widthSlider.value = this.config.width
			document.getElementById('dimWidthValue').textContent = this.config.width
		}
		if (heightSlider) {
			heightSlider.value = this.config.height
			document.getElementById('dimHeightValue').textContent = this.config.height
		}
		if (depthSlider) {
			depthSlider.value = this.config.depth
			document.getElementById('dimDepthValue').textContent = this.config.depth
		}

		// Material buttons
		document.querySelectorAll('.material-btn').forEach(btn => {
			btn.classList.toggle(
				'active',
				btn.dataset.material === this.config.material
			)
		})

		// Options
		const lightingCheck = document.getElementById('optLighting')
		const softCloseCheck = document.getElementById('optSoftClose')
		const mirrorCheck = document.getElementById('optMirror')

		if (lightingCheck) lightingCheck.checked = this.config.options.lighting
		if (softCloseCheck) softCloseCheck.checked = this.config.options.softClose
		if (mirrorCheck) mirrorCheck.checked = this.config.options.mirror
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

		// Auto rotate
		if (this.autoRotate && this.furniture) {
			this.furniture.rotation.y += 0.002
		}

		this.renderer.render(this.scene, this.camera)
	}

	dispose() {
		this.isAnimating = false

		if (this.renderer) {
			this.renderer.dispose()
			this.container.removeChild(this.renderer.domElement)
		}

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

// Initialize constructor
document.addEventListener('DOMContentLoaded', () => {
	const constructorEl = document.getElementById('constructor3d')
	if (constructorEl) {
		window.furnitureConstructor = new FurnitureConstructor('constructor3d')
	}
})
