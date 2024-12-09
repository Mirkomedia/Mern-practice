import { test, expect } from '@playwright/test';
//a bit flaky, need to make some changes to frontend to get consistent results
test.describe('Create Product Page', () => {
  test('Should create a new locked product', async ({ page }) => {
    // Navigate to the main page
    await page.goto('https://mern-practice-0lqg.onrender.com/');

    

    // First, log in to ensure the create product route doesn't fail
    const loginLink = page.locator('a[href="/login"]');
    await loginLink.click();
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com/login');

    // Make sure inputs are visible
    const userName = page.locator('input[placeholder="Username"]');
    await expect(userName).toBeVisible();
    await userName.fill('James Bond');

    const password = page.locator('input[placeholder="Password"]');
    await expect(password).toBeVisible();
    await password.fill('kultasilmä');

    const loginBtn = page.locator('button:has-text("Login")');
    await loginBtn.click();

    // Handle dialog and ensure redirection to main page
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.dismiss();
    });
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com');

    // Navigate to the "Create a product" page
    const createProductLink = page.locator('.header-links-container a', { hasText: 'Create a product' });
     
    const [sessionRequest] = await Promise.all([
      page.waitForRequest((req) => req.url().includes('/api/session') && req.method() === 'GET'),
      createProductLink.click(), // No `await` here
    ]);
    
    // Assert header and layout elements
    const header = page.locator('h1');
    await expect(header).toHaveText('Create a new product');

    const gridContainer = page.locator('.grid-container');
    await expect(gridContainer).toBeVisible();

    const backLink = page.locator('a[href="https://mern-practice-0lqg.onrender.com"]');
    await expect(backLink).toBeVisible();

    // Fill in product details
    const name = page.locator('input[placeholder="Product Name"]');
    const price = page.locator('input[placeholder="Product Price"]');
    const image = page.locator('input[placeholder="Image URL"]');
    const description = page.locator('.description-box');

    await name.fill('Test Product');
    await price.fill('50');
    await image.fill('https://via.placeholder.com/150');
    await description.fill('This is a test product created by Playwright.');

    // Wait for the network request and response
    const [request, response] = await Promise.all([
      page.waitForRequest((req) => req.url().includes('/api/products') && req.method() === 'POST'),
      page.waitForResponse((res) => res.url().includes('/api/products') && res.status() === 201),
      page.click('.create-button'), // Trigger product creation
    ]);

    // Handle dialog confirmation and dismiss it
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.dismiss();
    });

    // Validate the request body
    const requestBody = JSON.parse(request.postData() || '{}');
    expect(requestBody).toMatchObject({
      name: 'Test Product',
      price: "50",
      image: 'https://via.placeholder.com/150',
      description: 'This is a test product created by Playwright.',
      locked: true,
    });

    // Validate the response body
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('data._id'); // Ensure the response contains an ID for the new product
    expect(typeof responseBody.data._id).toBe('string');
    expect(responseBody).toHaveProperty('success', true);

    console.log('Product created successfully:', responseBody);
    
    const catalogueLink = page.locator('a:has-text("Back to catalogue")')
    await  catalogueLink.waitFor({state:'visible'})
    await catalogueLink.click()
    
    const logoutBtn = page.locator('.logout');
    await logoutBtn.waitFor({state:'visible'})
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
  });
  test('should verify search functionality', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('https://mern-practice-0lqg.onrender.com/');

    // Enter a search term
    const searchInput = page.locator('input[placeholder="Search for products"]'); // Adjust placeholder text if different
    await searchInput.fill('Adminin Kruunu');
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
  
});
