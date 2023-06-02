const testData = require('../testdata/testData.json');
const {homePage}= require('../page-object/home-page.js');
const {productPage}= require('../page-object/product-page.js');

describe('Basic flow of Flipkart Application', () => {


    it('Open URL and load the application', async () => {
        await homePage.openUrl(testData.pageURL);
        await expect(browser).toHaveUrl(testData.pageURL);

    });

    it('Click on search bar and enter mobiles', async()=>{
        await homePage.clickSearchBar(testData.productName);
        expect(await homePage.$mobileDropDown().isDisplayed()).toBe(true);

    });

    it('Click on search icon ', async()=>{
        await homePage.clickSearchIcon();
        expect(await homePage.$productPageHeader().isDisplayed()).toBe(true);

    });

    it('Click on Price-High to Low ', async()=>{
        await productPage.clickOnHighToLow();
        expect (await productPage.highToLowPriceCheck()).toBe(true);
       
    });

    it('Click on max price and select desired option ', async()=>{
        await productPage.maxPrice(testData.price);
        expect(await productPage.$priceFilterDisplay().isDisplayed()).toBe(true);
        let resultSet = await productPage.priceSort();
        expect (resultSet.every(item => item.includes(testData.filterPrice))).toBe(true);

    });

    it('Select brand as Apple', async()=>{
        await productPage.selectBrand();
        expect(await productPage.$brandFilterDisplay().isDisplayed()).toBe(true);
        let brandSet = await productPage.checkBrandName();
        expect(await brandSet.every(item=>item.toLowerCase().includes(testData.brandName.toLowerCase()))).toBe(true);
    });

    it('Click on clear all', async()=>{
        await productPage.clearAll();
       // expect(await productPage.$allFilters().isDisplayed()).toBe(false);
        expect(await productPage.$maxPrice().isDisplayed()).toBe(true);
    });






});