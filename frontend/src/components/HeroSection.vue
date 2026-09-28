<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from '../lib/gsap'
import SystemClock from './SystemClock.vue'
import Marquee from './Marquee.vue'
import StatCounter from './StatCounter.vue'
import { heroTiles } from '../hero-tiles'
import { scrollToSection } from '../composables/useScrollTo'

defineProps<{ skillsCount: number }>()

const introText =
  'DESARROLLO PRODUCTOS DIGITALES CON ARQUITECTURAS REALES: MICROSERVICIOS, EVENTOS ASÍNCRONOS, BASES DE DATOS DISTRIBUIDAS.'

const heroEl = ref<HTMLElement | null>(null)
const tileEls = ref<(HTMLElement | null)[]>([])

const mobileQuery = window.matchMedia('(max-width: 760px)')
const isMobile = ref(mobileQuery.matches)
function onMobileChange(event: MediaQueryListEvent) {
  isMobile.value = event.matches
}

function setTileEl(el: unknown, i: number) {
  tileEls.value[i] = el instanceof HTMLElement ? el : null
}

// Mobile has no room for the scattered desktop composition: the selected
// tiles fall back to an in-flow CSS grid there (see .hero-tiles in
// style.css), so no inline rect is applied at all on mobile.
function tileStyle(tile: (typeof heroTiles)[number]) {
  return isMobile.value ? {} : tile.desktop
}

const visibleTiles = computed(() => heroTiles.filter((tile) => !isMobile.value || tile.mobile))

const tileTweens: gsap.core.Tween[] = []

onMounted(() => {
  mobileQuery.addEventListener('change', onMobileChange)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (heroEl.value && !prefersReducedMotion) {
    tileEls.value.forEach((el, i) => {
      if (!el) return
      const tile = visibleTiles.value[i]
      tileTweens.push(
        gsap.to(el, {
          yPercent: 30 * tile.depth,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl.value,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }),
      )
    })
  }
})

onUnmounted(() => {
  mobileQuery.removeEventListener('change', onMobileChange)
  tileTweens.forEach((tween) => {
    tween.scrollTrigger?.kill()
    tween.kill()
  })
})
</script>

<template>
  <section ref="heroEl" class="hero">
    <div class="hero-bg">
      <div class="hero-grain" aria-hidden="true"></div>
      <div class="hero-glow" aria-hidden="true"></div>
    </div>

    <div class="hero-system">
      <SystemClock label="ALICANTE, ES" />
    </div>

    <div class="hero-tiles" aria-hidden="true">
      <figure
        v-for="(tile, i) in visibleTiles"
        :key="tile.id"
        :ref="(el) => setTileEl(el, i)"
        class="hero-tile"
        :style="tileStyle(tile)"
      >
        <div class="hero-tile-frame">
          <img :src="tile.image" alt="" :class="['hero-tile-image', `hero-tile-image--${tile.kind}`]" />
          <div class="hero-tile-tint"></div>
        </div>
        <figcaption class="hero-tile-label">{{ tile.label }}</figcaption>
      </figure>
    </div>

    <div class="hero-copy">
      <div class="hero-copy-left">
        <h1 class="hero-name">JAVIER CRESPO MOLL</h1>
      </div>

      <div class="hero-copy-right">
        <p class="hero-subtitle">DESARROLLADOR WEB FULLSTACK. JAVA · SPRING BOOT · VUE.JS.</p>

        <div class="hero-actions">
          <button type="button" class="button button-outline" @click="scrollToSection('#work')">
            Ver proyectos
          </button>
          <button type="button" class="button button-outline" @click="scrollToSection('#contact')">
            Contacto
          </button>
        </div>

        <div class="hero-stats">
          <StatCounter :end="2" label="PRÁCTICAS PROFESIONALES" />
          <StatCounter :end="3" label="PROYECTOS EN PRODUCCIÓN" />
          <StatCounter :end="2024" prefix="DESDE " label="EN EL SECTOR" />
          <StatCounter :end="skillsCount" label="TECNOLOGÍAS EN EL STACK" />
        </div>
      </div>
    </div>

    <Marquee class="hero-marquee" :items="[introText]" />
  </section>
</template>
