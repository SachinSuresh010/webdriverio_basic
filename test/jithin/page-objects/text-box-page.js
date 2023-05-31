/****************************************************
 *                     Imports                      *
 ****************************************************/
const Common = require("./common.js");

class TextBoxPage extends Common {

  constructor() {
    super();
    /**
     * Elements
     */
    this.$textBoxFields = (fieldName) => $(`//input[@id="${fieldName}"]`);
    this.$addressFields = (fieldName) => $(`//textarea[@id='${fieldName}']`);
    this.$submitButton = () => $('//button[@id="submit"]');
    this.$detailsDisplayed = (fields) => $(`//p[@id='${fields}']`);
  }

  /**
   * Method to enter input to text box fields.
   * @param {String} fieldName
   * @param {String} fieldInput
   * @param {String} flag [ "input", "text" ]
   */
  async enterInput(fieldName, fieldInput, flag) {
    if (flag === "input")
      await this.$textBoxFields(fieldName).setValue(fieldInput);
    if (flag === "text")
      await this.$addressFields(fieldName).setValue(fieldInput);
  }

  /**
   * Method to click on submit button.
   */
  async clickOnSubmit() {
    await browser.scroll(0, 200);
    await this.$submitButton().click();
  }
}

module.exports = 
{
  textBoxPage : new TextBoxPage()
}

