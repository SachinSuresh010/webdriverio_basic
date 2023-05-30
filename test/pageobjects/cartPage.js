const Common=require('./common');
class Cartpage extends Common{
    constructor(){
        super();
        this.$cartButton1 =()=>$('//a[text()=" Watches "]')
        this.$cartSymbol=()=>$('//a[@href="cart.html"]')
    }
    async AddToCart(){
        await this.$cartButton().click();
        await this.$cartSymbol().click();
    }
}
module.exports={
    cartPage:new Cartpage()
}