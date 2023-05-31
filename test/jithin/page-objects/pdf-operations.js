/****************************************************
 *                     Imports                      *
 ****************************************************/
import pdfKit from "pdfkit";
import fs from "fs";
import deleteFiles from "delete-files";

var newPdf = new pdfKit();
let fileExistsBoolean;

class PdfOperations {
  
  constructor() {}

  /**
   * Methods
   */

  /**
   * Method to create a pdf file at path: "pdfFilePath" with filename: "pdfFileName".
   * @param {String} pdfFilePath
   * @param {String} pdfFileName
   */
  async createPdf(pdfFilePath, pdfFileName) {
    newPdf.pipe(fs.createWriteStream(`${pdfFilePath}${pdfFileName}`));
    newPdf.end();
  }

  /**
   * Method to check whether a file is exist at path.
   * @returns true or false
   */
  async fileStatus(path) {
    if (fs.existsSync(path)) {
      fileExistsBoolean = true;
    } else {
      fileExistsBoolean = false;
    }
    return fileExistsBoolean;
  }

  /**
   * Method to add content in pdf file.
   */
  async addDataToPdf() {
    newPdf.text("Newly created pdf.");
    newPdf.end();
  }

  /**
   * Method to delete pdf file at path: "pdfFIlePath".
   * @param {String} pdfFilePath
   */
  async deletePdf(pdfFilePath) {
    const options = {
      glob: ".pdf",
    };
    await deleteFiles(pdfFilePath, options);
  }
}

module.exports = 
{
  pdfOperations : new PdfOperations()
}

