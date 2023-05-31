class LoginPage {
    constructor() {
      this.$usernameField = () => $("#user-name");
      this.$passwordField = () => $("#password");
      this.$loginButton = () => $("#login-button");
      this.$homePageHeader = () => $('//div[contains(text(),"Swag Labs")]');
    }
    /** 
     * Method to launch the url and load the application
     * @param {string} url
     */
    async openUrl(url) {
      await browser.maximizeWindow();
      await browser.url(url);
    }
    /**
     * method toenter the username,password and click on login
     * @param {string} username
     * @param {string} password
     */
    async loginToApplication(username, password) {
      await this.$usernameField().setValue(username);
      await this.$passwordField().setValue(password);
      await this.$loginButton().click();
      await this.$homePageHeader().waitForDisplayed({
        timeout: 20000,
        timeOutMsg: "timeout for header to appear",
      });
    }
    /**
     * method to get home page url
     * @param {string} url
     */
    async homePageurl(url) {
      await browser.url(url);
    }
  }
  module.exports = 
  {
      loginPage: new LoginPage()
  }
  
  