import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Landlord Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Landlord login and property management', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on Landlord/Owner option
    await page.click('text=Owner');
    
    // Fill credentials
    await page.fill('input[type="email"]', 'test-landlord@rentoflow.in');
    await page.fill('input[type="password"]', 'password');
    await page.click('text=Sign In');

    // Verify dashboard loads
    await expect(page.locator('text=My Property')).toBeVisible();
  });
});
