const { login } = require("../page-objects/Login.js")
const testData = require("../testdata/testData.json")
const { product } = require("../page-objects/Product.js")
describe("Automation exercise of Flipkart basic flow", () => {
    it("open Url and load the application", async () => {
        await login.openUrl(testData.flipkartURL)
        await expect(browser).toHaveUrl(testData.flipkartURL)
        //expect(await login.$logo()).toBeDisplayed()
    })

    it("Login pop up close", async () => {
        await login.loginPopupClose();
        expect(await login.$logo()).toBeDisplayed()
    });
    it("Entering product name", async () => {
        await login.itemSearch(testData.searchItem)
        expect(await login.$tabForSearch().isDisplayed()).toBe(true);
    })

    it("Sorting mobiles from high to low", async () => {
        await product.proSortHighToLow();
        expect(await product.getPriceAfterSorting()).toBe(true);
    })

    it("Selecting the maximum price", async () => {
        await product.maxPriceSelect();
        expect(await product.priceValueGreaterCheck()).toBe(true)
    })

    it(`Selecting the "${testData.brandName}" mobile from selection`, async () => {
        await product.mobileBrandSelect(testData.brandName);
        let nameApple = await product.appleProductNameCheck()
        expect(await nameApple.every(item => item.toLowerCase().includes(testData.brandName.toLowerCase()))).toBe(true);
    })

    it("Clearing filters", async () => {
        await product.clearFilter();
        expect(await product.$appleClear().isDisplayed()).toBe(true)
    })
})
