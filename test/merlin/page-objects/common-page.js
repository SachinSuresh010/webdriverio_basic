 module.exports= class Common{
    constructor(){

    }
    async checkDescending(prices){
    let isSorted = true;
    for (let i = 0; i < prices.length - 1; i++) {
        if (prices[i] > prices[i + 1]) {
        isSorted = false;
        break;
    }
  }
  return isSorted;
}
}