const {loginPage}= require('../page-objects/test-file.js');

fdescribe('Basic folw of edDelivery',()=>{
    
    it('open url and load the application', async()=>{
        await browser.maximizeWindow();
        await loginPage.openUrl('https://edelivery.zoproduct.com/');
        await expect(browser).toHaveUrl("https://edelivery.zoproduct.com/");
    });

    it('login to the application',async()=>{
      await loginPage.openLoginPopUp();
      expect(await loginPage.$loginPopUpWondow()).toBeDisplayed(10000);
    });

});   