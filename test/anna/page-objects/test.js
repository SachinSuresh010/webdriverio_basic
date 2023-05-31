class LoginPage {
  constructor() {
    this.$loginButton = () => $('//button[text()="Login "]');
    this.$loginHeader = () => $('//div[contains(text(),"Login")]');

    this.$signupButton = () => $("div.sgn_up_btn a");
  }
  /**
   * open url and launch the application.
   * @param {string} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$loginButton().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "time out fail for login",
    });
  }
}

module.exports = {
  loginPage: new LoginPage(),
};
