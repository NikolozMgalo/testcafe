const { Selector } = require("testcafe");
const { ClientFunction } = require("testcafe");
const Logger = require("./utils/logger");

class BaseElement {
  constructor(name, locator) {
    this.name = name;
    this.locator = locator;
  }

  findElement() {
    Logger.info(`Find element "${this.name}"`);
    return Selector(this.locator).with({ boundTestRun: testController });
  }

  async clickWithName(text = "") {
    Logger.info(`Finding element with name "${this.name}" and clicking on it`);
    const element = this.findElement().withExactText(text);
    await testController.click(element);
  }

  async click(name = "") {
    Logger.info(`Click element "${this.name}"`);
    const element = this.findElement().withText(name);
    await testController.click(element);
  }

  async getCount() {
    const element = this.findElement();
    return await element.count;
  }

  async getText() {
    const element = this.findElement();
    return await element.innerText;
  }

  getElementByNumber(number) {
    const element = this.findElement();
    return new BaseElement(this.name, element.nth(number - 1));
  }

  async moveMouseToElement(name = "") {
    const element = this.findElement().withText(name);
    await testController.hover(element);
  }

  async waitForElementExist() {
    const element = this.findElement().with({ timeout: 5000 });
    return await element.exists;
  }
}

module.exports = BaseElement;
