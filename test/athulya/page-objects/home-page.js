const Common = require('../page-objects/common.js');
let priceArray=[];
//let sortedPrice=[];
class HomePage extends Common {
  constructor() {
    super();
    this.$searchBar = () => $('//input[@type="text"]');
    this.$loginPopup = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    this.$searchIcon = () =>$('//button[@class="L0Z3Pu"]');
    this.$productCatagoryHeader = () =>
      $('//a[@title="Mobiles"]');
    this.$priceHighToLow = () => $('//div[@class = "_5THWM1"]//div[text()="Price -- High to Low"]');
    this.$$priceOfAnItem = () => $$('//div[@class="_30jeq3 _1_WHN1"]');
    this.$priceLowtoHighHighlight = () => $('//div[@class="_10UF8M _3LsR0e"][contains(text(),"High to Low")]');
  this.$MaxPriceBox = () => $('//div[@class="_3uDYxP"]');
    this.$maxPriceToBeSelected = () =>$('//div[@class="_3uDYxP"]//option[text()="₹30000"]');
    this.$appleBrandCheckBox=()=>$('//label[@class="_2iDkf8 t0pPfW"]//div[text()="APPLE"]');
    this.$filtersSelected=()=>$('//div[@class="_3ztiZO"]');
    this.$$mobileBrandName=()=>$$('//div[@class="_4rR01T"]');
    this.$clearAllClick=()=>$('//div[@class="_2id1nE"]');
  }

 /**
  * method to open the url
  * @param {url} url
  */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$loginPopup().waitForDisplayed(400000);
  }
  /**
   * method to search for mobiles
   * @param {string} mobiles 
   */
  async searchItem(mobiles) {
    await this.$loginPopup().click();
    await this.$searchBar().setValue(mobiles);
    await this.$searchIcon().waitForDisplayed(400000);
    await this.$searchIcon().click();
   
  }
  /**
   * Method to click price-high to low
   */
  async priceHighToLowClick() {
    await this.$priceHighToLow().click();
    await this.$priceLowtoHighHighlight().waitForDisplayed(400000);
    
  }
  /**
   * method to check the price is showing as high to low
   * @returns boolean
   */
  async orderCheck() {
    for (let $price of await this.$$priceOfAnItem()) {
      let value = await $price.getText();
      let resultPrice = value.replace(/\D/g, "");
      priceArray.push(resultPrice);
    }
    return this.isDescending(priceArray);
  }
  /**
   * Method to select the max price
   */
  async filterSelection() {
    await this.$MaxPriceBox().click();
    await this.$maxPriceToBeSelected().waitForDisplayed({
      timeout: 400000,
      timeOutMsg: "price is not displayed after 40s",
    });
    await this.$maxPriceToBeSelected().click();
  }
  async sortedPriceList(){
    for (let $price of await this.$$priceOfAnItem()) {
      let value = await $price.getText();
      let resultPrice = value.replace(/\D/g, "");
      priceArray.push(resultPrice);
    }
    return this.isMaximumToLow(priceArray);
    }
  /**
   * method to select a brand
   */
  async brandSelectCheckBox()
  {
await this.$appleBrandCheckBox().click();
await this.$filtersSelected().waitForDisplayed(40000);
  }
  async getValueFromTable(){
    return this.$$mobileBrandName().map(item=>item.getText());
    // let array=[];
    // for(let $brandNameDisplayed of await this.$$mobileBrandName()){
    //   let value=await $brandNameDisplayed.getText();
    //   let resultPrice = value.replace(/\D/g, "");
    //   array.push(resultPrice);
    // }
    // return array;
  // }
}
async clearAllFilter()
{
  await this.$clearAllClick().click();
}
}
module.exports = {
  homePage: new HomePage(),
};
