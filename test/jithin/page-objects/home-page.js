/****************************************************
 *                     imports                      *
 ****************************************************/
const { searchResultsPage } = require("../page-objects/search-results-page.js");
const Common = require("./common.js");

class HomePage extends Common{

  constructor() {
    super();
    /**
     * Elements
     */
    this.$homePageIcon = () => $('//img[@title="Flipkart"]');
    this.$searchBox = () => $('//input[@name="q"]');
    this.$loginPopUpCloseButton = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    this.$searchIcon = () => $('//button[@type="submit"]');
    this.$userNameLoginPopUp = () => $('//input[@class="_2IX_2- VJZDxU"]');
    this.$requestOtp = () => $('//button[@class="_2KpZ6l _2HKlqd _3AWRsL"]');
  }

  /**
   * Methods
   */

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
