const BaseForm = require('../../framework/baseForm.js');
const Button = require('../../framework/button.js');
const Label = require('../../framework/label.js');
const Icon = require('../../framework/Icon.js');
const locators = require('../locators/actionPage.json');

class SteamActionPage extends BaseForm {

    actionPageLogo = new Label('actionPageLogo', locators.actionPageLogo)
    topSellerButton = new Label('topSellerButton', locators.topSellerButton);
    topSellerSection = new Label('topSellerSection', locators.topSellerSection);
    topSellersWithDiscount = new Label('topSellersWithDiscount', locators.topSellersWithDiscount);
    gamesInsideTopSellerSection = new Label('gamesInsideTopSellerSection', locators.gamesInsideTopSellerSection);
    discountDiv = new Label('discountDiv', locators.discountDiv);
    singleGameInSection = new Label('SingleGameInSection', locators.singleGameInSection);
    gameNamesInsideTopSellerSection = new Button('gameNamesInsideTopSellerSection', locators.gameNamesInsideTopSellerSection);

    constructor() {
        super()
        this.name = 'SteamActionPage'
        this.element = this.actionPageLogo
    }

    async selectTopSellersTab() {
        await this.topSellerButton.click();
    }
    
    async waitTopSellerToLoad() {
        await this.topSellerSection.waitForElementExist();
    }

    async isTopSellerTabDisplayed() {
        return await this.topSellerButton.waitForElementExist();
    }

    async getSingleGameInfo(discount) {
        let game;
        const numberOfGames = await this.singleGameInSection.getCount();
        for (let i = 1; i <= numberOfGames; i++) {
            let elements = await this.singleGameInSection.getElementByNumber(i).getText();
            let newArr = elements.split("\n")
            if(newArr[6] === discount) {
                game = [newArr[0], newArr[6], newArr[8]];
                break;
            } 
        }
        return game;
    }

    async getHighestDiscountAmount() {
        let highestNumber = -Infinity;
        const numberOfDiscountedGames = await this.topSellersWithDiscount.getCount();
        console.log('number of discounted game : ', numberOfDiscountedGames)

        for (let i = 0; i < numberOfDiscountedGames; i ++) {
            let element = this.topSellersWithDiscount.getElementByNumber(i);
            let text = await element.getText();
            let percentageValue = parseFloat(text.replace('%', '').trim());


            if(percentageValue > highestNumber) {
                highestNumber = percentageValue;
            }
            highestNumber += '%'
            return highestNumber;
        }
    }

    async clickHighestDiscountGame(text) {
        await this.gameNamesInsideTopSellerSection.clickWithName(text);
    }

};

module.exports = new SteamActionPage();