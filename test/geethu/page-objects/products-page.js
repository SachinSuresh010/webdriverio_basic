const Common = require("./common");
let priceArray = [];
class ProductPage extends Common {

    constructor() {
        super();
        this.$priceHightoLow = () => $('//div[@class = "_5THWM1"]//div[text()="Price -- High to Low"]');
        this.$$priceOfAnItem = () => $$('//div[@class="_30jeq3 _1_WHN1"]');
        this.$priceLowtoHighHighlight = () => $('//div[@class="_10UF8M _3LsR0e"][contains(text(),"High to Low")]');
        this.$maxFilterOption = () => $('//div[text()="to"]/parent::div/div[@class="_3uDYxP"]/select');
        this.$maxFilterValue = () => $('//div[text()="to"]/parent::div/div[@class="_3uDYxP"]/select/option[@value="30000"]');
        this.$filterHeader = () => $('//div[@class="_3sckoD"]');
        this.$firstElement = () => $('(//div[@class="_30jeq3 _1_WHN1"])[1]');
        this.$brandCheckBox = (brandName) => $(`//div[text()="${brandName}"]`);
        this.$brandHeader = () => $('//div[@class="_3ztiZO"]//div[text()="APPLE"]');
        this.$brandDiv = () => $('//input[@placeholder="Search Brand"]/parent::div/following-sibling::div/following-sibling::div');
        this.$$brandNameText = () => $$('//div[@class="_4rR01T"]');
        this.$products = () => $('(//span[text()="Add to Compare"])[10]');
        this.$clearAllLink = () => $('//span[text()="Clear all"]');
        this.$filterDiv = () => $('//div[@class="_2vLW0p"]');
        
        
    }
    /**
     * 
     */
    async clickPriceHightoLowOPtion() {
        await this.$priceHightoLow().click();
        await this.$priceLowtoHighHighlight().waitForDisplayed({ timeout: 20000, timeoutMsg: 'Failed' });
    }
    async orderCheck() {
        for (let $price of await this.$$priceOfAnItem()) {
            let value = await $price.getText();
            let resultPrice = value.replace(/\D/g, "");
            priceArray.push(resultPrice);
        }
        return this.isDescending(priceArray);
    }
    async clickMaxFilter() {
        await this.$maxFilterOption().scrollIntoView({ block: "center" });
        await this.$maxFilterOption().waitForClickable({ timeout: 10000 });
        await this.$maxFilterOption().click();
        await this.$maxFilterValue().click();
        await this.$clearAllLink().waitForDisplayed({timeout : 50000});
        await this.$filterHeader().waitForDisplayed({ timeout: 20000, timeoutMsg: 'Failed to load search result' });
        let price = ((await this.$firstElement().getText()).slice(1)).replace(/\D/g, "");
        price = price.slice(1);
        if (price > 30000) {
            return false;
        }
        else {
            return true;
        }

    }
    async clickAppleCheckbox(brandnames)
    {
        await this.$brandDiv().scrollIntoView({ block: "center" });
        await this.$brandCheckBox(brandnames).waitForClickable({ timeout: 50000 });
        await this.$brandCheckBox(brandnames).click();
        await this.$brandHeader().waitForDisplayed({ timeout: 800000, timeoutMsg: 'Failed to load Apple Filter ' });
        await this.$products().waitForDisplayed({ timeout: 600000 });
        let productNameArray = [];
            productNameArray = await this.$$brandNameText().map(item =>item.getText());
        return productNameArray.every((item) => item.toUpperCase().includes(brandnames));
    }
    async clickClearAll()
    {
        await this.$clearAllLink().click();
        return await this.$filterDiv().waitForDisplayed({timeout:800000, reverse: true ,timeoutMsg:'Failed to disappeared'});
       
    }

}
module.exports =
{
    productPage: new ProductPage()
}