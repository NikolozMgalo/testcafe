const BaseForm = require('../../framework/baseForm.js');
const Button = require('../../framework/button.js');
const Label = require('../../framework/label.js');
const locators = require('../locators/aboutPage.json');
const fs = require('fs-extra');
const Logger = require('../../framework/utils/logger.js');
const path = require('path');


class SteamAboutPage extends BaseForm {
  downloadButton = new Button("downloadSteamButton", locators.downloadSteam);
  aboutText = new Label("aboutText", locators.aboutPage);

  constructor() {
    super();
    this.name = "SteamAboutPage";
    this.element = this.aboutText;
  };

  async downloadSteam() {
    await this.downloadButton.click();
  };

  
  async isFileExist(filePath, timeout = 5000) {
    const pathObj = path.parse(path.resolve(filePath));
    const file = path.join(pathObj.dir, pathObj.base);

    Logger.info(`Check that file "${file}" exist`);
    try {
        await this.#waitForFileExists(file, timeout = 5000);
    } catch (err) {
        Logger.info(err);
    }
    if (fs.existsSync(file)) {
        const data = fs.readFileSync(file);
        Logger.info(`File "${file}" already exists`)
        return true;
    } else {
        return false;
    }
}

#waitForFileExists(filePath, timeout = 5000) {
    return new Promise(function (resolve, reject) {
        const checkFile = function () {
            fs.stat(filePath, function (err, stats) {
                if (!err && stats.size > 0) {
                    let fileContent;
                    try {
                        fileContent = fs.readFileSync(filePath, 'utf8');
                    } catch {
                    }
                    if (fileContent?.length > 0) {
                        clearTimeout(timer);
                        watcher.close();
                        resolve();
                    }
                }
            });
        };

        const dir = path.dirname(filePath);
        const watcher = fs.watch(dir, { persistent: false }, function () {
            checkFile();
        });

        checkFile();

        const timer = setTimeout(function () {
            watcher.close();
            reject(new Error(`File "${filePath}" did not exists and was not created during the timeout(${timeout}ms)`));
        }, timeout);
    });
}
};

module.exports = new SteamAboutPage();