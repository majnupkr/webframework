//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Executor
//  Description : Executes tests/test suites under mocha
//  Author : tsengupta
//  Date : Nov 15, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const events = require("events");
const log4js = require("log4js");
const mkdirp = require("mkdirp");
const path = require("path");
const Core = require("./core");
const Utils = require("../utils");
const Settings = require("./metadata/Settings");
const uuidModule = require('shortid');
var mocha;
let driverInstance;
class Executor {
    static getUid() {
        return Executor.uid;
    }
    static init(Reporter) {
        Executor.uid = uuidModule.generate();
        Executor.emitter = new events.EventEmitter();
        Executor.reporter = Reporter && new Reporter(Executor.emitter);
        Executor.logger = log4js.getLogger(Executor.uid);
        let logpath = path.join(Settings.getLogPath(), Executor.uid);
        mkdirp.sync(logpath);
        log4js.addAppender(log4js.appenders.file(path.join(logpath, Executor.uid + '.log')), Executor.uid);
        Utils.Logger.logEmitter.on('log', (event) => {
            Executor.logger[event.level.levelStr.toLowerCase()].
                call(Executor.logger, '[' + event.categoryName + '] - ', event.data);
            Executor.emitter.emit('log', event);
        });
        Executor.emitter.emit('initialized', Executor.uid);
    }
    static defaultCatch(err, caseOrSuite) {
        caseOrSuite.getLogger().error(err.name + ': ' + err.message, { eventType: 'error', eventTitle: 'Uncaught error', state: 'failed', error: err });
        caseOrSuite.driver.callSync(function () {
            throw err;
        });
    }
    /**
    * Brings all the defined hooks into current 'describe' context
    */
    static getHooks(testsuite) {
        let mgr = testsuite.getManager();
        let testContext = mgr.testContext;
        let driver = mgr.driver;
        let logger = testsuite.getLogger();
        mocha.before(function () {
            driver.handleErrorSync(() => {
                Executor.emitter.emit('start setup', testContext);
                logger.info('Execution ID: ' + Executor.uid);
                testsuite.setup();
            }, (err) => {
                Executor.defaultCatch(err, testsuite);
            }, () => {
                Executor.emitter.emit('end setup', testContext);
            });
        });
        mocha.beforeEach(function () {
            driver.handleErrorSync(() => {
                Executor.emitter.emit('start beforeTest', testContext);
                testContext._hookfailed = false;
                let tagindex = this.currentTest.title.indexOf('#');
                if (tagindex != -1)
                    testContext.testName = this.currentTest.title.substring(0, tagindex - 1);
                else
                    testContext.testName = this.currentTest.title;
                testContext.file = this.currentTest.file;
                logger.info('Starting Test: ' + testContext.testName);
                testsuite.beforeTest();
            }, (err) => {
                testsuite.getLogger().error(err.name + ': ' + err.message, { eventType: 'error', eventTitle: 'Uncaught error', state: 'failed', error: err });
                testContext._hookfailed = true;
            }, () => {
                Executor.emitter.emit('end beforeTest', testContext);
            });
        });
        mocha.afterEach(function () {
            if (testContext._hookfailed) {
                return;
            }
            if (!this.currentTest.state) {
                Executor.emitter.emit('retrying', testContext);
                logger.warn('Retrying failed test');
                return;
            }
            driver.handleErrorSync(() => {
                Executor.emitter.emit('start afterTest', testContext);
                testContext.testResult = this.currentTest.state.toLowerCase();
                testContext.hasTimedOut = this.currentTest.timedOut;
                testContext.duration = this.currentTest.duration;
                testsuite.afterTest();
                logger.info('End of Test: ' + testContext.testName);
                logger.info('Test Result: ' + testContext.testResult);
                logger.info('Test Duration: ' + testContext.duration + "ms");
            }, (err) => {
                testsuite.getLogger().error(err.name + ': ' + err.message, { eventType: 'error', eventTitle: 'Uncaught error', state: 'failed', error: err });
                testContext._hookfailed = true;
            }, () => {
                Executor.emitter.emit('end afterTest', testContext);
            });
        });
        mocha.after(function () {
            driver.handleErrorSync(() => {
                Executor.emitter.emit('start teardown', testContext);
                testsuite.teardown();
                logger.info('End of Suite');
            }, (err) => {
                Executor.defaultCatch(err, testsuite);
            }, () => {
                Executor.emitter.emit('end teardown', testContext, driver);
            });
        });
    }
    static callTest(testcase, scope) {
        if (testcase.testContext._hookfailed) {
            Executor.emitter.emit('skip test', testcase.getManager().testContext);
            return;
        }
        let logger = testcase.getLogger();
        let driver = testcase.driver;
        let testContext = testcase.getManager().testContext;
        if (testcase.retries)
            scope.retries(testcase.retries);
        if (testcase.timeout)
            scope.timeout(testcase.timeout);
        driver.handleErrorSync(() => {
            Executor.emitter.emit('start test', testContext);
            testcase.testStartup();
        }, (err) => {
            Executor.defaultCatch(err, testcase);
        });
        driver.handleErrorSync(() => {
            testcase.test();
        }, (err) => {
            Executor.defaultCatch(err, testcase);
        }, () => {
            driver.handleErrorSync(() => {
                testcase.testCleanup();
            }, (err) => {
                Executor.defaultCatch(err, testcase);
            }, () => {
                Executor.emitter.emit('end test', testContext);
            });
        });
    }
    /**
     * Builds a executable test
     */
    static executeTest(testcase) {
        if (testcase.dataSet.length > 0) {
            testcase.dataSet.forEach(function (data, i) {
                mocha.it(testcase.getTitle(), function () {
                    testcase.testContext.data = data;
                    console.log(`Data: ${data}`);
                    Executor.callTest(testcase, this);
                });
            });
        }
        else {
            mocha.it(testcase.getTitle(), function () {
                Executor.callTest(testcase, this);
            });
        }
    }
    /**
     * Makes a test suite executable
     */
    static execute(suite, driver) {
        let mgr = new Core.Manager(Executor.uid, driver);
        driverInstance = driver;
        let target = new suite(mgr);
        mocha = mocha || require('selenium-webdriver/testing');
        mgr.testContext.suiteName = target.getName();
        mocha.describe(target.getName(), function () {
            this.timeout(target.timeout);
            Executor.getHooks(target);
            target.testSet.forEach(function (Test) {
                Executor.executeTest(new Test(mgr));
            });
        });
    }
    /**
     * Marks end of execution
     */
    static done() {
        driverInstance.dispose();
        Executor.emitter.emit('terminate');
    }
}
exports.Executor = Executor;
