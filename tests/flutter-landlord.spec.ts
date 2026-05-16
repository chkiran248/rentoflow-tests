import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Landlord Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Landlord login and property management', async ({ page }) => {
    await page.addInitScript(() => {
      window.flutterConfiguration = { forceSemantics: true };
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Handle Language Screen if present
    try {
      await page.waitForSelector('[aria-label*="English"]', { timeout: 5000 });
      await page.click('[aria-label*="English"]');
      await page.click('[aria-label="Save"], [aria-label="save"]');
    } catch (e) { }

    // Handle Onboarding Screen if present
    try {
      await page.waitForSelector('[aria-label="Skip"], [aria-label="skip"]', { timeout: 5000 });
      await page.click('[aria-label="Skip"], [aria-label="skip"]');
    } catch (e) { }
    
    // Fill credentials using keyboard type (needed for Flutter semantics)
    await page.click('[aria-label="Email"], [aria-label*="Email"]');
    await page.keyboard.type('test-landlord@rentoflow.in');
    
    await page.click('[aria-label="Password"], [aria-label*="Password"]');
    await page.keyboard.type('password');
    
    await page.click('[aria-label="Sign In"], [aria-label="Sign in"]');

    // Verify dashboard loads
    await expect(page.locator('[aria-label="My Property"], [aria-label*="My Property"]')).toBeVisible({ timeout: 15000 });
  });
});
