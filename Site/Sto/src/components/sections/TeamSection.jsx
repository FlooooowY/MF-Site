import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Star, Briefcase, GraduationCap } from 'lucide-react'
import './TeamSection.css'

const teamMembers = [
	{
		id: 1,
		name: 'Александр Петров',
		role: 'Главный механик',
		experience: '18 лет',
		specialization: 'Двигатели BMW, Mercedes',
		certifications: ['BMW Certified', 'Bosch Specialist'],
		avatar: null,
		rating: 4.9,
		reviews: 234,
	},
	{
		id: 2,
		name: 'Михаил Соколов',
		role: 'Диагност',
		experience: '12 лет',
		specialization: 'Компьютерная диагностика',
		certifications: ['VAG Specialist', 'Delphi Certified'],
		avatar: null,
		rating: 4.8,
		reviews: 189,
	},
	{
		id: 3,
		name: 'Дмитрий Волков',
		role: 'Специалист по АКПП',
		experience: '15 лет',
		specialization: 'Автоматические КПП',
		certifications: ['ZF Expert', 'Aisin Certified'],
		avatar: null,
		rating: 4.9,
		reviews: 312,
	},
	{
		id: 4,
		name: 'Сергей Козлов',
		role: 'Электрик',
		experience: '10 лет',
		specialization: 'Электрооборудование',
		certifications: ['Bosch Certified', 'Hella Expert'],
		avatar: null,
		rating: 4.7,
		reviews: 156,
	},
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

const TeamSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section className='team section' id='team' ref={ref}>
			<div className='container'>
				<motion.div
					className='section-title'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<h2>
						Наши <span className='text-gradient'>мастера</span>
					</h2>
					<p>
						Сертифицированные специалисты с опытом работы в официальных
						дилерских центрах
					</p>
				</motion.div>

				<motion.div
					className='team__grid'
					variants={containerVariants}
					initial='hidden'
					animate={isInView ? 'visible' : 'hidden'}
				>
					{teamMembers.map(member => (
						<motion.div
							key={member.id}
							className='team-card'
							variants={itemVariants}
							whileHover={{ y: -8 }}
						>
							<div className='team-card__avatar'>
								<div className='avatar-placeholder'>
									{member.name
										.split(' ')
										.map(n => n[0])
										.join('')}
								</div>
								<div className='avatar-badge'>
									<Award size={14} />
								</div>
							</div>

							<div className='team-card__info'>
								<h3 className='team-card__name'>{member.name}</h3>
								<span className='team-card__role'>{member.role}</span>

								<div className='team-card__rating'>
									<Star size={16} fill='currentColor' />
									<span className='rating-value'>{member.rating}</span>
									<span className='rating-reviews'>
										({member.reviews} отзывов)
									</span>
								</div>
							</div>

							<div className='team-card__details'>
								<div className='detail-row'>
									<Briefcase size={16} />
									<span>Опыт: {member.experience}</span>
								</div>
								<div className='detail-row'>
									<GraduationCap size={16} />
									<span>{member.specialization}</span>
								</div>
							</div>

							<div className='team-card__certs'>
								{member.certifications.map((cert, i) => (
									<span key={i} className='cert-badge'>
										{cert}
									</span>
								))}
							</div>

							{/* Hover effect */}
							<div className='team-card__glow' />
						</motion.div>
					))}
				</motion.div>

				{/* Stats */}
				<motion.div
					className='team__stats'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div className='stat-item'>
						<span className='stat-number tech-text'>25+</span>
						<span className='stat-label'>Специалистов</span>
					</div>
					<div className='stat-divider' />
					<div className='stat-item'>
						<span className='stat-number tech-text'>150+</span>
						<span className='stat-label'>Сертификатов</span>
					</div>
					<div className='stat-divider' />
					<div className='stat-item'>
						<span className='stat-number tech-text'>15+</span>
						<span className='stat-label'>Лет средний стаж</span>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default TeamSection
