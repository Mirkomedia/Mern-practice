// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Set the base URL for your application, replace with your app's URL
    baseUrl: 'https://mern-practice-0lqg.onrender.com/',
    
    // Set the folder where your tests are located
    specPattern: 'cypress/e2e/**/*.spec.js',
    
    // You can define custom viewport sizes here if necessary
    viewportWidth: 1280,
    viewportHeight: 720,

    // Enable video recording for each test run
    video: true,

    setupNodeEvents(on, config) {
      // Example: adding a simple event listener to log details
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log('Before browser launch', browser);
        return launchOptions;
      });

      // Example: you could also add custom tasks here, like managing environment variables
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Return the updated config object after modifications
      return config;
    },
  },
});
