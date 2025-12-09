<script setup lang="ts">
interface Props {
	fullSize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	fullSize: false,
})

const sliderRef = ref<HTMLElement | null>(null)
const sliderPosition = ref(50)
const isDragging = ref(false)

function startDrag() {
	isDragging.value = true
}

function stopDrag() {
	isDragging.value = false
}

function handleMove(e: MouseEvent | TouchEvent) {
	if (!isDragging.value || !sliderRef.value) return

	const rect = sliderRef.value.getBoundingClientRect()
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
	const x = clientX - rect.left
	const percentage = (x / rect.width) * 100

	sliderPosition.value = Math.max(0, Math.min(100, percentage))
}

onMounted(() => {
	document.addEventListener('mouseup', stopDrag)
	document.addEventListener('touchend', stopDrag)
	document.addEventListener('mousemove', handleMove)
	document.addEventListener('touchmove', handleMove)
})

onUnmounted(() => {
	document.removeEventListener('mouseup', stopDrag)
	document.removeEventListener('touchend', stopDrag)
	document.removeEventListener('mousemove', handleMove)
	document.removeEventListener('touchmove', handleMove)
})
</script>

<template>
	<div
		ref="sliderRef"
		class="before-after"
		:class="{ 'before-after--fullsize': fullSize }"
	>
		<!-- Before Image -->
		<div class="before-after__before">
			<div class="before-after__image before-after__image--before">
				<div class="before-after__placeholder">
					<span>ДО</span>
				</div>
			</div>
			<span class="before-after__label before-after__label--before">ДО</span>
		</div>

		<!-- After Image -->
		<div
			class="before-after__after"
			:style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
		>
			<div class="before-after__image before-after__image--after">
				<div class="before-after__placeholder before-after__placeholder--after">
					<span>ПОСЛЕ</span>
				</div>
			</div>
			<span class="before-after__label before-after__label--after">ПОСЛЕ</span>
		</div>

		<!-- Slider Handle -->
		<div
			class="before-after__handle"
			:style="{ left: `${sliderPosition}%` }"
			@mousedown.prevent="startDrag"
			@touchstart.prevent="startDrag"
		>
			<div class="before-after__handle-line"></div>
			<div class="before-after__handle-circle">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</div>
		</div>

		<!-- Info -->
		<div class="before-after__info">
			<span class="before-after__car">Mercedes-Benz S-Class W223</span>
			<span class="before-after__service"
				>Защитная пленка XPEL | Полная оклейка</span
			>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.before-after {
	position: relative;
	width: 100%;
	height: 450px;
	border-radius: $border-radius-lg;
	overflow: hidden;
	cursor: col-resize;
	user-select: none;

	&--fullsize {
		height: 600px;

		@include respond-below('md') {
			height: 400px;
		}
	}

	@include respond-below('md') {
		height: 300px;
	}

	&__before,
	&__after {
		position: absolute;
		inset: 0;
	}

	&__image {
		width: 100%;
		height: 100%;

		&--before {
			background: linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%);
		}

		&--after {
			background: linear-gradient(135deg, #1a237e 0%, #0a0f22 100%);
		}
	}

	&__placeholder {
		@include flex-center;
		height: 100%;
		font-family: $font-display;
		font-size: 48px;
		color: rgba($platinum-white, 0.1);

		&--after {
			color: rgba($electric-blue, 0.3);
		}
	}

	&__label {
		position: absolute;
		top: $space-md;
		padding: $space-xs $space-md;
		font-family: $font-tech;
		font-size: 12px;
		letter-spacing: 2px;
		border-radius: $border-radius-sm;

		&--before {
			left: $space-md;
			background: rgba($deep-space, 0.8);
			color: $platinum-muted;
		}

		&--after {
			right: $space-md;
			background: $electric-blue;
			color: $deep-space;
		}
	}

	&__handle {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 4px;
		transform: translateX(-50%);
		z-index: 10;

		&-line {
			position: absolute;
			inset: 0;
			background: $electric-blue;
			box-shadow: 0 0 20px $electric-blue;
		}

		&-circle {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 56px;
			height: 56px;
			background: $electric-blue;
			border-radius: 50%;
			@include flex-center;
			gap: -4px;
			box-shadow: 0 0 30px rgba($electric-blue, 0.6);

			svg {
				color: $deep-space;
				width: 18px;
				height: 18px;

				&:first-child {
					margin-right: -6px;
				}

				&:last-child {
					margin-left: -6px;
				}
			}
		}
	}

	&__info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: $space-lg;
		background: linear-gradient(transparent, rgba($deep-space, 0.9));
		display: flex;
		flex-direction: column;
		gap: $space-xs;
	}

	&__car {
		font-family: $font-body;
		font-size: 18px;
		font-weight: 600;
		color: $platinum-white;
	}

	&__service {
		font-size: 14px;
		color: $electric-blue;
	}
}
</style>
