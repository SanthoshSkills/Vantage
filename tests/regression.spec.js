import { test, expect } from '@playwright/test';

test.describe('Vantage Executive Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('UI should apply blur on visibility change', async ({ page }) => {
    // Wait for app to load
    await expect(page.locator('h1')).toContainText('Executive Overview');
    
    // Check initial state (no blur)
    const mainDiv = page.locator('.min-h-screen');
    await expect(mainDiv).not.toHaveClass(/blur-grayscale/);

    // Simulate tab switch / hidden visibility
    // In Playwright, we can use page.evaluate to trigger visibilitychange or just assume the hook works
    // but the actual blur is applied when !isVisible
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, writable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    await expect(mainDiv).toHaveClass(/blur-grayscale/);
    
    // Restore
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: false, writable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    
    await expect(mainDiv).not.toHaveClass(/blur-grayscale/);
  });

  test('Handover overlay should appear on first visit with localStorage data', async ({ page }) => {
    // Inject localStorage data
    await page.evaluate(() => {
      localStorage.setItem('last_visit_timestamp', new Date().toISOString());
      sessionStorage.clear();
    });
    
    await page.reload();
    
    const handover = page.locator('text=Executive Handover');
    await expect(handover).toBeVisible();
    
    const acknowledgeButton = page.locator('button:has-text("Acknowledge & Access Terminal")');
    await acknowledgeButton.click();
    
    await expect(handover).not.toBeVisible();
  });
});
