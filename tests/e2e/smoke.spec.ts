import { test, expect } from '@playwright/test';

test('home renders all sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Viswesh Subramanian');
  for (const id of ['now', 'about', 'experience', 'writing', 'projects', 'speaking', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test('hero CTAs link out correctly', async ({ page }) => {
  await page.goto('/');
  const workshop = page.getByRole('link', { name: /workshop/i }).first();
  await expect(workshop).toHaveAttribute('href', /luma\.com/);
});

test('agent harness page renders 9 components', async ({ page }) => {
  await page.goto('/projects/agent-harness/');
  await expect(page.locator('ol > li')).toHaveCount(9);
});

test('theme toggle switches data-theme attribute', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');
  await page.getByRole('button', { name: /switch to/i }).click();
  const after = await html.getAttribute('data-theme');
  expect(before).not.toBe(after);
});
