const testData = require("../testdata/test-data.json");
const { homePage } = require("../page-objects/home-page.js");


describe("Basic flow of flipcart", () => {

  it("Open url and load the application", async () => {
    await homePage.openUrl(testData.flipcartUrl);
    await expect(browser).toHaveUrl("https://www.flipkart.com/");
    expect(await homePage.$homePageSearchBar().isDisplayed()).toBe(true);
  });

  it("Search for mobiles", async () => {
    await homePage.inputSearchData(testData.searchBarInput);
    expect(await homePage.$categoryNameMobile().getText()).toBe("Mobiles");
  });

  it("Filter the mobile price by high to low", async () => {
    await homePage.sortPriceHighToLow();
    expect(await homePage.orderCheck()).toBe(true);
  });

  it("filter the mobile price maximum amount-->30000", async () => {
    await homePage.setMaxAmountToMobile();
    expect(await homePage.$filterMaxAmountDisplay().isDisplayed()).toBe(true);
    expect(await homePage.$filterMaxAmountDisplay().getText()).toBe(
      "Min-₹30000"
    )
    expect(await homePage.getPriceForCheck()).toBe(true);
  });

  it("Filter mobile brand--> APPLE", async () => {
    await homePage.selectBrandFromList("APPLE");
    expect(await homePage.$filterBrandNameDisplay("APPLE").getText()).toBe(
      "APPLE"
    );
  });

  it("Clear all filters", async () => {
    await homePage.clearAllFilter();
  });
});
