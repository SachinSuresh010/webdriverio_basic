const { buttonPage } = require("./button-page.js");

class TextBox {
  constructor() {
    this.$textBoxPageHeader = () =>
      $('//div[@class="main-header"][text()="Text Box"]');
    this.$fieldInput = (fieldName) => $(`//input[@id="${fieldName}"]`);
    this.$addressInput = (addresstype) => $(`//textarea[@id="${addresstype}"]`);
    this.$submitButton = () => $('//button[@id="submit"]');
    this.$confirmationInputData = (inputData) => $(`//p[@id="${inputData}"]`);
    this.$buttonMenu = () => $('//span[@class="text"][text()="Buttons"]');
  }
  /**
   * In-putting data into the fields in Text Box Page
   * @param {String} name
   * @param {String} email
   * @param {String} currentAddress
   * @param {String} permanentAddress
   */
  async inputTextBoxField(name, email, currentAddress, permanentAddress) {
    await this.$fieldInput("userName").setValue(name);
    await this.$fieldInput("userEmail").setValue(email);
    await this.$addressInput("currentAddress").setValue(currentAddress);
    await this.$addressInput("permanentAddress").setValue(permanentAddress);
    await this.$submitButton().scrollIntoView({ block: "center" });
    await this.$submitButton().click();
    await this.$confirmationInputData("name").waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to Submitting input data to Text Box ",
    });
  }
  /**
   * Method to select Button option on the side menu
   */
  async buttonMenu() {
    await this.$buttonMenu().scrollIntoView({ block: "center" });
    await this.$buttonMenu().click();
    await buttonPage.$buttonPageHeader("name").waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to Submitting input data to Text Box ",
    });
  }
}

module.exports = {
  textBoxPage: new TextBox(),
};
