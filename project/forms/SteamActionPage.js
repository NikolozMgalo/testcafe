const BaseForm = require("../../framework/baseForm.js");
const Button = require("../../framework/button.js");
const Label = require("../../framework/label.js");
const locators = require("../locators/actionPage.json");

class SteamActionPage extends BaseForm {
  actionPageLogo = new Label("actionPageLogo", locators.actionPageLogo);
  topSellerButton = new Button("topSellerButton", locators.topSellerButton);
  topSellerSection = new Label("topSellerSection", locators.topSellerSection);
  topSellersWithDiscount = new Label(
    "topSellersWithDiscount",
    locators.topSellersWithDiscount
  );
  singleGameInSection = new Label(
    "SingleGameInSection",
    locators.singleGameInSection
  );
  gameNamesInsideTopSellerSection = new Button(
    "gameNamesInsideTopSellerSection",
    locators.gameNamesInsideTopSellerSection
  );

  constructor() {
    super();
    this.name = "SteamActionPage";
    this.element = this.actionPageLogo;
  }

  async selectTopSellersTab() {
    await this.topSellerSection.moveMouseToElement();
    await this.topSellerButton.click();
  }

  async getSingleGameInfo(discount) {
    let game;
    const numberOfGames = await this.singleGameInSection.getCount();
    for (let i = 1; i <= numberOfGames; i++) {
      let elements = await this.singleGameInSection
        .getElementByNumber(i)
        .getText();
      let newArr = elements.split("\n");
      if (newArr[6] === discount) {
        game = [newArr[0], newArr[6], newArr[8]];
        break;
      }
    }
    return game;
  }

  async getHighestDiscountAmount() {
    let highestDiscount = Infinity;
    const numberOfDiscountedGames = await this.topSellersWithDiscount.getCount();
    for (let i = 1; i <= numberOfDiscountedGames; i++) {
      let element = this.topSellersWithDiscount.getElementByNumber(i);
      let text = await element.getText();
      let discountValue = parseFloat(text.replace("%", "").trim());
      if (discountValue < highestDiscount) {
        highestDiscount = discountValue;
      }
    }
    highestDiscount += "%";
    return highestDiscount;
  }

  async clickHighestDiscountGame(text) {
    await this.gameNamesInsideTopSellerSection.clickWithName(text);
  }
}

module.exports = new SteamActionPage();
