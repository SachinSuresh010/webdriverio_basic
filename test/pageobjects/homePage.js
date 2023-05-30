const Common=require('./common');
class Homepage extends Common{
    constructor(){
        super();
        this.$contactHeader=()=>$('(//a[contains(text(),"Contact Us")])[2]');
        this.$fname=()=>$('//input[@placeholder="Full Name "]');
        this.$email=()=>$('//input[@placeholder="Email"]');
        this.$phoneNum=()=>$('//input[@placeholder="Phone number"]');
        this.$msg=()=>$('//input[@placeholder="Message"]');
        this.$btn=()=>$('//button[contains(text(),"SEND")]');
        this.$thankHeader=()=>$('//h1[text()="THANK YOU!"]');
    }
    async contact(){
        await this.$contactHeader().click();
        await this.waitForLoad();
        
    }
    async fillDetails()
    {
        await this.$fname().setValue("Alen");
        await this.$email().setValue('alem@gmail.com')
        await this.$phoneNum().setValue('9876655433')
        await this.$msg().setValue('qwerttyyuuiioplkkjjhgfddswwedrrt');
        await this.$btn().click();
        await browser.pause(2000);

    }
}
module.exports={
    homePage:new Homepage()
}