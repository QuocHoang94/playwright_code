import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

export const setupCommonTest = () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('');
  });
};