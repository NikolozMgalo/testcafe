const BaseElement = require("./baseElement");

class Button extends BaseElement {
  constructor(name, locator) {
    super(name, locator);
  }
}

module.exports = Button;
