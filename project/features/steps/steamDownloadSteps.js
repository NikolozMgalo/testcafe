const { Given, When, Then } = require('@cucumber/cucumber')
const SteamMainPage = require('../../forms/SteamMainPage.js');
const SteamAboutPage = require('../../forms/SteamAboutPage.js');
const path = require('path');
const os = require('os');
//const { testController } = require('../support/testControllerHolder.js');

const fileName = 'SteamSetup.exe';
const downloadedFilePath = path.join(os.homedir(), 'Downloads', fileName);


Given('Steam page is open', async () => {
    await testController.navigateTo('https://store.steampowered.com/');
    const status = await SteamMainPage.isFormOpened();
    await testController.expect(status).ok();
});

When('Click on install Steam', async () => {
    await SteamMainPage.clickInstallSteam();
});

When('When click on download steam installer', async () => {
    await SteamAboutPage.downloadSteam();
});

Then('Steam should be downloaded', async () => {
    const status = await SteamAboutPage.isFileExist(downloadedFilePath);
    await testController.expect(status).ok('file was not downloaded');
});