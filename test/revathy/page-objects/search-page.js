const testData = require('../test-data/data.json');
const CommonPage = require('../page-objects/common-page');

class SearchPage extends CommonPage {
    constructor() {
        super();
        this.$searchPageHeader = () => $('//a[@title="Mobiles"]');
        this.$highToLowSort = () => $('//div[text()="Price -- High to Low"]');
        this.$$priceOfAnItem = () => $$(`//div[@class="_30jeq3 _1_WHN1"]`);
        this.$highToLowSortHeading = () => $('//div[@class="_10UF8M _3LsR0e"][contains(text(),"High to Low")]');
        this.$$priceAfterClickingMax = () => $$(`//div[@class="_30jeq3 _1_WHN1"]`);
        this.$priceDropDown = () => $('//div[@class="_3uDYxP"]');
        this.$priceSelection = (price) => $(`//div[@class="_3uDYxP"]//select//option[text()="${price}"]`);
        this.$priceSortHeader = () => $('//span[text()="Sort By"]');
        this.$filterHeader = () => $('//div[@class="_3sckoD"]');
        this.$appleHeader = () => $('//div[@class="_3ztiZO"]//div[text()="APPLE"]');
        this.$brandSelection = (brand) => $(`//div[text()="${brand}"]`);
        this.$brandResult = () => $('//div[text()="APPLE iPhone 6 (Gold, 32 GB)"]');
        this.$$brandSerachResults = () => $$(`//div[@class="_4rR01T"]`);
        this.$clearAllButton = () => $('//div[@class="_2id1nE"]');
        this.$clearAllHeader = () => $('//option[@value="Max"]');
    }

    /**
    * Sort the price from high to low
    */
    async clickSort() {
        await this.$highToLowSort().click();
        await this.$highToLowSortHeading().waitForDisplayed({ timeout: 500000, timeoutMsg: 'time out failed for sorting products' });
    }

    /**
     * Method to check the prices displayed are in descending order
     * @returns true or false
     */
    async orderCheck() {
        let priceArray = [];
        for (let $price of await this.$$priceOfAnItem()) {
            let value = await $price.getText();
            let resultPrice = value.replace(/\D/g, "");
            priceArray.push(resultPrice);
        }
        return this.isDescending(priceArray);
    }

    /**
     * click on the price dropdown and select price.
     * @param {string} price 
     */
    async clickFilterDropDown(price) {
        await this.$priceDropDown().click();
        await this.$priceSelection(price).click();
        await this.$filterHeader().waitForDisplayed({ timeout: 500000, timeoutMsg: 'time out failed for price filter' });
    }

    /**
     * Method to get price from the search result.
     * @returns array
     */
    async getPriceFromList() {
        return this.$$priceAfterClickingMax().map(price => price.getText());
    }

    /**
     * click on the brand and select the brand.
     * @param {string} brand 
     */
    async selectBrand(brand) {
        await this.$brandSelection(brand).click();
        await this.$appleHeader().waitForDisplayed({ timeout: 500000, timeoutMsg: 'time out failed for brand filter' });
    }

    /**
     * Method to get brand from the search result
     * @returns array
     */
    async getBrandFromList() {
        return this.$$brandSerachResults().map(item => item.getText());
    }

    /**
     * click on "Clear All" and clear all filters.
     */
    async clickClearAll() {
        await this.$clearAllButton().click();
        await this.$clearAllHeader().waitForDisplayed({ timeout: 500000, timeoutMsg: 'time out failed for clearing filter' });
    }
}

module.exports = {
    searchPage: new SearchPage()
}