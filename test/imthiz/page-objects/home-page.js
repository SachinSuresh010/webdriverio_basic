const { elementsPage } = require("./elements-page.js");

class HomePage {
  constructor() {
    this.$homePageHeader = () => $('//img[@class="banner-image"]');
    this.$elementPage = () =>
      $('//div[@class="card-body"]//h5[text()="Elements"]');
    this.$$firstName = () => $$("//tbody//td[1]");
    this.$$lastName = () => $$("//tbody//td[2]");
  }
  /**
   * Load the url for the site and open the website
   * @param {String} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$homePageHeader().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed for login page header",
    });
  }
  /**
   * Method to click onto Elements option in side menu
   */
  async clickElements() {
    await this.$elementPage().scrollIntoView({ block: "center" });
    await this.$elementPage().click();
    await elementsPage.$pageHeader().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to load Element page ",
    });
  }
}
module.exports = {
  homePage: new HomePage(),
};
