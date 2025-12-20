<template>
	<div id="sweet-dreams-app" :class="{ 'menu-open': isMenuOpen }">
		<!-- Sugar Powder Background Effect -->
		<SugarBackground />

		<!-- Cream Drip Effect on Scroll -->
		<CreamDrip :scroll-progress="scrollProgress" />

		<!-- Navigation Header -->
		<AppHeader
			:is-scrolled="isScrolled"
			:cart-count="cartItems.length"
			@toggle-menu="toggleMenu"
			@open-cart="openCart"
		/>

		<!-- Mobile Navigation -->
		<MobileNav :is-open="isMenuOpen" @close="isMenuOpen = false" />

		<!-- Main Content -->
		<main>
			<router-view
				v-slot="{ Component }"
				:cart="cartItems"
				@add-to-cart="addToCart"
				@show-confetti="showConfetti"
			>
				<transition name="page" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>

		<!-- Footer -->
		<AppFooter />

		<!-- Cart Sidebar -->
		<CartSidebar
			:is-open="isCartOpen"
			:items="cartItems"
			@close="isCartOpen = false"
			@remove-item="removeFromCart"
			@update-quantity="updateQuantity"
		/>

		<!-- Confetti Effect -->
		<ConfettiEffect ref="confettiRef" />

		<!-- Cookie Banner -->
		<CookieBanner v-if="!cookiesAccepted" @accept="acceptCookies" />

		<!-- Notification Toast -->
		<NotificationToast
			:show="notification.show"
			:message="notification.message"
			:type="notification.type"
			@close="notification.show = false"
		/>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import SugarBackground from './components/effects/SugarBackground.vue'
import CreamDrip from './components/effects/CreamDrip.vue'
import ConfettiEffect from './components/effects/ConfettiEffect.vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import MobileNav from './components/layout/MobileNav.vue'
import CartSidebar from './components/cart/CartSidebar.vue'
import CookieBanner from './components/ui/CookieBanner.vue'
import NotificationToast from './components/ui/NotificationToast.vue'

const router = useRouter()

// State
const isScrolled = ref(false)
const scrollProgress = ref(0)
const isMenuOpen = ref(false)
const isCartOpen = ref(false)
const cartItems = ref([])
const cookiesAccepted = ref(localStorage.getItem('cookies_accepted') === 'true')
const confettiRef = ref(null)

const notification = ref({
	show: false,
	message: '',
	type: 'success',
})

// Provide cart functionality to all components
provide('cart', {
	items: cartItems,
	addToCart,
	removeFromCart,
	updateQuantity,
	clearCart,
})

provide('showNotification', showNotification)
provide('playSound', playSound)

// Scroll handling
function handleScroll() {
	const scrollY = window.scrollY
	isScrolled.value = scrollY > 50

	const docHeight = document.documentElement.scrollHeight - window.innerHeight
	scrollProgress.value = docHeight > 0 ? scrollY / docHeight : 0
}

// Menu toggle
function toggleMenu() {
	isMenuOpen.value = !isMenuOpen.value
	document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

// Cart functionality
function openCart() {
	isCartOpen.value = true
	document.body.style.overflow = 'hidden'
}

function addToCart(item) {
	const existingIndex = cartItems.value.findIndex(
		i =>
			i.id === item.id &&
			JSON.stringify(i.options) === JSON.stringify(item.options)
	)

	if (existingIndex > -1) {
		cartItems.value[existingIndex].quantity += item.quantity || 1
	} else {
		cartItems.value.push({
			...item,
			quantity: item.quantity || 1,
			addedAt: Date.now(),
		})
	}

	saveCart()
	showConfetti()
	showNotification('Добавлено в корзину!', 'success')
	playSound('add')
}

function removeFromCart(index) {
	cartItems.value.splice(index, 1)
	saveCart()
}

function updateQuantity(index, quantity) {
	if (quantity <= 0) {
		removeFromCart(index)
	} else {
		cartItems.value[index].quantity = quantity
		saveCart()
	}
}

function clearCart() {
	cartItems.value = []
	saveCart()
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

function loadCart() {
	const saved = localStorage.getItem('cart')
	if (saved) {
		cartItems.value = JSON.parse(saved)
	}
}

// Confetti
function showConfetti() {
	if (confettiRef.value) {
		confettiRef.value.fire()
	}
}

// Notification
function showNotification(message, type = 'success') {
	notification.value = { show: true, message, type }
	setTimeout(() => {
		notification.value.show = false
	}, 3000)
}

// Sound effects
const audioContext = ref(null)

function playSound(type) {
	if (!audioContext.value) {
		audioContext.value = new (window.AudioContext ||
			window.webkitAudioContext)()
	}

	const ctx = audioContext.value
	const oscillator = ctx.createOscillator()
	const gainNode = ctx.createGain()

	oscillator.connect(gainNode)
	gainNode.connect(ctx.destination)

	if (type === 'add') {
		oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
		oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1) // E5
		oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2) // G5
	} else if (type === 'click') {
		oscillator.frequency.setValueAtTime(440, ctx.currentTime) // A4
	}

	gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
	gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

	oscillator.start(ctx.currentTime)
	oscillator.stop(ctx.currentTime + 0.3)
}

// Cookie banner
function acceptCookies() {
	cookiesAccepted.value = true
	localStorage.setItem('cookies_accepted', 'true')
}

// Lifecycle
onMounted(() => {
	window.addEventListener('scroll', handleScroll, { passive: true })
	loadCart()
	handleScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
#sweet-dreams-app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

main {
	flex: 1;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
	opacity: 0;
	transform: translateY(20px);
}

.page-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}

/* Menu open state */
.menu-open {
	overflow: hidden;
}
</style>
