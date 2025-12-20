/* ============================================
   ДРЕВО МАСТЕРОВ - Main JavaScript
   Core functionality and interactions
   ============================================ */

// Global state
const state = {
	isMenuOpen: false,
	currentReview: 0,
	totalReviews: 3,
	soundEnabled: false,
	scrollPosition: 0,
	lastScrollPosition: 0,
}

// DOM Elements
const elements = {
	preloader: document.getElementById('preloader'),
	header: document.getElementById('header'),
	burger: document.getElementById('burger'),
	mobileMenu: document.getElementById('mobileMenu'),
	reviewsTrack: document.getElementById('reviewsTrack'),
	reviewsPrev: document.getElementById('reviewsPrev'),
	reviewsNext: document.getElementById('reviewsNext'),
	reviewsDots: document.getElementById('reviewsDots'),
	contactForm: document.getElementById('contactForm'),
	uploadArea: document.getElementById('uploadArea'),
	uploadPreview: document.getElementById('uploadPreview'),
	successModal: document.getElementById('successModal'),
	arModal: document.getElementById('arModal'),
	sawdustContainer: document.getElementById('sawdustContainer'),
}

// ============================================
// Preloader
// ============================================
function initPreloader() {
	window.addEventListener('load', () => {
		setTimeout(() => {
			elements.preloader.classList.add('hidden')
			document.body.style.overflow = ''
			initAnimations()
		}, 2000)
	})
}

// ============================================
// Header Scroll Behavior
// ============================================
function initHeader() {
	let lastScrollY = window.scrollY
	let ticking = false

	function updateHeader() {
		const scrollY = window.scrollY

		// Add/remove scrolled class
		if (scrollY > 50) {
			elements.header.classList.add('scrolled')
		} else {
			elements.header.classList.remove('scrolled')
		}

		// Hide/show header on scroll
		if (scrollY > lastScrollY && scrollY > 200) {
			elements.header.classList.add('hidden')
		} else {
			elements.header.classList.remove('hidden')
		}

		lastScrollY = scrollY
		ticking = false
	}

	window.addEventListener('scroll', () => {
		if (!ticking) {
			requestAnimationFrame(updateHeader)
			ticking = true
		}
	})
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
	elements.burger.addEventListener('click', toggleMenu)

	// Close menu on link click
	const mobileLinks = elements.mobileMenu.querySelectorAll('a')
	mobileLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (state.isMenuOpen) toggleMenu()
		})
	})

	// Close menu on escape key
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && state.isMenuOpen) {
			toggleMenu()
		}
	})
}

function toggleMenu() {
	state.isMenuOpen = !state.isMenuOpen
	elements.burger.classList.toggle('active')
	elements.mobileMenu.classList.toggle('active')
	document.body.classList.toggle('menu-open')
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
	const links = document.querySelectorAll('a[href^="#"]')

	links.forEach(link => {
		link.addEventListener('click', e => {
			const href = link.getAttribute('href')
			if (href === '#') return

			const target = document.querySelector(href)
			if (target) {
				e.preventDefault()
				const headerOffset = 80
				const elementPosition = target.getBoundingClientRect().top
				const offsetPosition =
					elementPosition + window.pageYOffset - headerOffset

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		})
	})
}

// ============================================
// Gallery Filters
// ============================================
function initGalleryFilters() {
	const filters = document.querySelectorAll('.gallery-filter')
	const items = document.querySelectorAll('.gallery-item')

	filters.forEach(filter => {
		filter.addEventListener('click', () => {
			const category = filter.dataset.filter

			// Update active filter
			filters.forEach(f => f.classList.remove('active'))
			filter.classList.add('active')

			// Filter items
			items.forEach(item => {
				const itemCategory = item.dataset.category

				if (category === 'all' || itemCategory === category) {
					item.style.display = ''
					setTimeout(() => {
						item.style.opacity = '1'
						item.style.transform = 'scale(1)'
					}, 50)
				} else {
					item.style.opacity = '0'
					item.style.transform = 'scale(0.8)'
					setTimeout(() => {
						item.style.display = 'none'
					}, 300)
				}
			})

			// Play sound
			playSound('click')
		})
	})
}

// ============================================
// Reviews Slider
// ============================================
function initReviewsSlider() {
	if (!elements.reviewsTrack) return

	elements.reviewsPrev.addEventListener('click', () => {
		if (state.currentReview > 0) {
			state.currentReview--
			updateReviewsSlider()
			playSound('slide')
		}
	})

	elements.reviewsNext.addEventListener('click', () => {
		if (state.currentReview < state.totalReviews - 1) {
			state.currentReview++
			updateReviewsSlider()
			playSound('slide')
		}
	})

	// Dots navigation
	const dots = elements.reviewsDots.querySelectorAll('.dot')
	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			state.currentReview = index
			updateReviewsSlider()
		})
	})

	// Auto-play
	setInterval(() => {
		state.currentReview = (state.currentReview + 1) % state.totalReviews
		updateReviewsSlider()
	}, 6000)
}

