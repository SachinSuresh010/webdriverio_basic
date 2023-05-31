module.exports = class Common {

  constructor() {
    /**
     * Elements
     */
    this.$elementsOptions = (option) =>
      $(
        `//div[@class='element-list collapse show']//li/span[text()="${option}"]`
      );
    this.$elementsItemHeader = () => $('//div[@class="main-header"]');
    this.$elementsleftPanel = () => $('//div[@class="left-pannel"]');
  }

  /**
   * Method to load the url in a new browser window-maximized.
   * @param {String} url
   */
  async openUrl(url) {
    await browser.url(url); // opens a browser window and navigate to url
    await browser.maximizeWindow(); // maximize browser window
    await this.$header().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time for home page header to be displayed",
    });
  }

  /**
   * Method to click on "option" from "Elements" panel.
   * @param {String} option
   */
  async clickOnElements(option) {
    await this.$elementsOptions(option).scrollIntoView({block:'center'});
    await this.$elementsOptions(option).click();
    await this.$elementsleftPanel().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Wait time for text box page header to be displayed.",
    });
  }
}
