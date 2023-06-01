const Common = require("./common");
let priceArray = [];

class HomePage extends Common {
  constructor() {
    super();
    this.$homePageSearchBar = () => $('//input[@class="_3704LK"]');
    this.$searchIcon = () => $('//button[@class="L0Z3Pu"]');
    this.$loginPopUp = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    this.$categoryNameMobile = () => $('//a[@class="_1jJQdf _2Mji8F"]');
    this.$priceHighToLow = () =>
      $('//div[@class = "_5THWM1"]//div[text()="Price -- High to Low"]');
    this.$priceHighToLowHighlight = () =>
      $('//div[@class="_10UF8M _3LsR0e"][contains(text(),"High to Low")]');
    this.$itemSortedPrice = () => $('//div[@class="_30jeq3 _1_WHN1"]');
    this.$$priceOfAnItem = () => $$('//div[@class="_30jeq3 _1_WHN1"]');
    this.$maxDropDownSelection = () => $('//div[@class="_3uDYxP"]');
    this.$maxValueSelection = () =>
      $('//div[@class="_3uDYxP"]//select//option[text()="₹30000"]');
    this.$filterMaxAmountDisplay = () =>
      $('//div[@class="_3ztiZO"]/div[@class="_3sckoD"]');
    this.$brandSelection = (brandName) =>
      $(`//div[@class="_3879cV"][text()="${brandName}"]`);
    this.$filterBrandNameDisplay = (brandName) =>
      $(`//div[@class="_3sckoD"][text()="${brandName}"]`);
    this.$$brandName = () => $$('//div[@class="_4rR01T"]');
    this.$clearAll = () => $('//div[@class="_2id1nE"]');
    this.$priceHightoLow = () =>
      $('//div[@class = "_5THWM1"]//div[text()="Price -- High to Low"]');
  }

  /**
         * Load the application
         * @param {String} url
         */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$homePageSearchBar().waitForDisplayed({
      timeout: 100000,
      timeoutMsg: "failed to load search bar",
    });
  }

  /**
     * method to search an item
     * @param {string} searchData
     */
  async inputSearchData(searchData) {
    await this.$loginPopUp().click();
    await this.$homePageSearchBar().setValue(searchData);
    await this.$searchIcon().click();
  }

  /**
     * method to sort the item price from high to low
     */
  async sortPriceHighToLow() {
    await this.$priceHighToLow().click();
    await this.$priceHighToLowHighlight().waitForDisplayed({
      timeout: 100000,
      timeoutMsg: "failed to load sorted items",
    });
  }

  /**
     * method to get the item price
     * @returns boolean
     */
  async orderCheck() {
    for (let $Price of await this.$$priceOfAnItem()) {
      let value = await $Price.getText();
      let resultPrice = value.replace(/\D/g, "");
      priceArray.push(resultPrice);
    }
    return this.isDescending(priceArray);
  }

  /**
     * method to set a maximum amount
     */
  async setMaxAmountToMobile() {
    await this.$maxDropDownSelection().click();
    await this.$maxValueSelection().click();
    await browser.pause(10000);
    await this.$filterMaxAmountDisplay().waitForDisplayed({
      timeout: 100000,
      timeoutMsg: "failed to load sorted items",
    });
  }

  async getPriceForCheck() {
    for (let $Price of await this.$$priceOfAnItem()) {
      let value = await $Price.getText();

      let resultPrice = value.replace(/\D/g, "");

      priceArray.push(resultPrice);
    }

    return this.maxToDescending(priceArray);
  }
  /**
     * method to select a brand from the list
     * @param {String} brandName
     */
  async selectBrandFromList(brandName) {
    await this.$brandSelection(brandName).click();
  }

  async getBrandNameForCheck() {
    for (let $brand of await this.$$brandName()) {
      let name = await $brand.getText();
      nameArray.push(name);
    }
    return nameArray;
  }

  /**
     * method to clear the filter
     */

  async clearAllFilter() {
    await this.$clearAll().click();
  }
}
module.exports = {
  homePage: new HomePage(),
};
