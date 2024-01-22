import { test, expect } from '@playwright/test';

test('firefox fails here', async ({ page }) => {
  await page.route(() => true, async () => {
    await new Promise(() => {});
  })

  const reqPromise = page.waitForEvent('requestfailed', req => req.url().includes('test.com'));
  page.evaluate(() => {
    const abortController = new AbortController();
    fetch('http://test.com/x', {signal: abortController.signal});
    abortController.abort();
  })
  const req = await reqPromise;

  expect(req.failure()).toBeTruthy();
});
