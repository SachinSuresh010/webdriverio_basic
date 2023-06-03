class Product {

    constructor() {

        this.$proHighToLow = () => $("//div[text()='Price -- High to Low']");
        this.$proHighToLowSelected = () => $('//div[@class="_10UF8M _3LsR0e"][contains(text(),"High to Low")]');
        this.$$priceOfAnItem = () => $$('//div[@class="_30jeq3 _1_WHN1"]');
        this.$maxPrice = () => $(`//div[@class='_3uDYxP']/select[@class="_2YxCDZ"]`);
        this.$selectMaxPrice = () => $(`//div[@class='_3uDYxP']/select[@class="_2YxCDZ"]/option[@value="30000"]`);
        this.$filterTabPrice = () => $("//div[text()='Min-₹30000']");
        this.$brandSelection = (brand) => $(`//div[text()="${brand}"]`);
        this.$appleHeader = () => $('//div[@class="_3ztiZO"]//div[text()="APPLE"]');
        this.$$filterTabApple = () => $$('//div[@class="_4rR01T"]')
        this.$clear = () => $('//div[@class="_2id1nE"]');
        this.$appleClear = () => $("//div[@class='_3sckoD']");
        this.$clearAllHeader = () => $('//option[@value="Max"]');
        this.$firstProductPriceAfterSorting = () => $('//div[text()="₹29,999"]');
  
    }
  
    /**
    * Method to sort the mobiles from high to low price
    */
    async proSortHighToLow() {
        await this.$proHighToLow().click();
        await this.$proHighToLowSelected().waitForDisplayed({ timeout: 5000 });
    }
  
    /**
    * Method to create an array with price of products in 'High to Low' order
    * @returns array with the corresponding prices
    */
    async getPriceAfterSorting() {
        let priceArray = [];
        for (let $price of await this.$$priceOfAnItem()) {
        let value = await $price.getText();
        let resultPrice = value.replace(/\D/g, "");
        priceArray.push(resultPrice);
        }
        return this.highToLowCheck(priceArray);
    }
  
    /**
     * Method to check the order of prices are correct
     * @param {number} array
     * @returns
     */
    async highToLowCheck(priceArray) {
        let priceArrayLength = priceArray.length;
        for (let i = 0; i < priceArrayLength - 1; i++) {
        if (priceArray[i] < priceArray[i + 1]) {
        return false;
        }
    }
    return true;
    }
  
    /**
     * Method to select the maximum price of the product as a filter
     */
    async maxPriceSelect() {
        this.$maxPrice().click();
        this.$selectMaxPrice().click();
        let price = await this.$firstProductPriceAfterSorting().getText();
        var number = Number(price.replace(/[^0-9.-]+/g, ""));
        await this.$filterTabPrice().waitForDisplayed({ timeout: 5000 });
    }
  
    /**
     * MEthod to check the price is in descending order
     * @param {number} number
     * @returns boolean
     */
    async priceValueGreaterCheck(number) {
        let flag = true;
        if (number < 30000)
        flag = false;
        return flag;
    }
  
    /**
     * Method to select a mobile company
     */
    async mobileBrandSelect(brand) {
        this.$brandSelection(brand).click();
        await this.$appleHeader().waitForDisplayed({timeout: 500000, timeoutMsg: 'time out failed for brand filter'});
    }
  
    /**
     * Method to check all displayed product is from apple
     * @returns array
     */
    async appleProductNameCheck(){
        return this.$$filterTabApple().map(item => item.getText());
    }
  
    /**
     * Method to clear the filters
     */
    async clearFilter() {
        this.$clear().click();
        await this.$clearAllHeader().waitForDisplayed({ timeout: 500000, timeoutMsg: 'time out failed for clearing filter' });
    }
  
  }
  
  module.exports = {
        product: new Product()
  }