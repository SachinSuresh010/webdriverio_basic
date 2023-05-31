import homePage from "../pageobjects/home-page.js";
import elementsPage from "../pageobjects/elements-page.js";
import buttonPage from "../pageobjects/button-page.js";
import uploadDownload from "../pageobjects/upload-download.js";
import webTablesPage from "../pageobjects/web-tables-page.js";

let email = `${Math.random().toString(36).substring(2, 8)}@mailsac.com`;

describe('Basic flow of ToolsQA Application', () => {
    it('Open URL and load the application', async () => {
        await homePage.openUrl('https://demoqa.com/');
        await expect(browser).toHaveUrl('https://demoqa.com/');
        expect(await homePage.$homePageHeader().isDisplayed()).toBe(true);
    });

    it('Click on Elements icon and navigate to Elements page', async () => {
        await homePage.clickElementsIcon();
        expect(await elementsPage.$textBoxIcon().isDisplayed()).toBe(true);
    });

    it('Click on Textbox icon and navigate to form', async () => {
        await elementsPage.clickTextBox();
        expect(await elementsPage.$fullNameField().isDisplayed()).toBe(true);
    });

    it('Fill details and submit the form', async () => {
        await elementsPage.fillTextBoxForm('Revathy', email, 'Kochi', 'Coimbatore');
    })
});