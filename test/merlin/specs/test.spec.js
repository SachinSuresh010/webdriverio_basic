describe ('New application',()=>{
    it('Open Url and load the application',async()=>{
        await loginPage.openUrl('https://edelivery.zoproduct.com/');
        await expect(browser).toHaveUrl('https://edelivery.zoproduct.com/');
        expect(await loginPage.$urlLaunchLogo().isDisplayed()).toBe(true);
    });
});