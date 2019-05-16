/// <reference types="selenium-webdriver" />
import webdriver = require('selenium-webdriver');
export declare class WebElement {
    private element;
    constructor(element: webdriver.WebElement);
    /**
     *  Click on this element
     */
    click(): void;
    /**
     * Set the value of this element to given text. This command has effect
     * if the underlying DOM element is either a text INPUT element
     * or a TEXTAREA element.
     */
    setText(text: string): void;
    /**
     * Clear the value of this element. This command has effect
     * if the underlying DOM element is either a text INPUT element
     * or a TEXTAREA element.
     */
    clearText(): void;
    /**
     * Schedules a command to query for the computed style of the element represented by this instance.
     * If the element inherits the named style from its parent, the parent will be queried for its value.
     * Where possible, color values will be converted to their hex representation (e.g. #00ff00 instead of rgb(0, 255, 0)).
     * Warning: the value returned will be as the browser interprets it, so it may be tricky to form a proper assertion.
     */
    getCssValue(property: string, callback: (cssValue: string) => void): void;
    /**
     * Schedules a command to query for the value of the given attribute of the element. Will return the current value, even if it has been modified after the page has been loaded. More exactly, this method will return the value of the given attribute, unless that attribute is not present, in which case the value of the property with the same name is returned.
     * If neither value is set, null is returned (for example, the "value" property of a textarea element). The "style" attribute is converted as best can be to a text representation with a trailing semi-colon.
     * The following are deemed to be "boolean" attributes and will return either "true" or null:
     *
     * async, autofocus, autoplay, checked, compact, complete, controls, declare, defaultchecked, defaultselected, defer, disabled, draggable, ended, formnovalidate, hidden, indeterminate, iscontenteditable, ismap, itemscope, loop, multiple, muted, nohref, noresize, noshade, novalidate, nowrap, open, paused, pubdate, readonly, required, reversed, scoped, seamless, seeking, selected, spellcheck, truespeed, willvalidate
     *
     * Finally, the following commonly mis-capitalized attribute/property names are evaluated as expected:
     * - "class"
     * - "readonly"
     *
     * @param {string} attributeName The name of the attribute to query.
     * @param {function} callback The callback with resolved attribute value as the parameter
     *
    */
    getAttribute(attributeName: string, callback: (attrValue: string) => void): void;
    /**
     * Take a screenshot of the visible region encompassed by this element's bounding rectangle.
     */
    getScreenshot(callback: (screenshot: string) => void): void;
    /**
     * Server-assigned opaque ID assigned to this element.
     */
    getId(callback: (id: string) => void): void;
    /**
     * Query for the tag/node name of this element.
     */
    getTagName(callback: (tagName: string) => void): void;
    /**
     * Get the visible (i.e. not hidden by CSS) innerText of this element,
     * including sub-elements, without any leading or trailing whitespace.
     */
    getInnerText(callback: (innerText: string) => void): void;
    /**
     * Schedules a command to query whether this element is currently visible
     */
    isVisible(callback: (isVisible: boolean) => void): void;
    /**
     * Schedules a command to query whether this element has focus
     */
    isSelected(callback: (isSelected: boolean) => void): void;
    /**
     * Schedules a command to query whether the DOM element represented by this instance is enabled,
     * as dicted by the disabled attribute
     */
    isEnabled(callback: (isEnabled: boolean) => void): void;
    /**
     * Locates descendant element using a CSS selector.
     */
    findElementByCss(cssSelector: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllByCss(cssSelector: string, callback: (webElements: WebElement[]) => void): void;
    /**
     * Locates descendant element that have a specific class name.
     */
    findElementByClassName(tag: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllByClassName(className: string, callback: (webElements: WebElement[]) => void): void;
    /**
     * Locates descendant element by the ID attribute.
     */
    findElementById(id: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllById(id: string, callback: (webElements: WebElement[]) => void): void;
    /**
     * Locates descendant element whose name attribute has the given value.
     */
    findElementByName(name: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllByName(name: string, callback: (webElements: WebElement[]) => void): void;
    /**
     * Locates descendant link element whose visible text contains the given substring.
     */
    findElementByPartialText(text: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllByPartialText(text: string, callback: (webElements: WebElement[]) => void): void;
    /**
     * Locates descendant element matching a XPath selector.
     */
    findElementByXPath(xpath: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllByXPath(xpath: string, callback: (webElements: WebElement[]) => void): void;
    /**
     * Locates descendant link elements whose text content matches the given string.
     */
    findElementByText(text: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllByText(text: string, callback: (webElements: WebElement[]) => void): void;
    /**
     * Locates descendant element with a given tag name.
     */
    findElementByTagName(tag: string): WebElement;
    /**
     * Locates multiple descendant elements.
     */
    findAllByTagName(tag: string, callback: (webElements: WebElement[]) => void): void;
}
