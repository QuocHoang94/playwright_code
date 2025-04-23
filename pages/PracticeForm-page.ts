import { expect } from '@playwright/test';
import type { Page } from 'playwright';
import { execPath } from 'process';
import { information } from '../utils/testdata';

export class PracticeFormPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    input_firstName = async () =>
        await this.page.locator("xpath=//input[@id='firstName']");
    input_lastName = async () =>
        await this.page.locator("xpath=//input[@id='lastName']");
    input_userEmail = async () =>
        await this.page.locator("xpath=//input[@id='userEmail']");
    input_userNumber_mobile = async () =>
        await this.page.locator("xpath=//input[@id='userNumber']");
    select_gender = async (value) =>
        await this.page.locator(`xpath=//label[normalize-space()='${value}']`);
    select_hobbies = async (value) =>
        await this.page.locator(`xpath=//label[normalize-space()='${value}']`);
    textarea_currentAddress = async () =>
        await this.page.locator(`xpath=//textarea[@id='currentAddress']`);
    input_uploadPicture = async () =>
        await this.page.locator(`xpath=//input[@id='uploadPicture']`);
    selectState = async () =>
        await this.page.locator(`xpath=//div[text()='Select State']`);
    selectCity = async () =>
        await this.page.locator(`xpath=//div[text()='Select City']`);
    selectDropdownItemState_City = async (value) =>
        await this.page.locator(`xpath=//div[text()='${value}']`);
    btn_Submit = async () =>
        await this.page.locator(`xpath=//button[@id='submit']`);
    div_header_submitFormSuccess = async () =>
        await this.page.locator(`xpath=//div[@id='example-modal-sizes-title-lg']`);
    table_dialogSubmit = async (label) =>
        await this.page.locator(`xpath=//td[normalize-space()='${label}']/following-sibling::td`);
    header_studentRegistrationForm = async () =>
        await this.page.locator(`xpath=//h5[text()='Student Registration Form']`);


    async fillPracticeForm(mobileNumber: number) {
        await (await this.input_firstName()).fill(information.firstName);
        await (await this.input_lastName()).fill(information.lastName);
        await (await this.input_userEmail()).fill(information.email);
        if (mobileNumber === 1) {
            await (await this.input_userNumber_mobile()).fill(information.mobileNumber);
          } else {
            await (await this.input_userNumber_mobile()).fill("");
          }
        // await (await this.input_userNumber_mobile()).fill(information.mobileNumber);
        await (await this.select_gender(information.gender[0])).click();
        await (await this.select_hobbies(information.hobbies[0])).click();
        await (await this.textarea_currentAddress()).fill(information.currentAddress);

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent("filechooser"),
            await (await this.input_uploadPicture()).click()
        ]);
        await fileChooser.setFiles(["utils/img_test/test1.png"]);
        await (await this.selectState()).click();
        await (await this.selectDropdownItemState_City(information.state[0])).click();
        await (await this.selectCity()).click();
        await (await this.selectDropdownItemState_City(information.city[0])).click();
        await (await this.btn_Submit()).click();
    }

    async verifySubmitPracticeFormSuccess() {
        await expect(await this.div_header_submitFormSuccess()).toBeVisible();
         const expectedData = {
            "Student Name": "Luis Van",
            "Gender": "Male",
            "Mobile": "0912345678",
            "Hobbies": "Sports",
            "Picture": "test1.png",
            "Address": "123 Nguyen Van Cu, Hanoi",
            "State and City": "NCR Delhi"
        };
        for (const [label, value] of Object.entries(expectedData)) {
            await expect(await this.table_dialogSubmit(label)).toHaveText(value);
          }
    }

    async verifySubmitPracticeFormUnSuccess() {
        await expect(await this.input_userNumber_mobile()).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(await this.header_studentRegistrationForm()).toBeVisible();
    }
}