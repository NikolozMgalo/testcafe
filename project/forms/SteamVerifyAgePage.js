const BaseForm = require("../../framework/baseForm.js");
const Button = require("../../framework/button.js");
const Label = require("../../framework/label.js");
const Dropdown = require("../../framework/dropdown.js");
const locators = require("../locators/ageVerification.json");

class SteamVerifyAgePage extends BaseForm {
  verifyPage = new Label("verifyAgePage", locators.verificationPage);
  ageYear = new Dropdown("ageYeahDropdown", locators.ageYear);
  viewPageButton = new Button("viewPageButton", locators.viewPageButton);
  rightYear = new Label("year", locators.rightYear);

  constructor() {
    super();
    this.name = "SteamVerifyAgePage";
    this.element = this.verifyPage;
  }

  async chooseDropdown() {
    await this.ageYear.click();
  }

  async clickViewPageButton() {
    await this.viewPageButton.click();
  }

  async chooseYear() {
    await this.rightYear.click();
  }
}

module.exports = new SteamVerifyAgePage();
