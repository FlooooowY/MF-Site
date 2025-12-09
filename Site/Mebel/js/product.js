/* ============================================
   ДРЕВО МАСТЕРОВ - Product Page JavaScript
   3D viewer, configurator, and interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
	initProduct3D()
	initGalleryThumbs()
	initSizeControls()
	initMaterialSelector()
	initOptionsSelector()
	initTabs()
	initOrderModal()
	initFavoriteButton()
	calculatePrice()
})

// ============================================
// Product Configuration State
// ============================================
const productConfig = {
	basePrice: 185000,
	width: 180,
	height: 220,
	depth: 60,
	material: 'oak',
	materialPrice: 0,
	options: {
		led: false,
		softClose: false,
		mirror: false,
		drawers: false,
	},
}

// ============================================
// 3D Product Viewer
// ============================================
let scene, camera, renderer, furniture
let isRotating = true

function initProduct3D() {
	const container = document.getElementById('product3d')
	if (!container) return

	// Scene setup
	scene = new THREE.Scene()
	scene.background = new THREE.Color(0x2d2d2d)

	// Camera
	const aspect = container.clientWidth / container.clientHeight
	camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100)
	camera.position.set(3, 2, 4)
	camera.lookAt(0, 1, 0)

	// Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setSize(container.clientWidth, container.clientHeight)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.shadowMap.enabled = true
	container.appendChild(renderer.domElement)

	// Lights
	const ambient = new THREE.AmbientLight(0x404040, 0.6)
	scene.add(ambient)

	const mainLight = new THREE.DirectionalLight(0xffffff, 0.8)
	mainLight.position.set(5, 10, 5)
	mainLight.castShadow = true
	scene.add(mainLight)

	const fillLight = new THREE.DirectionalLight(0xd2b48c, 0.3)
	fillLight.position.set(-5, 5, -5)
	scene.add(fillLight)

	// Create furniture
	createFurnitureModel()

	// Grid
	const grid = new THREE.GridHelper(10, 20, 0x444444, 0x333333)
	scene.add(grid)

	// Controls
	initViewerControls(container)

	// Animation loop
	animate()

	// Resize handler
	window.addEventListener('resize', () => {
		camera.aspect = container.clientWidth / container.clientHeight
		camera.updateProjectionMatrix()
		renderer.setSize(container.clientWidth, container.clientHeight)
	})
}

function createFurnitureModel() {
	if (furniture) {
		scene.remove(furniture)
	}

	furniture = new THREE.Group()

	const w = productConfig.width / 100
	const h = productConfig.height / 100
	const d = productConfig.depth / 100

	// Material colors
	const materials = {
		oak: 0xc4a35a,
		walnut: 0x5d4037,
		ash: 0xe8dcc8,
		cherry: 0x8b4513,
	}

	const woodMaterial = new THREE.MeshStandardMaterial({
		color: materials[productConfig.material],
		roughness: 0.7,
		metalness: 0.1,
	})

	const metalMaterial = new THREE.MeshStandardMaterial({
		color: 0x8b7355,
		roughness: 0.3,
		metalness: 0.8,
	})

	// Main body
	const bodyGeo = new THREE.BoxGeometry(w, h, d)
	const body = new THREE.Mesh(bodyGeo, woodMaterial)
	body.position.y = h / 2
	body.castShadow = true
	body.receiveShadow = true
	furniture.add(body)

	// Doors
	const doorWidth = w / 2 - 0.02
	const doorGeo = new THREE.BoxGeometry(doorWidth, h - 0.1, 0.03)

	// Left door
	const leftDoor = new THREE.Mesh(doorGeo, woodMaterial)
	leftDoor.position.set(-w / 4, h / 2, d / 2 + 0.02)
	leftDoor.castShadow = true
	furniture.add(leftDoor)

	// Right door (or mirror)
	if (productConfig.options.mirror) {
		const mirrorMaterial = new THREE.MeshStandardMaterial({
			color: 0xcccccc,
			roughness: 0,
			metalness: 1,
		})
		const rightDoor = new THREE.Mesh(doorGeo, mirrorMaterial)
		rightDoor.position.set(w / 4, h / 2, d / 2 + 0.02)
		rightDoor.castShadow = true
		furniture.add(rightDoor)
	} else {
		const rightDoor = new THREE.Mesh(doorGeo, woodMaterial)
		rightDoor.position.set(w / 4, h / 2, d / 2 + 0.02)
		rightDoor.castShadow = true
		furniture.add(rightDoor)
	}

	// Handles
	const handleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 16)

	const leftHandle = new THREE.Mesh(handleGeo, metalMaterial)
	leftHandle.rotation.x = Math.PI / 2
	leftHandle.position.set(-0.08, h / 2, d / 2 + 0.06)
	furniture.add(leftHandle)

	const rightHandle = new THREE.Mesh(handleGeo, metalMaterial)
	rightHandle.rotation.x = Math.PI / 2
	rightHandle.position.set(0.08, h / 2, d / 2 + 0.06)
	furniture.add(rightHandle)

	// Crown molding
	const crownGeo = new THREE.BoxGeometry(w + 0.06, 0.06, d + 0.06)
	const crown = new THREE.Mesh(crownGeo, woodMaterial)
	crown.position.y = h + 0.03
	crown.castShadow = true
	furniture.add(crown)

	// Base
	const baseGeo = new THREE.BoxGeometry(w + 0.04, 0.08, d + 0.04)
	const base = new THREE.Mesh(baseGeo, woodMaterial)
	base.position.y = 0.04
	base.castShadow = true
	furniture.add(base)

	// LED lighting
	if (productConfig.options.led) {
		const lightGeo = new THREE.BoxGeometry(w - 0.1, 0.02, d - 0.1)
		const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffcc })
		const light = new THREE.Mesh(lightGeo, lightMat)
		light.position.y = h - 0.05
		furniture.add(light)

		const pointLight = new THREE.PointLight(0xffffcc, 0.5, 2)
		pointLight.position.y = h - 0.1
		furniture.add(pointLight)
	}

	scene.add(furniture)
}

function initViewerControls(container) {
	let isDragging = false
	let previousX = 0

	container.addEventListener('mousedown', e => {
		isDragging = true
		isRotating = false
		previousX = e.clientX
	})

	container.addEventListener('mousemove', e => {
		if (isDragging && furniture) {
			const deltaX = e.clientX - previousX
			furniture.rotation.y += deltaX * 0.005
			previousX = e.clientX
		}
	})

	container.addEventListener('mouseup', () => {
		isDragging = false
	})

	container.addEventListener('mouseleave', () => {
		isDragging = false
	})

	// Touch controls
	container.addEventListener('touchstart', e => {
		isDragging = true
		isRotating = false
		previousX = e.touches[0].clientX
	})

	container.addEventListener('touchmove', e => {
		if (isDragging && furniture) {
			const deltaX = e.touches[0].clientX - previousX
			furniture.rotation.y += deltaX * 0.005
			previousX = e.touches[0].clientX
		}
	})

	container.addEventListener('touchend', () => {
		isDragging = false
	})

	// Button controls
	document.getElementById('rotateLeftBtn')?.addEventListener('click', () => {
		rotateFurniture(-Math.PI / 4)
	})

	document.getElementById('rotateRightBtn')?.addEventListener('click', () => {
		rotateFurniture(Math.PI / 4)
	})

	document.getElementById('zoomInBtn')?.addEventListener('click', () => {
		zoomCamera(0.8)
	})

	document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
		zoomCamera(1.2)
	})
}

function rotateFurniture(angle) {
	if (!furniture) return

	isRotating = false
	const startRotation = furniture.rotation.y
	const endRotation = startRotation + angle
	const duration = 500
	const startTime = Date.now()

	const animateRotation = () => {
		const elapsed = Date.now() - startTime
		const progress = Math.min(elapsed / duration, 1)
		const eased = 1 - Math.pow(1 - progress, 3)

		furniture.rotation.y = startRotation + (endRotation - startRotation) * eased

		if (progress < 1) {
			requestAnimationFrame(animateRotation)
		}
	}

	animateRotation()
}

function zoomCamera(factor) {
	const currentPos = camera.position
	const distance = currentPos.length() * factor
	const newDistance = Math.max(2, Math.min(8, distance))
	const direction = currentPos.clone().normalize()
	const targetPos = direction.multiplyScalar(newDistance)

	const startPos = currentPos.clone()
	const duration = 300
	const startTime = Date.now()

	const animateZoom = () => {
		const elapsed = Date.now() - startTime
		const progress = Math.min(elapsed / duration, 1)
		const eased = 1 - Math.pow(1 - progress, 3)

		camera.position.lerpVectors(startPos, targetPos, eased)

		if (progress < 1) {
			requestAnimationFrame(animateZoom)
		}
	}

	animateZoom()
}

function animate() {
	requestAnimationFrame(animate)

	if (isRotating && furniture) {
		furniture.rotation.y += 0.002
	}

	renderer.render(scene, camera)
}

// ============================================
// Gallery Thumbnails
// ============================================
function initGalleryThumbs() {
	const thumbs = document.querySelectorAll('.thumb')
	const galleryMain = document.querySelector('.gallery-main')
	const gallery3d = document.querySelector('.gallery-3d')

	thumbs.forEach(thumb => {
		thumb.addEventListener('click', () => {
			thumbs.forEach(t => t.classList.remove('active'))
			thumb.classList.add('active')

			const view = thumb.dataset.view

			if (view === '3d') {
				// Show 3D viewer
				gallery3d.style.display = 'block'
				// Remove any static image
				const staticImg = galleryMain.querySelector('.static-image')
				if (staticImg) staticImg.remove()
			} else if (view === 'video') {
				// Show video placeholder
				gallery3d.style.display = 'none'
				showVideoPlaceholder(galleryMain)
			} else {
				// Show static image
				gallery3d.style.display = 'none'
				showStaticImage(galleryMain, thumb.querySelector('img')?.src)
			}
		})
	})
}

function showStaticImage(container, src) {
	// Remove existing static image
	const existing = container.querySelector('.static-image')
	if (existing) existing.remove()

	const img = document.createElement('img')
	img.className = 'static-image'
	img.src = src
	img.style.cssText =
		'width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;'
	container.appendChild(img)
}

function showVideoPlaceholder(container) {
	const existing = container.querySelector('.static-image')
	if (existing) existing.remove()

	const placeholder = document.createElement('div')
	placeholder.className = 'static-image'
	placeholder.style.cssText = `
        width: 100%; height: 100%; position: absolute; top: 0; left: 0;
        display: flex; align-items: center; justify-content: center;
        background: #1a1a1a; color: white; flex-direction: column; gap: 1rem;
    `
	placeholder.innerHTML = `
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span>Видео процесса изготовления</span>
    `
	container.appendChild(placeholder)
}

// ============================================
// Size Controls
// ============================================
function initSizeControls() {
	const sizeInputs = document.querySelectorAll('.size-input-group')

	sizeInputs.forEach(group => {
		const input = group.querySelector('input')
		const minusBtn = group.querySelector('.minus')
		const plusBtn = group.querySelector('.plus')

		minusBtn?.addEventListener('click', () => {
			const step = parseInt(input.step) || 10
			const min = parseInt(input.min) || 0
			const newVal = Math.max(min, parseInt(input.value) - step)
			input.value = newVal
			updateSize(input)
		})

		plusBtn?.addEventListener('click', () => {
			const step = parseInt(input.step) || 10
			const max = parseInt(input.max) || 999
			const newVal = Math.min(max, parseInt(input.value) + step)
			input.value = newVal
			updateSize(input)
		})

		input?.addEventListener('change', () => updateSize(input))
	})
}

function updateSize(input) {
	const id = input.id
	const value = parseInt(input.value)

	if (id === 'productWidth') productConfig.width = value
	if (id === 'productHeight') productConfig.height = value
	if (id === 'productDepth') productConfig.depth = value

	createFurnitureModel()
	calculatePrice()
}

// ============================================
// Material Selector
// ============================================
function initMaterialSelector() {
	const materialBtns = document.querySelectorAll('.material-option')

	materialBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			materialBtns.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')

			productConfig.material = btn.dataset.material
			productConfig.materialPrice = parseInt(btn.dataset.price) || 0

			createFurnitureModel()
			calculatePrice()
		})
	})
}

// ============================================
// Options Selector
// ============================================
function initOptionsSelector() {
	const optionInputs = document.querySelectorAll('.option-item input')

	optionInputs.forEach(input => {
		input.addEventListener('change', () => {
			const optionId = input.id.replace('opt', '').toLowerCase()
			productConfig.options[optionId] = input.checked

			// Recreate model if mirror option changed
			if (optionId === 'mirror' || optionId === 'led') {
				createFurnitureModel()
			}

			calculatePrice()
		})
	})
}

// ============================================
// Price Calculator
// ============================================
function calculatePrice() {
	// Base price adjusted for size
	const baseSizeFactor =
		(productConfig.width * productConfig.height * productConfig.depth) /
		(180 * 220 * 60)
	let price = productConfig.basePrice * baseSizeFactor

	// Add material price
	price += productConfig.materialPrice

	// Add options
	if (productConfig.options.led) price += 15000
	if (productConfig.options.softclose) price += 8000
	if (productConfig.options.mirror) price += 12000
	if (productConfig.options.drawers) price += 25000

	// Round to nearest 1000
	price = Math.round(price / 1000) * 1000

	// Update display
	const priceEl = document.getElementById('customPrice')
	if (priceEl) {
		priceEl.textContent = price.toLocaleString('ru-RU') + ' ₽'
		priceEl.classList.add('updating')
		setTimeout(() => priceEl.classList.remove('updating'), 300)
	}

	return price
}

// ============================================
// Tabs
// ============================================
function initTabs() {
	const tabBtns = document.querySelectorAll('.tab-btn')
	const tabPanels = document.querySelectorAll('.tab-panel')

	tabBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const tabId = btn.dataset.tab

			tabBtns.forEach(b => b.classList.remove('active'))
			tabPanels.forEach(p => p.classList.remove('active'))

			btn.classList.add('active')
			document.getElementById(`tab-${tabId}`)?.classList.add('active')
		})
	})
}

// ============================================
// Order Modal
// ============================================
function initOrderModal() {
	const orderBtn = document.getElementById('orderBtn')
	const orderModal = document.getElementById('orderModal')

	orderBtn?.addEventListener('click', () => {
		// Update order summary
		const orderPrice = document.getElementById('orderPrice')
		const orderConfig = document.getElementById('orderConfig')

		if (orderPrice) {
			orderPrice.textContent = calculatePrice().toLocaleString('ru-RU') + ' ₽'
		}

		if (orderConfig) {
			const configItems = []
			configItems.push(
				`Размеры: ${productConfig.width}×${productConfig.height}×${productConfig.depth} см`
			)

			const materialNames = {
				oak: 'Дуб',
				walnut: 'Орех',
				ash: 'Ясень',
				cherry: 'Вишня',
			}
			configItems.push(`Материал: ${materialNames[productConfig.material]}`)

			const selectedOptions = []
			if (productConfig.options.led) selectedOptions.push('LED подсветка')
			if (productConfig.options.softclose) selectedOptions.push('Доводчики')
			if (productConfig.options.mirror) selectedOptions.push('Зеркало')
			if (productConfig.options.drawers) selectedOptions.push('Выдвижные ящики')

			if (selectedOptions.length > 0) {
				configItems.push(`Опции: ${selectedOptions.join(', ')}`)
			}

			orderConfig.innerHTML = configItems.join('<br>')
		}

		orderModal?.classList.add('active')
		document.body.style.overflow = 'hidden'
	})

	// Close modal handlers
	orderModal?.querySelector('.modal-close')?.addEventListener('click', () => {
		orderModal.classList.remove('active')
		document.body.style.overflow = ''
	})

	orderModal
		?.querySelector('.modal-backdrop')
		?.addEventListener('click', () => {
			orderModal.classList.remove('active')
			document.body.style.overflow = ''
		})

	// Form submission
	const orderForm = document.getElementById('orderForm')
	orderForm?.addEventListener('submit', async e => {
		e.preventDefault()

		const submitBtn = orderForm.querySelector('button[type="submit"]')
		submitBtn.classList.add('loading')
		submitBtn.disabled = true

		// Simulate submission
		await new Promise(resolve => setTimeout(resolve, 2000))

		submitBtn.classList.remove('loading')
		submitBtn.disabled = false

		orderModal.classList.remove('active')

		// Show success message
		alert('Спасибо! Ваш заказ принят. Мы свяжемся с вами в ближайшее время.')
	})
}

// ============================================
// Favorite Button
// ============================================
function initFavoriteButton() {
	const favoriteBtn = document.getElementById('favoriteBtn')

	// Get product ID from URL
	const urlParams = new URLSearchParams(window.location.search)
	const productId = urlParams.get('id') || '1'

	// Load favorites
	const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

	// Check if already favorite
	if (favorites.includes(productId)) {
		favoriteBtn?.classList.add('active')
	}

	favoriteBtn?.addEventListener('click', () => {
		const isFavorite = favorites.includes(productId)

		if (isFavorite) {
			const index = favorites.indexOf(productId)
			favorites.splice(index, 1)
			favoriteBtn.classList.remove('active')
		} else {
			favorites.push(productId)
			favoriteBtn.classList.add('active')

			// Animate
			favoriteBtn.style.transform = 'scale(1.2)'
			setTimeout(() => {
				favoriteBtn.style.transform = ''
			}, 200)
		}

		localStorage.setItem('favorites', JSON.stringify(favorites))
	})
}
