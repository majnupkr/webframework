/// <reference types="selenium-webdriver" />
import input = require('../common/Input');
import ElementModule = require('./WebElement');
import webdriver = require('selenium-webdriver');
export declare class Actions {
    private actions;
    private driver;
    constructor(driver: webdriver.WebDriver);
    /**
     * Clicks a mouse button.
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    click(mouseButton?: input.Button): this;
    /**
     * Double-clicks a mouse button
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    doubleClick(mouseButton?: input.Button): this;
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
    dragAndDrop(element: ElementModule.WebElement, target: ElementModule.WebElement | input.Location): this;
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
    modifierKeyDown(key: string): this;
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
    modifierKeyUp(key: string): this;
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
    mouseMove(target: ElementModule.WebElement | input.Location, offset?: input.Location): this;
    /**
     * Presses a mouse button. The mouse button will not be released until
     * {mouseUp} is called. The behavior for out-of-order events (e.g. mouseDown,
     * click) is undefined.
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    mouseDown(mouseButton?: input.Button): this;
    /**
     * Releases a mouse button. Behavior is undefined for calling this function
     * without a previous call to {mouseDown}.
     *
     * @param {Button} mouseButton The button to click. Can be left(0), middle(1) or right(2) button.
     * Defaults to left
     * @return {Actions} A self reference.
     */
    mouseUp(mouseButton?: input.Button): this;
    /**
     * Simulates typing multiple keys. Each modifier key encountered in the
     * sequence will not be released until it is encountered again. All key events
     * will be targetted at the currently focused element.
     *
     * The list of keys can be obtained from Input.Keys constants
     */
    sendKeys(...keys: string[]): this;
    perform(): void;
}
