import { expect } from '@playwright/test';
import type { Page } from 'playwright';
import { execPath } from 'process';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    login_email = async () =>
        await this.page.locator("xpath=//input[@id='Email']");
    login_password = async () =>
        await this.page.locator("xpath=//input[@id='Password']");
    submit_login_button = async () =>
        await this.page.locator("xpath=//input[@class='button-1 login-button']");
    customer_info_account = async ()=>
        await this.page.locator("xpath=//div[@class='header-links']/ul/li/a[@class='account']");
    login_error_message_span = async () =>
        await this.page.locator("xpath=//div[@class='validation-summary-errors']/span");
    login_error_detail_li = async () =>
        await this.page.locator("xpath=//div[@class='validation-summary-errors']/ul/li");
    list_categories_li = async () =>
        await this.page.locator("xpath=//div[@class='block block-category-navigation']//ul[@class='list']/li");
    home_page_product_grid_div = async () =>
        await this.page.locator("xpath=//div[@class='product-grid home-page-product-grid']//div[@class='item-box']");

    async login(email: string, password: string) {
        await (await this.login_email()).fill(email);
        await (await this.login_password()).fill(password);
        await (await this.submit_login_button()).click();
    }

    async verify_login_successs(){
        await expect(await this.customer_info_account()).toBeVisible();
    }

    async verify_login_failed() {
        const [errorMessage, errorDetail] = await Promise.all([
            this.login_error_message_span(),
            this.login_error_detail_li()
        ]);
    
        await expect(errorMessage).toBeVisible();
        await expect(errorDetail).toBeVisible();
    }

    async verify_number_displayed_categories(){
        await expect(await this.list_categories_li()).toHaveCount(7);
    }

    async verify_enter_button_function(email: string, password: string){
        await (await this.login_email()).fill(email);
        await (await this.login_password()).fill(password);
        await (await this.login_password()).press('Enter');
        await expect(await this.customer_info_account()).toBeVisible();
    }

    async verify_number_displayed_homepage_product(){
        await expect(await this.home_page_product_grid_div()).toHaveCount(6);
    }
}
