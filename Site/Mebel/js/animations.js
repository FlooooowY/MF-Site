/* ============================================
   ДРЕВО МАСТЕРОВ - GSAP Animations
   Cinematographic scroll animations
   ============================================ */

// Wait for GSAP and ScrollTrigger to load
document.addEventListener('DOMContentLoaded', () => {
	// Check if GSAP is loaded
	if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
		console.warn('GSAP or ScrollTrigger not loaded')
		return
	}

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger)

	// Initialize all animations
	initHeroAnimations()
	initCraftsmanshipAnimations()
	initGalleryAnimations()
	initMaterialsAnimations()
	initConstructorAnimations()
	initReviewsAnimations()
	initContactAnimations()
	initParallaxEffects()
	initTextRevealAnimations()
})

// ============================================
// Hero Section Animations
// ============================================
function initHeroAnimations() {
	const heroTl = gsap.timeline({
		defaults: { ease: 'power3.out' },
	})

	// Badge animation
	heroTl.from('.hero-badge', {
		y: -30,
		opacity: 0,
		duration: 0.8,
	})

	// Title lines stagger
	heroTl.from(
		'.hero-title-line',
		{
			y: 100,
			opacity: 0,
			duration: 1,
			stagger: 0.15,
		},
		'-=0.4'
	)

	// Subtitle
	heroTl.from(
		'.hero-subtitle',
		{
			y: 30,
			opacity: 0,
			duration: 0.8,
		},
		'-=0.6'
	)

	// CTA buttons
	heroTl.from(
		'.hero-cta .btn',
		{
			y: 30,
			opacity: 0,
			duration: 0.6,
			stagger: 0.1,
		},
		'-=0.4'
	)

	// Stats
	heroTl.from(
		'.hero-stat',
		{
			y: 40,
			opacity: 0,
			duration: 0.8,
			stagger: 0.15,
		},
		'-=0.3'
	)

	// Scroll indicator
	heroTl.from(
		'.hero-scroll',
		{
			y: 20,
			opacity: 0,
			duration: 0.6,
		},
		'-=0.2'
	)

	// Hero 3D parallax on scroll
	gsap.to('.hero-3d', {
		scrollTrigger: {
			trigger: '.hero',
			start: 'top top',
			end: 'bottom top',
			scrub: 1,
		},
		y: 100,
		opacity: 0.5,
	})

	// Video overlay fade on scroll
	gsap.to('.hero-video-overlay', {
		scrollTrigger: {
			trigger: '.hero',
			start: 'top top',
			end: 'center top',
			scrub: true,
		},
		opacity: 0.95,
	})
}

// ============================================
// Craftsmanship Section Animations
// ============================================
function initCraftsmanshipAnimations() {
	// Section header
	gsap.from('.craftsmanship .section-header', {
		scrollTrigger: {
			trigger: '.craftsmanship',
			start: 'top 80%',
		},
		y: 60,
		opacity: 0,
		duration: 1,
	})

	// Craft steps
	gsap.from('.craft-step', {
		scrollTrigger: {
			trigger: '.craft-process',
			start: 'top 70%',
		},
		y: 80,
		opacity: 0,
		duration: 0.8,
		stagger: 0.2,
	})

	// Step numbers animation
	document.querySelectorAll('.craft-step-number').forEach((num, i) => {
		gsap.from(num, {
			scrollTrigger: {
				trigger: num,
				start: 'top 85%',
			},
			scale: 0,
			opacity: 0,
			duration: 0.6,
			delay: i * 0.1,
			ease: 'back.out(1.7)',
		})
	})

	// Tool divider animation
	gsap.from('.craft-divider .tool-divider', {
		scrollTrigger: {
			trigger: '.craft-divider',
			start: 'top 90%',
		},
		scaleX: 0,
		duration: 1.2,
		ease: 'power2.inOut',
	})
}

// ============================================
// Gallery Section Animations
// ============================================
function initGalleryAnimations() {
	// Section header
	gsap.from('.gallery .section-header', {
		scrollTrigger: {
			trigger: '.gallery',
			start: 'top 80%',
		},
		y: 60,
		opacity: 0,
		duration: 1,
	})

	// Filter buttons
	gsap.from('.gallery-filter', {
		scrollTrigger: {
			trigger: '.gallery-filters',
			start: 'top 85%',
		},
		y: 30,
		opacity: 0,
		duration: 0.5,
		stagger: 0.1,
	})

	// Gallery items with stagger
	gsap.from('.gallery-item', {
		scrollTrigger: {
			trigger: '.gallery-grid',
			start: 'top 75%',
		},
		y: 60,
		opacity: 0,
		scale: 0.95,
		duration: 0.7,
		stagger: {
			each: 0.1,
			grid: 'auto',
			from: 'start',
		},
	})

	// Hover effect enhancement
	document.querySelectorAll('.gallery-item').forEach(item => {
		item.addEventListener('mouseenter', () => {
			gsap.to(item, {
				scale: 1.02,
				boxShadow: '0 25px 50px rgba(139, 69, 19, 0.2)',
				duration: 0.3,
			})
		})

		item.addEventListener('mouseleave', () => {
			gsap.to(item, {
				scale: 1,
				boxShadow: '0 8px 32px rgba(139, 69, 19, 0.12)',
				duration: 0.3,
			})
		})
	})
}

