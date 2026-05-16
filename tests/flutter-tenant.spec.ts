import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Tenant Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Tenant login and recommended properties', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on Tenant option
    await page.click('text=Tenant');

    // Fill credentials
    await page.fill('input[type="email"]', 'test-tenant@rentoflow.in');
    await page.fill('input[type="password"]', 'password');
    await page.click('text=Sign In');

    // Verify dashboard loads and Recommended Properties are visible
    await expect(page.locator('text=Recommended Properties')).toBeVisible();
  });
});
