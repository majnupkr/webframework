//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : TestSuite
//  Description : Abstract class representing a single test suite
//  Author : tsengupta
//  Date : Nov 2, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const Utils = require("../../utils");
class TestSuite {
    constructor(mgr) {
        let regEx = /(\w+)@|at new (\w+) \(.:\\(\w+)\\js/g;
        let regexResult = regEx.exec(new Error().stack);
        let callerName = regexResult[1] || regexResult[2];
        this._name = callerName;
        this.testSet = new Array();
        this.timeout = 0;
        this.setManager(mgr);
    }
    setManager(mgr) {
        this._mgr = mgr;
        this.driver = mgr.driver;
        this.testContext = mgr.testContext;
        // mgr.emitter.on('driver created', () => {
        //     this.driver = mgr.driver;
        // });
    }
    /**
     * Returns the test manager for this test
     */
    getManager() {
        return this._mgr;
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    getLogger() {
        if (!this._logger)
            this._logger = new Utils.Logger(this._name, this._mgr.uid);
        return this._logger;
    }
    /**
     * adds a test to the list
     */
    addTest(Test) {
        this.testSet.push(Test);
        return this;
    }
    /**
     * Executes before each suite
     */
    setup() { }
    /**
     * Executes after each suite
     */
    teardown() { }
    /**
     * Executes before each test
     */
    beforeTest() { }
    /**
     * Executes after each test
     */
    afterTest() { }
}
exports.TestSuite = TestSuite;
