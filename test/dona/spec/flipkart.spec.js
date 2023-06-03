const { homePage } = require("../page-objects/home-page.js");
const testData = require("../test-data/data.json");
const { productPage } = require("../page-objects/product-page.js");


describe('Basic flow of Flipkart Application', () => {

    it(`Navigate to ${testData.flipkartUrl} and load the application in a new chrome window.`, async () => {
        await homePage.openUrl(testData.flipkartUrl);
        expect(await homePage.$homeBanner().isDisplayed()).withContext('Fail').toBe(true);
    });

    it('Close the "Login" popup', async () => {
        await homePage.closeLogin();
        expect(await homePage.$loginClose().isDisplayed()).toBe(false);

    });

    it(`Click "Search bar" and search for "${testData.productName}".`, async () => {
        await homePage.searchMobile(testData.productName);
        expect(await productPage.$priceRange().isDisplayed()).toBe(true);
    });

    it('Sort the products by "Price -- High to Low".', async () => {
        await productPage.sortByPrice();
        expect(await productPage.orderCheck()).toBe(true);
    });


    it('Filter the price variation from "Min - to - 30000+" to "Min - to - 30000".', async () => {
        await productPage.selectFromDropdown(testData.value, testData.brand[1]);
        expect(await productPage.filterCheck()).toBe(true);
    });

    it(`Click on ${testData.brand[0]} and validate whether the products of same brand are displayed`, async () => {
        await productPage.filterByProductName(testData.brand[0]);
        expect(await productPage.$filterResult(testData.brand[0]).isDisplayed()).toBe(true);
        let brandSet = await productPage.checkBrandName();
        expect(await brandSet.every(item => item.toLowerCase().includes(testData.brand[0].toLowerCase()))).toBe(true);
    });

    it('Click "Clear All" and validate whether all applied filters are removed', async () => {
        await productPage.clearAllFilter();
        expect(await productPage.$maxDisplay().isDisplayed()).toBe(true);

    });
});