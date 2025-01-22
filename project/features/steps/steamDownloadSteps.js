const { Given, When, Then } = require("@cucumber/cucumber");
const SteamMainPage = require("../../forms/SteamMainPage.js");
const SteamAboutPage = require("../../forms/SteamAboutPage.js");
const fileName = "SteamSetup.exe";

Given("Steam page is open", async () => {
  await testController.navigateTo("https://store.steampowered.com/");
  const status = await SteamMainPage.isFormOpened();
  await testController.expect(status).ok();
});

When("Click on install Steam", async () => {
  await SteamMainPage.clickInstallSteam();
});

When("When click on download steam installer", async () => {
  await SteamAboutPage.downloadSteam();
});

Then("Steam should be downloaded", async () => {
  const downloadPath = await SteamAboutPage.getFileDownloadPath(fileName);
  const status = await SteamAboutPage.waitForFileDownload(downloadPath);
  await testController.expect(status).ok("file was not downloaded");
});
