const testData = require('../test-data/data.json');

class HomePage {
    constructor() {
        this.$homePageHeader = () => $('//img[contains(@title,"Flipkart")]');
        this.$searchBar = () => $('//input[@placeholder="Search for products, brands and more"]');
        this.$searchIcon = () => $('//button[@type="submit"]');
        this.$loginCloseIcon = () => $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$searchPageHeader = () => $('//a[@title="Mobiles"]');
    }

    /**
     * open url and launch the application.
     * @param {string} url 
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$homePageHeader().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out failed for loading Url' });
    }

    /**
     * close login popup
     */
    async closeLoginPopUp() {
        await this.$loginCloseIcon().click();
    }

    /**
     * Click search button and search for Mobiles
     */
    async clickSearchButton() {
        await this.$searchBar().click();
        await this.$searchBar().setValue(testData.productToSearch);
        await this.$searchIcon().click();
        await this.$searchPageHeader().waitForDisplayed({ timeout: 500000, timeoutMsg: 'time out failed for searching product' });
    }
}

module.exports = {
    homePage: new HomePage()
}