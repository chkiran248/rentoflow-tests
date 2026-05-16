import { test, expect } from '@playwright/test';

test.describe('Admin Web Dashboard', () => {
  // Admin dashboard runs on port 8100 usually (Laravel Web UI)
  test.use({ baseURL: 'http://127.0.0.1:8100' });

  test('Admin login and dashboard', async ({ page }) => {
    // Navigate to Laravel login page
    await page.goto('/login');
    
    // Fill in admin credentials
    await page.fill('input[type="email"]', 'test-admin@rentoflow.in');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Verify successful login by checking URL or dashboard element
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Test Admin').first()).toBeVisible();
  });
});
