/****************************************************
 *                     Imports                      *
 ****************************************************/
const Common = require("./common.js");

class ButtonsPage extends Common {
  
  constructor() {
    super();
    /**
     * Elements
     */
    this.$doubleClick = () => $('//button[@id="doubleClickBtn"]');
    this.$rightClick = () => $('//button[@id="rightClickBtn"]');
    this.$doubleClickMessage = () => $('//p[@id="doubleClickMessage"]');
    this.$rightClickMessage = () => $('//p[@id="rightClickMessage"]');
  }

  /**
   * Methods
   */

  /**
   * Method to double click.
   */
  async doubleClick() {
    await this.$doubleClick().scrollIntoView({ block: "center" });
    await this.$doubleClick().waitForClickable({ timeout: 10000 });
    await this.$doubleClick().doubleClick();
    await this.$rightClick().waitForClickable({ timeout: 10000 });
  }

  /**
   * Method to right click.
   */
  async rightClick() {
    await await this.$rightClick().scrollIntoView({ block: "center" });
    await this.$rightClick().click({ button: 2 });
    //await browser.rightClick(this.$rightClick());
  }
}

module.exports = {
  buttonsPage: new ButtonsPage(),
};