function updateReviewsSlider() {
	const offset = state.currentReview * -100
	elements.reviewsTrack.style.transform = `translateX(${offset}%)`

	// Update dots
	const dots = elements.reviewsDots.querySelectorAll('.dot')
	dots.forEach((dot, index) => {
		dot.classList.toggle('active', index === state.currentReview)
	})

	// Update cards
	const cards = elements.reviewsTrack.querySelectorAll('.review-card')
	cards.forEach((card, index) => {
		card.classList.toggle('active', index === state.currentReview)
	})
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
	if (!elements.contactForm) return

	// Phone mask
	const phoneInput = document.getElementById('formPhone')
	if (phoneInput) {
		phoneInput.addEventListener('input', e => {
			let value = e.target.value.replace(/\D/g, '')
			if (value.length > 0) {
				if (value[0] === '7' || value[0] === '8') {
					value = value.substring(1)
				}
				let formatted = '+7'
				if (value.length > 0) formatted += ' (' + value.substring(0, 3)
				if (value.length > 3) formatted += ') ' + value.substring(3, 6)
				if (value.length > 6) formatted += '-' + value.substring(6, 8)
				if (value.length > 8) formatted += '-' + value.substring(8, 10)
				e.target.value = formatted
			}
		})
	}

	// Form submission
	elements.contactForm.addEventListener('submit', async e => {
		e.preventDefault()

		const submitBtn = elements.contactForm.querySelector(
			'button[type="submit"]'
		)
		submitBtn.classList.add('loading')

		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 2000))

		submitBtn.classList.remove('loading')
		showModal('successModal')
		elements.contactForm.reset()

		playSound('success')
	})
}

// ============================================
// File Upload
// ============================================
function initFileUpload() {
	if (!elements.uploadArea) return

	const fileInput = document.getElementById('formFiles')

	// Drag and drop
	elements.uploadArea.addEventListener('dragover', e => {
		e.preventDefault()
		elements.uploadArea.classList.add('dragover')
	})

	elements.uploadArea.addEventListener('dragleave', () => {
		elements.uploadArea.classList.remove('dragover')
	})

	elements.uploadArea.addEventListener('drop', e => {
		e.preventDefault()
		elements.uploadArea.classList.remove('dragover')

		const files = e.dataTransfer.files
		handleFiles(files)
	})

	// File input change
	fileInput.addEventListener('change', e => {
		handleFiles(e.target.files)
	})
}

function handleFiles(files) {
	elements.uploadPreview.innerHTML = ''

	Array.from(files).forEach(file => {
		if (file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = e => {
				const img = document.createElement('img')
				img.src = e.target.result
				elements.uploadPreview.appendChild(img)
			}
			reader.readAsDataURL(file)
		}
	})
}

// ============================================
// Modals
// ============================================
function showModal(modalId) {
	const modal = document.getElementById(modalId)
	if (modal) {
		modal.classList.add('active')
		document.body.style.overflow = 'hidden'
	}
}

function hideModal(modalId) {
	const modal = document.getElementById(modalId)
	if (modal) {
		modal.classList.remove('active')
		document.body.style.overflow = ''
	}
}