// ============================================
// Materials Section Animations
// ============================================
function initMaterialsAnimations() {
	// Section header
	gsap.from('.materials .section-header', {
		scrollTrigger: {
			trigger: '.materials',
			start: 'top 80%',
		},
		y: 60,
		opacity: 0,
		duration: 1,
	})

	// Material cards
	gsap.from('.material-card', {
		scrollTrigger: {
			trigger: '.materials-showcase',
			start: 'top 75%',
		},
		y: 80,
		opacity: 0,
		duration: 0.8,
		stagger: 0.15,
	})

	// Material bars fill animation
	document.querySelectorAll('.material-bar span').forEach(bar => {
		const width = bar.style.width
		bar.style.width = '0'

		ScrollTrigger.create({
			trigger: bar,
			start: 'top 85%',
			onEnter: () => {
				gsap.to(bar, {
					width: width,
					duration: 1,
					ease: 'power2.out',
				})
			},
		})
	})

	// Fabrics section
	gsap.from('.fabrics-title', {
		scrollTrigger: {
			trigger: '.fabrics-section',
			start: 'top 85%',
		},
		y: 30,
		opacity: 0,
		duration: 0.8,
	})

	gsap.from('.fabric-item', {
		scrollTrigger: {
			trigger: '.fabrics-grid',
			start: 'top 85%',
		},
		y: 30,
		opacity: 0,
		duration: 0.6,
		stagger: 0.1,
	})
}

// ============================================
// Constructor Section Animations
// ============================================
function initConstructorAnimations() {
	// Section header
	gsap.from('.constructor .section-header', {
		scrollTrigger: {
			trigger: '.constructor',
			start: 'top 80%',
		},
		y: 60,
		opacity: 0,
		duration: 1,
	})

	// Preview panel
	gsap.from('.constructor-preview', {
		scrollTrigger: {
			trigger: '.constructor-app',
			start: 'top 70%',
		},
		x: -60,
		opacity: 0,
		duration: 1,
	})

	// Config panel
	gsap.from('.constructor-panel', {
		scrollTrigger: {
			trigger: '.constructor-app',
			start: 'top 70%',
		},
		x: 60,
		opacity: 0,
		duration: 1,
	})

	// Constructor sections stagger
	gsap.from('.constructor-section', {
		scrollTrigger: {
			trigger: '.constructor-panel',
			start: 'top 70%',
		},
		y: 30,
		opacity: 0,
		duration: 0.6,
		stagger: 0.15,
		delay: 0.3,
	})
}

// ============================================
// Reviews Section Animations
// ============================================
function initReviewsAnimations() {
	// Section header
	gsap.from('.reviews .section-header', {
		scrollTrigger: {
			trigger: '.reviews',
			start: 'top 80%',
		},
		y: 60,
		opacity: 0,
		duration: 1,
	})

	// Review slider
	gsap.from('.reviews-slider', {
		scrollTrigger: {
			trigger: '.reviews-slider',
			start: 'top 75%',
		},
		y: 60,
		opacity: 0,
		duration: 1,
	})
}

// ============================================
// Contact Section Animations
// ============================================
function initContactAnimations() {
	// Info section
	gsap.from('.contact-info > *', {
		scrollTrigger: {
			trigger: '.contact',
			start: 'top 75%',
		},
		x: -40,
		opacity: 0,
		duration: 0.8,
		stagger: 0.1,
	})

	// Form wrapper
	gsap.from('.contact-form-wrapper', {
		scrollTrigger: {
			trigger: '.contact-form-wrapper',
			start: 'top 80%',
		},
		x: 40,
		opacity: 0,
		duration: 1,
	})

	// Form groups
	gsap.from('.form-group', {
		scrollTrigger: {
			trigger: '.contact-form',
			start: 'top 75%',
		},
		y: 30,
		opacity: 0,
		duration: 0.5,
		stagger: 0.08,
	})
}

