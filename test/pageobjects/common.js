module.exports=class Common{
    constructor()
    {
        this.$pageHeader=()=>$('//span[contains(text(),"MavenKonnect")]');
    }
    async openUrl(){
        await browser.url('https://demotmwebsite.github.io/');
        await browser.maximizeWindow();
        await this.$pageHeader().waitForDisplayed(10000,true);
    
    }
}