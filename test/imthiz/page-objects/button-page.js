const {
  uploadDownloadPage,
} = require("./upload-download-page.js");

class ButtonPage {
  constructor() {
    this.$buttonPageHeader = () =>
      $('//div[@class="main-header"][text()="Buttons"]');
    this.$buttonTypeTester = (type) => $(`//button[@id="${type}"]`);
    this.$buttonClickMessage = (buttonType) => $(`//p[@id="${buttonType}"]`);
    this.$uploadDownloadButton = () =>
      $('//span[@class="text"][text()="Upload and Download"]');
  }
  /**
   * Double click testing method
   */
  async doubleClickTesting() {
    await this.$buttonTypeTester("doubleClickBtn").click();
    await this.$buttonTypeTester("doubleClickBtn").doubleClick();
    await this.$buttonClickMessage("doubleClickMessage").waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to do double click ",
    });
  }
  /**
   * Method to test right click
   */
  async rightClickTesting() {
    await this.$buttonTypeTester("rightClickBtn").click();
    await this.$buttonTypeTester("rightClickBtn").click({ button: "right" });
    await this.$buttonClickMessage("rightClickMessage").waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to do right click ",
    });
  }
  /**
   * Method to click on upload and download option in the side menu
   */
  async uploadDownloadButton() {
    await this.$uploadDownloadButton().scrollIntoView({ block: "center" });
    await this.$uploadDownloadButton().click();
    await uploadDownloadPage
      .$uploadDownloadPageHeader("rightClickMessage")
      .waitForDisplayed({
        timeout: 5000,
        timeoutMsg: "wait time out failed to do right click ",
      });
  }
}
module.exports = {
  buttonPage: new ButtonPage(),
};
