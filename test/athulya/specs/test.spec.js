const {homePage} = require ('../page-objects/home-page.js');
const {loginPage} = require ('../page-objects/login-page.js');
let productName = "Sauce Labs Backpack";
let firstName = checkoutPage.getRandomLetters(6);
let lastName =  checkoutPage.getRandomLetters(6);
let zipCode = Math.floor(Math.random() * 1000000);

describe("Basic flow of the swag lab application", () => {
  it("Open the url and load the application ", async () => {
    await loginPage.openUrl("https://www.saucedemo.com/");
    await expect(browser).toHaveUrl("https://www.saucedemo.com/");
  });

  it("Provide the username and password ,click on login button ", async () => {
    await loginPage.loginToApplication("standard_user", "secret_sauce");
    expect(await loginPage.$homePageHeader().toBeDisplayed);
    await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });
  it("add an item to the cart ", async () => {
    await homePage.addToCartClick(productName);
    expect(await homePage.$addToCartIcon(productName).getText()).toBe("Remove");
    expect(await homePage.$CartIcon().getText()).toBe("1");
  });

  it("Add one more item to the cart and verify the number of items showing in cart icon", async () => {
    await homePage.$addToCartIcon("Sauce Labs Bike Light").click();
    expect(await homePage.$CartIcon().getText()).toBe("2");
  });

  it("click on the cart icon and verify the redirected page", async () => {
    await homePage.cartIconClick();
    await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
  });

  it("click on checkout icon and verify the redirected page", async () => {
    await homePage.checkOutIconclick();
    expect(await homePage.$checkoutPageHeader().isDisplayed());
  });

});
