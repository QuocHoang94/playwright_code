# Why is this repo for?
This repository contains simple automation test framework written with TypeScript and Playwright and implements Page Object Model Pattern.
# Environment
* Make sure you have node.js installed. If you don't, please visit official [website](https://nodejs.org/en/download/) for instructions
* Run npm install to install node modules
# Run test
* That's it, now you can run tests with npx playwright test - it will run test in 3 browsers (chromium, firefox, webkit) in parallel.
* If you want to run it in headed mode npx playwright test --headed, then change configuration to headless: true in playwright.config.js
* Another way to run your tests is by installing the 'Playwright Test for VSCode' extension in Visual Studio Code.
# Retries
* Test retries are a way to automatically re-run a test when it fails. This is useful when a test is flaky and fails intermittently. Test retries are configured in the configuration file.
* You can configure retries in the configuration file: 
<!-- import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Give failing tests 3 retry attempts
  retries: 3,
}); -->
# Report
* HTML reporter produces a self-contained folder that contains report for the test run that can be served as a web page.
* A quick way of opening the last test run report is: npx playwright show-report
