/****************************************************
 *                     Imports                      *
 ****************************************************/
const Common = require("./common.js");
const downloadsFolder = require("downloads-folder");
const deleteFiles = require("delete-files");
const fs = require("fs");

let downloadFolderPath = downloadsFolder();

class UploadAndDownloadPage extends Common {
    
  constructor() {
    super();
    /**
     * Elements
     */
    this.$downloadButton = () => $('//a[@id="downloadButton"]');
    this.$uploadButton = () => $('//input[@id="uploadFile"]');
    this.$uploadDirectory = () => $('//p[@id="uploadedFilePath"]');
  }

  /**
   * Methods
   */

  /**
   * Method to upload a file.
   */
  async uploadFile(directoryPath, fileName) {
    const filePath = `${directoryPath}${fileName}`;
    const remoteFilePath = await browser.uploadFile(filePath);
    await this.$uploadButton().setValue(remoteFilePath);
  }

  /**
   * Method to check whether file exists in default download directory.
   * @returns boolean value
   */
  async isFileExist() {
    return fs.existsSync(`${downloadFolderPath}/sampleFile.jpeg`);
  }

  /**
   * Method to click on "Download" button.
   */
  async clickOnDownload() {
    if (await this.isFileExist()) {
      await this.deleteFile();
    }
    await this.$downloadButton().waitForClickable({timeout:10000});
    await this.$downloadButton().click();
    await browser.waitUntil(
      async function () {
        return await fs.existsSync(`${downloadFolderPath}/sampleFile.jpeg`);
      },
      { timeout: 10000, timeoutMsg: "File not downloaded in 10 seconds." }
    );
  }

  /**
   * Method to delete sampleFile.jpeg.
   */
  async deleteFile() {
    const options = {
      glob: "sampleFile.jpeg",
    };
    await deleteFiles(downloadFolderPath, options);
  }
}

module.exports = 
{
  uploadDownloadPage : new UploadAndDownloadPage()
}

