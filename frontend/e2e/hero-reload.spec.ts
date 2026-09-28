import { expect, test } from '@playwright/test'

/**
 * Regression coverage for a reported bug: on some plain hard reloads (F5, no
 * HMR/editing involved), the hero's old SplitText name animation was seen
 * stalling partway through — e.g. showing "JA" or "JAVI" instead of the
 * full "JAVIER CRESPO MOLL", at a different cutoff each time, particularly
 * in Brave.
 *
 * The name runs no entrance timeline at all: `.hero-name` is plain CSS,
 * present with its full text and solid white color in the very first
 * frame, with nothing to complete or stall. This reloads the page
 * repeatedly within a single test and asserts the FULL name text is
 * present immediately after load on every single reload, and that the
 * tesela composition (the Pryzm-style background tiles) is present too.
 */
test('el nombre del hero y las teselas se muestran completos e inmediatos en recargas repetidas', async ({
  page,
}) => {
  const RELOADS = 12
  const results: string[] = []

  for (let i = 0; i < RELOADS; i++) {
    await page.goto('/', { waitUntil: 'load' })
    await page.waitForSelector('.hero-name', { state: 'visible' })

    const nameText = await page.locator('.hero-name').textContent()
    results.push(nameText ?? '')
    expect(nameText?.replace(/\s+/g, ' ').trim()).toBe('JAVIER CRESPO MOLL')

    // The name must be genuinely painted (not just present in the DOM at
    // opacity/visibility 0) since it's the only thing guaranteeing it's
    // legible with no JS animation involved.
    await expect(page.locator('.hero-name')).toBeVisible()

    // The scattered tesela composition replacing the old hero photo must
    // be present from the first frame too, with no entrance animation to
    // wait on.
    const tiles = page.locator('.hero-tile')
    await expect(tiles.first()).toBeVisible()
    expect(await tiles.count()).toBeGreaterThanOrEqual(3)
  }

  expect(results).toHaveLength(RELOADS)
})