// ============================================
// Parallax Effects
// ============================================
function initParallaxEffects() {
	// Wood grain background parallax
	gsap.to('.wood-grain-bg', {
		scrollTrigger: {
			trigger: 'body',
			start: 'top top',
			end: 'bottom bottom',
			scrub: 1,
		},
		backgroundPosition: '100px 200px',
	})

	// Section backgrounds
	document.querySelectorAll('section').forEach((section, i) => {
		const bg = section.querySelector('.section-bg')
		if (bg) {
			gsap.to(bg, {
				scrollTrigger: {
					trigger: section,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
				y: -50,
			})
		}
	})

	// Floating elements
	gsap.utils.toArray('.float-element').forEach(el => {
		gsap.to(el, {
			y: 'random(-20, 20)',
			x: 'random(-10, 10)',
			rotation: 'random(-5, 5)',
			duration: 'random(3, 5)',
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
		})
	})
}

// ============================================
// Text Reveal Animations
// ============================================
function initTextRevealAnimations() {
	// Split text animation for headings
	document.querySelectorAll('.text-reveal').forEach(el => {
		const text = el.textContent
		el.innerHTML = ''

		text.split('').forEach((char, i) => {
			const span = document.createElement('span')
			span.textContent = char === ' ' ? '\u00A0' : char
			span.style.display = 'inline-block'
			span.style.opacity = '0'
			span.style.transform = 'translateY(50px)'
			el.appendChild(span)
		})

		ScrollTrigger.create({
			trigger: el,
			start: 'top 85%',
			onEnter: () => {
				gsap.to(el.children, {
					opacity: 1,
					y: 0,
					duration: 0.5,
					stagger: 0.02,
					ease: 'power3.out',
				})
			},
		})
	})
}

// ============================================
// Cursor Trail Effect
// ============================================
function initCursorTrail() {
	const trail = []
	const trailLength = 10

	for (let i = 0; i < trailLength; i++) {
		const dot = document.createElement('div')
		dot.className = 'cursor-trail-dot'
		dot.style.cssText = `
            position: fixed;
            width: ${8 - i * 0.5}px;
            height: ${8 - i * 0.5}px;
            background: rgba(139, 69, 19, ${0.5 - i * 0.04});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        `
		document.body.appendChild(dot)
		trail.push({ el: dot, x: 0, y: 0 })
	}

	let mouseX = 0
	let mouseY = 0

	document.addEventListener('mousemove', e => {
		mouseX = e.clientX
		mouseY = e.clientY

		trail.forEach(dot => {
			dot.el.style.opacity = '1'
		})
	})

	document.addEventListener('mouseleave', () => {
		trail.forEach(dot => {
			dot.el.style.opacity = '0'
		})
	})

	function animateTrail() {
		trail.forEach((dot, i) => {
			const prev = i === 0 ? { x: mouseX, y: mouseY } : trail[i - 1]

			dot.x += (prev.x - dot.x) * 0.3
			dot.y += (prev.y - dot.y) * 0.3

			dot.el.style.left = dot.x - 4 + 'px'
			dot.el.style.top = dot.y - 4 + 'px'
		})

		requestAnimationFrame(animateTrail)
	}

	animateTrail()
}

// ============================================
// Magnetic Buttons
// ============================================
function initMagneticButtons() {
	document.querySelectorAll('.btn-magnetic').forEach(btn => {
		btn.addEventListener('mousemove', e => {
			const rect = btn.getBoundingClientRect()
			const x = e.clientX - rect.left - rect.width / 2
			const y = e.clientY - rect.top - rect.height / 2

			gsap.to(btn, {
				x: x * 0.3,
				y: y * 0.3,
				duration: 0.3,
			})
		})

		btn.addEventListener('mouseleave', () => {
			gsap.to(btn, {
				x: 0,
				y: 0,
				duration: 0.3,
			})
		})
	})
}

// ============================================
// Smooth Scroll Speed Control
// ============================================
function initSmoothScrollSpeed() {
	// Add smooth scroll behavior with custom easing
	const sections = document.querySelectorAll('section')

	sections.forEach(section => {
		ScrollTrigger.create({
			trigger: section,
			start: 'top bottom',
			end: 'bottom top',
			onUpdate: self => {
				const progress = self.progress
				// Custom animations based on scroll progress
			},
		})
	})
}

// Initialize optional effects
document.addEventListener('DOMContentLoaded', () => {
	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches

	if (!prefersReducedMotion) {
		// Only enable these on desktop
		if (window.innerWidth >= 1024) {
			// initCursorTrail(); // Uncomment if desired
			initMagneticButtons()
		}
		initSmoothScrollSpeed()
	}
})
