const { pdfKit } = require("pdfkit");
const { downloadsFolder } = require("downloads-folder");
const { fs } = require("fs");
const { webTablePage } = require("../page-objects/web-table-page.js");

let filePath = downloadsFolder();

var newPdf = new pdfKit();

class UploadDownload {
  constructor() {
    this.$uploadDownloadPageHeader = () =>
      $('//div[@class="main-header"][text()="Upload and Download"]');
    this.$uploadFileButton = () => $('//input[@id="uploadFile"]');
    this.$uploadFilePathShown = () => $('//p[@id="uploadedFilePath"]');
    this.$downloadButton = () => $('//a[@id="downloadButton"]');
    this.$webTableButton = () =>
      $('//span[@class="text"][text()="Web Tables"]');
  }

  /*
   * Method to create a pdf file at path
   * @param {String} filePath
   * @param {String} fileName
   */
  async createPdf(filePath, fileName) {
    newPdf.pipe(fs.createWriteStream(`${filePath}${fileName}`));
    newPdf.end();
  }

  /**
   * Method to upload a file.
   */
  async uploadFile(directoryPath, fileName) {
    await this.$uploadFileButton().scrollIntoView({ block: "center" });
    const remoteFilePath = await browser.uploadFile(
      `${directoryPath}${fileName}`
    );
    await this.$uploadFileButton().setValue(remoteFilePath);
    await this.$uploadFilePathShown().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to do uploading ",
    });
  }
  /**
   * Cicking on Download button
   */
  async clickingDownloadButton() {
    await this.$downloadButton().click();
    await browser.waitUntil(
      async function () {
        return await fs.existsSync(`${filePath}/sampleFile.jpeg`);
      },
      {
        timeout: 10000,
        timeoutMsg: "File not downloaded in 10seconds.",
      }
    );
  }
  /**
   * Method to check whether file exists in default download directory.
   * @returns boolean value
   */
  async isFileExist() {
    return fs.existsSync(`${filePath}/sampleFile.jpeg`);
  }

  /**
   * Method to click on the web Table option in side menu
   */
  async webTableClick() {
    await this.$webTableButton().scrollIntoView({ block: "center" });
    await this.$webTableButton().click();
    await webTablePage.$webTableHeader().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed to do right click ",
    });
  }
}
module.exports = {
  uploadDownloadPage: new UploadDownload(),
};
