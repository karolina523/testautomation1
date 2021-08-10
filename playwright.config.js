// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      screenshot: 'only-on-failure',
      headless: false,
          viewport: { width: 1280, height: 720 },
              launchOptions: {
              slowMo: 350,
          },
    },
  };
  
  module.exports = config;