class Cart {
    constructor() {                     //adding locators for adding product to cart and review
        this.$viewDetails=()=>$('//a[@href="/product_details/2"]')
        this.$cartButton=()=>$('//button[@class="btn btn-default cart"]')
        this.$hoverCartButton=()=>$('//div[@class="overlay-content"]//a[@data-product-id="30"]/i[@class="fa fa-shopping-cart"]')
        this.$continue=()=>$('//*[@id="cartModal"]//button')
        this.$logo=()=>$('//div[@class="logo pull-left"]/a/img')
        this.$names=()=>$("//input[@id='name']")
        this.$email=()=>$("//input[@id='email']")
        this.$writeReview=()=>$("//textarea[@id='review']")
        this.$submit=()=>$('#button-review')
        this.googleads=()=>$('class="google-auto-placed"')
        this.$hoverOver=()=>$('//p[contains(text(),"Premium Polo T-Shirts")]/preceding-sibling::img[@alt="ecommerce website products"]');
        this.$displayPrice=()=> $('//div[@class="product-information"]/span[1]/span[1]')

    }
    /** Adding to cart by clicking view product
     *  Continue after adding to the cart
     */ 
    async addToCart() {                         //method to add a product to cart
        await this.$viewDetails().click();
         await this.$cartButton().click();
        expect(await this.$continue().waitForDisplayed({timeout:5000,timeoutMsg:"wait time out failed for continue button to be displayed"}))
        await this.$continue().click();
        //await browser.pause(1000);



        
    }/** Hovering over the product and selecting
     *   Continue after adding to the cart
     */ 
    async hover(){                              //method to hover to the product
        await browser.scroll(0,300);
        await this.$hoverOver().moveTo();
        await this.$hoverCartButton().click();
        expect(await this.$continue().waitForDisplayed({timeout:5000,timeoutMsg:"wait time out failed for continue button to be displayed"}))
        await this.$continue().click();

    }/** Adding reviews
     * @param {Name} username 
     * @param {Email-id} email 
     * @param {Write Review} review 
     */
    async review(username,email,review){
        await this.$names().setValue(username)
        await this.$email().setValue(email);
        await this.$writeReview().setValue(review)
        //await this.$logo().waitForDisplayed({timeout:5000,timeoutMsg:"wait time out failed for logo to be displayed"})
        await browser.pause(2000);
        await this.$submit().click()
    }
}
export default new Cart()