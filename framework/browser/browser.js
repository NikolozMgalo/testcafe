const { ClientFunction } = require('testcafe');
const Logger = require('../utils/logger');

class Browser{

    static async getCurrentUrl(){
        Logger.info('Get current url');
        const currentUrl = ClientFunction(() => window.location.href).with({ boundTestRun: testController });
       return await currentUrl();
    }

    static async back(){
        Logger.info('Back to the previous page');
        const goBack = ClientFunction(() => window.history.back()).with({ boundTestRun: testController });
        return await goBack();
    }
}

module.exports = Browser;