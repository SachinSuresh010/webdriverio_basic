class HomePage {
    constructor() {
        this.$flipKartHeader = () => $('//img[@alt="Flipkart"]');
        this.$popupDiv = () => $('//div[@class="_2QfC02"]');
        this.$loginPopupClose = () => $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$searcchItemInput = () => $('//input[@name= "q"]');
        this.$searchButton = () => $('//button[@type="submit"]');
        this.$mobilePageHeader = () => $('//div[@class = "TB_InB"]/a[@title="Mobiles & Accessories"]');
        this.$productPageDiv = () => $('//div[@class = "W_R1IA"]');
        
        
    }
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$popupDiv().waitForDisplayed({timeout : 200000 , timeoutMsg : 'Failed for load the login popup'});
    }
    async enterSearchItem(searchItem)
    {
        await this.$loginPopupClose().click();
        await this.$searcchItemInput().setValue(searchItem);
        await this.$searchButton().click();
        await this.$productPageDiv().waitForDisplayed({timeout : 200000 , timeoutMsg : 'Failed for load sort div'});
    }
}
module.exports =
{
    homePage: new HomePage()
}