 class Home{

    constructor(){
        this.$homePageHeader= ()=> $('//img[@title="Flipkart"]');
        this.$closeButton= ()=> $('//button[@class="_2KpZ6l _2doB4z"]')
        this.$searchBar= ()=> $('//input[@class="_3704LK"]');
        this.$mobileDropDown =()=> $('//ul[@class="col-12-12 _1MRYA1 _38UFBk"]');
        this.$searchIcon = () => $('//button[@class="L0Z3Pu"][@type="submit"]');
        this.$productPageHeader= ()=> $('//a[@title="Mobiles & Accessories"]');
       
    }
    async openUrl(url){
    await browser.maximizeWindow()
    await browser.url(url)
    await this.$homePageHeader().waitForDisplayed({ timeout : 5000, timeoutMsg: ' timeout failed ' });
    await this.$closeButton().click();
 }

 async clickSearchBar(product){
    await this.$searchBar().click();
    await this.$searchBar().setValue(product);
 }

 async clickSearchIcon(){
    await this.$searchIcon().click();
    await this.$productPageHeader().waitForDisplayed({ timeout : 5000, timeoutMsg: ' timeout failed ' })
 }

}

module.exports= {
    homePage : new Home()
}

