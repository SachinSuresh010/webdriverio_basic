/****************************************************
 *                     Imports                      *
 ****************************************************/
const Common = require("./common.js");

class WebTablesPage extends Common {
  
  constructor() {
    super();
    /**
     * Elements
     */
    this.$addButton = () => $('//button[@id="addNewRecordButton"]');
    this.$registrationForm = () => $('//div[@id="registration-form-modal"]');
    this.$registrationFormFields = (fieldName) =>
      $(`//input[@id="${fieldName}"]`);
    this.$submitButton = () => $('//button[@id="submit"]');
    this.$newTableRow = () => $('//div[@class="rt-tr-group"][4]');
    this.$newlyAddedRowContent = (content) =>
      $(
        `//div[@class="rt-tr-group"][4]//div[@class="rt-td"][text()="${content}"]`
      );
    this.$searchBox = () => $('//input[@id="searchBox"]');
    this.$searchResultTable = () => $('//div[@class="rt-table"]');
    this.$$searchResults = () =>
      $$(`//div[@class="rt-tr-group"]//div[@class="rt-td"][3]`);
    this.$deleteEntry = (input) =>
      $(
        `//div[@class="rt-tr-group"]//div[text()="${input}"]/following-sibling::div/div/span[2]`
      );
  }

  /**
   * Methods
   */

  /**
   * Method to click on "Add" button.
   */
  async clickOnAdd() {
    await this.$addButton().click();
    await this.$registrationForm().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Wait time for registration form popup to be displayed.",
    });
  }

  /**
   * Method to enter input in registration form popup fields.
   * @param {String} fieldName
   * @param {String} fieldInput
   */
  async enterInputToFields(fieldName, fieldInput) {
    await this.$registrationFormFields(fieldName).setValue(fieldInput);
  }

  /**
   * Method to click on submit button.
   */
  async submitButtonClick() {
    await await this.$submitButton().scrollIntoView({ block: "center" });
    await this.$submitButton().click();
  }

  /**
   * Method to enter search keyword and clear search field.
   */
  async search(input) {
    if (input === " ") await this.$searchBox().clearValue();
    else {
      await this.$searchBox().setValue(input);
      await this.$searchResultTable().waitForDisplayed({
        timeout: 10000,
        timeoutMsg: "Wait time for search result to be displayed.",
      });
    }
  }

  /**
   * Method to extract each column values from search results.
   */
  async getFieldData(fieldData) {
    let resultSet = await this.$$searchResults().map((item) => item.getText());
    return await resultSet.filter((item) => item === fieldData);
  }

  async deleteEntry(name) {
    await this.$deleteEntry(name).click();
  }
}

module.exports = {
  webTablesPage: new WebTablesPage(),
};
