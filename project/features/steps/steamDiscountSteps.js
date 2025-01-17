const { Given, When, Then } = require('@cucumber/cucumber')
const SteamMainPage = require('../../forms/SteamMainPage.js');
const SteamActionPage = require('../../forms/SteamActionPage.js');
const { assert } = require('chai');

When('Select Categories and Action', async () => {
    await SteamMainPage.clickOnCategories();
    await SteamMainPage.clickOnActionButton();
    
});


Then('Action categories page is opened', async () => {
    //const status = await SteamActionPage.isActionPageLoaded();
    //await testController.expect(status).ok('page not loaded');
    assert.isTrue(await SteamActionPage.isFormOpened(), 'still not open')
});

When('Go to top sellers tab', async () => {
    //const status = await SteamActionPage.isTopSellerTabDisplayed();
    //await testController.expect(status).ok();
    await SteamActionPage.moveMouseToTopSeller()
    await SteamActionPage.selectTopSellersTab();
});