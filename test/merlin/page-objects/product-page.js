const Common = require("../page-objects/common-page.js");

let prices = [];

class Product extends Common {
  constructor() {
    super();
    this.$priceHighToLowButton = () =>
      $('//div[normalize-space()="Price -- High to Low"]');
    this.$priceHighToLowHighlighted = () =>
      $('//div[@class="_10UF8M _3LsR0e"]');
    this.$priceSelectionDrop = () =>
      $('//div[@class="_3uDYxP"]//select[@class="_2YxCDZ"]');
    this.$dropdownPrice = () =>
      $(
        `//div[@class="_3uDYxP"]//select[@class="_2YxCDZ"]//option[@value="30000"]`
      );
    this.$productPageHeader = () => $('//a[@title="Mobiles & Accessories"]');
    this.$filterHeaderForPrice = () =>
      $('//div[contains(text(),"Min-₹30000")]');
    this.$filterHeaderForBrand = () =>
      $('//div[@class="_3sckoD" and text()="APPLE"]');
    this.$checkBoxApple = () =>
      $('//div[@title="APPLE"]//div[@class="_24_Dny"]');
    this.$$highToLowPrices = () => $$('//div[@class="_30jeq3 _1_WHN1"]');
    this.$$brandName = () => $$('//div[@class="_4rR01T"]');
    this.$$displayedMaxPrice = () => $$('//div[@class="_30jeq3 _1_WHN1"]');
    this.$clearAll = () =>
      $('//div[@class="_2id1nE"]//span[contains(text(),"Clear all")]');
    this.$maxPrice = () => $('//option[@value="Max"]');
  }
  /**
   * Method to click the high to low button
   */
  async clickOnHighToLow() {
    await this.$priceHighToLowButton().click();
    await this.$priceHighToLowHighlighted().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: "dropdown failed",
    });
  }
  /**
   * Method to check the max price of listed item
   * @returns
   */
  async checkMaxPriceOfLowToHigh() {
    prices = await this.$$highToLowPrices().map((price) => price.getText());
    prices = prices.map((price) => price.replace(/₹|,/g, ""));
    prices = prices.map((price) => parseInt(price));
    return this.checkDescending(prices);
  }
  /**
   * Method to click on dropdown and select the maximum price.
   */
  async clickOnDropDown() {
    await this.$priceSelectionDrop().click();
    await this.$dropdownPrice().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: "dropdown failed",
    });
    await this.$dropdownPrice().click();
    await this.$filterHeaderForPrice().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: "filter applying  failed",
    });
  }
  /**
   * Method to check the price displayed is higher than
   * @returns()
   */
  async checkMaxPrice() {
    return this.$$displayedMaxPrice().map((item) => item.getText());
  }
  /**
   * Method to select the brand
   */
  async selectBrand() {
    await this.$checkBoxApple().click();
    await this.$filterHeaderForBrand().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: "filter applying  failed",
    });
  }
  /**
   * Method to check the brandName
   */
  async checkBrandName() {
    return this.$$brandName().map((item) => item.getText());
  }
  /**
   * Method to clearall filters
   */
  async clearAll() {
    await this.$clearAll().click();
    await this.$maxPrice().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: "timeout for filter",
    });
  }
}
module.exports = {
  productPage: new Product(),
};
