const BaseForm = require('../../framework/baseForm.js');
const Button = require('../../framework/button.js');
const Label = require('../../framework/label.js');
const Icon = require('../../framework/Icon.js');
const locators = require('../locators/actionPage.json');

class SteamActionPage extends BaseForm {

    actionPageLogo = new Icon('actionPageLogo', locators.actionPageLogo)
    topSellerButton = new Button('topSellerButton', locators.topSellerButton);
    topSellerSection = new Label('topSellerSection', locators.topSellerSection);

    //steamLogo = new Icon('steamLogo', locators.steamLogo)

    constructor() {
        super()
        this.name = 'SteamActionPage'
        this.element = this.actionPageLogo
    }

    async isActionPageLoaded() {
         await this.topSellerSection.waitForElementExist();
    }

    async selectTopSellersTab() {
        await this.topSellerButton.click();
    }

    async isTopSellerTabDisplayed() {
        return await this.topSellerSection.waitForElementExist();
    }

    async moveMouseToTopSeller() {
        await this.topSellerSection.moveMouseToElement();
    }


};

module.exports = new SteamActionPage();