const testData = require('../testdata/testData.json');
const {homePage} = require('../page-objects/home-page.js');
const {productPage} = require('../page-objects/products-page.js');

describe('Mobile purchase flow for flipkart', ()=>{
    it('Open URL and load the application', async()=>{
        await homePage.openUrl(testData.flipKartUrl);
        await expect(browser).toHaveUrl(testData.flipKartUrl);
        expect(await homePage.$flipKartHeader().isDisplayed()).toBe(true);
    });

    it(`Enter "${testData.searchItem}" in search input box and click search icon `, async()=>{
        await homePage.enterSearchItem(testData.searchItem);
        expect (await homePage.$mobilePageHeader().getText()).toBe('Mobiles & Accessories');       
    });

    it(`Click "${testData.sortOPtion}" sort option and validate the result data is in high to low order`, async()=>{
        await productPage.clickPriceHightoLowOPtion();
       expect (await productPage.orderCheck()).toBe(true);
    });

    it(`Select maximum price ${testData.maxFilterValue} from the filter and validate the result`, async()=>{
        let result = await productPage.clickMaxFilter();
        expect(await productPage.$filterHeader().getText()).toBe('Min-₹30000');
        expect (await result).toBe(true);
    });

    
    it('Click Apple checkbox and validate result products are Apple', async()=>{
        let result = await productPage.clickAppleCheckbox(testData.brandNames);
        expect (await result).toBe(true);
    });

    it('Click clear All', async()=>{
        let isDisplayed = await productPage.clickClearAll();
        expect(await isDisplayed).toBe(true);
        
    });

});
