const testData = require("../test-data/data.json");
const { homePage } = require("../page-objects/home-page.js");
const { searchResultsPage } = require("../page-objects/search-results-page");
const { test } = require("node:test");

describe("Basic e2E flow with filter and clear filter", () => {
  it("Open url and load the application", async () => {
    await homePage.openUrl(testData.URL);
    await expect(browser).toHaveUrl(testData.URL);
  });

  it("Close the Login Pop up and continue without login in ", async () => {
    await homePage.loginPopUpClosing();
    expect(await homePage.$loginButton().isDisplayed()).toBe(true);
  });

  it("Enter the keyword to be searched in the search-box and click search icon", async () => {
    await homePage.searchInput(testData.searchKeyWord);
    expect(
      await searchResultsPage.$searchResultIdentifier().isDisplayed()
    ).toBe(true);
    expect(await searchResultsPage.$searchResultIdentifier().getText()).toBe(
      testData.searchKeyWord
    );
  });

  it(`Click on sorting-High to Low`, async () => {
    //let defaultArray = await searchResultsPage.priceArrayDefault();
    await searchResultsPage.sortingHighToLow();
    let resultArray = await searchResultsPage.priceArrayDefault();
    let flag = await searchResultsPage.descendingOrderSort(resultArray);
    expect(flag).toBe(true);
  });

  it(`Change the default Max price in filter to ${testData.maxPrice}`, async () => {
    await searchResultsPage.maxPriceSelector(testData.maxPrice);
    expect(
      await searchResultsPage.$priceFilterConfirmation().isDisplayed()
    ).toBe(true);
    let resultArray = await searchResultsPage.priceArrayDefault();
    let flag = await searchResultsPage.filterPriceCheck(
      resultArray,
      testData.maxPrice
    );
    expect(flag).toBe(true);
  });

  it(`Select the product ${testData.productParentName} `, async () => {
    await searchResultsPage.productParentCompanySelection(
      testData.productParentName
    );
    expect(
      await searchResultsPage
        .$productParentConfirmation(testData.productParentName)
        .getText()
    ).toBe(testData.productParentName);
    let flag = await searchResultsPage.filteredProductChecker(
      testData.productParentName
    );
    expect(flag).toBe(true);
  });
});
