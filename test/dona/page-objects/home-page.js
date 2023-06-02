const testData = require("../test-data/data.json");
const {productPage} = require("../page-objects/product-page.js");


class HomePage{
    constructor(){
        this.$homeBanner=()=>$('//img[contains(@title,"Flipkart")]');
        this.$loginClose=()=>$('//button[@class="_2KpZ6l _2doB4z"]');
        this.$searchBar=()=>$('//input[contains(@title,"Search for products, brands and more")]');
        this.$productDropdown=()=>$('//ul[@class="col-12-12 _1MRYA1 _38UFBk"]');
        this.$searchIcon=()=>$('//button[contains(@type,"submit")]');
        

    }
    /**
     * Method to load the application
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$homeBanner().waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for flipkart icon header to be displayed.",});
      }
    /**
     * Method to close Login popup
     */
    async closeLogin(){
        await this.$loginClose().click();
        await this.$homeBanner().waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for flipkart icon header to be displayed.",});

    }
    /**
     * Method to search a product
     */
    async searchMobile(){
        await this.$searchBar().click();
        await this.$searchBar().setValue(testData.productName);
        await this.$productDropdown().waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for dropdown related to corresponding product to be displayed.",});
        await this.$searchIcon().click();
        await productPage.$priceRange().waitForDisplayed({timeout: 10000,timeoutMsg: "Wait time for price range from high to low header to be displayed.",});



    }
}
module.exports = {
    homePage : new HomePage()
}