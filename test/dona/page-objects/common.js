module.exports = class Common {
  constructor() { }

  /**
   * Method to check values are in descending order
   * @param {string} priceArray 
   * @returns boolean
   */
  isDescending(priceArray) {
    for (let i = 0; i < priceArray.length - 1; i++) {
      if (priceArray[i] < priceArray[i + 1]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Method to check values are less than 30000
   * @param {string} priceArray 
   * @returns boolean
   */
  maxToDescending(priceArray) {
    for (let i = 0; i < priceArray.length - 1; i++) {
      if (priceArray[i] <= 30000)
        return true;
    }
    return false;
  }
}