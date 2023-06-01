/****************************************************
 *                     imports                      *
 ****************************************************/
const { searchResultsPage } = require("../page-objects/search-results-page.js");

class HomePage {
  constructor() {
    /**
     * Elements
     */
    this.$homePageIcon = () => $('//img[@title="Flipkart"]');
    this.$searchBox = () => $('//input[@name="q"]');
    this.$loginPopUpCloseButton = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    this.$searchIcon = () => $('//button[@type="submit"]');
  }

  /**
   * Methods
   */

  /**
   * Method to open a browser window and navigate to url.
   * @param {String} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$loginPopUpCloseButton().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Wait time for login popup to be displayed.",
    });
  }

  /**
   * Method to close login popup.
   */
  async loginPopUpClose() {
    await this.$loginPopUpCloseButton().click();
    await this.$homePageIcon().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Wait time for home page icon to be displayed.",
    });
  }

  /**
   * Method to enter search keyword in search box and click on search icon.
   * @param {String} searchKeyWord
   */
  async enterSearchInputAndClick(searchKeyWord) {
    await this.$searchBox().setValue(searchKeyWord);
    await this.$searchIcon().click();
    await searchResultsPage
      .$searchResultIdentifier(searchKeyWord)
      .waitForDisplayed({
        timeout: 10000,
        timeoutMsg: `Wait time for ${searchKeyWord} search results to be displayed.`,
      });
  }
}

module.exports = {
  homePage: new HomePage(),
};
