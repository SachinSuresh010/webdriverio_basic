const { homePage } = require("../page-objects/home-page.js");
const { elementsPage } = require("../page-objects/elements-page.js");
const { textBoxPage } = require("../page-objects/text-box-page.js");
const randomNumber = require("random-numbers");
const { buttonPage } = require("../page-objects/button-page.js");
const {
  uploadDownloadPage,
} = require("../page-objects/upload-download-page.js");
const { webTablePage } = require("../page-objects/web-table-page.js");

let rNumber = randomNumber.create(1000,9999);
let firstName = "Imdhiz";
let lastName = "Rahiman";
let fullName = firstName + lastName;
let email = `${fullName}${rNumber}@mailsac.com`;
let currentAddress = "Kaloor,Kerala";
let permanentAddress = "Kaloor,Kerala-India";
let age = "45";
let salary = "2000";
let department = "Testing";

const filePath = "D:/Testing Mavens/";
let fileName = "sampleFile.jpeg";

describe("Basic e2e Flow of the website", () => {
  it("Open URL and load the application", async () => {
    await homePage.openUrl("https://demoqa.com/");
    await expect(browser).toHaveUrl("https://demoqa.com/");
  });

  it("Scroll down and click on Elements tab ", async () => {
    await homePage.clickElements();
    expect(await elementsPage.$pageHeader().isDisplayed()).toBe(true);
  });

  it("Click on Text box option on the side bar menu ", async () => {
    await elementsPage.clickTextBox();
    expect(await textBoxPage.$textBoxPageHeader().isDisplayed()).toBe(true);
  });

  it("Enter the data onto the corresponding fields and validate whether the data entered is correctly displayed on the confirmation box ", async () => {
    await textBoxPage.inputTextBoxField(
      fullName,
      email,
      currentAddress,
      permanentAddress
    );
    expect(await textBoxPage.$confirmationInputData("name").getText()).toBe(
      `Name:${fullName}`
    );
    expect(await textBoxPage.$confirmationInputData("email").getText()).toBe(
      `Email:${email}`
    );
    expect(
      await textBoxPage.$confirmationInputData("currentAddress").getText()
    ).toBe(`Current Address :${currentAddress}`);
    expect(
      await textBoxPage.$confirmationInputData("permanentAddress").getText()
    ).toBe(`Permananet Address :${permanentAddress}`);
  });

  it("Click on Button Option on the side bar menu ", async () => {
    await textBoxPage.buttonMenu();
    expect(await buttonPage.$buttonPageHeader().isDisplayed()).toBe(true);
  });

  it("Click on double-click and right-click and validate if click confirmation message corresponding to them are shown  ", async () => {
    await buttonPage.doubleClickTesting();
    expect(
      await buttonPage.$buttonClickMessage("doubleClickMessage").isDisplayed()
    ).toBe(true);
    await buttonPage.rightClickTesting();
    expect(
      await buttonPage.$buttonClickMessage("rightClickMessage").isDisplayed()
    ).toBe(true);
  });

  it("Click on Upload and Download option on the side bar Menu ", async () => {
    await buttonPage.uploadDownloadButton();
    expect(
      await uploadDownloadPage.$uploadDownloadPageHeader().isDisplayed()
    ).toBe(true);
  });

  it("Click on Choose file and upload the file  ", async () => {
    await uploadDownloadPage.createPdf(filePath, fileName);
    await uploadDownloadPage.uploadFile(filePath, fileName);
    expect(await uploadDownloadPage.$uploadFilePathShown().isDisplayed()).toBe(
      true
    );
  });

  it("Click on  Download and confirm if the download was completed", async () => {
    await uploadDownloadPage.clickingDownloadButton();
    expect(await uploadDownloadPage.isFileExist()).toBe(true);
  });

  it("Navigate and select web table option on the side table menu", async () => {
    await uploadDownloadPage.webTableClick();
    expect(await webTablePage.$webTableHeader().isDisplayed()).toBe(true);
  });

  it("Select Add new record and enter the  corresponding fields", async () => {
    let rowNumberInitially = await webTablePage.numberOfRow();
    await webTablePage.addNewRecord();
    await webTablePage.registerationFieldEntering(
      firstName,
      lastName,
      email,
      age,
      salary,
      department
    );
    let newNumberOfRow = await webTablePage.numberOfRow();
    expect(await webTablePage.$webTableHeader().isDisplayed()).toBe(true);
    expect(newNumberOfRow == rowNumberInitially + 1);
  });

  it("Enter 45 as search criteria and click on search button", async () => {
    let resultSet = await webTablePage.searchingData("45");
    expect(resultSet.every((item) => item.includes(age))).toBe(true);
  });

  it("Clear search and delete the last entry ", async () => {
    let rowNumber = await webTablePage.numberOfRow();
    let newNumberOfRow = await webTablePage.deleteData(firstName);
    expect(newNumberOfRow == rowNumber - 1);
  });
});
