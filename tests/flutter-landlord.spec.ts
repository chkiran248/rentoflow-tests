import { test, expect } from '@playwright/test';

test.describe('Flutter Mobile App - Landlord Flow', () => {
  test.use({ baseURL: 'http://127.0.0.1:8080' });

  test('Landlord login and property management', async ({ page }) => {
    // Inject Flutter configuration and skip onboarding/language screens via localStorage
    await page.addInitScript(() => {
      window.flutterConfiguration = { forceSemantics: true };
      // Set SharedPreferences values directly in localStorage to bypass setup screens
      // Prefix 'flutter.' is used by shared_preferences_web
      window.localStorage.setItem('flutter.slang', '"en"');
      window.localStorage.setItem('flutter.first_tour', 'false');
    });

    await page.goto('/');
    
    // Wait for the Email field to appear (it should be on the SignIn screen now)
    // We use a regex for the label to handle "Email" vs "Email, Text Field" etc.
    const emailField = page.locator('[aria-label*="Email"]');
    await expect(emailField).toBeVisible({ timeout: 30000 });
    
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
