import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/Common/home.page';
import { BigPageManyElement } from "../pageObject/BigPageManyElement";

test.beforeEach(async ({ page }) => {
  const homepage = new HomePage(page)
;
  await homepage.Gotohomepage();
  const bigPageManyElement = await new BigPageManyElement(page)
;
  await (await bigPageManyElement.clickBigPageWithTitle('Big page with many elements'));
});

test('@TestCaseID-1 [Happy] Verify the redirect after clicking on the Big page with many elements content.', async ({ page }) => {
  const bigPageManyElement = await new BigPageManyElement(page)
;
  await (await bigPageManyElement.titleListVerifier());
});

test('@TestCaseID-2 [Happy] Verify that the toggle displays the correct content.', async ({ page }) => {
  const bigPageManyElement = await new BigPageManyElement(page)
;
  await (await bigPageManyElement.toggledisplaysVerifier('A_toggle'));
});

test('@TestCaseID-3 [Negative] Verify do not fill in the content in the form and click the submit button on Section of Random Stuff.', async ({ page }) => {
  const bigPageManyElement = await new BigPageManyElement(page)
;
  await (await bigPageManyElement.submitFormVerifier());
});

test('@TestCaseID-4 [Negative] Verify The user fills in the content of the Input Name and leaves the rest of the fields blank, then clicks on the submit form button.', async ({ page }) => {
  const bigPageManyElement = await new BigPageManyElement(page)
;
  await (await bigPageManyElement.submitFormwithNameVerifier());
});
