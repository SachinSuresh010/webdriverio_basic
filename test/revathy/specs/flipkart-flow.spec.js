const testData = require('../test-data/data.json');
const {homePage} = require('../page-objects/home-page');
const {searchPage} = require('../page-objects/search-page');

describe('Basic flow of Flipkart application', () => {
    it('Open URL and load the application', async () => {
        await homePage.openUrl(testData.flipkartUrl);
        await expect(browser).toHaveUrl(testData.flipkartUrl);
        expect(await homePage.$homePageHeader().isDisplayed()).withContext('Homepage header not displayed').toBe(true);
    });

    it('Close Login popup by clicking on close icon.', async () => {
        await homePage.closeLoginPopUp();
        expect (await homePage.$searchBar().isDisplayed()).toBe(true);
    });

    it(`Click on "Search button" and search for "${testData.productToSearch}".`, async () => {
        await homePage.clickSearchButton();
        expect (await searchPage.$searchPageHeader().isDisplayed()).toBe(true);
    });

    it('Sort the price from "High to low" and validate the prices are in descending order.', async() => {
        await searchPage.clickSort();
        expect (await searchPage.orderCheck()).toBe(true);
    });

    it(`Click on the filter dropdown and select "${testData.price}".`, async() => {
        await searchPage.clickFilterDropDown(testData.price);
        let resultSet = await searchPage.getPriceFromList();
        expect (await resultSet.filter((price) => parseInt(price) < 30000));  
    });

    it(`Select "${testData.brand}" and validate the search result.`, async() => {
        await searchPage.selectBrand(testData.brand);
        let brandSet = await searchPage.getBrandFromList();
        expect (await brandSet.every(item => item.toLowerCase().includes(testData.brand.toLowerCase()))).toBe(true);
    });

    it('Click on "Clear All" and clear the filter.', async() => {
        await searchPage.clickClearAll();
        expect (await searchPage.$clearAllHeader().isDisplayed()).toBe(true);
    });

})