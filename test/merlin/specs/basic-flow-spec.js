const testData = require("../testdata/testData.json");
const { homePage } = require("../page-objects/home-page.js");
const { productPage } = require("../page-objects/product-page.js");
describe("WorkFlow of FlipKart", () => {
  it("Open Url and load the application", async () => {
    await homePage.openUrl(testData.pageUrl);
    await expect(browser).toHaveUrl(testData.pageUrl);
    expect(await homePage.$homePageHeader().isDisplayed())
      .withContext("Logined successfully")
      .toBe(true);
  });

  it("Click on searchbar and search for mobile phones", async () => {
    await homePage.clickOnSearchBar(testData.productName);
    expect(await homePage.$searchDropDown().isDisplayed()).toBe(true);
  });

  it("Click on search button and navigate to the product page", async () => {
    await homePage.clickOnSearchButton();
    expect(await homePage.$productPageHeader().isDisplayed()).toBe(true);
  });

  it("Click on High to Low Price and navigate to the page", async () => {
    await productPage.clickOnHighToLow();
    expect(await productPage.$priceHighToLowHighlighted().isDisplayed()).toBe(
      true
    );
    expect(await productPage.checkMaxPriceOfLowToHigh()).toBe(true);
  });

  it("click on Max price dropdown", async () => {
    await productPage.clickOnDropDown();
    expect(await productPage.$priceSelectionDrop().isDisplayed()).toBe(true);
    expect(await productPage.$filterHeaderForPrice().isDisplayed()).toBe(true);
    let resultSet = await productPage.checkMaxPrice();
    expect(resultSet.every((item) => item.includes(testData.price))).toBe(true);
  });

  it("select the brand of the mobile", async () => {
    await productPage.selectBrand();
    expect(await productPage.$filterHeaderForBrand().isDisplayed()).toBe(true);
    let resultSet = await productPage.checkBrandName();
    expect(resultSet.every((item) => item.includes(testData.brandName))).toBe(
      true
    );
  });

  it("Click on clearfilter and clear all filters", async () => {
    await productPage.clearAll();
    expect(await productPage.$maxPrice().isDisplayed()).toBe(true);
  });
});
