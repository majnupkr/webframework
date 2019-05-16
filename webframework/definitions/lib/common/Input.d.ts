/**
 * Enumeration of the buttons used in the advanced interactions API.
 * @enum {number}
 */
export declare enum Button {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2,
}
/**
 * Representations of pressable keys that aren't text.  These are stored in
 * the Unicode PUA (Private Use Area) code points, 0xE000-0xF8FF.  Refer to
 * http://www.google.com.au/search?&q=unicode+pua&btnG=Search
 */
export declare const Key: {
    NULL: string;
    CANCEL: string;
    HELP: string;
    BACK_SPACE: string;
    TAB: string;
    CLEAR: string;
    RETURN: string;
    ENTER: string;
    SHIFT: string;
    CONTROL: string;
    ALT: string;
    PAUSE: string;
    ESCAPE: string;
    SPACE: string;
    PAGE_UP: string;
    PAGE_DOWN: string;
    END: string;
    HOME: string;
    ARROW_LEFT: string;
    LEFT: string;
    ARROW_UP: string;
    UP: string;
    ARROW_RIGHT: string;
    RIGHT: string;
    ARROW_DOWN: string;
    DOWN: string;
    INSERT: string;
    DELETE: string;
    SEMICOLON: string;
    EQUALS: string;
    NUMPAD0: string;
    NUMPAD1: string;
    NUMPAD2: string;
    NUMPAD3: string;
    NUMPAD4: string;
    NUMPAD5: string;
    NUMPAD6: string;
    NUMPAD7: string;
    NUMPAD8: string;
    NUMPAD9: string;
    MULTIPLY: string;
    ADD: string;
    SEPARATOR: string;
    SUBTRACT: string;
    DECIMAL: string;
    DIVIDE: string;
    F1: string;
    F2: string;
    F3: string;
    F4: string;
    F5: string;
    F6: string;
    F7: string;
    F8: string;
    F9: string;
    F10: string;
    F11: string;
    F12: string;
    COMMAND: string;
    META: string;
};
/**
 * Represents a location on screen using x and y coordinate
 */
export declare class Location {
    x: number;
    y: number;
}
