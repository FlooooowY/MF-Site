export interface PricingTier {
	id: string
	name: string
	description: string
	price: number
	priceLabel: string
	features: {
		text: string
		included: boolean
	}[]
	popular?: boolean
	cta: string
}

export interface PricingCategory {
	id: string
	title: string
	icon: string
	description: string
	tiers: PricingTier[]
}

export const pricingData: PricingCategory[] = [
	{
		id: 'sites',
		title: 'Сайты',
		icon: '💻',
		description: 'От лендингов до сложных маркетплейсов',
		tiers: [
			{
				id: 'landing',
				name: 'Лендинг',
				description: 'Продающая страница для вашего продукта',
				price: 150000,
				priceLabel: 'от 150 000 ₽',
				features: [
					{ text: 'Уникальный дизайн', included: true },
					{ text: 'Адаптивная вёрстка', included: true },
					{ text: 'SEO-оптимизация', included: true },
					{ text: 'Форма заявки + CRM', included: true },
					{ text: 'Аналитика (Яндекс/Google)', included: true },
					{ text: 'SSL-сертификат', included: true },
					{ text: 'Хостинг на 1 год', included: true },
					{ text: 'Личный кабинет', included: false },
					{ text: 'Мультиязычность', included: false },
				],
				cta: 'Заказать лендинг',
			},
			{
				id: 'corporate',
				name: 'Корпоративный',
				description: 'Полноценный сайт компании',
				price: 350000,
				priceLabel: 'от 350 000 ₽',
				features: [
					{ text: 'До 15 страниц', included: true },
					{ text: 'Уникальный дизайн', included: true },
					{ text: 'Админ-панель (CMS)', included: true },
					{ text: 'SEO-оптимизация', included: true },
					{ text: 'Блог/новости', included: true },
					{ text: 'Интеграция с CRM', included: true },
					{ text: 'Мультиязычность', included: true },
					{ text: 'Личный кабинет', included: false },
					{ text: 'E-commerce функционал', included: false },
				],
				popular: true,
				cta: 'Заказать сайт',
			},
			{
				id: 'marketplace',
				name: 'Маркетплейс',
				description: 'Полнофункциональная торговая площадка',
				price: 1500000,
				priceLabel: 'от 1 500 000 ₽',
				features: [
					{ text: 'Неограниченно страниц', included: true },
					{ text: 'Личные кабинеты', included: true },
					{ text: 'Платёжные системы', included: true },
					{ text: 'Админ-панель PRO', included: true },
					{ text: 'API интеграции', included: true },
					{ text: 'Мобильное приложение', included: true },
					{ text: 'Модерация контента', included: true },
					{ text: 'Аналитика PRO', included: true },
					{ text: 'Техподдержка 24/7', included: true },
				],
				cta: 'Обсудить проект',
			},
		],
	},
	{
		id: 'ai',
		title: 'ИИ-автоматизация',
		icon: '🤖',
		description: 'Внедрение искусственного интеллекта',
		tiers: [
			{
				id: 'ai-basic',
				name: 'Базовый',
				description: 'ИИ-помощник для одной задачи',
				price: 200000,
				priceLabel: 'от 200 000 ₽',
				features: [
					{ text: 'Один бизнес-процесс', included: true },
					{ text: 'Интеграция с ChatGPT/Claude', included: true },
					{ text: 'Обучение на ваших данных', included: true },
					{ text: 'Базовая аналитика', included: true },
					{ text: 'Документация', included: true },
					{ text: 'Поддержка 1 месяц', included: true },
					{ text: 'Множественные интеграции', included: false },
					{ text: 'Кастомные ML-модели', included: false },
				],
				cta: 'Автоматизировать',
			},
			{
				id: 'ai-business',
				name: 'Бизнес',
				description: 'Комплексная ИИ-трансформация',
				price: 500000,
				priceLabel: 'от 500 000 ₽',
				features: [
					{ text: 'До 5 бизнес-процессов', included: true },
					{ text: 'Кастомные промпты', included: true },
					{ text: 'RAG-система', included: true },
					{ text: 'Интеграции с CRM/ERP', included: true },
					{ text: 'Аналитика и дашборды', included: true },
					{ text: 'Обучение команды', included: true },
					{ text: 'Поддержка 3 месяца', included: true },
					{ text: 'Собственные ML-модели', included: false },
				],
				popular: true,
				cta: 'Внедрить ИИ',
			},
			{
				id: 'ai-enterprise',
				name: 'Энтерпрайз',
				description: 'Полная ИИ-инфраструктура',
				price: 2000000,
				priceLabel: 'от 2 000 000 ₽',
				features: [
					{ text: 'Неограниченно процессов', included: true },
					{ text: 'Собственные ML-модели', included: true },
					{ text: 'On-premise развёртывание', included: true },
					{ text: 'Интеграция со всеми системами', included: true },
					{ text: 'BI-аналитика', included: true },
					{ text: 'Выделенная команда', included: true },
					{ text: 'SLA 99.9%', included: true },
					{ text: 'Поддержка 12 месяцев', included: true },
				],
				cta: 'Связаться',
			},
		],
	},
	{
		id: 'bots',
		title: 'Telegram-боты',
		icon: '💬',
		description: 'Боты для продаж и автоматизации',
		tiers: [
			{
				id: 'bot-simple',
				name: 'Простой',
				description: 'FAQ-бот или бот-визитка',
				price: 50000,
				priceLabel: 'от 50 000 ₽',
				features: [
					{ text: 'До 20 сценариев', included: true },
					{ text: 'Кнопочное меню', included: true },
					{ text: 'Уведомления в Telegram', included: true },
					{ text: 'Базовая статистика', included: true },
					{ text: 'Хостинг 6 месяцев', included: true },
					{ text: 'Приём платежей', included: false },
					{ text: 'ИИ-ответы', included: false },
					{ text: 'CRM интеграция', included: false },
				],
				cta: 'Создать бота',
			},
			{
				id: 'bot-business',
				name: 'Бизнес',
				description: 'Бот для продаж и поддержки',
				price: 150000,
				priceLabel: 'от 150 000 ₽',
				features: [
					{ text: 'Неограниченно сценариев', included: true },
					{ text: 'Каталог товаров', included: true },
					{ text: 'Приём платежей', included: true },
					{ text: 'CRM интеграция', included: true },
					{ text: 'Рассылки', included: true },
					{ text: 'Аналитика PRO', included: true },
					{ text: 'Хостинг 12 месяцев', included: true },
					{ text: 'ИИ-ответы', included: false },
				],
				popular: true,
				cta: 'Заказать бота',
			},
			{
				id: 'bot-ai',
				name: 'ИИ-бот',
				description: 'Интеллектуальный ассистент',
				price: 300000,
				priceLabel: 'от 300 000 ₽',
				features: [
					{ text: 'Все функции Бизнес', included: true },
					{ text: 'GPT/Claude интеграция', included: true },
					{ text: 'Обучение на ваших данных', included: true },
					{ text: 'Голосовые сообщения', included: true },
					{ text: 'Мультиязычность', included: true },
					{ text: 'Web App интерфейс', included: true },
					{ text: 'API для интеграций', included: true },
					{ text: 'Поддержка 6 месяцев', included: true },
				],
				cta: 'Создать ИИ-бота',
			},
		],
	},
	{
		id: 'software',
		title: 'Custom ПО',
		icon: '⚙️',
		description: 'Индивидуальные решения под задачу',
		tiers: [
			{
				id: 'sw-mvp',
				name: 'MVP',
				description: 'Минимальный продукт для теста идеи',
				price: 500000,
				priceLabel: 'от 500 000 ₽',
				features: [
					{ text: 'Базовый функционал', included: true },
					{ text: 'Веб-интерфейс', included: true },
					{ text: 'База данных', included: true },
					{ text: 'Авторизация', included: true },
					{ text: 'Базовая аналитика', included: true },
					{ text: 'Документация', included: true },
					{ text: 'Мобильное приложение', included: false },
					{ text: 'Сложные интеграции', included: false },
				],
				cta: 'Создать MVP',
			},
			{
				id: 'sw-standard',
				name: 'Стандарт',
				description: 'Полнофункциональное решение',
				price: 1500000,
				priceLabel: 'от 1 500 000 ₽',
				features: [
					{ text: 'Полный функционал', included: true },
					{ text: 'Админ-панель', included: true },
					{ text: 'Роли и права', included: true },
					{ text: 'Интеграции', included: true },
					{ text: 'Мобильная версия', included: true },
					{ text: 'Аналитика PRO', included: true },
					{ text: 'Обучение команды', included: true },
					{ text: 'Поддержка 3 месяца', included: true },
				],
				popular: true,
				cta: 'Обсудить проект',
			},
			{
				id: 'sw-enterprise',
				name: 'Энтерпрайз',
				description: 'Масштабируемая enterprise-система',
				price: 5000000,
				priceLabel: 'от 5 000 000 ₽',
				features: [
					{ text: 'Микросервисная архитектура', included: true },
					{ text: 'Высокая нагрузка', included: true },
					{ text: 'Мобильные приложения', included: true },
					{ text: 'On-premise/Cloud', included: true },
					{ text: 'CI/CD pipeline', included: true },
					{ text: 'SLA 99.9%', included: true },
					{ text: 'Выделенная команда', included: true },
					{ text: 'Поддержка 12 месяцев', included: true },
				],
				cta: 'Связаться',
			},
		],
	},
]
