import { test, expect } from '@playwright/test';
test.describe('Test login flow', () => {
test('should verify login flow', async ({ page }) => {
    await page.goto('https://mern-practice-0lqg.onrender.com/');
    //log In
    const loginLink = page.locator('a[href="/login"]')
    await loginLink.click()
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com/login')
    //make sure inputs are visible
    const userName = page.locator('input[placeholder="Username"]')
    await expect(userName).toBeVisible();
    userName.fill('James Bond')
    const password = page.locator('input[placeholder="Password"]')
    await expect(password).toBeVisible();
    password.fill('kultasilmä')
    const loginBtn = page.locator('button:has-text("Login")')
    await loginBtn.click();
    //login and accept the dialog, make sure it redirects to mainpage
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com')
    //Verify login changes to profile 
    const profileLink = page.locator('.header-links-container a').first();
    await expect(profileLink).toBeVisible();
    await expect(profileLink).toHaveText(/View profile/i);
    //makes sure logout button exists, verify that right profile is shown
    const logoutBtn = page.locator('.logout')
    await expect(logoutBtn).toBeVisible();
    await profileLink.click()
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com/profile/6734592847056892e93b327e')
    //verify back arrow to catalogue works and session persists
    const backArrow = page.locator('.back-catalogue')
    await backArrow.click()
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com')
    await expect(profileLink).toBeVisible();
    await logoutBtn.click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
});
})