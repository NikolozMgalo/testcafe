const BaseElement = require("./baseElement");

class Label extends BaseElement {
  constructor(name, locator) {
    super(name, locator);
  }
}

module.exports = Label;
