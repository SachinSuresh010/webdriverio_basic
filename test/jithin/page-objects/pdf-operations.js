/****************************************************
 *                     Imports                      *
 ****************************************************/
const pdfKit = require("pdfkit");
const fs = require("fs");
const deleteFiles = require("delete-files");

var newPdf = new pdfKit();

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

module.exports = {
  pdfOperations: new PdfOperations(),
};
