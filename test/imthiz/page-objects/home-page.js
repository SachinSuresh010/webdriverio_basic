const { searchResultsPage } = require("./search-results-page.js");

class HomePage {
  constructor() {
    this.$loginButton = () =>
      $('//div[@class="_1psGvi _3BvnxG"]//a[text()="Login"]');
    this.$searchBox = () => $('//input[@class="_3704LK"]');
    this.$searchSubmitButton = () => $('//button[@type="submit"]');
    this.$initialLoginPopUpCloseButton = () =>
      $('//button[@class="_2KpZ6l _2doB4z"]');
  }

  /**
   * Load the url for the site and open the website
   * @param {String} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$initialLoginPopUpCloseButton().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed for loading URL",
    });
  }
  /**
   * Method to close the pop up window for login when entering the URL
   */
  async loginPopUpClosing() {
    await this.$initialLoginPopUpCloseButton().click();
    await this.$loginButton().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed for loading URL",
    });
  }
  /**
   * Method to search certain data in search box  and load the result  page
   * @param {String} searchData
   */
  async searchInput(searchData) {
    await this.$searchBox().setValue(searchData);
    await this.$searchSubmitButton().click();
    await searchResultsPage.$searchResultIdentifier().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed for search results page to load",
    });
  }
}

module.exports = {
  homePage: new HomePage(),
};
