'use client'

import { motion } from 'framer-motion'
import { advantages } from '@/data/products'

export default function AdvantagesSection() {
	return (
		<section className='py-20 relative overflow-hidden'>
			{/* Background */}
			<div className='absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent' />

			<div className='container mx-auto px-6 relative'>
				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{advantages.map((advantage, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-accent-blue/30 transition-all group text-center'
						>
							{/* Icon */}
							<div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
								<span className='text-4xl'>{advantage.icon}</span>
							</div>

							{/* Title */}
							<h3 className='text-lg font-semibold mb-2 group-hover:text-accent-blue transition-colors'>
								{advantage.title}
							</h3>

							{/* Description */}
							<p className='text-white/60'>{advantage.description}</p>

							{/* Glow Effect */}
							<div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-blue/0 to-accent-purple/0 group-hover:from-accent-blue/5 group-hover:to-accent-purple/5 transition-all pointer-events-none' />
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
