import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Tenant Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Tenant login and recommended properties', async ({ page }) => {
    // Inject Flutter configuration
    await page.addInitScript(() => {
      window.flutterConfiguration = { forceSemantics: true };
    });

    await page.goto('/');

    // 1. Language Screen
    const englishOption = page.locator('[aria-label*="English"]');
    await expect(englishOption).toBeVisible({ timeout: 45000 });
    await englishOption.click();
    
    const saveButton = page.locator('[aria-label="Save"], [aria-label="save"]');
    await saveButton.click();

    // 2. Onboarding Screen
    const skipButton = page.locator('[aria-label="Skip"], [aria-label="skip"]');
    await expect(skipButton).toBeVisible({ timeout: 15000 });
    await skipButton.click();

    // Wait for the Email field to appear (SignIn screen)
    const emailField = page.locator('[aria-label*="Email"]');
    await expect(emailField).toBeVisible({ timeout: 15000 });

    await emailField.click();
    await page.keyboard.type('test-tenant@rentoflow.in');
    
    const passwordField = page.locator('[aria-label*="Password"]');
    await passwordField.click();
    await page.keyboard.type('password');
    
    const signInButton = page.locator('[aria-label="Sign In"], [aria-label="Sign in"]');
    await signInButton.click();

    // Verify dashboard loads and Recommended Properties are visible
    await expect(page.locator('[aria-label*="Recommended"]')).toBeVisible({ timeout: 20000 });
    await expect(page.locator('[aria-label*="Home"]')).toBeVisible();
  });
});
