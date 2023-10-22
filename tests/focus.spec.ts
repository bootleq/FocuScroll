import { test, expect } from '@playwright/test';
import focus from '../src/focus-scroll-content';

const stringifiedFocus = `(${focus.toString()})()`;

test('Frames, like javadoc', async ({ page }) => {
  await page.goto('./frames_javadoc.html'); // public/frames_javadoc.html

  await expect(page.locator('body')).toBeFocused();
  await page.evaluate(stringifiedFocus);

  await expect(page.locator('iframe.rightIframe')).toBeFocused();
});

test('One frame, like blogger post preview', async ({ page }) => {
  await page.goto('./fullwidth_iframe.html'); // public/fullwith_iframe.html

  await expect(page.locator('body')).toBeFocused();
  await page.evaluate(stringifiedFocus);

  await expect(page.locator('iframe.mainIframe')).toBeFocused();
});

test.describe('Embed elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./embed_elements.html'); // public/embed_elements.html
  });

  test('Take back focus from CodePen iframe', async ({ page }) => {
    await page.frameLocator('#cp_embed_qjWxXZ').frameLocator('#result-iframe').locator('a.button').focus();
    await page.evaluate(stringifiedFocus);

    await expect(page.locator('body')).toBeFocused();
  });

  test('Take back focus from <video>', async ({ page }) => {
    const video = await page.getByTestId('video');
    await video.scrollIntoViewIfNeeded();
    await video.focus();

    // Open context menu to trap focus within native video control UI
    await video.click({button: 'right'});
    await page.keyboard.press('Escape');

    const offsetBefore: number = await page.locator('html').evaluate(e => e.scrollTop);

    await page.evaluate(stringifiedFocus);

    const pressCount = 4
    const offsetPerPress = 20 // some distance (not accurate) for scroll assertion
    for (let i = 0; i < pressCount; i++ ) {
      await page.keyboard.press('ArrowDown', {delay: 120});
    }

    const offsetAfter: number = await page.locator('html').evaluate(e => e.scrollTop);

    // console.debug('offset change:', offsetBefore, offsetAfter);
    await expect(offsetAfter).toBeGreaterThan(offsetBefore + pressCount * offsetPerPress);

    await expect(page.locator('body')).toBeFocused();
  });

});
