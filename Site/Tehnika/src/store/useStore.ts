import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
	id: string
	name: string
	category: string
	price: number
	oldPrice?: number
	image: string
	images?: string[]
	rating: number
	reviewsCount: number
	badge?: 'sale' | 'new' | 'hit'
	discount?: number
	specs?: Record<string, string>
	description?: string
	inStock: boolean
}

interface CartItem {
	product: Product
	quantity: number
}

interface StoreState {
	// Cart
	cart: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	getCartTotal: () => number
	getCartCount: () => number

	// Comparison
	comparison: Product[]
	addToComparison: (product: Product) => void
	removeFromComparison: (productId: string) => void
	clearComparison: () => void

	// Favorites
	favorites: Product[]
	toggleFavorite: (product: Product) => void
	isFavorite: (productId: string) => boolean

	// Recently Viewed
	recentlyViewed: Product[]
	addToRecentlyViewed: (product: Product) => void

	// UI State
	isCartOpen: boolean
	setCartOpen: (open: boolean) => void
	isSearchOpen: boolean
	setSearchOpen: (open: boolean) => void
	isMobileMenuOpen: boolean
	setMobileMenuOpen: (open: boolean) => void
}

export const useStore = create<StoreState>()(
	persist(
		(set, get) => ({
			// Cart
			cart: [],
			addToCart: product => {
				const { cart } = get()
				const existingItem = cart.find(item => item.product.id === product.id)

				if (existingItem) {
					set({
						cart: cart.map(item =>
							item.product.id === product.id
								? { ...item, quantity: item.quantity + 1 }
								: item
						),
					})
				} else {
					set({ cart: [...cart, { product, quantity: 1 }] })
				}
			},
			removeFromCart: productId => {
				set({ cart: get().cart.filter(item => item.product.id !== productId) })
			},
			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeFromCart(productId)
					return
				}
				set({
					cart: get().cart.map(item =>
						item.product.id === productId ? { ...item, quantity } : item
					),
				})
			},
			clearCart: () => set({ cart: [] }),
			getCartTotal: () => {
				return get().cart.reduce(
					(total, item) => total + item.product.price * item.quantity,
					0
				)
			},
			getCartCount: () => {
				return get().cart.reduce((count, item) => count + item.quantity, 0)
			},

			// Comparison
			comparison: [],
			addToComparison: product => {
				const { comparison } = get()
				if (comparison.length >= 4) return
				if (comparison.find(p => p.id === product.id)) return
				set({ comparison: [...comparison, product] })
			},
			removeFromComparison: productId => {
				set({ comparison: get().comparison.filter(p => p.id !== productId) })
			},
			clearComparison: () => set({ comparison: [] }),

			// Favorites
			favorites: [],
			toggleFavorite: product => {
				const { favorites } = get()
				const exists = favorites.find(p => p.id === product.id)
				if (exists) {
					set({ favorites: favorites.filter(p => p.id !== product.id) })
				} else {
					set({ favorites: [...favorites, product] })
				}
			},
			isFavorite: productId => {
				return get().favorites.some(p => p.id === productId)
			},

			// Recently Viewed
			recentlyViewed: [],
			addToRecentlyViewed: product => {
				const { recentlyViewed } = get()
				const filtered = recentlyViewed.filter(p => p.id !== product.id)
				set({ recentlyViewed: [product, ...filtered].slice(0, 10) })
			},

			// UI State
			isCartOpen: false,
			setCartOpen: open => set({ isCartOpen: open }),
			isSearchOpen: false,
			setSearchOpen: open => set({ isSearchOpen: open }),
			isMobileMenuOpen: false,
			setMobileMenuOpen: open => set({ isMobileMenuOpen: open }),
		}),
		{
			name: 'techno-store',
			partialize: state => ({
				cart: state.cart,
				comparison: state.comparison,
				favorites: state.favorites,
				recentlyViewed: state.recentlyViewed,
			}),
		}
	)
)
