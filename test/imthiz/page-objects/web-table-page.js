class WebTable {
  constructor() {
    this.$webTableHeader = () =>
      $('//div[@class="main-header"][text()="Web Tables"]');
    this.$addNewrecordButton = () => $('//button[@id="addNewRecordButton"]');
    this.$registerationForm = () => $('//div[@id="registration-form-modal"]');
    this.$registerationInputField = (fieldName) =>
      $(`//input[@id="${fieldName}"]`);
    this.$submitButton = () => $('//button[@id="submit"]');
    this.$searchBox = () => $('//input[@id="searchBox"]');
    this.$searchIcon = () => $('//div[@class="input-group-append"]');
    this.$$ageCell = () => $$('//div[@role="gridcell"][3]');
    this.$$firstNameCell = () => $$('//div[@role="gridcell"][1]');
    this.$deleteDataRow = (firstName) =>
      $(`//div[text( )="${firstName}"]/following-sibling::div//span[2]`);
  }
  /**
   * Creating a new record and opening the registeration page
   */
  async addNewRecord() {
    await this.$addNewrecordButton().click();
    await this.$registerationForm().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to load registeration table ",
    });
  }
  /**
   * Entering the data on to the registeration pope up
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} email
   * @param {String} age
   * @param {String} salary
   * @param {STring} department
   */
  async registerationFieldEntering(
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  ) {
    await this.$registerationInputField("firstName").setValue(firstName);
    await this.$registerationInputField("lastName").setValue(lastName);
    await this.$registerationInputField("userEmail").setValue(email);
    await this.$registerationInputField("age").setValue(age);
    await this.$registerationInputField("salary").setValue(salary);
    await this.$registerationInputField("department").setValue(department);
    await this.$submitButton().scrollIntoView({ block: "center" });
    await this.$submitButton().click();
    await this.$registerationForm().waitForDisplayed({
      timeout: 5000,
      reverse: true,
      timeoutMsg: "wait time out failed to load registeration table ",
    });
  }
  /**
   *
   * @returns number of entry row
   */
  async numberOfRow() {
    let array = [];
    for (let $element of await this.$$ageCell()) {
      let value = await $element.getText();
      array.push(value);
    }

    return array.length;
  }
  /**
   *
   * @param {String} searchData
   * @returns array of names with same age
   */
  async searchingData(searchData) {
    await this.$searchBox().setValue(searchData);
    await this.$searchIcon().click();

    let searchedValueArray = [];
    for (let $element of await this.$$ageCell()) {
      let value = await $element.getText();
      searchedValueArray.push(value);
    }

    return searchedValueArray.filter((item) => item === searchData);
  }
  /**
   *
   * @param {Number} searchData
   * @returns array of names with same age
   */
  async deleteData(firstName) {
    await this.$searchBox().clearValue();
    await this.$deleteDataRow(firstName).click();
    let searchedValueArray = [];
    for (let $element of await this.$$firstNameCell()) {
      let value = await $element.getText();
      searchedValueArray.push(value);
    }
    return searchedValueArray.length;
  }
}
module.exports = {
  webTablePage: new WebTable(),
};
