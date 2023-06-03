const {homePage} = require('../page-objects/home-page.js');
const testData = require('../test-data/testData.json');
const {productPage} = require('../page-objects/product-page.js');
describe('Basic flow for flipkart', ()=>{
    it('OpenUrl and load the application', async ()=>{
       await homePage.openUrl(testData.pageURL);
       await expect(browser).toHaveUrl(testData.pageURL);
    });

    it('Enter the product name on the search field and check if product drop-down appears', async ()=>{
      await homePage.searchProduct(testData.productName);
      expect(await homePage.$productDropDown().isDisplayed()).toBe(true);
    });

    it('Click on search icon and navigate to searched products page',async ()=>{
        await homePage.clickOnSearchIcon();
        expect(await homePage.$categories().getText()).toBe(testData.categoriesName);
    });

    it('Click on high to low option',async ()=> {
       await productPage.clickPriceHighToLowOption();
       let result = await productPage.priceValidation();
       expect(result).toBe(true);
    });

    it('Click on price drop-down from the filters and select a price', async ()=>{
      await productPage.clickPriceDropdown();
      let result = await productPage.priceValidationForSelectedPrice()
      expect(result).toBe(true);
    });

});             