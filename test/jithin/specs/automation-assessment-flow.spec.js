/****************************************************
 *                     consts                      *
 ****************************************************/
const testData = require("../environments/qat/testData.json");
const { buttonsPage } = require("../page-objects/buttons-page.js");
const { demoPage } = require("../page-objects/demoQa-home-page.js");
const { elementsPage } = require("../page-objects/elements-page.js");
const { textBoxPage } = require("../page-objects/text-box-page.js");
const { uploadDownloadPage } = require("../page-objects/upload-download-page.js");
const { pdfOperations } = require("../page-objects/pdf-operations.js");
const { webTablesPage } = require("../page-objects/web-tables-page.js");

let splittedValue,
  randomNumber = Math.floor(Math.random() * 1000),
  randomEmail = `${testData.firstName}${randomNumber}@mailsac.com`;

describe("Automation Assessment 1.", () => {
  
  it(`Navigate to ${testData.demoQaUrl} and load the application in a new chrome window.`, async () => {
    await demoPage.openUrl(testData.demoQaUrl);
    expect(await demoPage.$pageIcon()).toBeDisplayed();
    expect(await demoPage.$homePageContent()).toBeDisplayed();
  });

  it('Scroll down to "Elements" and click on "Elements".', async () => {
    await demoPage.scrollToElementsAndClick();
    expect(await elementsPage.$elementsleftPanel()).toBeDisplayed();
    expect(await textBoxPage.$elementsItemHeader().getText()).toBe("Elements");
  });

  it('Click on "Text Box" option from "Elements" Panel.', async () => {
    await textBoxPage.clickOnElements("Text Box");
    expect(await elementsPage.$elementsItemHeader().getText()).toBe("Text Box");
  });

  it('Fill "Text Box" fields and click on submit.', async () => {
    await textBoxPage.enterInput(
      "userName",
      testData.fullName,
      testData.flag[0]
    );
    await textBoxPage.enterInput("userEmail", randomEmail, testData.flag[0]);
    await textBoxPage.enterInput(
      "currentAddress",
      testData.currentAddress,
      testData.flag[1]
    );
    await textBoxPage.enterInput(
      "permanentAddress",
      testData.permanentAddress,
      testData.flag[1]
    );
    await textBoxPage.clickOnSubmit();
    splittedValue = (
      await textBoxPage.$detailsDisplayed("name").getText()
    ).split(":");
    expect(splittedValue[1]).toBe(testData.fullName);
    splittedValue = (
      await textBoxPage.$detailsDisplayed("email").getText()
    ).split(":");
    expect(splittedValue[1]).toBe(randomEmail);
    splittedValue = (
      await textBoxPage.$detailsDisplayed("currentAddress").getText()
    ).split(":");
    expect(splittedValue[1]).toBe(testData.currentAddress);
    splittedValue = (
      await textBoxPage.$detailsDisplayed("permanentAddress").getText()
    ).split(":");
    expect(splittedValue[1]).toBe(testData.permanentAddress);
  });

  it('Click on "Buttons" option from "Elements" panel.', async () => {
    await buttonsPage.clickOnElements("Buttons");
    expect(await buttonsPage.$elementsItemHeader().getText()).toBe("Buttons");
  });

  it('Click on "Double Click Me" and "Right Click Me".', async () => {
    await buttonsPage.doubleClick();
    expect(await buttonsPage.$doubleClickMessage().getText()).toBe(
      "You have done a double click"
    );
    await buttonsPage.rightClick();
    expect(await buttonsPage.$rightClickMessage().getText()).toBe(
      "You have done a right click"
    );
  });

  it('Navigate to "Upload and Download" option in "Elements" panel.', async () => {
    await uploadDownloadPage.clickOnElements("Upload and Download");
    expect(await buttonsPage.$elementsItemHeader().getText()).toBe(
      "Upload and Download"
    );
  });

  it('Click on "Download" button.', async () => {
    await uploadDownloadPage.clickOnDownload();
    expect(await uploadDownloadPage.isFileExist()).toBe(true);
  });

  it(`Click on "Choose File" button and upload "${testData.pdfFileName}" file.`, async () => {
    await pdfOperations.createPdf(testData.pdfFilePath, testData.pdfFileName);
    await uploadDownloadPage.uploadFile(
      testData.pdfFilePath,
      testData.pdfFileName
    );
    await pdfOperations.deletePdf(testData.pdfFilePath);
    expect(await uploadDownloadPage.$uploadDirectory().getText()).toBe(
      `C:\\fakepath\\${testData.pdfFileName}`
    );
  });

  it('CLick on "Web Tables" option from "Elements" panel.', async () => {
    await webTablesPage.clickOnElements("Web Tables");
    expect(await webTablesPage.$elementsItemHeader().getText()).toBe(
      "Web Tables"
    );
  });

  it('Click on "Add" button.', async () => {
    await webTablesPage.clickOnAdd();
    expect(await webTablesPage.$registrationForm().getText()).toBe(
      "Registration Form"
    );
  });

  it('Enter values in "Registration Form" popup fields and click on "Submit".', async () => {
    await webTablesPage.enterInputToFields("firstName", testData.firstName);
    await webTablesPage.enterInputToFields("lastName", testData.lastName);
    await webTablesPage.enterInputToFields("userEmail", randomEmail);
    await webTablesPage.enterInputToFields("age", testData.age);
    await webTablesPage.enterInputToFields("salary", testData.salary);
    await webTablesPage.enterInputToFields("department", testData.department);
    await webTablesPage.submitButtonClick();
    expect(await webTablesPage.$newTableRow()).toBeDisplayed();
    expect(
      await webTablesPage.$newlyAddedRowContent(testData.firstName).getText()
    ).toBe(testData.firstName);
    expect(
      await webTablesPage.$newlyAddedRowContent(testData.lastName).getText()
    ).toBe(testData.lastName);
    expect(
      await webTablesPage.$newlyAddedRowContent(randomEmail).getText()
    ).toBe(randomEmail);
    expect(
      await webTablesPage.$newlyAddedRowContent(testData.age).getText()
    ).toBe(testData.age);
    expect(
      await webTablesPage.$newlyAddedRowContent(testData.salary).getText()
    ).toBe(testData.salary);
    expect(
      await webTablesPage.$newlyAddedRowContent(testData.department).getText()
    ).toBe(testData.department);
  });

  it(`Click on search box field and search for age "${testData.age}".`, async () => {
    await webTablesPage.search(testData.age);
    let resultSet = await webTablesPage.getFieldData(testData.age);
    for (let item of resultSet) expect(await item).toBe(testData.age);
  });

  it("Clear search field and delete last entry.", async () => {
    await webTablesPage.search(" ");
    await webTablesPage.deleteEntry(testData.firstName);
    expect(await webTablesPage.$deleteEntry()).not.toBeDisplayed();
  });
});