function initModals() {
	// Close buttons
	document.querySelectorAll('.modal-close, [id$="ModalClose"]').forEach(btn => {
		btn.addEventListener('click', () => {
			const modal = btn.closest('.modal')
			if (modal) {
				hideModal(modal.id)
			}
		})
	})

	// Close on backdrop click
	document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
		backdrop.addEventListener('click', () => {
			const modal = backdrop.closest('.modal')
			if (modal) {
				hideModal(modal.id)
			}
		})
	})

	// Close on escape
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
			document.querySelectorAll('.modal.active').forEach(modal => {
				hideModal(modal.id)
			})
		}
	})
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
	const animatedElements = document.querySelectorAll(
		'.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-scale, .stagger-children, .material-card'
	)

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible')

					// Animate stats counter
					if (entry.target.closest('.hero-stats')) {
						animateCounters()
					}
				}
			})
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
		}
	)

	animatedElements.forEach(el => observer.observe(el))

	// Add animation classes to elements
	document.querySelectorAll('.section-header').forEach(el => {
		el.classList.add('animate-fade-up')
	})

	document.querySelectorAll('.craft-step').forEach((el, i) => {
		el.classList.add('animate-fade-up')
		el.style.transitionDelay = `${i * 100}ms`
	})

	document.querySelectorAll('.gallery-item').forEach((el, i) => {
		el.classList.add('animate-scale')
		el.style.transitionDelay = `${(i % 6) * 50}ms`
	})
}

// ============================================
// Counter Animation
// ============================================
function animateCounters() {
	const counters = document.querySelectorAll('.hero-stat-number[data-count]')

	counters.forEach(counter => {
		if (counter.dataset.animated) return
		counter.dataset.animated = 'true'

		const target = parseInt(counter.dataset.count)
		const duration = 2000
		const step = target / (duration / 16)
		let current = 0

		const updateCounter = () => {
			current += step
			if (current < target) {
				counter.textContent = Math.floor(current).toLocaleString()
				requestAnimationFrame(updateCounter)
			} else {
				counter.textContent = target.toLocaleString()
			}
		}

		updateCounter()
	})
}

