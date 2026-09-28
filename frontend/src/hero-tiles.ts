import javiLondres from './assets/photos/javi-londres.webp'
import javiVaticano from './assets/photos/javi-vaticano.webp'
import javiBudapest from './assets/photos/javi-budapest.webp'
import vitsync from './assets/projects/vitsync.webp'
import powersupps from './assets/projects/powersupps.webp'
import portfolioPlaceholder from './assets/projects/portfolio-placeholder.webp'

interface TileRect {
  top: string
  left: string
  width: string
  height: string
}

export interface HeroTile {
  id: string
  image: string
  label: string
  /** 'photo' gets the b/w + subtle red tint treatment, 'project' the ProjectsSection preview treatment. */
  kind: 'photo' | 'project'
  /** Parallax speed relative to scroll: lower drifts slower, higher drifts faster. */
  depth: number
  desktop: TileRect
  /**
   * Whether this tile is one of the 3-4 shown below the mobile breakpoint.
   * Mobile doesn't use `desktop`'s percentages (there's no room for a
   * scattered composition on a phone): it lays the selected tiles out in a
   * plain in-flow grid instead, see `.hero-tiles` in style.css.
   */
  mobile: boolean
}

/**
 * Scattered tesela layout (Pryzm-style): desktop positions/sizes as
 * percentages of the hero box, tuned to leave the bottom-left name and the
 * right-side subtitle/buttons/stats column free. Edit `desktop` to
 * reposition a tile on desktop; edit `depth` to change its scroll speed.
 */
export const heroTiles: HeroTile[] = [
  {
    id: 'londres',
    image: javiLondres,
    label: 'Londres',
    kind: 'photo',
    depth: 0.35,
    desktop: { top: '6%', left: '4%', width: '15%', height: '25%' },
    mobile: true,
  },
  {
    id: 'vaticano',
    image: javiVaticano,
    label: 'Vaticano',
    kind: 'photo',
    depth: 0.6,
    desktop: { top: '5%', left: '23%', width: '12%', height: '24%' },
    mobile: false,
  },
  {
    id: 'budapest',
    image: javiBudapest,
    label: 'Budapest',
    kind: 'photo',
    depth: 0.45,
    desktop: { top: '13%', left: '43%', width: '13%', height: '26%' },
    mobile: true,
  },
  {
    id: 'vitsync',
    image: vitsync,
    label: 'VitSync',
    kind: 'project',
    depth: 0.8,
    desktop: { top: '50%', left: '37%', width: '20%', height: '14%' },
    mobile: true,
  },
  {
    id: 'powersupps',
    image: powersupps,
    label: 'PowerSupps',
    kind: 'project',
    depth: 0.55,
    desktop: { top: '19%', left: '79%', width: '16%', height: '13%' },
    mobile: false,
  },
  {
    id: 'portfolio',
    image: portfolioPlaceholder,
    label: 'Portfolio',
    kind: 'project',
    depth: 0.65,
    desktop: { top: '35%', left: '78%', width: '15%', height: '12%' },
    mobile: true,
  },
]
