import Common = require('./common');
import Core = require('./core');
export declare class Executor {
    private static uid;
    private static logger;
    private static reporter;
    private static emitter;
    private static getUid();
    private static init(Reporter?);
    private static defaultCatch(err, caseOrSuite);
    /**
    * Brings all the defined hooks into current 'describe' context
    */
    private static getHooks(testsuite);
    private static callTest(testcase, scope);
    /**
     * Builds a executable test
     */
    private static executeTest(testcase);
    /**
     * Makes a test suite executable
     */
    // static execute(suite: new (mgr: Core.Manager) => Common.TestSuite, driver: Core.Driver): void;
    static execute(suite: (new (mgr: Core.Manager) => Common.TestSuite) [], driver: Core.Driver): void;
    /**
     * Marks end of execution
     */
    private static done();
}
