import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'html',
  use: {
    baseURL: 'https://mern-practice-0lqg.onrender.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Capture screenshots for debugging
    video: 'retain-on-failure', // Save videos for failed tests
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: true,
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
 /*  webServer: {
    command: 'npm run dev', // Start your MERN app
    url: 'http://localhost:5000', // Frontend base URL
    reuseExistingServer: !process.env.CI,
  },*/
});
 