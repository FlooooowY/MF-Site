export interface Master {
	id: string
	name: string
	role: string
	specialization: string[]
	rating: number
	reviewsCount: number
	experience: string
	image: string
	portfolio: string[]
}

export interface Service {
	id: string
	name: string
	description: string
	price: number
	duration: string
	icon: string
}

export interface GalleryItem {
	id: string
	title: string
	category: string
	image: string
	masterId: string
}

export interface Review {
	id: string
	author: string
	text: string
	rating: number
	date: string
	masterId: string
	avatar: string
}

export const masters: Master[] = [
	{
		id: '1',
		name: 'Михаил Волков',
		role: 'Senior Master',
		specialization: ['Классика', 'Fade', 'Королевское бритьё'],
		rating: 4.9,
		reviewsCount: 128,
		experience: '12 лет',
		image:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
		portfolio: [
			'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
		],
	},
	{
		id: '2',
		name: 'Андрей Соколов',
		role: 'Beard Stylist',
		specialization: ['Дизайн бороды', 'Уход за бородой', 'Моделирование'],
		rating: 5.0,
		reviewsCount: 95,
		experience: '8 лет',
		image:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
		portfolio: [
			'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
		],
	},
	{
		id: '3',
		name: 'Дмитрий Орлов',
		role: 'Classic Expert',
		specialization: ['Классические стрижки', 'Ретро', 'Pompadour'],
		rating: 4.7,
		reviewsCount: 73,
		experience: '6 лет',
		image:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
		portfolio: [
			'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop',
		],
	},
]

export const services: Service[] = [
	{
		id: '1',
		name: 'Стрижка',
		description:
			'Классические и современные мужские стрижки от мастеров своего дела',
		price: 1500,
		duration: '45 мин',
		icon: 'scissors',
	},
	{
		id: '2',
		name: 'Королевское бритьё',
		description: 'Традиционное бритьё опасной бритвой с горячими полотенцами',
		price: 1200,
		duration: '30 мин',
		icon: 'razor',
	},
	{
		id: '3',
		name: 'Уход за бородой',
		description: 'Моделирование, стрижка и укладка бороды любой сложности',
		price: 800,
		duration: '25 мин',
		icon: 'beard',
	},
	{
		id: '4',
		name: 'Комплекс "Джентльмен"',
		description: 'Стрижка + моделирование бороды + уход за кожей',
		price: 2500,
		duration: '90 мин',
		icon: 'crown',
	},
	{
		id: '5',
		name: 'Камуфляж седины',
		description: 'Естественная маскировка седых волос',
		price: 1000,
		duration: '30 мин',
		icon: 'palette',
	},
	{
		id: '6',
		name: 'SPA для лица',
		description: 'Глубокое очищение и увлажнение кожи лица',
		price: 1500,
		duration: '40 мин',
		icon: 'spa',
	},
]

export const galleryItems: GalleryItem[] = [
	{
		id: '1',
		title: 'Классический Fade',
		category: 'fade',
		image:
			'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop',
		masterId: '1',
	},
	{
		id: '2',
		title: 'Борода Viking',
		category: 'beard',
		image:
			'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
		masterId: '2',
	},
	{
		id: '3',
		title: 'Pompadour',
		category: 'classic',
		image:
			'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop',
		masterId: '3',
	},
	{
		id: '4',
		title: 'Текстурный кроп',
		category: 'modern',
		image:
			'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
		masterId: '1',
	},
	{
		id: '5',
		title: 'Андеркат',
		category: 'modern',
		image:
			'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop',
		masterId: '2',
	},
	{
		id: '6',
		title: 'Борода Гарибальди',
		category: 'beard',
		image:
			'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=600&h=600&fit=crop',
		masterId: '2',
	},
]

export const reviews: Review[] = [
	{
		id: '1',
		author: 'Александр К.',
		text: 'Лучший барбершоп в городе! Михаил — настоящий мастер своего дела. Атмосфера, сервис, результат — всё на высшем уровне.',
		rating: 5,
		date: '2024-12-01',
		masterId: '1',
		avatar:
			'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&crop=face',
	},
	{
		id: '2',
		author: 'Дмитрий М.',
		text: 'Хожу к Андрею уже год. Моя борода никогда не выглядела лучше. Рекомендую всем, кто ценит качество.',
		rating: 5,
		date: '2024-11-28',
		masterId: '2',
		avatar:
			'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
	},
	{
		id: '3',
		author: 'Павел В.',
		text: 'Отличная стрижка, приятная атмосфера. Буду возвращаться снова и снова.',
		rating: 5,
		date: '2024-11-25',
		masterId: '3',
		avatar:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
	},
]

export const contactInfo = {
	phone: '+7 (999) 000-00-00',
	email: 'hello@brotherhood.ru',
	address: 'Москва, ул. Тверская, 15',
	workingHours: '10:00 — 22:00',
	social: {
		telegram: 'https://t.me/brotherhood',
		instagram: 'https://instagram.com/brotherhood',
		vk: 'https://vk.com/brotherhood',
	},
}

