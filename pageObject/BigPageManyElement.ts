import type { Page } from "@playwright/test";
import { ElementBigPage } from "../page/ElementBigPage";
import { test, expect } from '@playwright/test';
export class BigPageManyElement {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  bigPageWithTitle = async (elementName: string) => await new ElementBigPage(this.page).bigPageWithTitle(elementName);
  titleComplicatedPage = async (elementName: string) => await new ElementBigPage(this.page).locateElementById(elementName);
  getXPathForToggleContent = async (elementName) => await new ElementBigPage(this.page).getXPathForToggleContent(elementName);
  getXPathForSubmitBtn = async () => await new ElementBigPage(this.page).getXPathForSubmitBtn();
  getXPathTitleAlertFillForm = async (elementName) => await new ElementBigPage(this.page).getXPathTitleAlertFillForm(elementName);
  getXPathSubAlertFillForm = async (elementName) => await new ElementBigPage(this.page).getXPathSubAlertFillForm(elementName);
  getXPathInputNameForm = async (elementName) => await new ElementBigPage(this.page).getXPathInputNameForm(elementName);



  async clickBigPageWithTitle(elementName: string) {
    const element = await this.bigPageWithTitle(elementName);
    if (element) {
      await element.click();
      console.log(`Clicked on element "${elementName}"`);
    } else {
      console.error(`Element "${elementName}" not found`);
    }
  }


  async titleListVerifier(): Promise<void> {
    const titles = ['Skills_Improved', 'Section_of_Buttons', 'Section_of_Social_Media_Follows', 'Section_of_Random_Stuff'];

    for (const title of titles) {
      await expect(await this.titleComplicatedPage(title)).toBeVisible();
    }
  }



  async toggledisplaysVerifier(elementName: string): Promise<void> {
    const element = await this.titleComplicatedPage(elementName);
    await element.click();
    await expect(await this.getXPathForToggleContent('A_toggle')).toBeVisible();
    const toggleContent = await this.getXPathForToggleContent('A_toggle');
    await expect(toggleContent).toHaveText('Inside of toggle');
  }


  async submitFormVerifier(): Promise<void> {
    const element = await this.getXPathForSubmitBtn();
    await element.click();

    const requiredFields = ['Name', 'Email Address', 'Message', 'Captcha'];
    await expect(await this.getXPathTitleAlertFillForm('Please, fill in the following fields:')).toBeVisible();

    for (const field of requiredFields) {
      await expect(await this.getXPathSubAlertFillForm(field)).toBeVisible();
    }
  }

  async submitFormwithNameVerifier(): Promise<void> {
    const inputName = (await this.getXPathInputNameForm('Name')).first();
    await inputName.fill('24');
    const element = await this.getXPathForSubmitBtn();
    await element.click();

    const requiredFields = ['Email Address', 'Message', 'Captcha'];
    await expect(await this.getXPathTitleAlertFillForm('Please, fill in the following fields:')).toBeVisible();

    for (const field of requiredFields) {
      await expect(await this.getXPathSubAlertFillForm(field)).toBeVisible();
    }
  }
}