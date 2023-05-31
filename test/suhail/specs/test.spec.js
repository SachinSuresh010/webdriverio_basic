import loginPage from '../pageobjects/text-box-page.js';
let fullName = "Suhail";
let address = "California-23";
let email = fullName + `${Math.floor(Math.random() * 100)}@mailsac.com`;
import buttonsPage from '../pageobjects/buttons-page.js';

describe("Launch the url and verify the tab functions", () => {
    it("Open url of the application" , async () => {
        await loginPage.openUrl("https://demoqa.com/");
        await expect(browser).toHaveUrl("https://demoqa.com/");
    });

    it("Click on the 'Element' button" , async () => {
        await loginPage.clickElementBtn();
        expect (await loginPage.$elementHeader()).toBeDisplayed();
    });

    it("Click on the 'Text Box' button" , async () => {
        await loginPage.clickTextBox();
        expect (await loginPage.$texteBoxHeader()).toBeDisplayed();
    });

    it("Enter the valid datas in the required feilds" , async () => {
        await loginPage.fillTextBoxFeilds(fullName,address,email);
        expect (await loginPage.$verifyTextBoxFeild()).toBeDisplayed(fullName);
        expect (await loginPage.$verifyTextBoxFeild()).toBeDisplayed(email);
        expect (await loginPage.$verifyTextBoxFeild()).toBeDisplayed();
        expect (await loginPage.$verifyTextBoxFeild()).toBeDisplayed();

    });

    it("Click on the 'Buttons' page" , async () => {
        await buttonsPage.clickButtonPage();
        expect (await buttonsPage.$buttonsHeader()).toHaveText("Buttons");
    });

    it("Click on the 'Double click' button" , async () => {
        await buttonsPage.clickOnDoubleClick();
        expect (await buttonsPage.$verifyDoubleClick()).toHaveText("Buttons");
    });

    it("Click on the 'Right click' button" , async () => {
        await buttonsPage.clickOnRightClick();
        expect (await buttonsPage.$verifyRightClick()).toHaveText("Buttons");
    });

});



