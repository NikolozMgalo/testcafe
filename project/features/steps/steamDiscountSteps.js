const { Given, When, Then } = require('@cucumber/cucumber')
const SteamMainPage = require('../../forms/SteamMainPage.js');
const SteamActionPage = require('../../forms/SteamActionPage.js');
const { assert } = require('chai');
const { Selector } = require('testcafe');
// const { testController } = require('../support/testControllerHolder.js');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
When('Select Categories and Action', async () => {
    await SteamMainPage.clickOnCategories();
    await SteamMainPage.clickOnActionButton();
});


Then('Action categories page is opened', async () => {
    const status = await SteamActionPage.isFormOpened();
    await testController.expect(status).ok('page not loaded');
    assert.isTrue(await SteamActionPage.isFormOpened(), 'still not open')
});

When('Go to top sellers tab', async () => {
    await sleep(10000)
    await SteamActionPage.selectTopSellersTab();
});

When('select game with highest Discount', async () => {
    const highestDiscount = await SteamActionPage.getHighestDiscountAmount();
    console.log('highestDisocunt :', highestDiscount)
    const gameInfo = await SteamActionPage.getSingleGameInfo(highestDiscount);
    console.log('gameInfo :', gameInfo)
    await SteamActionPage.clickHighestDiscountGame(gameInfo[0])


});

Then('Game page should be displayed', async () => {
    const status = await SteamMainPage.isFormOpened();
    await testController.expect(status).ok();
    await sleep(10000)
})