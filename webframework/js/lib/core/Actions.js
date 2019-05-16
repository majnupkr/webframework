//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Actions
//  Description : Provides API for keyboard and mouse interactions
//  Author : tsengupta
//  Date : Nov 18, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const ElementModule = require("./WebElement");
class Actions {
    constructor(driver) {
        this.driver = driver;
        // this.actions = driver.actions()
    }
    /**
     * Clicks a mouse button.
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    click(mouseButton) {
        this.driver.actions().click(mouseButton).perform();
        return this;
    }
    /**
     * Double-clicks a mouse button
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    doubleClick(mouseButton) {
        this.driver.actions().doubleClick(mouseButton).perform();
        return this;
    }
    /**
     * Convenience function for performing a "drag and drop" manuever. The target element may be moved to
     * the location of another element, or by an offset (in pixels).
     *
     * Location format : { x : number, y : number}
     *
     * @param {WebElement} element The element to drag.
     * @param {WebElement|Location} target The location to drag to, either as another WebElement or an
     * offset in pixels
     * @return {Actions} A self reference.
     */
    dragAndDrop(element, target) {
        if (target.constructor.name == ElementModule.WebElement.name)
            this.driver.actions().dragAndDrop(element.element, target.element).perform();
        else
            this.driver.actions().dragAndDrop(element.element, target).perform();
        return this;
    }
    /**
     * Performs a modifier (one of ALT, CONTROL, SHIFT, COMMAND, META) key press.
     * The modifier key is not released until {keyUp} or {sendKeys} is called.
     * The key press will be targetted at the currently focused element.
     * he modifier key to push.
     *
     * The list of keys can be obtained from Input.Keys constants
     *
     * @param {string} key The modifier key to push. Must be one of
     *     {ALT, CONTROL, SHIFT, COMMAND, META}.
     * @return {Actions} A self reference.
     *
     * @throws {Error} If the key is not a valid modifier key.
     */
    modifierKeyDown(key) {
        this.driver.actions().keyDown(key).sendKeys('a').perform();
        return this;
    }
    /**
     * Performs a modifier key release. The release is targetted at the currently focused element.
     *
     * The list of keys can be obtained from Input.Keys constants
     *
     * @param {string} key The modifier key to push. Must be one of
     *     {ALT, CONTROL, SHIFT, COMMAND, META}.
     * @return {Actions} A self reference.
     *
     * @throws {Error} If the key is not a valid modifier key.
     */
    modifierKeyUp(key) {
        this.driver.actions().keyUp(key).perform();
        return this;
    }
    /**
    * Moves the mouse.  The location to move to may be specified in terms of the
    * offset relative to the top-left corner of an element/page, or an element (in which case the middle of the element is used).
    *
    * Location format : { x : number, y : number}
    *
    * @param {WebElement|Location} target The target location to drag to, as either another WebElement
    * or an offset from top left corner of web page in pixels.
    * @param {Location} offset If the location is defined as {WebElement} , this parameter defines an offset
    * within that element. The offset should be defined in pixels relative to the
    * top-left corner of the element's bounding box. If omitted, the element's center will be used as target offset.
    *
    * @return {Actions} A self reference.
    */
    mouseMove(target, offset) {
        if (target.constructor.name == ElementModule.WebElement.name) {
            this.driver.actions().mouseMove(target.element, offset).perform();
        }
        else
            this.driver.actions().mouseMove(target).perform();
        return this;
    }
    /**
     * Presses a mouse button. The mouse button will not be released until
     * {mouseUp} is called. The behavior for out-of-order events (e.g. mouseDown,
     * click) is undefined.
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    mouseDown(mouseButton) {
        this.driver.actions().mouseDown(mouseButton).perform();
        return this;
    }
    /**
     * Releases a mouse button. Behavior is undefined for calling this function
     * without a previous call to {mouseDown}.
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    mouseUp(mouseButton) {
        this.driver.actions().mouseUp(mouseButton).perform();
        return this;
    }
    /**
     * Simulates typing multiple keys. Each modifier key encountered in the
     * sequence will not be released until it is encountered again. All key events
     * will be targetted at the currently focused element.
     *
     * The list of keys can be obtained from Input.Keys constants
     */
    sendKeys(...keys) {
        this.driver.actions().sendKeys(...keys).perform();
        return this;
    }
    perform() {
        this.driver.actions().perform().then();
    }
}
exports.Actions = Actions;
