const BaseForm = require("../../framework/baseForm.js");
const Label = require("../../framework/label.js");
const locators = require("../locators/gamePage.json");

let gamePrice;
let gameDiscount;

class SteamGamePage extends BaseForm {
  gamePage = new Label("gamePage", locators.gamePage);
  gameDiscount = new Label("gameDiscount", locators.gameDiscount);
  gamePrice = new Label("gamePrice", locators.gamePrice);

  constructor() {
    super();
    this.name = "SteamGamePage";
    this.element = this.gamePage;
  }

  async getGamePrice() {
    gamePrice = await this.gamePrice.getElementByNumber(1).getText();
    const convertedGamePrice = parseFloat(gamePrice.replace("$", ""));
    return convertedGamePrice;
  }

  async getGameDiscount() {
    gameDiscount = await this.gameDiscount.getElementByNumber(1).getText();
    const convertedGameDiscount = parseFloat(gameDiscount.replace("%", ""));
    return convertedGameDiscount;
  }
}

module.exports = new SteamGamePage();
