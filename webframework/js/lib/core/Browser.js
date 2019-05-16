//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Browser
//  Description : Class representing a single browser window
//  Author : tsengupta
//  Date : Nov 2, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const webdriver = require("selenium-webdriver");
const WebElementModule = require("./WebElement");
const fs = require("fs");
var WebElement = WebElementModule.WebElement;
var flow = webdriver.promise.controlFlow();
/**
 * Represents a browser window
 */
class Browser {
    constructor(driver) {
        this.driver = driver;
    }
    /**
     * Schedules a command to navigate to a new URL
     * @param url Target URL
     */
    navigateToUrl(url) {
        this.driver.navigate().to(url);
    }
    /**
     * Maximizes the current windows
     */
    maximize() {
        this.driver.manage().window().maximize();
    }
    /**
     * Schedules a command to close the current window
     */
    closeWindow() {
        this.driver.close();
    }
    /**
     * Schedules a command to refresh the current page.
     */
    refresh() {
        this.driver.navigate().refresh();
    }
    /**
     * Schedules a command to move backwards in the browser history
     */
    navigateBack() {
        this.driver.navigate().back();
    }
    /**
     * Schedules a command to move forwards in the browser history.
     */
    navigateForward() {
        this.driver.navigate().forward();
    }
    /**
     * Schedules a command to delete all cookies visible to the current page
     */
    deleteAllCookies() {
        this.driver.manage().deleteAllCookies();
    }
    /**
     * Schedules a command to delete the cookie with the given name.
     * This command is a no-op if there is no cookie with the given
     * name visible to the current page.
     */
    deleteCookie(name) {
        this.driver.manage().deleteCookie(name);
    }
    /**
    * Schedules a command to execute JavaScript in the context of the currently
    * selected frame or window. The script fragment will be executed as the body
    * of an anonymous function.
    *
    * The script may refer to any variables accessible from the current window.
    * Furthermore, the script will execute in the window's context, thus
    * {document} may be used to refer to the current document. Any local
    * variables will not be available once the script has finished executing,
    * though global variables will persist.
    *
    * If the script has a return value (i.e. if the script contains a return
    * statement), then the following steps will be taken for resolving this
    * functions return value:
    *
    * - For a HTML element, the value will resolve to a {WebElement}
    * - Null and undefined return values will resolve to null
    * - Booleans, numbers, and strings will resolve as is
    * - Functions will resolve to their string representation
    * - For arrays and objects, each member item will be converted according to
    *   the rules above
    *
    * Any arguments provided in addition to the script will be included as script
    * arguments and may be referenced using the {arguments} object.
    * Arguments may be a boolean, number, string, or {WebElement} .
    * Arrays and objects may also be used as script arguments as long as each
    * item adheres to the types previously mentioned.
    *
    * @param {string} script The script to execute.
    * @param {array} args The array of arguments
    * @param {void} callback Function to deal with the return object if any. The returned object
    * can be of types as stated above
    *
    * e.g 1. executeScript('return "hello"', [], function(value:string){
    *               console.log(value)
    *        })
    * The above program should print "hello" in the console
    *
    * e.g 2. executeScript('return $(#id)', [], function(ele:WebElement){
    *               ele.click()
    *       })
    * This will click on the ele with given id
    */
    executeScript(query, args, callback) {
        if (args) {
            args.forEach(function (arg, i, arr) {
                if (arg.constructor.name == WebElement.name) {
                    arr[i] = arg.element;
                }
            });
        }
        else
            args = [];
        if (callback)
            this.driver.executeScript(query, ...args).then(function (value) {
                if (value && value.constructor.name == webdriver.WebElement.name)
                    value = new WebElementModule.WebElement(value);
                callback(value);
            });
        else
            this.driver.executeScript(query, ...args);
    }
    /**
    * Scrolls to a visible element
    */
    scrollToElement(webelement) {
        this.driver.executeScript('arguments[0].scrollIntoView(true);', webelement.element);
    }
    /**
    * Retrieves the URL of the current page.
    */
    getCurrentURL(callback) {
        this.driver.getCurrentUrl().then(function (value) {
            callback(value);
        });
    }
    /**
     * Retrieve the current page's title.
     */
    getPageTitle(callback) {
        this.driver.getTitle().then(function (value) {
            callback(value);
        });
    }
    /**
     * Schedule a command to take a screenshot. The driver makes a best effort
     * to return a screenshot of the following, in order of preference:
     * 1. Entire page
     * 2. Current window
     * 3. Visible portion of the current frame
     * 4. The entire display containing the browser
     */
    saveScreenshot(filepath) {
        this.driver.takeScreenshot().then(function (shot) {
            fs.writeFile(filepath, shot, 'base64');
        });
    }
    // Find API
    /**
     * Locates element using a CSS selector.
     */
    findElementByCss(cssSelector, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.css(cssSelector)), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.css(cssSelector)));
    }
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByCss(cssSelector, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.css(cssSelector)), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.css(cssSelector)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates elements that have a specific class name
     */
    findElementByClassName(className, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.className(className)), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.className(className)));
    }
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByClassName(className, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.className(className)), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.className(className)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates elements by the ID attribute.
     */
    findElementById(id, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.id(id)), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.id(id)));
    }
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllById(id, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.id(id)), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.id(id)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates elements whose name attribute has the given value
     */
    findElementByName(name, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.name(name)), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.name(name)));
    }
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByName(name, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.name(name)), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.name(name)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates link elements whose visible text contains the given substring.
     */
    findElementByPartialText(text, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[contains(text(), '" + text + "')]")), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.xpath("//*[contains(text(), '" + text + "')]")));
    }
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByPartialText(text, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.xpath("//*[contains(text(), '" + text + "')]")), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.xpath("//*[contains(text(), '" + text + "')]")).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates elements matching a XPath selector.
     */
    findElementByXPath(xpath, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(xpath)), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.xpath(xpath)));
    }
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByXPath(xpath, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.xpath(xpath)), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.xpath(xpath)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates link elements whose text content matches the given string.
     */
    findElementByText(text, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[text()='" + text + "']")), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.xpath("//*[text()='" + text + "']")));
    }
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByText(text, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.xpath("//*[text()='" + text + "']")), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.xpath("//*[text()='" + text + "']")).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates elements with a given tag name.
     */
    findElementByTagName(tag, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementLocated(webdriver.By.tagName(tag)), timeout);
        return new WebElement(this.driver.findElement(webdriver.By.tagName(tag)));
    }
    /**
     * Schedule a command to search for multiple elements on the page.
     */
    findAllByTagName(tag, callback, timeout) {
        if (timeout)
            this.driver.wait(webdriver.until.elementsLocated(webdriver.By.tagName(tag)), timeout);
        let elements = new Array();
        this.driver.findElements(webdriver.By.tagName(tag)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    // Wait API   
    /**
     *
     */
    // waitForCondition(fn: () => boolean, scope: Object) {
    //     this.driver.wait(webdriver.until.elementLocated(criterion), timeout, message)
    // }
    /**
     * Wait for an element to exist in DOM
     */
    waitUntilElementIsLocated(criterion, timeout, message) {
        let key = Object.keys(criterion)[0];
        if (key == 'partialText')
            criterion = { xpath: "//*[contains(text(), '" + criterion[key] + "')]" };
        else if (key == 'text')
            criterion = { xpath: "//*[text()='" + criterion[key] + "']" };
        this.driver.wait(webdriver.until.elementLocated(criterion), timeout, message);
    }
    /**
     * Makes browser wait for the given element in the DOM and visible to the user.
     */
    waitUntilElementIsVisible(webElement, timeout, message) {
        this.driver.wait(webdriver.until.elementIsVisible(webElement.element), timeout, message);
    }
    /**
     * Makes browser wait for the given element in the DOM, yet not visible to the user.
     */
    waitUntilElementIsInvisible(webElement, timeout, message) {
        this.driver.wait(webdriver.until.elementIsNotVisible(webElement.element), timeout, message);
    }
    /**
     * Makes browser wait for the given element to get removed from the DOM,
     * or till a new page has loaded
     */
    waitUntilElementIsStale(webElement, timeout, message) {
        this.driver.wait(webdriver.until.stalenessOf(webElement.element), timeout, message);
    }
    /**
     * Creates a condition that will wait until the input driver is able to switch to the designated frame.
     * The target frame may be specified as
     * 1. a numeric index into window.frames for the currently selected frame.
     * 2. a WebElement, which must reference a FRAME or IFRAME element on the current page.
     */
    waitToSwitchToFrame(frame, timeout, message) {
        if (frame.constructor.name == WebElementModule.WebElement.name)
            this.driver.wait(webdriver.until.ableToSwitchToFrame(frame.element), timeout, message);
        else
            this.driver.wait(webdriver.until.ableToSwitchToFrame(frame), timeout, message);
    }
    /**
     * Creates a condition that will wait for the given element to be disabled.
     */
    waitUntilElementIsDisabled(webElement, timeout, message) {
        this.driver.wait(webdriver.until.elementIsDisabled(webElement.element), timeout, message);
    }
    /**
     * Creates a condition that will wait for the given element to be enabled.
     */
    waitUntilElementIsEnabled(webElement, timeout, message) {
        this.driver.wait(webdriver.until.elementIsEnabled(webElement.element), timeout, message);
    }
    /**
     * Creates a condition that will wait for the given element to be deselected.
     */
    waitUntilElementIsDeselected(webElement, timeout, message) {
        this.driver.wait(webdriver.until.elementIsNotSelected(webElement.element), timeout, message);
    }
    /**
     * Creates a condition that will wait for the given element to be selected
     */
    waitUntilElementIsSelected(webElement, timeout, message) {
        this.driver.wait(webdriver.until.elementIsSelected(webElement.element), timeout, message);
    }
    /**
     * Creates a condition that will wait for the given element's visible text to contain the given substring
     */
    waitUntilElementTextContains(webElement, partialString, timeout, message) {
        this.driver.wait(webdriver.until.elementTextContains(webElement.element, partialString), timeout, message);
    }
    /**
     * Creates a condition that will wait for the given element's visible text to match the given text exactly.
     */
    waitUntilElementTextIs(webElement, text, timeout, message) {
        this.driver.wait(webdriver.until.elementTextIs(webElement.element, text), timeout, message);
    }
    /**
     * Creates a condition that will wait for the given element's to match a regular expression
     */
    waitUntilElementTextMatches(webElement, regEx, timeout, message) {
        this.driver.wait(webdriver.until.elementTextMatches(webElement.element, regEx), timeout, message);
    }
    /**
     * Creates a condition that will wait for the current page's title to contain the given substring.
     */
    waitUntilPageTitleContains(partialTitle, timeout, message) {
        this.driver.wait(webdriver.until.titleContains(partialTitle), timeout, message);
    }
    /**
     * Creates a condition that will wait for the current page's title to match the given value.
     */
    waitUntilPageTitleIs(title, timeout, message) {
        this.driver.wait(webdriver.until.titleIs(title), timeout, message);
    }
    /**
     * Creates a condition that will wait for the current page's title to match the given regular expression.
     */
    waitUntilPageTitleMatches(regEx, timeout, message) {
        this.driver.wait(webdriver.until.titleMatches(regEx), timeout, message);
    }
    /**
     * Makes browser wait for an alert to be opened.
     */
    waitUntilAlertIsPresent(timeout, message) {
        this.driver.wait(webdriver.until.alertIsPresent(), timeout, message);
    }
    // Frame API
    /**
     * Switch the focus of all future commands to another frame on the page.
     */
    switchToFrame(webElement) {
        this.driver.switchTo().frame(webElement.element);
    }
    /**
     * Switch focus of all future commands to the first frame on the page
     */
    switchToDefaultFrame() {
        this.driver.switchTo().defaultContent();
    }
    // Alert API
    /**
     * Change focus to the active modal dialog, such as those opened by
     * window.alert(), window.confirm(), and window.prompt()
     */
    switchToAlert() {
        this.driver.switchTo().alert();
    }
    /**
     * Accepts this alert
     */
    acceptAlert() {
        this.driver.switchTo().alert().accept();
    }
    /**
     * Dismisses this alert.
     */
    dismissAlert() {
        this.driver.switchTo().alert().dismiss();
    }
    /**
     * Sets the username and password in an alert prompting for credentials (such as a Basic HTTP Auth prompt).
     * This method will implicitly submit the dialog.
     */
    authenticateAlert(username, password) {
        this.driver.switchTo().alert().authenticateAs(username, password);
    }
    /**
     * Retrieves the message text displayed with this alert
     */
    getAlertText(callback) {
        this.driver.switchTo().alert().getText().then(function (text) {
            callback(text);
        });
    }
    /**
     * Sets the response text on this alert.
     * This command will return an error if the underlying alert
     * does not support response text
     */
    setAlertText(text) {
        this.driver.switchTo().alert().sendKeys(text);
    }
}
exports.Browser = Browser;
