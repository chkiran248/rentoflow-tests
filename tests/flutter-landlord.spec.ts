import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Landlord Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Landlord login and property management', async ({ page }) => {
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
    
    // Wait for the Email field to appear (it should be on the SignIn screen now)
    const emailField = page.locator('[aria-label*="Email"]');
    await expect(emailField).toBeVisible({ timeout: 15000 });
    
    await emailField.click();
    await page.keyboard.type('test-landlord@rentoflow.in');
    
    const passwordField = page.locator('[aria-label*="Password"]');
    await passwordField.click();
    await page.keyboard.type('password');
    
    const signInButton = page.locator('[aria-label="Sign In"], [aria-label="Sign in"]');
    await signInButton.click();

    // Verify dashboard loads
    // Increased timeout for slow backend responses in CI
    await expect(page.locator('[aria-label*="My Property"]')).toBeVisible({ timeout: 20000 });
    await expect(page.locator('[aria-label*="Dashboard"]')).toBeVisible();
  });
});
