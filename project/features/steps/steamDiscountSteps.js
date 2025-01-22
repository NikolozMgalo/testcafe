const { When, Then } = require("@cucumber/cucumber");
const SteamMainPage = require("../../forms/SteamMainPage.js");
const SteamActionPage = require("../../forms/SteamActionPage.js");
const SteamGamePage = require("../../forms/SteamGamePage.js");
const SteamVerifyAgePage = require("../../forms/SteamVerifyAgePage.js");

let gameInfo;

When("Select Categories and Action", async () => {
  await SteamMainPage.clickOnCategories();
  await SteamMainPage.clickOnActionButton();
});

Then("Action categories page is opened", async () => {
  const status = await SteamActionPage.isFormOpened();
  await testController.expect(status).ok();
});

Then("Top Seller tab should be visible", async () => {
  const status = await SteamActionPage.isFormOpened();
  await testController.expect(status).ok("", { timeout: 1000 });
});

When("Go to top sellers tab", async () => {
  await SteamActionPage.selectTopSellersTab();
});

When("select game with highest Discount", async () => {
  await testController.wait(10000)
  const highestDiscount = await SteamActionPage.getHighestDiscountAmount();
  gameInfo = await SteamActionPage.getSingleGameInfo(highestDiscount);
  await SteamActionPage.clickHighestDiscountGame(gameInfo[0]);
});

Then("Game page should be displayed", async () => {
  const agePage = await SteamVerifyAgePage.isFormOpened();
  if (agePage) {
    await SteamVerifyAgePage.chooseDropdown();
    await SteamVerifyAgePage.chooseYear();
    await SteamVerifyAgePage.clickViewPageButton();
  } else {
    const status = await SteamGamePage.isFormOpened();
    await testController.expect(status).ok();
  }
});

Then("Game price and discount should be correct", async () => {
  console.log(gameInfo)
  const expectedPrice = parseFloat(gameInfo[2].replace("$", ""));
  const price = await SteamGamePage.getGamePrice();
  await testController.expect(price).eql(expectedPrice);
  const expectedDiscount = parseFloat(gameInfo[1].replace("%", ""))
  const discount = await SteamGamePage.getGameDiscount();
  await testController.expect(discount).eql(expectedDiscount);
})
