export interface TeamMember {
	id: string
	name: string
	position: string
	bio: string
	skills: string[]
	avatar: string
	social?: {
		telegram?: string
		linkedin?: string
		github?: string
	}
}

export const teamMembers: TeamMember[] = [
	{
		id: 'ceo',
		name: 'Михаил Федоров',
		position: 'CEO & Founder',
		bio: '15 лет в digital. Построил 3 успешных стартапа. Фокус на стратегии и росте клиентов.',
		skills: ['Стратегия', 'Продукт', 'Переговоры', 'Инвестиции'],
		avatar: '/team/ceo.jpg',
		social: {
			telegram: '@mfedorov',
			linkedin: 'mikhail-fedorov',
		},
	},
	{
		id: 'cto',
		name: 'Анна Козлова',
		position: 'CTO',
		bio: '12 лет в разработке. Ex-Яндекс, Ex-Тинькофф. Архитектор высоконагруженных систем.',
		skills: ['Архитектура', 'Backend', 'DevOps', 'AI/ML'],
		avatar: '/team/cto.jpg',
		social: {
			telegram: '@akozlova',
			github: 'akozlova',
		},
	},
	{
		id: 'design-lead',
		name: 'Дмитрий Волков',
		position: 'Design Lead',
		bio: '10 лет в UX/UI. Awwwards-winner. Создаёт интерфейсы, которые продают.',
		skills: ['UX/UI', 'Motion Design', 'Branding', 'Figma'],
		avatar: '/team/design.jpg',
		social: {
			telegram: '@dvolkov',
		},
	},
	{
		id: 'ai-lead',
		name: 'Елена Смирнова',
		position: 'AI/ML Lead',
		bio: '8 лет в машинном обучении. PhD в Computer Science. Эксперт по NLP и LLM.',
		skills: ['Machine Learning', 'NLP', 'Python', 'LangChain'],
		avatar: '/team/ai.jpg',
		social: {
			github: 'esmirnova',
		},
	},
]

export const stats = [
	{ value: '150+', label: 'Проектов реализовано' },
	{ value: '95%', label: 'Клиентов довольны' },
	{ value: '₽500M+', label: 'Принесли клиентам' },
	{ value: '8', label: 'Лет на рынке' },
]

export const values = [
	{
		title: 'Результат > Процесс',
		description:
			'Мы фокусируемся на том, что принесёт деньги вашему бизнесу, а не на бесконечных согласованиях.',
	},
	{
		title: 'Честность',
		description:
			'Говорим правду о сроках, рисках и возможностях. Если что-то не сработает — скажем сразу.',
	},
	{
		title: 'Партнёрство',
		description:
			'Ваш успех — наш успех. 70% клиентов работают с нами более 2 лет.',
	},
	{
		title: 'Инновации',
		description:
			'Используем передовые технологии. То, что конкуренты внедрят через год, мы делаем сегодня.',
	},
]
