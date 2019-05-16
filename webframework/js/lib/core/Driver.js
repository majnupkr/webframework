//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Driver
//  Description : Class representing a driver to automate web actions  
//  Author : tsengupta
//  Date : Nov 2, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const webdriver = require("selenium-webdriver");
const Settings = require("../metadata/Settings");
const BrowserModule = require("./Browser");
const ActionModule = require("./Actions");
const WindowModule = require("../common/Window");
class Driver {
    constructor(browser = Settings.getBrowser().toLowerCase()) {
        // create webdriver
        switch (browser) {
            case "chrome":
                this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
                break;
            case "firefox":
                this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
                break;
			case "edge":
			    this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();
				break;
            case "ie":
                this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.ie()).build();
                break;
            case "electron":
                let server = Settings.getElectronServer();
                let capabilities = Settings.getElectronCapabilities();
                if (!capabilities)
                    throw new Error('Electron driver capabilities not specified');
                this.driver = new webdriver.Builder().usingServer(server)
                    .withCapabilities(capabilities)
                    .forBrowser('electron')
                    .build();
                break;
            default:
                throw new Error('Unsupported browser : ' + Settings.getBrowser());
        }
        this.browser = new BrowserModule.Browser(this.driver);
        this.windows = new Array();
    }
    /**
     * Gets current instance of browser
     */
    getBrowser() {
        return this.browser;
    }
    /**
     * Gets object to perform actions
     */
    getActions() {
        if (!this.actions)
            this.actions = new ActionModule.Actions(this.driver);
        return this.actions;
    }
    /**
     * Retrieves the current list of available window handles.
     * @param {function} callback The function with the parameter which would hold the list of windows
     */
    getAllWindows(callback) {
        let allWindows = new Array();
        this.driver.getAllWindowHandles().then(function (handles) {
            for (let i = 0; i < handles.length; i++) {
                allWindows[i] = new WindowModule.Window(handles[i]);
            }
        }).then(function () {
            callback(allWindows);
        });
    }
    /**
     * Retrieves they current window handle.
     * @param {Window} window The window object to be initialized with current window instance
     */
    getCurrentWindow(window) {
        this.driver.getWindowHandle().then(function (thisHandle) {
            window.handle = thisHandle;
        });
    }
    /**
     * Switches the focus of all future commands to the given window.
     * @param {Window} window The target window to switch focus to
     */
    switchToWindow(window) {
        this.callSync(() => {
            this.driver.switchTo().window(window.toString());
        });
    }
    /**
     * Schedules a command to make the driver sleep for the given amount of time.
     * @param {number} ms time in milli seconds
     */
    sleep(ms) {
        this.driver.sleep(ms);
    }
    /**
     * Disposes the test driver
     */
    dispose() {
        this.driver.quit();
    }
    /**
     * Set default timeout for wait conditions
     */
    setDefaultWaitTimeout(ms) {
        this.driver.manage().timeouts().implicitlyWait(ms);
    }
    /**
     * Set default timeout for page load
     */
    setPageLoadTimeout(ms) {
        this.driver.manage().timeouts().pageLoadTimeout(ms);
    }
    /**
     * Set default timeout for javascript execution
     */
    setScriptExecutionTimeout(ms) {
        this.driver.manage().timeouts().setScriptTimeout(ms);
    }
    /**
     * Helper function
     */
    promisedExecution(fn, scope, args, callback, errorback, finalblock) {
        args = args || [];
        scope = scope || this;
        this.driver.call(fn, scope, ...args)
            .then(function (returnedItem) {
            if (callback)
                callback.call(scope, returnedItem);
        })
            .catch(function (err) {
            if (errorback)
                errorback.call(scope, err);
        })
            .finally(function () {
            if (finalblock)
                finalblock.call(scope);
        });
    }
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
    callSync(fn, args, scope, callback) {
        this.promisedExecution(fn, scope, args, callback, function (err) {
            throw err;
        });
    }
    /**
     * API for error handling
     * The call to this API wil be in sync with the current block
     * @param {function} fnTry function to try
     * @param {function} fnCatch function equivalent to catch block
     * @param {function} fnFinally function equivalent to finally block
     * @param {object} scope The object in whose scope to execute the function.
     * By default the try and catch functions execute in same scope.
     */
    handleErrorSync(fnTry, fnCatch, fnFinally, scope) {
        this.promisedExecution(fnTry, scope, null, null, fnCatch, fnFinally);
    }
}
exports.Driver = Driver;
