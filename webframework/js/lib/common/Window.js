//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Window
//  Description : Class representing a single browser tab/window
//  Author : tsengupta
//  Date : Nov 18, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
class Window {
    constructor(handle) {
        this.handle = handle;
    }
    toString() {
        return this.handle;
    }
}
exports.Window = Window;
