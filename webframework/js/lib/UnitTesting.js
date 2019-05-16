//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Unit Testing
//  Description : Provides Test context class and enum for data sources supported by framework
//  Author : tsengupta
//  Date : Nov 15, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const chai = require("chai");
/**
 * Used to store test information at runtime
 */
class TestContext {
}
exports.TestContext = TestContext;
/**
 * Supported data source types for input data
 */
var DataSource;
(function (DataSource) {
    DataSource[DataSource["Excel"] = 0] = "Excel";
})(DataSource = exports.DataSource || (exports.DataSource = {}));
// Summary: Wrapper over assert library 
// created: Nov 1, 2016
// Author: tsengupt
// 
/**
 * Verifies conditions in unit tests using true/false propositions.
 */
// (<any>chai).assert.areEqual = chai.assert.equal;
// (<any>chai).assert.areNotEqual = chai.assert.equal;
// (<any>chai).assert.areDeepEqual = chai.assert.deepEqual;
// export const Assert = chai.assert
class Assert {
    static isFalse(value, message) {
        chai.assert.isFalse(value, message);
    }
    static isNull(value, message) {
        chai.assert.isNull(value, message);
    }
    static isNotNull(value, message) {
        chai.assert.isNotNull(value, message);
    }
    static fail(message) {
        chai.assert.fail(null, null, message);
    }
    static isNaN(value, message) {
        chai.assert.isNaN(value, message);
    }
    static isNotNaN(value, message) {
        chai.assert.isNotNaN(value, message);
    }
}
Assert.areEqual = chai.assert.equal;
Assert.areNotEqual = chai.assert.notEqual;
Assert.areDeepEqual = chai.assert.deepEqual;
Assert.notDeepEqual = chai.assert.notDeepEqual;
Assert.isTrue = chai.assert.isTrue;
exports.Assert = Assert;
