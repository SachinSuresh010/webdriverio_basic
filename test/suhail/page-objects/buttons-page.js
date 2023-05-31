class Buttonspage{
    constructor(){
        this.$buttonBtn = () => $('//span[text()="Buttons"]')
        this.$buttonHeader = () => $('//div[@class="main-header"]')
        this.$doubleClick = () => $('#doubleClickBtn')
        this.$verifyDoubleClick = () => $('#doubleClickMessage')
        this.$rightClick = () => $('#rightClickBtn')
        this.$verifyRightClick = () => $('#rightClickMessage')
    }

    /**
     * Click on the "Buttons" button. 
     */
async clickButtonPage(){
    await this.$buttonsBtn().scrollIntoView();
    await this.$buttonsBtn().click();
    await this.$buttonsHeader().waitForDisplayed({
        timeout:10000,
        timeoutMsg: "time out to display the 'Buttons' page",
      });
}

async clickOnDoubleClick(){
    await this.$doubleClick().doubleClick();
    await this.$verifyDoubleClick().waitForDisplayed({
        timeout:10000,
        timeoutMsg: "time out to display the 'Double click' message", 
    })
}

async clickOnRightClick(){
    // await this.$rightClick().rightClick({button:2});
    const element = await this.$rightClick();
    await browser.actions().click(element, { button: 2 });
    await this.$verifyRightClick().waitForDisplayed({
        timeout:10000,
        timeoutMsg: "time out to display the 'Right click' message", 
    })
}
}
export default new Buttonspage()