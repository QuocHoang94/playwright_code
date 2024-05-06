import type { Page } from "@playwright/test";

export class ElementBigPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    bigPageWithTitle = async (elementName: string) =>
        await this.page.locator(
            `xpath=//a[normalize-space()='${elementName}']`
        );
    locateElementById = async (elementName: string) =>
        await this.page.locator(`xpath=//span[@id='${elementName}']`);

    getXPathForToggleContent = async (elementName: string) =>
        await this.page.locator(
            `xpath=//span[@id='${elementName}']/parent::h5/following-sibling::div`
        );
    getXPathForSubmitBtn = async () =>
        await this.page.locator(
            `xpath=(//p[@class='clearfix'][1])[1]/child::span/ancestor::p/parent::div/following-sibling::button`
        );
    getXPathTitleAlertFillForm = async (elementName: string) =>
        await this.page.locator(
            `xpath=//p[normalize-space()='${elementName}']`
        );
    getXPathSubAlertFillForm = async (elementName: string) =>
        await this.page.locator(
            `xpath=//li[normalize-space()='${elementName}']`
        );

    getXPathInputNameForm = async (elementName: string) =>
        await this.page.locator(
            `xpath=//input[@placeholder='${elementName}']`
        );
}