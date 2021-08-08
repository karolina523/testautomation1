// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      screenshot: 'only-on-failure',
      headless: false,
          viewport: { width: 1280, height: 720 },
              launchOptions: {
              slowMo: 0,
          },
    },
  };
  
  module.exports = config;