class Home{
    constructor(){
        this.$searchField = ()=> $('//input[@class="_3704LK"]');
        this.$searchIcon = ()=> $('//button[@class="L0Z3Pu"]');
        this.$loginCloseButton = ()=> $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$categories = ()=> $('//a[@title="Mobiles & Accessories"]');
        this.$productDropDown = ()=> $('//ul[@class="col-12-12 _1MRYA1 _38UFBk"]  ');
    
    }

    async openUrl(url){
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$loginCloseButton().click();
        await this.$searchField().waitForClickable({ timeout: 1000000, timeoutMsg: 'time out fail for searchField'});
    }

    async searchProduct(productName){
        await this.$searchField().click();
        await this.$searchField().setValue(productName);
        await this.$searchIcon().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for searchIcon'});
        

    }
    async clickOnSearchIcon(){
         await this.$searchIcon().click();
         await this.$categories().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for categories'});

    }
}
module.exports = {
    homePage:new Home(),
}