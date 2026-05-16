import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Tenant Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Tenant login and recommended properties', async ({ page }) => {
    // Inject Flutter configuration and skip onboarding/language screens via localStorage
    await page.addInitScript(() => {
      window.flutterConfiguration = { forceSemantics: true };
      // Set SharedPreferences values directly in localStorage to bypass setup screens
      window.localStorage.setItem('flutter.slang', '"en"');
      window.localStorage.setItem('flutter.first_tour', 'false');
    });

    await page.goto('/');

    // Wait for the Email field to appear (SignIn screen)
    const emailField = page.locator('[aria-label*="Email"]');
    await expect(emailField).toBeVisible({ timeout: 30000 });

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
