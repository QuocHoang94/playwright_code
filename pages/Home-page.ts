import { expect } from '@playwright/test';
import type { Page } from 'playwright';
import { execPath } from 'process';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    list_categories_li = async () =>
        await this.page.locator("xpath=//div[@class='block block-category-navigation']//ul[@class='list']/li");
    home_page_product_grid_div = async () =>
        await this.page.locator("xpath=//div[@class='product-grid home-page-product-grid']//div[@class='item-box']");
    add_to_cart_product_first = async () =>
        await this.page.locator("xpath=(//div[@class='product-item']//div[@class='details']//div[@class='buttons']//input[@class='button-2 product-box-add-to-cart-button'])[1]");
    header_logo = async () =>
        await this.page.locator("xpath=//div[@class='header-logo']//img");
    header_content_h2 = async () =>
        await this.page.locator("xpath=//h2[@class='topic-html-content-header']");

    async verify_number_displayed_categories() {
        await expect(await this.list_categories_li()).toHaveCount(7);
    }

    async verify_number_displayed_homepage_product() {
        await expect(await this.home_page_product_grid_div()).toHaveCount(6);
    }

    async click_on_add_to_cart_first_product() {
        await (await this.add_to_cart_product_first()).click();
    }

    async click_on_logo() {
        await (await this.header_logo()).click();
    }

    async verify_welcome_sotre_displayed() {
        await expect(await this.header_content_h2()).toBeVisible();
    }
}