// ============================================
// Sawdust Effect
// ============================================
function createSawdust(x, y, count = 5) {
	if (!elements.sawdustContainer) return

	for (let i = 0; i < count; i++) {
		const particle = document.createElement('div')
		particle.className = `sawdust sawdust-${
			['small', 'medium', 'large'][Math.floor(Math.random() * 3)]
		}`

		const angle = Math.random() * Math.PI * 2
		const velocity = 50 + Math.random() * 100
		const rotation = Math.random() * 360

		particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            --rotation: ${rotation}deg;
            --drift: ${(Math.random() - 0.5) * 100}px;
            animation: sawdustSpiral ${
							2 + Math.random() * 2
						}s ease-out forwards;
        `

		elements.sawdustContainer.appendChild(particle)

		setTimeout(() => {
			particle.remove()
		}, 4000)
	}
}

// Add sawdust on button clicks
function initSawdustEffect() {
	document.querySelectorAll('.btn').forEach(btn => {
		btn.addEventListener('click', e => {
			createSawdust(e.clientX, e.clientY, 8)
		})
	})
}

// ============================================
// Sound Effects
// ============================================
const sounds = {
	click: null,
	slide: null,
	success: null,
	wood: null,
}

function initSounds() {
	// Create audio context on user interaction
	document.addEventListener(
		'click',
		() => {
			if (!sounds.click) {
				// In a real implementation, load actual sound files
				// For now, we'll use the Web Audio API to generate simple sounds
				const audioContext = new (window.AudioContext ||
					window.webkitAudioContext)()

				sounds.click = () => {
					if (!state.soundEnabled) return
					const osc = audioContext.createOscillator()
					const gain = audioContext.createGain()
					osc.connect(gain)
					gain.connect(audioContext.destination)
					osc.frequency.value = 800
					gain.gain.value = 0.1
					osc.start()
					gain.gain.exponentialRampToValueAtTime(
						0.01,
						audioContext.currentTime + 0.1
					)
					osc.stop(audioContext.currentTime + 0.1)
				}

				sounds.success = () => {
					if (!state.soundEnabled) return
					const osc = audioContext.createOscillator()
					const gain = audioContext.createGain()
					osc.connect(gain)
					gain.connect(audioContext.destination)
					osc.frequency.value = 523
					gain.gain.value = 0.1
					osc.start()
					setTimeout(() => {
						osc.frequency.value = 659
					}, 100)
					setTimeout(() => {
						osc.frequency.value = 784
					}, 200)
					gain.gain.exponentialRampToValueAtTime(
						0.01,
						audioContext.currentTime + 0.4
					)
					osc.stop(audioContext.currentTime + 0.4)
				}
			}
		},
		{ once: true }
	)
}

function playSound(soundName) {
	if (sounds[soundName] && state.soundEnabled) {
		sounds[soundName]()
	}
}

// Sound toggle
function initSoundToggle() {
	const soundIndicator = document.createElement('div')
	soundIndicator.className = 'sound-indicator muted'
	soundIndicator.innerHTML = `
        <div class="sound-bars">
            <span class="sound-bar"></span>
            <span class="sound-bar"></span>
            <span class="sound-bar"></span>
        </div>
    `
	soundIndicator.title = 'Включить звуки'
	document.body.appendChild(soundIndicator)

	soundIndicator.addEventListener('click', () => {
		state.soundEnabled = !state.soundEnabled
		soundIndicator.classList.toggle('muted', !state.soundEnabled)
		soundIndicator.title = state.soundEnabled
			? 'Выключить звуки'
			: 'Включить звуки'
	})
}

// ============================================
// Material Cards Interaction
// ============================================
function initMaterialCards() {
	const cards = document.querySelectorAll('.material-card')

	cards.forEach(card => {
		card.addEventListener('click', () => {
			cards.forEach(c => c.classList.remove('active'))
			card.classList.add('active')
			playSound('click')
		})

		card.addEventListener('mouseenter', () => {
			playSound('wood')
		})
	})
}

// ============================================
// Parallax Effect
// ============================================
function initParallax() {
	const parallaxElements = document.querySelectorAll(
		'.parallax-slow, .parallax-medium, .parallax-fast'
	)

	if (parallaxElements.length === 0) return

	window.addEventListener('scroll', () => {
		const scrollY = window.pageYOffset

		parallaxElements.forEach(el => {
			let speed = 0.1
			if (el.classList.contains('parallax-medium')) speed = 0.2
			if (el.classList.contains('parallax-fast')) speed = 0.3

			const yPos = scrollY * speed
			el.style.transform = `translateY(${yPos}px)`
		})
	})
}

// ============================================
// Tool Divider Animation
// ============================================
function initToolDividers() {
	const dividers = document.querySelectorAll('.tool-divider')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate')
				} else {
					entry.target.classList.remove('animate')
				}
			})
		},
		{ threshold: 0.5 }
	)

	dividers.forEach(divider => observer.observe(divider))
}

// ============================================
// Seasonal Theme
// ============================================
function initSeasonalTheme() {
	const month = new Date().getMonth()
	let season = 'winter'

	if (month >= 2 && month <= 4) season = 'spring'
	else if (month >= 5 && month <= 7) season = 'summer'
	else if (month >= 8 && month <= 10) season = 'autumn'

	document.body.classList.add(`season-${season}`)
}

// ============================================
// Initialize All Animations
// ============================================
function initAnimations() {
	// Trigger hero animations after preloader
	const heroTitle = document.querySelector('.hero-title')
	if (heroTitle) {
		heroTitle.querySelectorAll('.hero-title-line').forEach(line => {
			const span = document.createElement('span')
			span.textContent = line.textContent
			line.textContent = ''
			line.appendChild(span)
		})
	}

	// Animate hero stats
	setTimeout(animateCounters, 1000)
}

// ============================================
// Date Picker Enhancement
// ============================================
function initDatePicker() {
	const dateInput = document.getElementById('formDate')
	if (!dateInput) return

	// Set min date to today
	const today = new Date()
	const minDate = today.toISOString().split('T')[0]
	dateInput.min = minDate

	// Set max date to 3 months from now
	const maxDate = new Date(today.setMonth(today.getMonth() + 3))
	dateInput.max = maxDate.toISOString().split('T')[0]
}

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
	initPreloader()
	initHeader()
	initMobileMenu()
	initSmoothScroll()
	initGalleryFilters()
	initReviewsSlider()
	initContactForm()
	initFileUpload()
	initModals()
	initScrollAnimations()
	initSawdustEffect()
	initSounds()
	initSoundToggle()
	initMaterialCards()
	initParallax()
	initToolDividers()
	initSeasonalTheme()
	initDatePicker()
})

// Export functions for external use
window.DM = {
	showModal,
	hideModal,
	createSawdust,
	playSound,
}
