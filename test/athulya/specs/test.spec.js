const {homePage} = require ('../page-objects/home-page.js');
const testData=require('../test-data/test-data.json');
describe("basic flow of the flipkart application ",()=>{
  it ('Open the url and load the application',async()=>{
    await homePage.openUrl(testData.url);
    await expect(browser).toHaveUrl("https://www.flipkart.com/");
});

it('Search for the mobile phones in search bar',async()=>{
await homePage.searchItem(testData.searchBarInput);
expect(await homePage.$productCatagoryHeader()).toBeDisplayed();
});

it(`Click "${testData.sortOption}" sort option`, async()=>{
  await homePage.priceHighToLowClick();
 expect (await homePage.orderCheck()).toBe(true);
 
});

it('select the maximum price as "30000"from the drop down ',async()=>{
await homePage.filterSelection();
expect (await homePage.sortedPriceList()).toBe(true);
});

it('select "apple" in brand section and select one apple phone from the list ',async()=>{
await homePage.brandSelectCheckBox();
expect(await homePage.$appleBrandCheckBox().isSelected());

});
it('validating the brand name listed is only "Apple"',async()=>{
  let resultSet=await homePage.getValueFromTable();
  expect(resultSet.every(item=>item.includes('APPLE'))).toBe(true);
});

it('Click on "CLEAR ALL" in filter section and verify all the the applied filters has been removed',async()=>{
 expect(await homePage.$clearAllClick().getText()).toBe("Clear all");
});

});

