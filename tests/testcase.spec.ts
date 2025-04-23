import { test } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeForm-page';
import { setup } from './testsetup';

setup();

test('Verify successful form submission with all required fields filled (Happy flow)', async ({ page }) => {
  const practiceFormPage = new PracticeFormPage(page);
  await practiceFormPage.fillPracticeForm(1);
  await practiceFormPage.verifySubmitPracticeFormSuccess();
});

test('Verify display error when Mobile Number is missing (Unhappy Flow)', async ({ page }) => {
  const practiceFormPage = new PracticeFormPage(page);
  await practiceFormPage.fillPracticeForm(0);
  await practiceFormPage.verifySubmitPracticeFormUnSuccess();
});