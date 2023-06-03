const Common = require('../common.js');
class Product extends Common{
    constructor(){
        super();
        this.$priceHighToLowOption = ()=> $('//div[text()="Price -- High to Low"]');
        this.$$highToLowPrices = ()=> $$('//div[@class="_30jeq3 _1_WHN1"]');
        this.$highToLowPricesIcon = ()=> $('//div[@class="_10UF8M _3LsR0e"]');
        this.$priceDropDown  = ()=> $('(//select[@class="_2YxCDZ"])[2]');
        this.$minPriceHeader = () =>$('//div[@class="_3sckoD"]')
     
        
    }

    async clickPriceHighToLowOption(){
        await this.$priceHighToLowOption().click();
        await this.$highToLowPricesIcon().waitForClickable({ timeout: 1000000, timeoutMsg: 'time out fail for highToLowPricesIcon'});

    }

    async priceValidation(){
        let prices = [];
         prices = await this.$$highToLowPrices().map(item => item.getText());
         prices= prices.map(item => item.replace(/₹|,/g, ""));
         return await this.isDescending(prices);
    }

    async clickPriceDropdown(){
        await this.$priceDropDown().selectByVisibleText('₹30000');
        await this.$minPriceHeader().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for minPriceHeader'});
        
    }

    async priceValidationForSelectedPrice(){
        let prices = [];
        prices = await this.$$highToLowPrices().map(item => item.getText());
        prices = prices.map(item => item.replace(/₹|,/g, ""));
        return await this.isBelowSelectedPrice(prices);
        

    }
}

module.exports = {
    productPage:new Product(),
}