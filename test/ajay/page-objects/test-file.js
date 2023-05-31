import Common from "./Common.js";

class Login extends Common {

    constructor() {

        super();
        this.$loginButton = () => $('//button[text()="Login "]');
        this.$loginHeader = () => $('//div[contains(text(),"Login")]');
        this.$signupButton = () => $('div.sgn_up_btn a');
        this.$registerHeader = () => $('//div[contains(text(),"Register")]');
        this.$registerFields = (fieldName) => $(`//div[@class="modal-inner-wrap user-register-popup"]//input[@id="${fieldName}"]`);
        this.$registerContinue = () => $('//button[@type="submit"]')
        this.$verificationlogin = () => $('//div[@class="modal-body"]//div[@class="subm_btn"]')
        this.$verificationMsgheader = () => $('//div[@class="pop_tle ng-binding"]')
        this.$registerSuccess = () => $('//div[@class="toast toast-success"]')
        this.$profileName = () => $('//div[@class="container"]//span[text()="Hi ttt"]')

    }

    /**
    * Open url and launch the application.
    * @param {string} url
    */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$loginButton().waitForDisplayed({ timeout: 5000, timeoutMsg: 'time out fail for login' });
    }

    /**
    * click on login button and navigate to login pop-up.
    */
    async openLoginPopUp() {
        await this.$loginButton().click();
        await this.$loginHeader().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for register pop-up' });
    }

    /**
    * click on sign-up button and navigate to register pop-up page.
    */
    async clickSignup() {
        await this.$signupButton().click();
        await this.$registerHeader().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for register pop-up' });
    }

    /**
    * Filling the registration form with firstname,lastname,email and phone number
    * @param {string} firstName
    * @param {string} lastName
    * @param {string} email
    * @param {string} phoneNumber
    */
    async fillRegistrationForm(firstName, lastName, email, phoneNumber) {
        await this.$registerFields('first_name').setValue(firstName);
        await this.$registerFields('last_name').setValue(lastName);
        await this.$registerFields('email').setValue(email);
        await this.$registerFields('tel').setValue(phoneNumber);
        await this.$registerContinue().click();
    }

    /**
    * Entering the verification code received on the given mobile number
    */
    async enterVerificationCode() {
        await this.$verificationlogin().click();
        await this.$verificationMsgheader().waitForDisplayed({ timeout: 5000, timeoutMsg: 'time out fail for register pop-up' });
        await this.$verificationlogin().click()
    }

    /**
    * Method to check the successful registration completion.
    */
    async registersuccessful() {
        await this.$registerSuccess().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for register pop-up' });
    }

}

export default new Login()