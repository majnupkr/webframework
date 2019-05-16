import Core = require('../core');
import Utils = require('../../utils');
import UnitTesting = require('../UnitTesting');
export declare abstract class Test {
    private _mgr;
    private _tags;
    private _name;
    private _logger;
    dataSet: Array<Object>;
    timeout: number;
    retries: number;
    driver: Core.Driver;
    testContext: UnitTesting.TestContext;
    /**
     * Initializes driver and testContext
     */
    constructor(mgr: Core.Manager);
    /**
     * Sets the test manager for this test
     */
    private setManager(mgr);
    /**
     * Returns the test manager for this test
     */
    getManager(): Core.Manager;
    /**
     * Set a name for the test
     */
    setName(name: string): void;
    /**
     * Gets the name of test
     */
    getName(): string;
    /**
     * Returns the title of the test
     */
    getTitle(): string;
    /**
     * Sets a tag for the test
     */
    addTag(tag: string): void;
    /**
     *
     */
    /**
    * Sets a tag for the test
    */
    addTags(...tag: string[]): void;
    /**
     * Set the data source for the test
     * @param source Type of data source. Currently supported types include MSExcel only
     * @param filepath Path to the file containing data
     * @param page Number/Name of the page containing data. This is required if file consists of multiple pages
     */
    setDataSource(source: UnitTesting.DataSource, filepath: string, page?: string): void;
    /**
     * Gets a logger instance for this test
     */
    getLogger(): Utils.Logger;
    /**
     * Starting procedure for this test
     */
    testStartup(): void;
    /**
     * Cleanup procedure for this test
     */
    testCleanup(): void;
    /**
     * Procedure to be tested
     */
    abstract test(): void;
}
