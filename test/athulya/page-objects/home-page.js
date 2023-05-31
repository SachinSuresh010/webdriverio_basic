class HomePage {
    constructor() {
      this.$addToCartIcon = (productName) =>
        $(
          `//div[contains(text(),"${productName}")]/ancestor::div[@class="inventory_item_description"]//button`
        );
      this.$CartIcon = () => $('//span[@class="shopping_cart_badge"]');
      this.$checkoutIconClick = () => $("#checkout");
      this.$checkoutPageHeader = () =>
        $('//span[contains(text(),"Checkout: Your Information")]');
    }
    /**
     * Add one product to the cart
     */
    async addToCartClick(productName) {
      await this.$addToCartIcon(productName).waitForDisplayed(30000);
      await this.$addToCartIcon(productName).click();
      await this.$CartIcon().waitForDisplayed(30000);
    }
    /**
     * method to click cart icon
     */
    async cartIconClick() {
      await this.$CartIcon().click();
    }
    /**
     * method to get the url of the current page
     * @param {string} url
     */
    async cartIconClickurl(url) {
      await browser.url(url);
    }
    /**
     * method to click the checkout icon
     */
    async checkOutIconclick() {
      await this.$checkoutIconClick().click();
      await this.$checkoutPageHeader().waitForDisplayed({
        timeout: 30000,
        timeOutMsg: "waiting for the header to appear",
      });
    }
  }
  module.export = 
{
    homePage : new HomePage()
}
