export default class Common {
    /**
     * Method to get a random letter
     * @param {string} length
     * @returns
     */
    getRandomLetters(length) {
      let letters = "abcdefghijklmnopqrstuvwxyz",
        str = "";
      for (let i = 0; i < length; i++) {
        str += letters[Math.floor(Math.random() * letters.length)];
      }
      return str;
    }
  }