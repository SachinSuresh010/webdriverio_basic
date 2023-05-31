/****************************************************
 *                     Imports                      *
 ****************************************************/
import fs from "fs";
import downloadsFolder from "downloads-folder";
import deleteFiles from "delete-files";
import elementsPage from "./elements-page.js";

let downloadFolderPath = downloadsFolder();

class DemoQA {
    
  constructor() {
    /**
     * Elements
     */
    this.$pageIcon = () => $('//img[@src="/images/Toolsqa.jpg"]');
    this.$homeBanner = () => $('//div[@class="home-banner"]');
    this.$homePageContent = () => $('//img[@alt="Selenium Online Training"]');
    this.$downloadButton = () => $('//a[text()="Download"]');
    this.$elementsIcon = () =>
      $(
        '//div[@class="category-cards"]//div[1]//div[1]//div[2]//*[name()="svg"]'
      );
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
    await this.$homeBanner().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Wait time for page icon to be displayed.",
    });
  }

  /**
   * Method to scroll down to elements option and click to open.
   */
  async scrollToElementsAndClick() {
    await this.$elementsIcon().scrollIntoView({ block: "center" });
    await this.$elementsIcon().click();
    await elementsPage.$elementsItemHeader().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Wait time for elements page header to be displayed.",
    });
  }
}

module.exports = 
{
  demoPage : new DemoQA()
}

