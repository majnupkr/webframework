import BrowserModule = require('./Browser');
import ActionModule = require('./Actions');
import WindowModule = require('../common/Window');
export declare class Driver {
    private driver;
    private browser;
    private actions;
    private windows;
    constructor(browser?: string);
    /**
     * Gets current instance of browser
     */
    getBrowser(): BrowserModule.Browser;
    /**
     * Gets object to perform actions
     */
    getActions(): ActionModule.Actions;
    /**
     * Retrieves the current list of available window handles.
     * @param {function} callback The function with the parameter which would hold the list of windows
     */
    getAllWindows(callback: (allWindows: Array<WindowModule.Window>) => void): void;
    /**
     * Retrieves they current window handle.
     * @param {Window} window The window object to be initialized with current window instance
     */
    getCurrentWindow(window: WindowModule.Window): void;
    /**
     * Switches the focus of all future commands to the given window.
     * @param {Window} window The target window to switch focus to
     */
    switchToWindow(window: WindowModule.Window): void;
    /**
     * Schedules a command to make the driver sleep for the given amount of time.
     * @param {number} ms time in milli seconds
     */
    sleep(ms: number): void;
    /**
     * Disposes the test driver
     */
    dispose(): void;
    /**
     * Set default timeout for wait conditions
     */
    setDefaultWaitTimeout(ms: number): void;
    /**
     * Set default timeout for page load
     */
    setPageLoadTimeout(ms: number): void;
    /**
     * Set default timeout for javascript execution
     */
    setScriptExecutionTimeout(ms: number): void;
    /**
     * Helper function
     */
    private promisedExecution(fn, scope?, args?, callback?, errorback?, finalblock?);
    /**
     * Schedules a command to execute a custom function.
     *
     * eg 1: Given below is a typical asynchronous code
     *       This code will perform the log before the actions are done.
     *
     *       test() {
     *          //perform actions
     *          console.log('actions done')
     *       }
     *
     * To synchronize, change the above code to following
     *
     *       test() {
     *          //perform actions
     *          this.driver.callSync(function(){
     *              console.log('actions done')
     *          })
     *       }
     *          OR
     *       test() {
     *          //perform actions
     *          this.driver.callSync(console.log, ['actions done'])
     *       }
     *
     * eg 2. The below code will try to execute stringify function in sync
     *     with rest of the code in test function. Once the parameter is
     *     stringified it should be logged.
     *
     *      stringify(n: number){
     *          return n.toString()
     *      }
     *      logToConsole(msg: string){
     *          console.log(msg)
     *      }
     *      test(){
     *          this.driver.callSync(stringify, [22], null, logToConsole)
     *      }
     * Executing test will print '22' to the console
     * @param {function} fn The function to execute.
     * @param {array<any>} args Array of arguments to pass to the function.
     * @param {object} scope The object in whose scope to execute the function.
     * @param {function} callback A callback whose argument is the returned element of fn if any
     */
    callSync(fn: (...args: any[]) => any, args?: any[], scope?: any, callback?: (value: any) => void): void;
    /**
     * API for error handling
     * The call to this API wil be in sync with the current block
     * @param {function} fnTry function to try
     * @param {function} fnCatch function equivalent to catch block
     * @param {function} fnFinally function equivalent to finally block
     * @param {object} scope The object in whose scope to execute the function.
     * By default the try and catch functions execute in same scope.
     */
    handleErrorSync(fnTry: () => void, fnCatch: (err: Error) => void, fnFinally?: () => void, scope?: any): void;
}
