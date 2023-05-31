const homePage = require("../page-objects/home-page.js");

describe("Basic e2e Flow of the website", () => {
  it("Open url and load the application", async () => {
    await homePage.openUrl("https://demoqa.com/");
    await expect(browser).toHaveUrl("https://demoqa.com/");
  });
});
