import { expect } from '@playwright/test';
import type { Page } from 'playwright';
import { execPath } from 'process';
import { user } from '../utils/testdata';
export class GiftCardsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    add_to_cart_button = async () =>
        await this.page.locator("xpath=//input[@id='add-to-cart-button-2']");
    enter_valid_recipient_name = async () =>
        await this.page.locator("xpath=//p[text()='Enter valid recipient name']");
    enter_valid_recipient_email = async () =>
        await this.page.locator("xpath=//p[text()='Enter valid recipient email']");
    full_description_virtual_gift_card = async () =>
        await this.page.locator("xpath=//div[@class='full-description']//p");
    product_price_gift_card_virtual = async () =>
        await this.page.locator("xpath=//span[@class='price-value-2']");
    recipient_name_gift_card_virtual_input = async () =>
        await this.page.locator("xpath=//input[@id='giftcard_2_RecipientName']");
    recipient_email_gift_card_virtual_input = async () =>
        await this.page.locator("xpath=//input[@id='giftcard_2_RecipientEmail']");

    async click_on_add_to_cart_button() {
        await (await this.add_to_cart_button()).click();
    }

    async input_recipient_name_recipient_email() {
        await (await this.recipient_name_gift_card_virtual_input()).fill(user.email);
        await (await this.recipient_email_gift_card_virtual_input()).fill(user.invalidPassword);
    }

    async verify_notification_enter_valid_recipient() {
        await expect(await this.enter_valid_recipient_name()).toBeVisible();
        await expect(await this.enter_valid_recipient_email()).toBeVisible();
    }

    async verify_full_description_virtual_gift_card() {
        await expect(await this.full_description_virtual_gift_card()).toHaveText(user.descriptionVirtualGiftCard);
    }

    async verify_product_price_virtual_gift_card() {
        await expect(await this.product_price_gift_card_virtual()).toHaveText("25.00");
    }

    async verify_invalid_recipient_email_virtual_gift_card() {
        await expect(await this.enter_valid_recipient_email()).toBeVisible();
    }
}