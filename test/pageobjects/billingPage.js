const Common=require('./common');
const randomNumbers = require('random-numbers')
class Billingpage extends Common{
    constructor(){
        super();
        this.$billingHeader=()=>$('//h1[text()="Check Out karo !"]');
        this.$firstName=()=>$('#fname');
        this.$email=()=>$('#email');
        this.$address=()=>$('#adr');
        this.$cityName=()=>$('#city');
        this.$stateName=()=>$('#state');
        this.$zipCode=()=>$('#zip');
        this.$customerName=()=>$('#cname');
        this.$customerNumber=()=>$('#ccnum')
        this.$expiryMonth=()=>$('#expmonth');
        this.$expYear=()=>$('#expyear');
        this.$cvvNum=()=>$('#cvv');
        this.$submitButton=()=>$('//input[@value="Continue to checkout"]');
       }
       async billingDetails(){
        await this.$firstName().setValue('Alen');
        await this.$email().setValue('abc@gmail.com');
        await this.$address().setValue('asdfghjkl');
        await this.$cityName().setValue('New Yorks');
        await this.$stateName().setValue('dsfghjkl');   
        await this.$customerName().setValue('qwerfdsasdf');
        let num=randomNumbers.create(10000,10000000);
        await this.$customerNumber().setValue(num);
        await this.$expiryMonth().setValue('march');
        await this.$expYear().setValue('20222');
        await this.$cvvNum().setValue('234');
        await this.$submitButton().click();
        await browser.pause(4000);
       }
}
module.exports={
    billingPage:new Billingpage()
}