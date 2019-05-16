//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Manager
//  Description : Provides necessary objects and methods for tests execution
//  Author : tsengupta
//  Date : Nov 2, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const TestDriver = require("./Driver");
const UnitTesting = require("../UnitTesting");
const Event = require("events");
class Manager {
    constructor(uid, driver) {
        this.driver = driver;
        this.testContext = new UnitTesting.TestContext();
        this.uid = uid;
        this.emitter = new Event.EventEmitter();
    }
    createDriver() {
        this.driver = new TestDriver.Driver();
        // this.emitter.emit('driver created');
        return this.driver;
    }
    dispose() {
        if (this.driver)
            this.driver.dispose();
        this.testContext = undefined;
    }
}
exports.Manager = Manager;
