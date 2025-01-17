const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('./testControllerHolder');
const {AfterAll, setDefaultTimeout, Before, After} = require('@cucumber/cucumber');
const path = require('path');
const downloadDir = path.resolve(__dirname, 'temp');


const timeout = 100000;

let cafeRunner = null;

function createTestFile() {
    fs.writeFileSync('cucumbertest.js',
        'import testControllerHolder from "./project/features/support/testControllerHolder.js";\n\n' +
        'fixture("cucumberfixture")\n' +
        'test\n' +
        '("test", testControllerHolder.capture)')
}
function runTest(browser) {
    createTestCafe('localhost', 1337, 1338)
        .then(function(tc) {
            cafeRunner = tc;
            const runner = tc.createRunner();
            return runner
                .src('./cucumbertest.js')
                .screenshots('reports/screenshots/', true)
                .browsers(`${browser}`)
                .run();
        }).then(function(report) {
        });
}
setDefaultTimeout(timeout);

Before(function() {
    fs.rmdirSync('reports/screenshots', { recursive: true });
    runTest('chrome');
    createTestFile();
    return this.waitForTestController.then(function(testController) {
        return testController.maximizeWindow();
    });
});

/*
Before(function () {
    //fs.mkdirSync('temp', { recursive: true});
    runTest("chrome");
    createTestFile();

    return this.waitForTestController.then(function (testController) {
        return testController.maximizeWindow();
  });
});
*/
After(function() {
    fs.unlinkSync('cucumbertest.js');
    testControllerHolder.free();
});

AfterAll(function() {
    let intervalId = null;
    function waitForTestCafe() {
        intervalId = setInterval(checkLastResponse, 500);
    }
    function checkLastResponse() {
        if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
            cafeRunner.close();
            process.exit();
        }
    }
    waitForTestCafe();
});