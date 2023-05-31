/****************************************************
 *                     Imports                      *
 ****************************************************/
const Common = require("./common.js");

class ElementsPage extends Common {
  
  constructor() {
    super();
    /**
     * Elements
     */
    this.$elementsItemHeader = () => $('//div[@class="main-header"]');
  }
}

module.exports = {
  elementsPage: new ElementsPage(),
};
