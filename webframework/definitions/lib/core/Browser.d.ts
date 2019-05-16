/// <reference types="selenium-webdriver" />
import webdriver = require('selenium-webdriver');
import WebElementModule = require('./WebElement');
export declare type ByHash = {
    className: string;
} | {
    css: string;
} | {
    id: string;
} | {
    name: string;
} | {
    tagName: string;
} | {
    xpath: string;
} | {
    text: string;
} | {
    partialText: string;
};
/**
 * Represents a browser window
 */
export declare class Browser {
    private driver;
    constructor(driver: webdriver.WebDriver);
    /**
     * Schedules a command to navigate to a new URL
     * @param url Target URL
     */
    navigateToUrl(url: string): void;
    /**
     * Maximizes the current windows
     */
    maximize(): void;
    /**
     * Schedules a command to close the current window
     */
    closeWindow(): void;
    /**
     * Schedules a command to refresh the current page.
     */
    refresh(): void;
    /**
     * Schedules a command to move backwards in the browser history
     */
    navigateBack(): void;
    /**
     * Schedules a command to move forwards in the browser history.
     */
    navigateForward(): void;
    /**
     * Schedules a command to delete all cookies visible to the current page
     */
    deleteAllCookies(): void;
    /**
     * Schedules a command to delete the cookie with the given name.
     * This command is a no-op if there is no cookie with the given
     * name visible to the current page.
     */
    deleteCookie(name: string): void;
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
    executeScript(query: string, args?: any[], callback?: (returnValue: any) => void): void;
    /**
    * Scrolls to a visible element
    */
    scrollToElement(webelement: WebElementModule.WebElement): void;
    /**
    * Retrieves the URL of the current page.
    */
    getCurrentURL(callback: (url: string) => void): void;
    /**
     * Retrieve the current page's title.
     */
    getPageTitle(callback: (title: string) => void): void;
    /**
     * Schedule a command to take a screenshot. The driver makes a best effort
     * to return a screenshot of the following, in order of preference:
     * 1. Entire page
     * 2. Current window
     * 3. Visible portion of the current frame
     * 4. The entire display containing the browser
     */
    saveScreenshot(filepath: string): void;
    /**
     * Locates element using a CSS selector.
     */
    findElementByCss(cssSelector: string, timeout?: number): WebElementModule.WebElement;
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByCss(cssSelector: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     * Locates elements that have a specific class name
     */
    findElementByClassName(className: string, timeout?: number): WebElementModule.WebElement;
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByClassName(className: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     * Locates elements by the ID attribute.
     */
    findElementById(id: string, timeout?: number): WebElementModule.WebElement;
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllById(id: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     * Locates elements whose name attribute has the given value
     */
    findElementByName(name: string, timeout?: number): WebElementModule.WebElement;
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByName(name: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     * Locates link elements whose visible text contains the given substring.
     */
    findElementByPartialText(text: string, timeout?: number): WebElementModule.WebElement;
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByPartialText(text: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     * Locates elements matching a XPath selector.
     */
    findElementByXPath(xpath: string, timeout?: number): WebElementModule.WebElement;
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByXPath(xpath: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     * Locates link elements whose text content matches the given string.
     */
    findElementByText(text: string, timeout?: number): WebElementModule.WebElement;
    /**
    * Schedule a command to search for multiple elements on the page.
    */
    findAllByText(text: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     * Locates elements with a given tag name.
     */
    findElementByTagName(tag: string, timeout?: number): WebElementModule.WebElement;
    /**
     * Schedule a command to search for multiple elements on the page.
     */
    findAllByTagName(tag: string, callback: (webElements: WebElementModule.WebElement[]) => void, timeout?: number): void;
    /**
     *
     */
    /**
     * Wait for an element to exist in DOM
     */
    waitUntilElementIsLocated(criterion: ByHash, timeout?: number, message?: string): void;
    /**
     * Makes browser wait for the given element in the DOM and visible to the user.
     */
    waitUntilElementIsVisible(webElement: WebElementModule.WebElement, timeout?: number, message?: string): void;
    /**
     * Makes browser wait for the given element in the DOM, yet not visible to the user.
     */
    waitUntilElementIsInvisible(webElement: WebElementModule.WebElement, timeout?: number, message?: string): void;
    /**
     * Makes browser wait for the given element to get removed from the DOM,
     * or till a new page has loaded
     */
    waitUntilElementIsStale(webElement: WebElementModule.WebElement, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait until the input driver is able to switch to the designated frame.
     * The target frame may be specified as
     * 1. a numeric index into window.frames for the currently selected frame.
     * 2. a WebElement, which must reference a FRAME or IFRAME element on the current page.
     */
    waitToSwitchToFrame(frame: WebElementModule.WebElement | number, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the given element to be disabled.
     */
    waitUntilElementIsDisabled(webElement: WebElementModule.WebElement, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the given element to be enabled.
     */
    waitUntilElementIsEnabled(webElement: WebElementModule.WebElement, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the given element to be deselected.
     */
    waitUntilElementIsDeselected(webElement: WebElementModule.WebElement, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the given element to be selected
     */
    waitUntilElementIsSelected(webElement: WebElementModule.WebElement, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the given element's visible text to contain the given substring
     */
    waitUntilElementTextContains(webElement: WebElementModule.WebElement, partialString: string, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the given element's visible text to match the given text exactly.
     */
    waitUntilElementTextIs(webElement: WebElementModule.WebElement, text: string, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the given element's to match a regular expression
     */
    waitUntilElementTextMatches(webElement: WebElementModule.WebElement, regEx: RegExp, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the current page's title to contain the given substring.
     */
    waitUntilPageTitleContains(partialTitle: string, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the current page's title to match the given value.
     */
    waitUntilPageTitleIs(title: string, timeout?: number, message?: string): void;
    /**
     * Creates a condition that will wait for the current page's title to match the given regular expression.
     */
    waitUntilPageTitleMatches(regEx: RegExp, timeout?: number, message?: string): void;
    /**
     * Makes browser wait for an alert to be opened.
     */
    waitUntilAlertIsPresent(timeout?: number, message?: string): void;
    /**
     * Switch the focus of all future commands to another frame on the page.
     */
    switchToFrame(webElement: WebElementModule.WebElement): void;
    /**
     * Switch focus of all future commands to the first frame on the page
     */
    switchToDefaultFrame(): void;
    /**
     * Change focus to the active modal dialog, such as those opened by
     * window.alert(), window.confirm(), and window.prompt()
     */
    switchToAlert(): void;
    /**
     * Accepts this alert
     */
    acceptAlert(): void;
    /**
     * Dismisses this alert.
     */
    dismissAlert(): void;
    /**
     * Sets the username and password in an alert prompting for credentials (such as a Basic HTTP Auth prompt).
     * This method will implicitly submit the dialog.
     */
    authenticateAlert(username: string, password: string): void;
    /**
     * Retrieves the message text displayed with this alert
     */
    getAlertText(callback: (innerText: string) => void): void;
    /**
     * Sets the response text on this alert.
     * This command will return an error if the underlying alert
     * does not support response text
     */
    setAlertText(text: string): void;
}
