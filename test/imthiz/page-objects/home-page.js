class HomePage{
    constructor(){

    }

 /**
   * Load the url for the site and open the website
   * @param {String} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    
  }
}

module.exports = 
{
    homePage : new HomePage()
}