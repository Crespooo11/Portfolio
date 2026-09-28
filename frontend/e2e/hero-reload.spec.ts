import { expect, test } from '@playwright/test'

/**
 * Regression coverage for a reported bug: on some plain hard reloads (F5, no
 * HMR/editing involved), the hero's old SplitText name animation was seen
 * stalling partway through — e.g. showing "JA" or "JAVI" instead of the
 * full "JAVIER CRESPO MOLL", at a different cutoff each time, particularly
 * in Brave.
 *
 * The name no longer runs any entrance timeline: the outline layer
 * (`.hero-name--outline`) is plain CSS, present with its full text in the
 * very first frame, with nothing to complete or stall. This reloads the
 * page repeatedly within a single test and asserts the FULL name text is
 * present immediately after load on every single reload — not eventually,
 * since there is no animation left to "finish".
 */
test('el nombre del hero se muestra completo e inmediato en recargas repetidas', async ({ page }) => {
  const RELOADS = 12
  const results: string[] = []

  for (let i = 0; i < RELOADS; i++) {
    await page.goto('/', { waitUntil: 'load' })
    await page.waitForSelector('.hero-name--outline', { state: 'visible' })

    const outlineText = await page.locator('.hero-name--outline').textContent()
    const fillText = await page.locator('.hero-name--fill').textContent()

    results.push(outlineText ?? '')
    expect(outlineText?.replace(/\s+/g, ' ').trim()).toBe('JAVIER CRESPO MOLL')
    expect(fillText?.replace(/\s+/g, ' ').trim()).toBe('JAVIER CRESPO MOLL')

    // The outline layer must be genuinely painted (not just present in the
    // DOM at opacity/visibility 0) since it's the only thing guaranteeing
    // the name is legible with no JS animation involved.
    await expect(page.locator('.hero-name--outline')).toBeVisible()
  }

  expect(results).toHaveLength(RELOADS)
})

test('el nombre se rellena de blanco siguiendo al cursor y no depende de una timeline de entrada', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForSelector('.hero-name-wrap', { state: 'visible' })

  const wrap = page.locator('.hero-name-wrap')
  const box = await wrap.boundingBox()
  expect(box).not.toBeNull()
  if (!box) return

  // Move the mouse well outside the name first, then into its center, and
  // confirm the fill layer's mask position (driven by gsap.quickTo via the
  // --mx/--my custom properties) actually moved off its default off-screen
  // value in response.
  await page.mouse.move(box.x - 300, box.y - 300)
  await page.waitForTimeout(50)

  const centerX = box.x + box.width / 2
  const centerY = box.y + box.height / 2
  await page.mouse.move(centerX, centerY, { steps: 12 })

  await page.waitForFunction(() => {
    const fill = document.querySelector<HTMLElement>('.hero-name--fill')
    if (!fill) return false
    const mx = fill.style.getPropertyValue('--mx')
    return mx !== '' && mx !== '-9999px'
  })
})
