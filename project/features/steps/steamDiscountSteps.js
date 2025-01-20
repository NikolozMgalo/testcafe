const { Given, When, Then } = require('@cucumber/cucumber')
const SteamMainPage = require('../../forms/SteamMainPage.js');
const SteamActionPage = require('../../forms/SteamActionPage.js');
const SteamGamePage = require('../../forms/SteamGamePage.js');
const SteamVerifyAgePage = require('../../forms/SteamVerifyAgePage.js');
const { Selector } = require('testcafe');
const { assert } = require('chai');
// const { testController } = require('../support/testControllerHolder.js');
let gameInfo;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

When('Select Categories and Action', async () => {
    await SteamMainPage.clickOnCategories();
    await SteamMainPage.clickOnActionButton();
});


Then('Action categories page is opened', async () => {
    const status = await SteamActionPage.isFormOpened();
    await testController.expect(status).ok();
    // await assert(status).isTrue('nope')
});

Then('Top Seller tab should be visible', async () => {
    await sleep(5000)
    const status = await SteamActionPage.isFormOpened();
    await testController.expect(status).ok('', { timeout: 1000 });
})

When('Go to top sellers tab', async () => {
    await sleep(5000)
    await SteamActionPage.selectTopSellersTab();
});

When('select game with highest Discount', async () => {
    const highestDiscount = await SteamActionPage.getHighestDiscountAmount();
    gameInfo = await SteamActionPage.getSingleGameInfo(highestDiscount);
    await SteamActionPage.clickHighestDiscountGame(gameInfo[0]);
});

Then('Game page should be displayed', async () => {
    const agePage = await SteamVerifyAgePage.isFormOpened();
    if(agePage) {
        await SteamVerifyAgePage.chooseDropdown();
        await SteamVerifyAgePage.chooseYear();
        await SteamVerifyAgePage.clickViewPageButton();
    } else {
        const status = await SteamGamePage.isFormOpened();
        await testController.expect(status).ok();
} 
});

Then('Game price and discount should be correct', async () => {
    const price = await SteamGamePage.comparePrice(gameInfo[2]);
    await testController.expect(price).ok();
    const discount = await SteamGamePage.compareDiscount(gameInfo[1]);
    await testController.expect(discount).ok();
});

