import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path'

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// Playwright configuration
export default defineConfig({
  // Add your Playwright configuration here if needed
});

test.describe('Test delete product', () => {
  test('should delete a test product', async ({ page }) => {
    const KAYTTAJA = process.env.KAYTTAJA;
    const SALASANA = process.env.SALASANA;
    // Navigate to the homepage
    await page.goto('https://mern-practice-0lqg.onrender.com/');

    // Click the login link and verify navigation to the login page
    const loginLink = page.locator('a[href="/login"]');
    await loginLink.click();
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com/login');

    // Fill in the username and password fields
    const userName = page.locator('input[placeholder="Username"]');
    await expect(userName).toBeVisible();
    await userName.fill(KAYTTAJA as string);

    const password = page.locator('input[placeholder="Password"]');
    await expect(password).toBeVisible();
    await password.fill(SALASANA  as string);

    // Click the login button and verify successful login
    const loginBtn = page.locator('button:has-text("Login")');
    await loginBtn.click();
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com');

    // Locate and click the test product
    const testProduct = page.locator('a:has-text("Test Product")').nth(0);
    await testProduct.click();

    // Click the edit button
    const editButton = page.locator('a:has-text("Edit")');
    await editButton.click();

    // Wait for the delete button to become visible
    const deleteButton = page.locator('h3:has-text("Delete Product")');
    await deleteButton.waitFor({ state: 'visible' });

    // Handle the confirmation dialog when clicking the delete button
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toBe('Are you sure you want to delete this product?');
      await dialog.accept();
    });
    await deleteButton.click();

    // Log out after deleting the product
    const logoutBtn = page.locator('.logout');
    await logoutBtn.waitFor({ state: 'visible' });
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();

    // Handle any potential logout confirmation dialog
    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
  });
});
