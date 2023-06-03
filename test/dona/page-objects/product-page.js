const Common  = require("../page-objects/common.js");

let priceArray = [];

class ProductPage extends Common{
    constructor(){
        super();
        this.$priceRange=()=>$('//div[text()="Price -- High to Low"]');
        this.$highlightedPriceRange=()=>$('//div[@class="_10UF8M _3LsR0e"][text()="Price -- High to Low"]');
        this.$$searchResults=()=>$$('//div[@class="_30jeq3 _1_WHN1"]');
        this.$priceDropdown=()=>$('//div[@class="_3uDYxP"]');
        this.$priceValue=(value)=>$(`//div[@class="_3uDYxP"]//select//option[@value="${value}"]`);
        this.$filterResult=(brand)=>$(`//div[text()="${brand}"]`);
        this.$filteredProduct=(brand)=>$(`//div[text()="${brand}"]/preceding-sibling::div`);
        this.$$commonBrandName= ()=> $$('//div[@class="_4rR01T"]');
        this.$clearAllButton=()=>$('//span[text()="Clear all"]');
        this.$maxDisplay = () => $('//option[@value="Max"]');
    }
/**
 * Method to sort by price
 */
async sortByPrice(){
    await this.$priceRange().click();
    await this.$highlightedPriceRange().waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for price range from high to low to be displayed in highlight.",});


   }
/**
 * Method to select from dropdown
 * @param {string} value 
 */
async selectFromDropdown(value,brand) {
    await this.$priceDropdown().click();
    await this.$priceValue(value).waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for price range dropdown to be displayed.",});
    await this.$priceValue(value).click();
    await this.$filterResult(brand).waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for price range dropdown to be displayed.",});

}
/**
 * Method to check sorting is proper
 * @returns boolean
 */
async orderCheck() {
    for (let $price of await this.$$searchResults()) {
      let value = await $price.getText();
      let resultPrice = value.replace(/\D/g, "");
      priceArray.push(resultPrice);
    }
    console.log(priceArray);
    return this.isDescending(priceArray);
  }
/**
 * Method to validate applied filter
 * @returns boolean
 */
async filterCheck(){
    for (let $price of await this.$$searchResults()) {
        let value = await $price.getText();
        let resultPrice = value.replace(/\D/g, "");
        priceArray.push(resultPrice);
      }
      console.log(priceArray);
      return this.maxToDescending(priceArray);
    }
/**
 * Method to filter product by brand
 * @param {string} brand
 */
async filterByProductName(brand){
    await this.$filteredProduct(brand).click();
    await this.$clearAllButton().waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for 'Clear All' to be displayed.",});


}
/**
 * Method to validate products with specified brand is displayed 
 */
async checkBrandName(){
    return this.$$commonBrandName().map(item =>item.getText());
}

/**
 * Method to clear all filter
 */
async clearAllFilter(){
    await this.$clearAllButton().click();
    await this.$maxDisplay().waitForDisplayed({timeout: 20000,timeoutMsg: "Wait time for home page without any filters to be displayed.",});

    
}
}
module.exports = {
    productPage : new ProductPage()
}