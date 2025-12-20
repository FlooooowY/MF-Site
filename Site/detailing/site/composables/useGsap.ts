export const useGsap = () => {
	const isClient = process.client

	const animate = async (targets: gsap.TweenTarget, vars: gsap.TweenVars) => {
		if (!isClient) return

		const gsap = (await import('gsap')).default
		return gsap.to(targets, vars)
	}

	const animateFrom = async (
		targets: gsap.TweenTarget,
		vars: gsap.TweenVars
	) => {
		if (!isClient) return

		const gsap = (await import('gsap')).default
		return gsap.from(targets, vars)
	}

	const animateFromTo = async (
		targets: gsap.TweenTarget,
		fromVars: gsap.TweenVars,
		toVars: gsap.TweenVars
	) => {
		if (!isClient) return

		const gsap = (await import('gsap')).default
		return gsap.fromTo(targets, fromVars, toVars)
	}

	const createScrollTrigger = async (vars: ScrollTrigger.Vars) => {
		if (!isClient) return

		const gsap = (await import('gsap')).default
		const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
		gsap.registerPlugin(ScrollTrigger)

		return ScrollTrigger.create(vars)
	}

	const timeline = async (vars?: gsap.TimelineVars) => {
		if (!isClient) return

		const gsap = (await import('gsap')).default
		return gsap.timeline(vars)
	}

	return {
		animate,
		animateFrom,
		animateFromTo,
		createScrollTrigger,
		timeline,
		isClient,
	}
}
