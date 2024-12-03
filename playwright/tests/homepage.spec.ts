import { test, expect } from '@playwright/test';

test.describe('HomePage Tests', () => {
  test('should load the homepage and verify all main components are visible', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('https://mern-practice-0lqg.onrender.com/');

    // Assert the title of the page
    await expect(page).toHaveTitle(/Bazaar/i);

    // Verify the header contains the correct text and links
    const header = page.locator('.header-box');
    await expect(header).toBeVisible();
    await expect(header.locator('h1')).toHaveText('Bazaar');

    // Verify the "Login" or "View profile" link
    const profileLink = page.locator('.header-links-container a').first();
    await expect(profileLink).toBeVisible();
    await expect(profileLink).toHaveText(/Login|View profile/i);

    // Verify the "Create a product" link
    const createProductLink = page.locator('.header-links-container a', { hasText: 'Create a product' });
    await expect(createProductLink).toBeVisible();
    await expect(createProductLink).toHaveAttribute('href', '/create');

    // Check if the Logout button is visible when logged in
    const logoutButton = page.locator('button:has-text("Logout")');
    if (await logoutButton.isVisible()) {
      await expect(logoutButton).toBeVisible();
    }

    // Verify the search input exists
    const searchInput = page.locator('input[placeholder="Search for products"]'); // Adjust placeholder text if different
    await expect(searchInput).toBeVisible();

    // Verify the "Clear filters" text exists and is initially hidden
    const clearFilters = page.locator('text=Clear filters');
    await expect(clearFilters).toBeHidden();

    // Verify the product grid is visible
    const productGrid = page.locator('.product-grid');
    await expect(productGrid).toBeVisible();

    // Verify at least one product box is rendered
    const productBox = productGrid.locator('.product-box').first();
    await expect(productBox).toBeVisible();

    // Verify product image fallback behavior
    const productImage = productBox.locator('img.product-image');
    await expect(productImage).toBeVisible();


    // Verify the ScrollUpButton is visible
    const scrollUpButton = page.locator('button:has-text("Scroll to Top")'); // Adjust selector if needed
    await expect(scrollUpButton).toBeVisible();

    // Verify the feedback box (PalauteBoksi) is visible
    const feedbackBox = page.locator('.description-box'); // Adjust selector if it's a button or another tag
    await expect(feedbackBox).toBeVisible();
  });

  test('should verify navigation links work correctly', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('https://mern-practice-0lqg.onrender.com/');

    // Click on the "Create a product" link and verify navigation
    await page.locator('.header-links-container a', { hasText: 'Create a product' }).click();
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com/create');

    // Navigate back to the homepage
    await page.goto('https://mern-practice-0lqg.onrender.com/');

    // Click on the profile link (Login or View profile)
    const profileLink = page.locator('.header-links-container a').first();
    await profileLink.click();
    await expect(page).toHaveURL(/\/login|\/profile\/.+/); // Regex matches either login or profile URL
  });

  test('should verify search functionality', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('https://mern-practice-0lqg.onrender.com/');

    // Enter a search term
    const searchInput = page.locator('input[placeholder="Search for products"]'); // Adjust placeholder text if different
    await searchInput.fill('test product');
    await searchInput.press('Enter');

    // Verify filtered results are displayed
    const productGrid = page.locator('.product-grid');
    await expect(productGrid).toBeVisible();
    const filteredProductBox = productGrid.locator('.product-box').first();
    await expect(filteredProductBox).toBeVisible();

    // Verify the "Clear filters" text appears
    const clearFilters = page.locator('text=Clear filters');
    await expect(clearFilters).toBeVisible();
    await clearFilters.click();

    // Verify all products are displayed again
    const allProductBox = productGrid.locator('.product-box').first();
    await expect(allProductBox).toBeVisible();
  });
  
})
