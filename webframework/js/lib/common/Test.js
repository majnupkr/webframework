//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Test
//  Description : Abstract class representing a single test
//  Author : tsengupta
//  Date : Nov 2, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const Utils = require("../../utils");
const UnitTesting = require("../UnitTesting");
const Settings = require("../metadata/Settings");
class Test {
    /**
     * Initializes driver and testContext
     */
    constructor(mgr) {
        let regEx = /(\w+)@|at new (\w+) \(.:\\(\w+)\\js/g;
        let regexResult = regEx.exec(new Error().stack);
        let callerName = regexResult[1] || regexResult[2];
        this._name = callerName;
        this.timeout = Settings.getTimeout() || 0; //Disable timeout by default
        this.retries = Settings.getRetryCount() || 0;
        this._tags = new Array();
        this.dataSet = new Array();
        this.setManager(mgr);
    }
    /**
     * Sets the test manager for this test
     */
    setManager(mgr) {
        this._mgr = mgr;
        this.testContext = mgr.testContext;
        this.driver = mgr.driver;
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
    /**
     * Set a name for the test
     */
    setName(name) {
        this._name = name;
    }
    /**
     * Gets the name of test
     */
    getName() {
        return this._name;
    }
    /**
     * Returns the title of the test
     */
    getTitle() {
        let title = this._name;
        this._tags.forEach((tag) => {
            title = title + ' #' + tag;
        });
        return title;
    }
    /**
     * Sets a tag for the test
     */
    addTag(tag) {
        this._tags.push(tag);
    }
    /**
     *
     */
    /**
    * Sets a tag for the test
    */
    addTags(...tag) {
        this._tags.push(...tag);
    }
    /**
     * Set the data source for the test
     * @param source Type of data source. Currently supported types include MSExcel only
     * @param filepath Path to the file containing data
     * @param page Number/Name of the page containing data. This is required if file consists of multiple pages
     */
    setDataSource(source, filepath, page) {
        if (source == UnitTesting.DataSource.Excel)
            this.dataSet = Utils.ExcelReader.readExcelSheet(filepath, page);
    }
    /**
     * Gets a logger instance for this test
     */
    getLogger() {
        if (!this._logger) {
            let loggerName = this.testContext.suiteName + '-' + (this.testContext.testName || this._name);
            this._logger = new Utils.Logger(loggerName, this._mgr.uid);
        }
        return this._logger;
    }
    /**
     * Starting procedure for this test
     */
    testStartup() { }
    /**
     * Cleanup procedure for this test
     */
    testCleanup() { }
}
exports.Test = Test;
