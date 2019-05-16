/// <reference types="node" />
import TestDriver = require('./Driver');
import UnitTesting = require('../UnitTesting');
import Event = require('events');
export declare class Manager {
    driver: TestDriver.Driver;
    testContext: UnitTesting.TestContext;
    uid: string;
    emitter: Event.EventEmitter;
    constructor(uid: string, driver: TestDriver.Driver);
    createDriver(): TestDriver.Driver;
    dispose(): void;
}
