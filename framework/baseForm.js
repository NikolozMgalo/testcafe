// const { Selector } = require('testcafe');
const Logger = require('./utils/logger');


class BaseForm{

    constructor(name, element){
        this.name = name;
        this.element = element;
    }

    async isFormOpened(){
        Logger.info(`Page "${this.name}" is opened`);
        const element = await this.element.findElement();
        return await element.exists;
    }
}

module.exports = BaseForm;
