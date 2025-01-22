const BaseForm = require("../../framework/baseForm.js");
const Button = require("../../framework/button.js");
const Label = require("../../framework/label.js");
const locators = require("../locators/aboutPage.json");
const fs = require("fs-extra");
const Logger = require("../../framework/utils/logger.js");
const path = require("path");
const os = require('os')

class SteamAboutPage extends BaseForm {
  downloadButton = new Button("downloadSteamButton", locators.downloadSteam);
  aboutText = new Label("aboutText", locators.aboutPage);

  constructor() {
    super();
    this.name = "SteamAboutPage";
    this.element = this.aboutText;
  }

  async downloadSteam() {
    await this.downloadButton.click();
  }

  async waitForFileDownload(path) {
    for (let i = 0; i < 10; i++) {
      if (fs.existsSync(path)) return true;
      await testController.wait(500);
    }
    return fs.existsSync(path);
  }

  async getFileDownloadPath(fileName) {
    return path.join(os.homedir(), "Downloads", fileName);
  }
}

module.exports = new SteamAboutPage();
