
class LoginPage
{
    constructor()
    {
      this.$loginButton=()=>$('//button[text()="Login "]');
      this.$loginPopUpWondow=()=>$('//div[@class="modal-outer-wrap"]');
      this.$signUpButton=()=>$('//a[@class="signup_btn"]');
      this.registerHeader=()=>$('//div[@class="pop_tle"]');
      this.$registerFieldValues=(fieldName)=>$(`//div[@class="modal-inner-wrap user-register-popup"]//input[@id="${fieldName}"]`);
      this.$logInButton=()=>$('//div[@class="subm_btn"]/a');
    }
    /**
     * Open the url and load the application
     * @param {string} url 
     */
    async openUrl(url)
    {
        await browser.url(url);
        await this.$loginButton().waitForDisplayed({timeout: 100000, timeoutMsg: 'wait time out failed for login button displayed'});
    }
    /**
     * Open login pop up
     */
    async openLoginPopUp()
    {
        await this.$loginButton().click();
        await this.$loginPopUpWondow().waitForDisplayed({timeout: 100000, timeoutMsg: 'wait time out failed for login pop up window displayed'});
        await this.$signUpButton().click();
        await this.registerHeader().waitForDisplayed({timeout: 100000, timeoutMsg: 'wait time out failed for register pop up window displayed'});
    }
}
module.exports = 
{
    loginPage : new LoginPage()
}