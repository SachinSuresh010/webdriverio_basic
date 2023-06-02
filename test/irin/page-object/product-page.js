const Common= require('../page-object/common.js');

let priceArray=[];


class Product extends Common{
    constructor(){
        super();
        this.$highToLow=()=> $('//div[@class="_10UF8M"][text()="Price -- High to Low"]');
        this.$productPageHeader= ()=> $('//a[@title="Mobiles & Accessories"]')
        this.$maxPriceFilter = () => $('//div[@class="_3uDYxP"]');
        this.$maxPriceValue=(price)=>$(`//div[@class="_3uDYxP"]//select//option[text()="${price}"]`);
        this.$priceFilterDisplay=()=> $('//div[@class="_3sckoD"][text()="Min-₹30000"]');
        this.$appleBrand= ()=>$('//div[@class="_3879cV"][text()="APPLE"]');
        this.$brandFilterDisplay= ()=>$('//div[@class="_3sckoD"][normalize-space()="APPLE"]');
        this.$$commonPrice= ()=>$$('//div[@class="_30jeq3 _1_WHN1"][text()="₹29,999"]');
        this.$$highToLowPrices=()=>$$('//div[@class="_30jeq3 _1_WHN1"]');
        this.$$commonBrandName= ()=> $$('//div[@class="_4rR01T"]');
        this.$clearAllOption =()=> $('//div[@class="_2id1nE"]//span[contains(text(),"Clear all")]');
        this.$maxPrice=()=>$('//option[@value="Max"]');
        
    }

    async clickOnHighToLow(){
        await this.$highToLow().click();
       await this.$productPageHeader().waitForDisplayed({ timeout : 10000, timeoutMsg: ' timeout failed for high to low' })
        
    }

    async maxPrice(price){
        await this.$maxPriceFilter().click();
        await this.$maxPriceValue(price).click();
        await this.$priceFilterDisplay().waitForDisplayed({ timeout : 5000, timeoutMsg: ' timeout failed for max filter' })
        
    }

    async highToLowPriceCheck(){
       let priceArray= await this.$$highToLowPrices().map(item => item.getText());
       priceArray= priceArray.map(item => item.replace(/₹|,/g, ""));
       priceArray = priceArray.map(item => parseInt(item));
        return this.descendingSort(priceArray);
        };
          
      
          
    
    async priceSort(){
        return this.$$commonPrice().map(item =>item.getText());
    }

    async selectBrand(){
        await this.$appleBrand().click();
        await this.$brandFilterDisplay().waitForDisplayed({ timeout : 5000, timeoutMsg: ' timeout failed for brand' })

    }

    async checkBrandName(){
        return this.$$commonBrandName().map(item =>item.getText());
    
    }

    async clearAll(){
        await this.$clearAllOption().click();
        await this.$maxPrice().waitForDisplayed({ timeout : 5000, timeoutMsg: ' timeout failed for clear all' })

    }
}

module.exports= {
    productPage : new Product()
}