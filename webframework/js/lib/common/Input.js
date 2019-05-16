//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Input
//  Description : A module containing constants which act as input for mouse and keyboard actions
//  Author : tsengupta
//  Date : Dec 18,2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
/**
 * Enumeration of the buttons used in the advanced interactions API.
 * @enum {number}
 */
var Button;
(function (Button) {
    Button[Button["LEFT"] = 0] = "LEFT";
    Button[Button["MIDDLE"] = 1] = "MIDDLE";
    Button[Button["RIGHT"] = 2] = "RIGHT";
})(Button = exports.Button || (exports.Button = {}));
;
/**
 * Representations of pressable keys that aren't text.  These are stored in
 * the Unicode PUA (Private Use Area) code points, 0xE000-0xF8FF.  Refer to
 * http://www.google.com.au/search?&q=unicode+pua&btnG=Search
 */
exports.Key = {
    NULL: '\uE000',
    CANCEL: '\uE001',
    HELP: '\uE002',
    BACK_SPACE: '\uE003',
    TAB: '\uE004',
    CLEAR: '\uE005',
    RETURN: '\uE006',
    ENTER: '\uE007',
    SHIFT: '\uE008',
    CONTROL: '\uE009',
    ALT: '\uE00A',
    PAUSE: '\uE00B',
    ESCAPE: '\uE00C',
    SPACE: '\uE00D',
    PAGE_UP: '\uE00E',
    PAGE_DOWN: '\uE00F',
    END: '\uE010',
    HOME: '\uE011',
    ARROW_LEFT: '\uE012',
    LEFT: '\uE012',
    ARROW_UP: '\uE013',
    UP: '\uE013',
    ARROW_RIGHT: '\uE014',
    RIGHT: '\uE014',
    ARROW_DOWN: '\uE015',
    DOWN: '\uE015',
    INSERT: '\uE016',
    DELETE: '\uE017',
    SEMICOLON: '\uE018',
    EQUALS: '\uE019',
    NUMPAD0: '\uE01A',
    NUMPAD1: '\uE01B',
    NUMPAD2: '\uE01C',
    NUMPAD3: '\uE01D',
    NUMPAD4: '\uE01E',
    NUMPAD5: '\uE01F',
    NUMPAD6: '\uE020',
    NUMPAD7: '\uE021',
    NUMPAD8: '\uE022',
    NUMPAD9: '\uE023',
    MULTIPLY: '\uE024',
    ADD: '\uE025',
    SEPARATOR: '\uE026',
    SUBTRACT: '\uE027',
    DECIMAL: '\uE028',
    DIVIDE: '\uE029',
    F1: '\uE031',
    F2: '\uE032',
    F3: '\uE033',
    F4: '\uE034',
    F5: '\uE035',
    F6: '\uE036',
    F7: '\uE037',
    F8: '\uE038',
    F9: '\uE039',
    F10: '\uE03A',
    F11: '\uE03B',
    F12: '\uE03C',
    /**
     * Apple command key
     */
    COMMAND: '\uE03D',
    /**
     * Alias for Windows key
     */
    META: '\uE03D'
};
/**
 * Represents a location on screen using x and y coordinate
 */
class Location {
}
exports.Location = Location;
