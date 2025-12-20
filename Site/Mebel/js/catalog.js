/* ============================================
   ДРЕВО МАСТЕРОВ - Catalog Page JavaScript
   Filtering, sorting, and pagination
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
	initCatalogFilters()
	initViewToggle()
	initSorting()
	initPriceRange()
	initMeasurementGuide()
	initQuickView()
	initFavorites()
	initURLParams()
})

// ============================================
// Filter State
// ============================================
const filterState = {
	categories: [],
	materials: [],
	styles: [],
	priceMin: 0,
	priceMax: 500000,
	sizes: {
		width: { min: null, max: null },
		height: { min: null, max: null },
		depth: { min: null, max: null },
	},
}

// ============================================
// Catalog Filters
// ============================================
function initCatalogFilters() {
	const filterCheckboxes = document.querySelectorAll('.filter-checkbox input')
	const applyBtn = document.getElementById('applyFilters')
	const resetBtn = document.getElementById('resetFilters')

	// Checkbox change handlers
	filterCheckboxes.forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			updateFilterState()
			// Auto-apply on change for better UX
			applyFilters()
		})
	})

	// Apply button
	if (applyBtn) {
		applyBtn.addEventListener('click', applyFilters)
	}

	// Reset button
	if (resetBtn) {
		resetBtn.addEventListener('click', resetFilters)
	}
}

function updateFilterState() {
	// Get checked categories
	filterState.categories = Array.from(
		document.querySelectorAll('input[data-filter="category"]:checked')
	)
		.map(cb => cb.value)
		.filter(v => v !== 'all')

	// Get checked materials
	filterState.materials = Array.from(
		document.querySelectorAll('input[data-filter="material"]:checked')
	).map(cb => cb.value)

	// Get checked styles
	filterState.styles = Array.from(
		document.querySelectorAll('input[data-filter="style"]:checked')
	).map(cb => cb.value)
}

function applyFilters() {
	const products = document.querySelectorAll('.product-card')
	let visibleCount = 0

	products.forEach(product => {
		const category = product.dataset.category
		const material = product.dataset.material
		const style = product.dataset.style
		const price = parseInt(product.dataset.price)

		let show = true

		// Category filter
		if (
			filterState.categories.length > 0 &&
			!filterState.categories.includes(category)
		) {
			show = false
		}

		// Material filter
		if (
			filterState.materials.length > 0 &&
			!filterState.materials.includes(material)
		) {
			show = false
		}

		// Style filter
		if (filterState.styles.length > 0 && !filterState.styles.includes(style)) {
			show = false
		}

		// Price filter
		if (price < filterState.priceMin || price > filterState.priceMax) {
			show = false
		}

		// Apply visibility with animation
		if (show) {
			product.style.display = ''
			setTimeout(() => {
				product.style.opacity = '1'
				product.style.transform = 'scale(1)'
			}, 50)
			visibleCount++
		} else {
			product.style.opacity = '0'
			product.style.transform = 'scale(0.95)'
			setTimeout(() => {
				product.style.display = 'none'
			}, 300)
		}
	})

	// Update results count
	const resultsEl = document.querySelector('.catalog-results strong')
	if (resultsEl) {
		resultsEl.textContent = `${visibleCount} товаров`
	}

	// Update URL
	updateURL()
}

function resetFilters() {
	// Reset checkboxes
	document.querySelectorAll('.filter-checkbox input').forEach(cb => {
		cb.checked = cb.value === 'all'
	})

	// Reset price
	const priceMin = document.getElementById('priceMin')
	const priceMax = document.getElementById('priceMax')
	if (priceMin) priceMin.value = 30000
	if (priceMax) priceMax.value = 500000

	// Reset size inputs
	document.querySelectorAll('.size-range input').forEach(input => {
		input.value = ''
	})

	// Reset state
	filterState.categories = []
	filterState.materials = []
	filterState.styles = []
	filterState.priceMin = 0
	filterState.priceMax = 500000

	// Apply filters
	applyFilters()
}

// ============================================
// View Toggle (Grid/List)
// ============================================
function initViewToggle() {
	const viewBtns = document.querySelectorAll('.view-btn')
	const productsGrid = document.getElementById('productsGrid')

	viewBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const view = btn.dataset.view

			// Update active button
			viewBtns.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')

			// Update grid class
			if (productsGrid) {
				productsGrid.classList.toggle('view-list', view === 'list')
			}

			// Save preference
			localStorage.setItem('catalogView', view)
		})
	})

	// Restore saved preference
	const savedView = localStorage.getItem('catalogView')
	if (savedView) {
		const btn = document.querySelector(`.view-btn[data-view="${savedView}"]`)
		if (btn) btn.click()
	}
}

// ============================================
// Sorting
// ============================================
function initSorting() {
	const sortSelect = document.getElementById('sortSelect')

	if (sortSelect) {
		sortSelect.addEventListener('change', () => {
			const sortBy = sortSelect.value
			sortProducts(sortBy)
		})
	}
}

function sortProducts(sortBy) {
	const grid = document.getElementById('productsGrid')
	if (!grid) return

	const products = Array.from(grid.querySelectorAll('.product-card'))

	products.sort((a, b) => {
		const priceA = parseInt(a.dataset.price)
		const priceB = parseInt(b.dataset.price)

		switch (sortBy) {
			case 'price-asc':
				return priceA - priceB
			case 'price-desc':
				return priceB - priceA
			case 'new':
				// Sort by badge (new first)
				const hasNewA = a.querySelector('.product-badge--new') ? 1 : 0
				const hasNewB = b.querySelector('.product-badge--new') ? 1 : 0
				return hasNewB - hasNewA
			default:
				// Popular - by hit badge
				const hasHitA = a.querySelector(
					'.product-badge:not(.product-badge--new):not(.product-badge--sale)'
				)
					? 1
					: 0
				const hasHitB = b.querySelector(
					'.product-badge:not(.product-badge--new):not(.product-badge--sale)'
				)
					? 1
					: 0
				return hasHitB - hasHitA
		}
	})

	// Animate reorder
	products.forEach((product, index) => {
		product.style.order = index
		product.style.opacity = '0'
		product.style.transform = 'translateY(20px)'

		setTimeout(() => {
			product.style.opacity = '1'
			product.style.transform = 'translateY(0)'
		}, index * 50)
	})

	// Re-append in new order
	products.forEach(product => {
		grid.appendChild(product)
	})
}

// ============================================
// Price Range Slider
// ============================================
function initPriceRange() {
	const minInput = document.getElementById('priceMin')
	const maxInput = document.getElementById('priceMax')
	const minRange = document.getElementById('priceRangeMin')
	const maxRange = document.getElementById('priceRangeMax')
	const track = document.querySelector('.price-track')

	if (!minInput || !maxInput) return

	function updateTrack() {
		const min = parseInt(minRange?.value || minInput.value)
		const max = parseInt(maxRange?.value || maxInput.value)
		const maxVal = 500000

		const minPercent = (min / maxVal) * 100
		const maxPercent = (max / maxVal) * 100

		if (track) {
			track.style.left = minPercent + '%'
			track.style.width = maxPercent - minPercent + '%'
		}

		filterState.priceMin = min
		filterState.priceMax = max
	}

	// Input change handlers
	minInput.addEventListener('input', () => {
		if (minRange) minRange.value = minInput.value
		updateTrack()
	})

	maxInput.addEventListener('input', () => {
		if (maxRange) maxRange.value = maxInput.value
		updateTrack()
	})

	if (minRange) {
		minRange.addEventListener('input', () => {
			minInput.value = minRange.value
			updateTrack()
		})
	}

	if (maxRange) {
		maxRange.addEventListener('input', () => {
			maxInput.value = maxRange.value
			updateTrack()
		})
	}

	// Apply on blur
	;[minInput, maxInput].forEach(input => {
		input.addEventListener('blur', applyFilters)
	})

	// Initialize
	updateTrack()
}

// ============================================
// Measurement Guide Toggle
// ============================================
function initMeasurementGuide() {
	const toggleBtn = document.getElementById('guideToggle')
	const content = document.getElementById('guideContent')

	if (toggleBtn && content) {
		toggleBtn.addEventListener('click', () => {
			toggleBtn.classList.toggle('open')
			content.classList.toggle('open')

			const span = toggleBtn.querySelector('span')
			if (span) {
				span.textContent = content.classList.contains('open')
					? 'Свернуть'
					: 'Развернуть'
			}
		})
	}
}

// ============================================
// Quick View Modal
// ============================================
function initQuickView() {
	const quickViewBtns = document.querySelectorAll(
		'.action-btn[title="Быстрый просмотр"]'
	)

	quickViewBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			const card = btn.closest('.product-card')
			if (card) {
				showQuickView(card)
			}
		})
	})
}

function showQuickView(productCard) {
	// Get product data
	const name = productCard.querySelector('.product-name a')?.textContent || ''
	const material =
		productCard.querySelector('.product-material')?.textContent || ''
	const sizes = productCard.querySelector('.product-sizes')?.textContent || ''
	const price = productCard.querySelector('.price-current')?.textContent || ''
	const image = productCard.querySelector('.product-image img')?.src || ''

	// Create modal
	const modal = document.createElement('div')
	modal.className = 'modal active'
	modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content" style="max-width: 800px;">
            <button class="modal-close">&times;</button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="aspect-ratio: 1; background: #f5f5f5; border-radius: 12px; overflow: hidden;">
                    <img src="${image}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div>
                    <h3 style="font-family: var(--font-display); font-size: 1.75rem; margin-bottom: 1rem;">${name}</h3>
                    <p style="color: var(--gray-500); margin-bottom: 0.5rem;">${material}</p>
                    <p style="color: var(--gray-400); margin-bottom: 1.5rem;">${sizes}</p>
                    <p style="font-family: var(--font-accent); font-size: 1.75rem; font-weight: 700; color: var(--charcoal); margin-bottom: 1.5rem;">${price}</p>
                    <a href="${
											productCard.querySelector('.product-name a')?.href || '#'
										}" class="btn btn-primary btn-full">Перейти к товару</a>
                </div>
            </div>
        </div>
    `

	document.body.appendChild(modal)
	document.body.style.overflow = 'hidden'

	// Close handlers
	modal
		.querySelector('.modal-close')
		.addEventListener('click', () => closeModal(modal))
	modal
		.querySelector('.modal-backdrop')
		.addEventListener('click', () => closeModal(modal))
}

function closeModal(modal) {
	modal.classList.remove('active')
	document.body.style.overflow = ''
	setTimeout(() => modal.remove(), 300)
}

// ============================================
// Favorites
// ============================================
function initFavorites() {
	const favoritesBtns = document.querySelectorAll(
		'.action-btn[title="В избранное"]'
	)

	// Load saved favorites
	const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

	favoritesBtns.forEach(btn => {
		const card = btn.closest('.product-card')
		const productId = card
			?.querySelector('.product-name a')
			?.href?.split('id=')[1]

		// Check if already favorite
		if (productId && favorites.includes(productId)) {
			btn.classList.add('active')
			btn.querySelector('svg')?.setAttribute('fill', 'currentColor')
		}

		btn.addEventListener('click', e => {
			e.preventDefault()

			if (!productId) return

			const isFavorite = favorites.includes(productId)

			if (isFavorite) {
				// Remove from favorites
				const index = favorites.indexOf(productId)
				favorites.splice(index, 1)
				btn.classList.remove('active')
				btn.querySelector('svg')?.setAttribute('fill', 'none')
			} else {
				// Add to favorites
				favorites.push(productId)
				btn.classList.add('active')
				btn.querySelector('svg')?.setAttribute('fill', 'currentColor')

				// Animate
				btn.style.transform = 'scale(1.2)'
				setTimeout(() => {
					btn.style.transform = ''
				}, 200)
			}

			// Save to localStorage
			localStorage.setItem('favorites', JSON.stringify(favorites))
		})
	})
}

// ============================================
// URL Parameters
// ============================================
function initURLParams() {
	const params = new URLSearchParams(window.location.search)

	// Handle category from URL
	const cat = params.get('cat')
	if (cat) {
		const checkbox = document.querySelector(
			`input[data-filter="category"][value="${cat}"]`
		)
		if (checkbox) {
			// Uncheck "all"
			const allCheckbox = document.querySelector(
				'input[data-filter="category"][value="all"]'
			)
			if (allCheckbox) allCheckbox.checked = false

			// Check specific category
			checkbox.checked = true
			updateFilterState()
			applyFilters()
		}
	}
}

function updateURL() {
	const params = new URLSearchParams()

	// Add categories
	if (filterState.categories.length > 0) {
		params.set('cat', filterState.categories.join(','))
	}

	// Add materials
	if (filterState.materials.length > 0) {
		params.set('mat', filterState.materials.join(','))
	}

	// Add styles
	if (filterState.styles.length > 0) {
		params.set('style', filterState.styles.join(','))
	}

	// Update URL without reload
	const newURL = params.toString()
		? `?${params.toString()}`
		: window.location.pathname
	window.history.replaceState({}, '', newURL)
}

// ============================================
// Mobile Filter Panel
// ============================================
function initMobileFilters() {
	// Create mobile filter button
	const filterBtn = document.createElement('button')
	filterBtn.className = 'filter-mobile-btn'
	filterBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"/>
            <line x1="4" y1="10" x2="4" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="3"/>
            <line x1="20" y1="21" x2="20" y2="16"/>
            <line x1="20" y1="12" x2="20" y2="3"/>
            <line x1="1" y1="14" x2="7" y2="14"/>
            <line x1="9" y1="8" x2="15" y2="8"/>
            <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
        Фильтры
    `

	const sidebar = document.querySelector('.catalog-sidebar')

	filterBtn.addEventListener('click', () => {
		sidebar?.classList.toggle('open')
		document.body.style.overflow = sidebar?.classList.contains('open')
			? 'hidden'
			: ''
	})

	// Add close button to sidebar
	if (sidebar) {
		const closeBtn = document.createElement('button')
		closeBtn.className = 'sidebar-close'
		closeBtn.innerHTML = '&times;'
		closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            display: none;
            align-items: center;
            justify-content: center;
            background: var(--gray-100);
            border-radius: 50%;
        `

		closeBtn.addEventListener('click', () => {
			sidebar.classList.remove('open')
			document.body.style.overflow = ''
		})

		sidebar.insertBefore(closeBtn, sidebar.firstChild)

		// Show close button on mobile
		if (window.innerWidth < 1024) {
			closeBtn.style.display = 'flex'
		}
	}

	document.body.appendChild(filterBtn)
}

// Initialize mobile filters
if (window.innerWidth < 1024) {
	initMobileFilters()
}
