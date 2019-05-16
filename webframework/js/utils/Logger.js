//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Logger
//  Description : It logs
//  Author : tsengupta
//  Date : Nov 1, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const log4js = require("log4js");
const fs = require("fs");
const events = require("events");
const path = require("path");
const Settings = require("../lib/metadata/Settings");
const webdriver = require("selenium-webdriver");
const esModule = require("./ElasticSearchClient");
log4js.clearAppenders();
log4js.loadAppender('console');
log4js.loadAppender('file');
class Logger {
    /**
     * Creates a logger if name is unique otherwise returns the logger with the name
     * @param name name of the log file
     * @param destination folder name. This parameter specifies single folder and not a path
     */
    constructor(name, id) {
        this.name = name;
        this.id = id || '';
        if (Settings.writeToDB())
            this.esLogger = new esModule.ElasticSearchClient(Settings.getProduct() + Settings.getProductVersion(), 'logs');
        if (log4js.hasLogger(name)) {
            this.logger = log4js.getLogger(name);
            return;
        }
        let folderpath;
        folderpath = path.join(Settings.getLogPath(), id || '');
        try {
            if (!fs.existsSync(folderpath))
                fs.mkdirSync(folderpath);
        }
        catch (ex) {
            console.log(ex);
        }
        log4js.addAppender(log4js.appenders.console(), name);
        log4js.addAppender(log4js.appenders.file(folderpath + '/' + name + '.log'), name);
        this.logger = log4js.getLogger(name);
        this.logger.setLevel(Settings.getLogLevel());
        this.logger.on('log', (event) => {
            Logger.logEmitter.emit('log', event);
            if (this.esLogger)
                this.esLogger.putDoc({
                    executionId: this.id,
                    time: event.startTime.toLocaleString(),
                    name: this.name,
                    message: event.data[0],
                    data: event.data[1],
                    level: event.level.levelStr.toLowerCase()
                });
        });
    }
    setLogLevel(level) {
        this.logger.setLevel(level);
    }
    _log(level, message, data) {
        let _this = this;
        webdriver.promise.controlFlow().execute(function () {
            let logdata = data ? [message, data] : [message];
            _this.logger[level.toLowerCase()].apply(_this.logger, logdata);
        });
    }
    debug(message, data) {
        this._log("DEBUG", message, data);
    }
    info(message, data) {
        this._log("INFO", message, data);
    }
    warn(message, data) {
        this._log("WARN", message, data);
    }
    error(message, data) {
        this._log("ERROR", message, data);
    }
    fatal(message, data) {
        this._log("FATAL", message, data);
    }
    dispose() {
        delete this.logger;
    }
}
Logger.logEmitter = new events.EventEmitter();
exports.Logger = Logger;
