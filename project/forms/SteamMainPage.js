//import BaseForm from '../../framework/baseForm.js';
//import Button from '../../framework/button.js';
//import Label from '../../framework/label.js';
//import locators from '../locators/mainPage.json' with { type: 'json'}
const BaseForm = require('../../framework/baseForm.js');
const Button = require('../../framework/button.js');
const Label = require('../../framework/label.js');
const locators = require('../locators/mainPage.json');


class SteamMainPage extends BaseForm {

    logoIcon = new Label('logo', locators.logoIcon);
    installSteamButton = new Button('installButton', locators.installSteam);
    categoriesButton = new Button('categoriesButton', locators.categoriesButton);
    actionButton = new Button('actionButton', locators.actionButton);

    constructor() {
        super()
        this.name = 'SteamMainPage'
        this.element = this.logoIcon
    }

    async clickInstallSteam() {
        await this.installSteamButton.click();
    }

    async clickOnCategories() {
        await this.categoriesButton.click();
    }

    async clickOnActionButton() {
        await this.actionButton.click();
    }

};

//export default new SteamMainPage();
module.exports = new SteamMainPage();