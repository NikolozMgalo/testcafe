const { Selector } = require("testcafe");
const BaseElement = require("./baseElement");
const Logger = require('./utils/logger');

class Input extends BaseElement{

    constructor(name, locator){
        super(name, locator)
    }

    async typeText(text){
        Logger.info(`Type text into element "${this.name}"`);
        const element = this.findElement();
        await testController.typeText(element, text);
    }

    getValue(){
        Logger.info(`Get value from input element "${this.name}"`);
        const element = this.findElement();
        return Selector(element).value;
    }
}

module.exports = Input;