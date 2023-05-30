const {homePage} = require("../pageobjects/homePage")
const {cartPage}=require("../pageobjects/cartPage");
const {billingPage} = require("../pageobjects/billingPage");


describe('End to end workflow of MavenKonnect',()=>{
 
    it('User able to load the url',async()=>{
        await homePage.openUrl();
        expect(await homePage.$pageHeader().isDisplayed()).toBe(true,'Page header should be displayed');
    })

    it('Click on Contact Page',async()=>{
        await homePage.contact();
        await browser.switchWindow('https://demotmwebsite.github.io/contact.html');
        expect(await homePage.$fname().isDisplayed()).toBe(true,'Fname filed should be visible');

    })

    it('Fill Details',async()=>{
        await homePage.fillDetails();
        await browser.acceptAlert();
        await browser.pause(4000);
        expect(await homePage.$thankHeader().isDisplayed()).toBe(true,'Header should be displayed');
    })

    it('Click on watches',async()=>{
        await cartPage.AddToCart();
        expect(await billingPage.$billingHeader().isDisplayed()).toBe(true,'Header should be displayed');

    })

    it('FIll the details of the customer',async()=>{
        await billingPage.billingDetails();
        await browser.acceptAlert();
        await browser.pause(4000);
    })

    
})