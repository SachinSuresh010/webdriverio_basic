import loginPage from "../pageobjects/login-page.js"
import productOrderPage from "../pageobjects/Product-Order-Page.js"

let email = `${Math.random().toString(36).substring(2, 8)}@mailsac.com`;
let phoneNumber = Math.floor(Math.random() * 10000000000);
let firstName;

describe('Basic flow of EDelivery Application', () => {
    it('Open URL and load the application', async () => {
        await loginPage.openUrl('https://edelivery.zoproduct.com/');
        await expect(browser).toHaveUrl('https://edelivery.zoproduct.com/');
    });
    it('Click on login button and check if pop-up window appears', async () => {
        await loginPage.openLoginPopUp();
        expect(await loginPage.$loginHeader().isDisplayed()).toBe(true);
    });
    it('Click on sign-up button and check if register pop-up appears', async () => {
        await loginPage.clickSignup();
        expect(await loginPage.$registerHeader().isDisplayed()).toBe(true);
    });
    it('Enter the register form details', async () => {
        let firstName = await loginPage.getRandomLetters(6);
        await loginPage.fillRegistrationForm(firstName, 'jakson', email, phoneNumber);
    })
    it("Enter the verification message sent to the mobile number", async () => {
        await loginPage.enterVerificationCode()
        expect(await loginPage.$verificationMsgheader().isDisplayed());
    })
    it("Clicking the 'Login' button in the pop up shown ", async () => {
        await loginPage.clickLoginButton
    })

    it("Message for successful registration", async () => {

        await loginPage.registersuccessful();
        expect(await (loginPage.$registerSuccess()).isDisplayed()).toBe(true);
        expect(await (loginPage.$profileName())).toHaveValueContaining(firstName);
    })

    it("Clicking the search field for delivery location", async () => {
        await productOrderPage.locationSelection("chennai")
        await expect(browser).toHaveUrl('https://edelivery.zoproduct.com/chennai/5eba800fb38f74523bc5c41e/restaurants');
        expect(await (productOrderPage.$outletHeader()).isDisplayed()).toBe(true);
        expect(await (productOrderPage.$maxFashionsIcon()).isDisplayed()).toBe(true);
    })
    it("Selecting 'MAX FASHIONS'.", async () => {
        await productOrderPage.storeSelection()
        expect(await(productOrderPage.$maxFashionHeader()).isDisplayed()).toBe(true);
    })
    it("Clicking Add button under White Shirt", async () => {
        await productOrderPage.addingWhiteShirt()
        expect(await(productOrderPage.$whiteShirtHeader()).isDisplayed()).toBe(true);
        expect(await(productOrderPage.$cartBox()).isDisplayed()).toBe(true);
    })

})