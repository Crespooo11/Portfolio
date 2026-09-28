import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registered once here; every component imports gsap/ScrollTrigger from
// this module instead of the raw 'gsap' package so the plugin is
// guaranteed to be registered before any component tries to use it,
// regardless of import order.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
