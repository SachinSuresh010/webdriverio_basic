/****************************************************
 *                     import                       *
 ****************************************************/
const Common = require("./common.js");

class SearchResultsPage extends Common {
    
  constructor() {
    super();
    /**
     * Elements
     */
    this.$searchResultIdentifier = (searchKeyWord) =>
      $(`//span/span[contains(text(),"${searchKeyWord}")]`);
    this.$priceDescendingSort = () =>
      $('//div[@class="_10UF8M"][contains(text(),"High to Low")]');
    this.$priceDescendingSortHighlight = () =>
      $('//div[@class="_10UF8M _3LsR0e"][contains(text(),"High to Low")]');
    this.$sortResult = () => $('(//div[@class="_2kHMtA"])[1]');
    this.$$priceOfItem = () => $$('//div[@class="_30jeq3 _1_WHN1"]');
    this.$$brandNameOfItems = (brandName) =>
      $$(`//a//div[contains(text(),"${brandName}")]`);
    this.$filterPriceDropDown = () => $('//div[@class="_3uDYxP"]//select');
    this.$filterMaxPrice = (maxPrice) =>
      $(`//div[@class="_3uDYxP"]//option[@value="${maxPrice}"]`);
    this.$searchResultFirstRow = () =>
      $('(//div[@class="_30jeq3 _1_WHN1"])[1]');
    this.$filterBrand = (brandName) =>
      $(`//div[text()="${brandName}"]/preceding-sibling::div`);
    this.$searchResults = () => $('//div[@class="_1YokD2 _3Mn1Gg"]');
    this.$filterBrandResults = (brandName) =>
      $(`//a//div[contains(text(),"${brandName}")]`);
    this.$waitAnimation = () => $('//*[name()="circle"]');
    this.$clearAllButton = () => $('//span[text()="Filters"]/../..//span[text()="Clear all"]');
    this.$filterLabel = (label) => $(`//div[@class="_3ztiZO"]/div[text()="${label}"]`);
    this.$filterSpecificClearAll = () => $('//div[@class="HbxufK"]/span');
  }

  /**
   * Methods
   */

  /**
   * Method to click on "Price -- High to Low" sort
   * @returns returns true if valid sort else false
   */
  async priceSort() {
    await this.$priceDescendingSort().waitForClickable({ timeout: 10000 });
    await this.$priceDescendingSort().click();
    await this.$priceDescendingSortHighlight().waitForDisplayed({
      timeout: 10000,
    });
    let resultList = await this.$$priceOfItem().map((item) => item.getText());
    return await this.sortChecker(resultList);
  }

  /**
   * Method to select maximum price from price filter.
   * @param {Number} maxPrice
   * @returns true if price filter is valid else false
   */
  async selectMaxPriceInFilter(maxPrice) {
    await this.$filterPriceDropDown().scrollIntoView({ block: "center" });
    await this.$filterPriceDropDown().waitForClickable({ timeout: 10000 });
    await this.$filterPriceDropDown().click();
    await this.$filterMaxPrice(maxPrice).click();
    await this.$searchResults().waitForDisplayed({ timeout: 10000 });
    let flag = true;
    let price = (await this.$searchResultFirstRow().getText()).slice(1);
    if (Number(price) >= maxPrice) flag = false;
    return flag;
  }

  /**
   * Method to select brand name from brand filter.
   * @param {String} brandName
   * @returns true if filter results are valid else false.
   */
  async selectBrandInFilter(brandName) {
    await this.$filterBrand(brandName).scrollIntoView({ block: "center" });
    await this.$filterBrand(brandName).waitForClickable({ timeout: 10000 });
    await this.$filterBrand(brandName).click();
    await this.$filterBrandResults(brandName).waitForDisplayed({
      timeout: 10000,
    });
    let resultList = await this.$$brandNameOfItems(brandName).map((item) =>
      item.getText()
    );
    return resultList.every((item) => item.toUpperCase().includes(brandName));
  }

  /**
   * Method to click on clear all button.
   */
  async clickOnClearAll(){
    await this.$clearAllButton().click();
    await this.$clearAllButton().waitForDisplayed({reverse:true});
  }
}

module.exports = {
  searchResultsPage: new SearchResultsPage(),
};
