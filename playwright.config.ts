import type { PlaywrightTestConfig } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  globalTimeout: 60 * 60 * 1000,
  timeout: 600000,
  expect: {
    timeout: 60 * 1000,
  },

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 :0,
  reporter: 'html',
  use: {
    baseURL: "https://ultimateqa.com/automation",
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    trace: "on"
  }
};
export default config;