import UnitTesting = require('../UnitTesting');
import Core = require('../core');
import TestModule = require('./Test');
import Utils = require('../../utils');
export declare class TestSuite {
    private _mgr;
    private _name;
    private _logger;
    driver: Core.Driver;
    testContext: UnitTesting.TestContext;
    testSet: Array<new (mgr: Core.Manager) => TestModule.Test>;
    timeout: number;
    constructor(mgr: Core.Manager);
    private setManager(mgr);
    /**
     * Returns the test manager for this test
     */
    getManager(): Core.Manager;
    setName(name: string): void;
    getName(): string;
    getLogger(): Utils.Logger;
    /**
     * adds a test to the list
     */
    addTest(Test: new (mgr: Core.Manager) => TestModule.Test): this;
    /**
     * Executes before each suite
     */
    setup(): void;
    /**
     * Executes after each suite
     */
    teardown(): void;
    /**
     * Executes before each test
     */
    beforeTest(): void;
    /**
     * Executes after each test
     */
    afterTest(): void;
}
