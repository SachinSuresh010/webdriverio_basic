class Home {
  constructor() {
    this.$homePageHeader = () => $('//img[@title="Flipkart"]');
    this.$loginPageCloseButton = () =>
      $('//button[@class="_2KpZ6l _2doB4z" and text()="✕"]');
    this.$searchBar = () => $('//input[@class="_3704LK" and @type="text"]');
    this.$searchDropDown = () => $('//ul[@class="col-12-12 _1MRYA1 _38UFBk"]');
    this.$searchButton = () =>
      $('//button[@class="L0Z3Pu" and @type="submit"]');
    this.$productPageHeader = () => $('//a[@title="Mobiles & Accessories"]');
  }
  /**
   * Method to openurl and navigate to the homepage
   * @param {url} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$homePageHeader().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: " HomePage Loading failed",
    });
  }
  /**
   * Method to search a product
   * @param {string} product
   */
  async clickOnSearchBar(product) {
    await this.$loginPageCloseButton().click();
    await this.$searchBar().click();
    await this.$searchBar().setValue(product);
    await this.$searchDropDown().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: " search dropdown Loading failed",
    });
  }
  /**
   * Method to click search button
   */
  async clickOnSearchButton() {
    await this.$searchButton().click();
    await this.$productPageHeader().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: "product page Loading failed",
    });
  }
}
module.exports = {
  homePage: new Home(),
};
