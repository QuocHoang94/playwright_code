import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

export const setup = () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('');
  });
};