class TextBox {
  constructor() {
    this.$elementButton = () => $('//h5[text()="Elements"]')
    this.$elementHeader = () => $('//div[@class="main-header"]')
    this.$textBoxButton = () => $('//span[normalize-space()="Text Box"]')
    this.$texteBoxHeader = () => $('//div[@class="main-header"]')
    this.$textBoxFeild = (feildName) => $(`#${feildName}`)
    this.$clickTextBoxSubmit = () => $('#submit')
    // this.$verifyTextBoxFeild = (verifyFeildName) => $(`#${verifyFeildName}`)
    this.$verifyTextBoxFullName = () => $('#name')
    // this.$verifyTextBoxEmail = () => $('#email')
    // this.$verifyTextBoxCurrentAddress = () => $('')
    // this.$verifyTextBoxPermenentAddress = () => $('')
   }

  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
  }
  /**
   * Click on the "Element" button.
   */
  async clickElementBtn(){
    await this.$elementButton().scrollIntoView({button:"center"});
    await this.$elementButton().click();
    await this.$elementHeader().waitForDisplayed({
      timeout: 100000,
      timeoutMsg: "time out to display the 'Textbox' page",
    });
  }
  /**
   * Click on the "Text box" button.
   */
  async clickTextBox () {
    await this.$textBoxButton().click();
    await this.$texteBoxHeader().waitForDisplayed({
      timeout:10000,
      timeoutMsg: "time out to display the 'Textbox' page",
    });
  }

  async fillTextBoxFeilds (fullName,email,address) {
    await this.$textBoxFeild("userName").setValue(fullName);
    await this.$textBoxFeild("userEmail").setValue(email);
    await this.$textBoxFeild("currentAddress").setValue(address);
    await this.$textBoxFeild("permanentAddress").setValue(address);
    await this.$clickTextBoxSubmit().scrollIntoView({  block: 'center', inline: 'center',});
    await this.$clickTextBoxSubmit().click();
    await this.$verifyTextBoxFullName().waitForDisplayed({
      timeout:10000,
      timeoutMsg: "time out to display the 'Textbox' page",
    });
  }

}
export default new TextBox();
