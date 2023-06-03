module.exports = class Common {
  isDescending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  isBelowSelectedPrice(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 30000) {
        return false;
      }
    }
    return true;
  }
}
