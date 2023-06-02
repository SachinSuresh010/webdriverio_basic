/****************************************************
 *                     imports                      *
 ****************************************************/
const testData = require("../test-data/testData.json");
const { homePage } = require("../page-objects/home-page.js");
const { searchResultsPage } = require("../page-objects/search-results-page");

describe(`Search for "${testData.searchKeyWord}" and filter for "${testData.filterBrand}" brand, "${testData.filterMaxPrice}" maximum price validation.`, () => {
  it(`Navigate to "${testData.url}" and load the application in a new chrome window.`, async () => {
    await homePage.openUrl(testData.url, homePage.$loginPopUpCloseButton());
    expect(await homePage.$homePageIcon())
      .withContext("Expect home page icon to be displayed.")
      .toBeDisplayed();
    expect(browser).toHaveUrl(testData.url);
  });

  it("Close login popup.", async () => {
    await homePage.loginPopUpClose();
    expect(await homePage.$loginPopUpCloseButton()).not.toBeDisplayed();
  });

  it(`Enter "${testData.searchKeyWord}" in search field and click search icon.`, async () => {
    await homePage.enterSearchInputAndClick(testData.searchKeyWord);
    expect(
      await searchResultsPage.$searchResultIdentifier(testData.searchKeyWord)
    ).toBeDisplayed();
    expect(
      await searchResultsPage
        .$searchResultIdentifier(testData.searchKeyWord)
        .getText()
    ).toBe(testData.searchKeyWord);
  });

  it(`Sort By "Price -- High to Low".`, async () => {
    let isSorted = await searchResultsPage.priceSort();
    expect(isSorted).toBe(true);
  });

  it(`Select maximum price ${testData.filterMaxPrice} from price filter.`, async () => {
    let isPriceFilterSelected = await searchResultsPage.selectMaxPriceInFilter(
      testData.filterMaxPrice
    );
    expect(isPriceFilterSelected).toBe(true);
  });

  it(`Select brand "${testData.filterBrand} from BRAND filter.`, async () => {
    let isBrandFilterSelected = await searchResultsPage.selectBrandInFilter(
      testData.filterBrand
    );
    expect(isBrandFilterSelected).toBe(true);
  });

  it('Click on "Clear All" button.', async () => {
    await searchResultsPage.clickOnClearAll();
    expect(await searchResultsPage.$clearAllButton().isDisplayed())
      .withContext('Expect "Clear All" option not to be displayed')
      .toBe(false);
  });
});
