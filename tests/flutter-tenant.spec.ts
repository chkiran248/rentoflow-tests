import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Tenant Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Tenant login and recommended properties', async ({ page }) => {
    await page.addInitScript(() => {
      window.flutterConfiguration = { forceSemantics: true };
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on Tenant option
    await page.click('[aria-label="Tenant"]', { timeout: 15000 });

    // Fill credentials using keyboard type
    await page.click('[aria-label="Email"], [aria-label*="Email"]');
    await page.keyboard.type('test-tenant@rentoflow.in');
    
    await page.click('[aria-label="Password"], [aria-label*="Password"]');
    await page.keyboard.type('password');
    
    await page.click('[aria-label="Sign In"], [aria-label="Sign in"]');

    // Verify dashboard loads and Recommended Properties are visible
    await expect(page.locator('[aria-label="Recommended Properties"], [aria-label*="Recommended"]')).toBeVisible({ timeout: 15000 });
  });
});
