import { test, expect } from '@playwright/test';

test.describe('Create Product Page', () => {
  test('Should create a new unlocked product', async ({ page }) => {
    // Navigate to the main page
    await page.goto('https://mern-practice-0lqg.onrender.com/');
    page.on('request', (req) => {
        console.log('Request URL:', req.url());
        console.log('Request Method:', req.method());
        console.log('Request Body:', req.postData());
      });

    // Click on the "Create a product" link
    const createProductLink = page.locator('.header-links-container a', { hasText: 'Create a product' });
    await createProductLink.click();

    // Assert navigation to the create product page
    await expect(page).toHaveURL('https://mern-practice-0lqg.onrender.com/create');

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
    await image.fill('https://via.placeholder.com/150'); // Use a placeholder image
    await description.fill('This is a test product created by Playwright.');
   // Wait for the network request and validate it
   const [request] = await Promise.all([
    page.waitForRequest((req) => req.url().includes('/api/products') && req.method() === 'POST'),
    page.click('.create-button'),
]);
    // Submit the product
   

    // Wait for the dialog confirmation and dismiss it
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toBe('Product created');
      await dialog.dismiss();
    });

  

    // Assert that the request body contains the expected product details
    const requestBody = JSON.parse(request.postData() || '{}');
    expect(requestBody).toMatchObject({
      name: 'Test Product',
      price: '50',
      image: 'https://via.placeholder.com/150',
      description: 'This is a test product created by Playwright.',
      user: 'Anonymous',
      locked: false, // Should be false for unlocked products
    });

    // Wait for the network response and validate it
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes('/api/products') && res.status() === 200),
    ]);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('_id'); // Ensure the response contains an ID for the new product

    console.log('Product created successfully:', responseBody);
  });
});
