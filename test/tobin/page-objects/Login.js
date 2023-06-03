class Login {
  constructor() {
    this.$logo = () => $("//img[@title='Flipkart']")
    this.$searchPanel = () => $('//input[@class="_3704LK"]')
    this.$loginForm = () => $('//div[@class="_2QfC02"]')
    this.$loginClose = () => $("//button[@class='_2KpZ6l _2doB4z']")
    this.$searchButton = () => $('//button[@class="L0Z3Pu"]')
    this.$tabForSearch = () => $("//a[@title='Mobiles & Accessories']")
  }
  /**
   * Method to open url 
   * @param {String} url 
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url)
    await this.$logo().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait time out failed for logo to be displayed" })
  }
  /**
   * Method to close the login popup
   */
  async loginPopupClose() {
    await this.$loginClose().click();
  }
  /**
   * Method to search mobile
   * @param {string} item 
   */
  async itemSearch(item) {
    await this.$searchPanel().click();
    await this.$searchPanel().setValue(item);
    await this.$searchButton().click();
    await this.$tabForSearch().waitForDisplayed({ timeout: 10000 })

  }
}
module.exports = {
  login: new Login()
}
