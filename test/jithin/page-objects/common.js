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
    this.$elementsLeftPanel = () => $('//div[@class="left-pannel"]');
  }

  /**
   * Methods
   */
  
  /**
   * Method to load the url in a new maximized browser window.
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
   * Method to validate whether array elements are in descending order or not.
   * @param {String<Array>} array
   * @returns true if array elements are in descending order else false
   */
  async sortChecker(array) {
    let flag = true;
    array = array.map((item) => item.slice(1));
    array = array.map((item) => item.replace(/[,]/g, ""));
    array = array.map((item) => parseInt(item));
    for (let i = 0; i < array.length; i++) {
      if (array[i] < array[i + 1]) {
        flag = false;
      }
    }
    return flag;
  }
};
