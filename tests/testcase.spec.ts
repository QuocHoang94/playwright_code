import { test } from '@playwright/test';
import { LoginPage } from '../pages/Login-page'; 
import { HomePage } from '../pages/home-page';
import { GiftCardsPage } from '../pages/GiftCards-page';
import { user } from '../utils/testdata';
import { setupCommonTest } from './testsetup';

setupCommonTest();

test('Verify successful login and account visibility', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(user.email, user.validPassword);
  await loginPage.verify_login_successs();
});

test('Verify failed login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(user.email, user.invalidPassword);
  await loginPage.verify_login_failed();
});

test('Verify the number of displayed categories is correct', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.login(user.email, user.validPassword);
  await homePage.verify_number_displayed_categories();
});

test('Verify the Enter button function corectly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.verify_enter_button_function(user.email, user.validPassword);
});

test('Verify the number of displayed Featured products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.login(user.email, user.validPassword);
  await homePage.verify_number_displayed_homepage_product();
});

test('Verify unsuccessful add to cart scenario', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const giftCardPage = new GiftCardsPage(page);
  await loginPage.login(user.email, user.validPassword);
  await homePage.click_on_add_to_cart_first_product();
  await giftCardPage.click_on_add_to_cart_button();
  await giftCardPage.verify_notification_enter_valid_recipient();
});

test('Verify the full description content of the virtual gift card is displayed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const giftCardPage = new GiftCardsPage(page);
  await loginPage.login(user.email, user.validPassword);
  await homePage.click_on_add_to_cart_first_product();
  await giftCardPage.verify_full_description_virtual_gift_card();
});

test('Verify the product price of the virtual gift card is displayed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const giftCardPage = new GiftCardsPage(page);
  await loginPage.login(user.email, user.validPassword);
  await homePage.click_on_add_to_cart_first_product();
  await giftCardPage.verify_product_price_virtual_gift_card();
});

test('Verify valid recipent name invalid recipent email of the virtual gift card is displayed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const giftCardPage = new GiftCardsPage(page);
  await loginPage.login(user.email, user.validPassword);
  await homePage.click_on_add_to_cart_first_product();
  await giftCardPage.input_recipient_name_recipient_email();
  await giftCardPage.click_on_add_to_cart_button();
  await giftCardPage.verify_invalid_recipient_email_virtual_gift_card();
});

test('Verify that clicking the logo navigates back to the homepage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const giftCardPage = new GiftCardsPage(page);
  await loginPage.login(user.email, user.validPassword);
  await homePage.click_on_add_to_cart_first_product();
  await giftCardPage.input_recipient_name_recipient_email();
  await homePage.click_on_logo();
  await homePage.verify_welcome_sotre_displayed();
});