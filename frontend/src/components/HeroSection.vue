<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '../lib/gsap'
import SystemClock from './SystemClock.vue'
import Marquee from './Marquee.vue'
import StatCounter from './StatCounter.vue'
import heroPhoto from '../assets/photos/javi-londres.webp'

defineProps<{ skillsCount: number }>()

const introText =
  'DESARROLLO PRODUCTOS DIGITALES CON ARQUITECTURAS REALES: MICROSERVICIOS, EVENTOS ASÍNCRONOS, BASES DE DATOS DISTRIBUIDAS.'

const heroEl = ref<HTMLElement | null>(null)
const bgImageEl = ref<HTMLElement | null>(null)
const nameWrapEl = ref<HTMLElement | null>(null)
const nameFillEl = ref<HTMLElement | null>(null)
const subtitleEl = ref<HTMLElement | null>(null)

let parallaxTween: gsap.core.Tween | null = null
let quickX: ((value: number) => void) | null = null
let quickY: ((value: number) => void) | null = null

// Plain object used as a gsap.quickTo() target instead of the DOM node
// itself: quickTo interpolates pointerPos.x/y toward the raw cursor
// coordinates, and each update just writes the result into the fill
// layer's --mx/--my custom properties, which the radial mask reads.
const pointerPos = { x: -9999, y: -9999 }

function applyMaskPosition() {
  nameFillEl.value?.style.setProperty('--mx', `${pointerPos.x}px`)
  nameFillEl.value?.style.setProperty('--my', `${pointerPos.y}px`)
}

function handlePointerMove(event: PointerEvent) {
  const wrap = nameWrapEl.value
  if (!wrap || !quickX || !quickY) return
  const rect = wrap.getBoundingClientRect()
  quickX(event.clientX - rect.left)
  quickY(event.clientY - rect.top)
}

onMounted(() => {
  // Only wire up the cursor-following reveal on devices with a real,
  // precise pointer. On touch devices there's no hover, so the name is
  // left fully filled via CSS (see .hero-name--fill in the media query).
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (hasFinePointer && nameWrapEl.value) {
    quickX = gsap.quickTo(pointerPos, 'x', { duration: 0.45, ease: 'power3', onUpdate: applyMaskPosition })
    quickY = gsap.quickTo(pointerPos, 'y', { duration: 0.45, ease: 'power3', onUpdate: applyMaskPosition })
    nameWrapEl.value.addEventListener('pointermove', handlePointerMove)
  }

  if (subtitleEl.value) {
    gsap.from(subtitleEl.value, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.4,
    })
  }

  if (bgImageEl.value && heroEl.value) {
    // Background scrolls slower than the content: a smaller yPercent shift
    // than the page's own scroll distance reads as "lagging behind" it.
    parallaxTween = gsap.to(bgImageEl.value, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroEl.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }
})

onUnmounted(() => {
  nameWrapEl.value?.removeEventListener('pointermove', handlePointerMove)
  parallaxTween?.scrollTrigger?.kill()
  parallaxTween?.kill()
})
</script>

<template>
  <section ref="heroEl" class="hero">
    <div class="hero-bg">
      <img ref="bgImageEl" :src="heroPhoto" alt="" class="hero-bg-image" />
      <div class="hero-bg-overlay"></div>
    </div>

    <div class="hero-system">
      <SystemClock label="ALICANTE, ES" />
    </div>

    <div class="hero-copy">
      <div ref="nameWrapEl" class="hero-name-wrap">
        <h1 class="hero-name hero-name--outline">JAVIER CRESPO MOLL</h1>
        <div ref="nameFillEl" class="hero-name hero-name--fill" aria-hidden="true">JAVIER CRESPO MOLL</div>
      </div>
      <p ref="subtitleEl" class="hero-subtitle">DESARROLLADOR WEB FULLSTACK. JAVA · SPRING BOOT · VUE.JS.</p>

      <div class="hero-stats">
        <StatCounter :end="2" label="PRÁCTICAS PROFESIONALES" />
        <StatCounter :end="3" label="PROYECTOS EN PRODUCCIÓN" />
        <StatCounter :end="2024" prefix="DESDE " label="EN EL SECTOR" />
        <StatCounter :end="skillsCount" label="TECNOLOGÍAS EN EL STACK" />
      </div>
    </div>

    <Marquee class="hero-marquee" :items="[introText]" />
  </section>
</template>
