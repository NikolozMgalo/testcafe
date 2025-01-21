const BaseForm = require('../../framework/baseForm.js');
const Button = require('../../framework/button.js');
const Label = require('../../framework/label.js');
const Icon = require('../../framework/Icon.js');
const locators = require('../locators/gamePage.json');
let gamePrice;
let gameDiscount;

class SteamGamePage extends BaseForm {

    gamePage = new Label('gamePage', locators.gamePage);
    gameDiscount = new Label('gameDiscount', locators.gameDiscount);
    gamePrice = new Label('gamePrice', locators.gamePrice);

    constructor() {
        super()
        this.name = "SteamGamePage"
        this.element = this.gamePage
    }

    async comparePrice(price) {
        gamePrice = await this.gamePrice.getElementByNumber(1).getText();
        const convertedGamePrice = parseFloat(gamePrice.replace('$', ''));
        const convertedPrice = parseFloat(price.replace('$', ''));
        return convertedGamePrice === convertedPrice;
    }

    async compareDiscount(discount) {
        gameDiscount = await this.gameDiscount.getElementByNumber(1).getText();
        const convertedGameDiscount = parseFloat(gameDiscount.replace('%', ''));
        const convertedDiscount = parseFloat(discount.replace('%', ''));
        return convertedGameDiscount === convertedDiscount;
    }

}

module.exports = new SteamGamePage();