const { textBoxPage } = require("./text-box-page.js");

class Elements {
  constructor() {
    this.$pageHeader = () =>
      $('//div[@class="main-header"][text()="Elements"]');
    this.$textBoxOption = () => $('//span[@class="text"][text()="Text Box"]');
  }
  /**
   * Method to select text box an dgo to that page
   */
  async clickTextBox() {
    await this.$textBoxOption().click();
    await textBoxPage.$textBoxPageHeader().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to load Text Box page  ",
    });
  }
}
module.exports = {
  elementPage: new Elements(),
};
