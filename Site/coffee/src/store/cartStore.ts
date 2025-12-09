import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
	id: number
	name: string
	description: string
	price: number
	image: string
	size: 'S' | 'M' | 'L'
	quantity: number
}

export interface DeliveryInfo {
	type: 'pickup' | 'delivery'
	// Самовывоз
	pickupTime?: string
	paymentMethod?: 'card' | 'sbp' | 'cash'
	// Доставка
	address?: string
	phone?: string
	comment?: string
}

interface CartStore {
	items: CartItem[]
	isCartOpen: boolean
	isCheckoutOpen: boolean
	deliveryInfo: DeliveryInfo

	// Actions
	addItem: (item: Omit<CartItem, 'quantity'>) => void
	removeItem: (id: number, size: string) => void
	updateQuantity: (id: number, size: string, quantity: number) => void
	clearCart: () => void
	getTotalItems: () => number
	getTotalPrice: () => number

	// UI Actions
	openCart: () => void
	closeCart: () => void
	openCheckout: () => void
	closeCheckout: () => void

	// Delivery Actions
	setDeliveryInfo: (info: Partial<DeliveryInfo>) => void
}

// Коэффициенты цен для размеров
const sizePriceMultiplier: Record<string, number> = {
	S: 0.85,
	M: 1,
	L: 1.2,
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			isCartOpen: false,
			isCheckoutOpen: false,
			deliveryInfo: {
				type: 'pickup',
				paymentMethod: 'card',
			},

			addItem: item => {
				set(state => {
					const existingItem = state.items.find(
						i => i.id === item.id && i.size === item.size
					)

					if (existingItem) {
						return {
							items: state.items.map(i =>
								i.id === item.id && i.size === item.size
									? { ...i, quantity: i.quantity + 1 }
									: i
							),
						}
					}

					// Применяем коэффициент цены в зависимости от размера
					const adjustedPrice = Math.round(
						item.price * sizePriceMultiplier[item.size]
					)

					return {
						items: [
							...state.items,
							{ ...item, price: adjustedPrice, quantity: 1 },
						],
					}
				})
			},

			removeItem: (id, size) => {
				set(state => ({
					items: state.items.filter(i => !(i.id === id && i.size === size)),
				}))
			},

			updateQuantity: (id, size, quantity) => {
				if (quantity <= 0) {
					get().removeItem(id, size)
					return
				}

				set(state => ({
					items: state.items.map(i =>
						i.id === id && i.size === size ? { ...i, quantity } : i
					),
				}))
			},

			clearCart: () => set({ items: [] }),

			getTotalItems: () => {
				return get().items.reduce((sum, item) => sum + item.quantity, 0)
			},

			getTotalPrice: () => {
				return get().items.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				)
			},

			openCart: () => set({ isCartOpen: true }),
			closeCart: () => set({ isCartOpen: false }),
			openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
			closeCheckout: () => set({ isCheckoutOpen: false }),

			setDeliveryInfo: info => {
				set(state => ({
					deliveryInfo: { ...state.deliveryInfo, ...info },
				}))
			},
		}),
		{
			name: 'aroma-cart-storage',
			partialize: state => ({ items: state.items }),
		}
	)
)
