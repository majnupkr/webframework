//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : WebElement
//  Description : Class representing a single HTML DOM element  
//  Author : tsengupta
//  Date : Nov 2, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const webdriver = require("selenium-webdriver");
class WebElement {
    constructor(element) {
        this.element = element;
    }
    /**
     *  Click on this element
     */
    click() {
        this.element.click();
    }
    /**
     * Set the value of this element to given text. This command has effect
     * if the underlying DOM element is either a text INPUT element
     * or a TEXTAREA element.
     */
    setText(text) {
        this.clearText();
        this.element.sendKeys(text);
    }
    /**
     * Clear the value of this element. This command has effect
     * if the underlying DOM element is either a text INPUT element
     * or a TEXTAREA element.
     */
    clearText() {
        this.element.clear();
    }
    /**
     * Schedules a command to query for the computed style of the element represented by this instance.
     * If the element inherits the named style from its parent, the parent will be queried for its value.
     * Where possible, color values will be converted to their hex representation (e.g. #00ff00 instead of rgb(0, 255, 0)).
     * Warning: the value returned will be as the browser interprets it, so it may be tricky to form a proper assertion.
     */
    getCssValue(property, callback) {
        this.element.getCssValue(property).then(function (value) {
            callback(value);
        });
    }
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
    getAttribute(attributeName, callback) {
        this.element.getAttribute(attributeName).then(function (value) {
            callback(value);
        });
    }
    /**
     * Take a screenshot of the visible region encompassed by this element's bounding rectangle.
     */
    getScreenshot(callback) {
        this.element.takeScreenshot().then(function (value) {
            callback(value);
        });
    }
    /**
     * Server-assigned opaque ID assigned to this element.
     */
    getId(callback) {
        this.element.getId().then(function (value) {
            callback(value);
        });
    }
    /**
     * Query for the tag/node name of this element.
     */
    getTagName(callback) {
        this.element.getTagName().then(function (value) {
            callback(value);
        });
    }
    /**
     * Get the visible (i.e. not hidden by CSS) innerText of this element,
     * including sub-elements, without any leading or trailing whitespace.
     */
    getInnerText(callback) {
        this.element.getText().then(function (value) {
            callback(value);
        });
    }
    /**
     * Schedules a command to query whether this element is currently visible
     */
    isVisible(callback) {
        this.element.isDisplayed().then(function (value) {
            callback(value);
        });
    }
    /**
     * Schedules a command to query whether this element has focus
     */
    isSelected(callback) {
        this.element.isSelected().then(function (value) {
            callback(value);
        });
    }
    /**
     * Schedules a command to query whether the DOM element represented by this instance is enabled,
     * as dicted by the disabled attribute
     */
    isEnabled(callback) {
        this.element.isEnabled().then(function (value) {
            callback(value);
        });
    }
    /**
     * Locates descendant element using a CSS selector.
     */
    findElementByCss(cssSelector) {
        return new WebElement(this.element.findElement(webdriver.By.css(cssSelector)));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllByCss(cssSelector, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.css(cssSelector)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates descendant element that have a specific class name.
     */
    findElementByClassName(tag) {
        return new WebElement(this.element.findElement(webdriver.By.className(tag)));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllByClassName(className, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.className(className)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates descendant element by the ID attribute.
     */
    findElementById(id) {
        return new WebElement(this.element.findElement(webdriver.By.id(id)));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllById(id, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.id(id)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates descendant element whose name attribute has the given value.
     */
    findElementByName(name) {
        return new WebElement(this.element.findElement(webdriver.By.name(name)));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllByName(name, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.name(name)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates descendant link element whose visible text contains the given substring.
     */
    findElementByPartialText(text) {
        return new WebElement(this.element.findElement(webdriver.By.xpath("//*[contains(text(), '" + text + "')]")));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllByPartialText(text, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.xpath("//*[contains(text(), '" + text + "')]")).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates descendant element matching a XPath selector.
     */
    findElementByXPath(xpath) {
        return new WebElement(this.element.findElement(webdriver.By.xpath(xpath)));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllByXPath(xpath, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.xpath(xpath)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates descendant link elements whose text content matches the given string.
     */
    findElementByText(text) {
        return new WebElement(this.element.findElement(webdriver.By.xpath("//*[text()='" + text + "']")));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllByText(text, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.xpath("//*[text()='" + text + "']")).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
    /**
     * Locates descendant element with a given tag name.
     */
    findElementByTagName(tag) {
        return new WebElement(this.element.findElement(webdriver.By.tagName(tag)));
    }
    /**
     * Locates multiple descendant elements.
     */
    findAllByTagName(tag, callback) {
        let elements = new Array();
        this.element.findElements(webdriver.By.tagName(tag)).then(function (webElements) {
            webElements.forEach(function (webElement) {
                elements.push(new WebElement(webElement));
            });
        }).then(function () {
            callback(elements);
        });
    }
}
exports.WebElement = WebElement;
