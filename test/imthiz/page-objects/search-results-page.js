class SearchResults {
    constructor() {
        this.$filterHeader = () => $('//div[@class="_3V8rao"]');
        this.$searchResultIdentifier = () => $('//span[@class="_10Ermr"]/span');
        this.$maxPriceDropDown = () => $('//div[@class="_3uDYxP"]//select');
        this.$maxPriceSelector = (maxPrice) =>
            $(`//div[@class="_3uDYxP"]//option[@value="${maxPrice}"]`);
        this.$priceFilterConfirmation = () => $('//div[@class="_3ztiZO"]');
        this.$sortActionHighToLow = () =>
            $(`//div[@class="_10UF8M"][text()="Price -- High to Low"]`);
        this.$$searchProductPriceCell = () =>
            $$('//div[@class="_3tbKJL"]//div[@class="_30jeq3 _1_WHN1"][1]');
        this.$$searchProductNameCell = () => $$('//div[@class="_4rR01T"]');
        this.$sortingSelectedHighToLowHighlight = () =>
            $(`//div[@class="_10UF8M _3LsR0e"][text()="Price -- High to Low"]`);
        this.$productParentSelector = (productParentName) =>
            $(
                `//div[@class="_3FPh42"]//div[@title="${productParentName}"]//div[@class="_24_Dny"]`
            );
        this.$productParentConfirmation = (productParentName) =>
            $(`//div[@class="_3ztiZO"]//div[text()="${productParentName}"]`);
    }
    /**
     * Method to select the max price to filter the search results
     * @param {String} maxPrice
     */
    async maxPriceSelector(maxPrice) {
        await this.$maxPriceDropDown().scrollIntoView({ block: "center" });
        await this.$maxPriceDropDown().waitForClickable({ timeout: 10000 });
        await this.$maxPriceDropDown().click();

        await this.$maxPriceSelector(maxPrice).click();
        await this.$priceFilterConfirmation().waitForDisplayed({
            timeout: 5000,
            timeoutMsg: "wait time out failed as filter of max price didn't work",
        });
    }
    /**
     * Method to click on sorting from High to Low
     */
    async sortingHighToLow() {
        await this.$sortActionHighToLow().waitForClickable({ timeout: 10000 });
        await this.$sortActionHighToLow().click();
        await this.$sortingSelectedHighToLowHighlight().waitForDisplayed({
            timeout: 5000,
            timeoutMsg: "wait time out failed as failure to sort",
        });
    }
    /**
     * Method to get an array of price of products in the page
     * @returns array of cells in that location with only numbers
     */
    async priceArrayDefault() {
        let array = [];
        for (let $element of await this.$$searchProductPriceCell()) {
            let value = await $element.getText();
            value = value.replace(/₹/g, "");
            value = value.replace(/,/g, "");
            array.push(value);
        }

        return array;
    }
    /**
     *
     * @param {String} priceArray
     * @returns flag if true is sorted in descending else its not
     */
    async descendingOrderSort(priceArray) {
        let flag = true;
        priceArray = priceArray.map((item) => parseInt(item));
        for (let i = 0; i < priceArray.length - 1; i++) {
            if (priceArray[i] < priceArray[i + 1]) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    /**
     * method to check if filtered results are as teh parameter
     * @param {String} priceArray
     * @param {String} maxPrice
     * @returns flag is returned false if its more than max price else its return as true
     */
    async filterPriceCheck(priceArray, maxPrice) {
        let flag = true;
        priceArray = priceArray.map((item) => parseInt(item));
        for (let i = 0; i < priceArray.length; i++) {
            if (priceArray[i] > maxPrice) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    async productParentCompanySelection(productParentName) {
        await this.$productParentSelector(productParentName).waitForClickable({
            timeout: 10000,
        });
        await this.$productParentSelector(productParentName).click();
        await this.$productParentConfirmation(productParentName).waitForDisplayed({
            timeout: 5000,
            timeoutMsg: "wait time out failed as filter as per product parent",
        });
    }
/**
 * 
 * @param {String} productParentName 
 * @returns boolean ouput stating if product in filtered page is correct 
 */
    async filteredProductChecker(productParentName) {
        let array = [];
        let flag = true;
        for (let $element of await this.$$searchProductNameCell()) {
            let value = await $element.getText();
            let firstPart = value.split(" ");
            if (firstPart[0].toLowerCase()!=(productParentName.toLowerCase()))  {
                let flag = false;
                break;
            }
        }

        return flag;
    }
}

module.exports = {
    searchResultsPage: new SearchResults(),
};
