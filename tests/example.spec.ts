import { test, expect } from '../fixtures/baseFixture';

test('Sanity Check', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});