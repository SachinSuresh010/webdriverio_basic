const { loginPage } = require("../page-objects/test.js");

describe("Basic flow of EDelivery Application", () => {
  it("Open URL and load the application", async () => {
    await loginPage.openUrl("https://edelivery.zoproduct.com/");
    await expect(browser).toHaveUrl("https://edelivery.zoproduct.com/");
  });

});
