//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Settings
//  Description : Provided API to get global settings
//  Author : tsengupta
//  Date : Nov 15, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
var defaults = require('./config.json');
try {
    var userConfig = require(process.cwd() + '/config/config.json');
}
catch (ex) {
    console.log('[Settings]: No config file found. Using default settings');
}
class Settings {
    static getDefaultConfig() {
        return defaults;
    }
    static getUserConfig() {
        return userConfig;
    }
    static getRetryCount() {
        return userConfig && userConfig.retry || defaults.retry;
    }
    static getBrowser() {
        return userConfig && userConfig.browser || defaults.browser;
    }
    static logLevel() {
        return userConfig && userConfig.logLevel || defaults.logLevel;
    }
    static getLogPath() {
        return userConfig && userConfig.logPath || defaults.logPath;
    }
    static getReportPath() {
        return userConfig && userConfig.reportPath || defaults.reportPath;
    }
    static getLogLevel() {
        return userConfig && userConfig.logLevel || defaults.logLevel;
    }
    static getTimeout() {
        return userConfig && userConfig.timeout || defaults.timeout;
    }
    static writeToDB() {
        if (userConfig && userConfig.writeToDB != undefined)
            return userConfig.writeToDB;
        return defaults.writeToDB;
    }
    static getDBHost() {
        return userConfig && userConfig.DBHost || defaults.DBHost;
    }
    static getPlatform() {
        return userConfig && userConfig.platform || "Not specified";
    }
    static getProduct() {
        return userConfig && userConfig.product || "Not specified";
    }
    static getProductVersion() {
        return userConfig && userConfig.productVersion || "Not specified";
    }
    static getBuildId() {
        return userConfig && userConfig.buildId || "Not specified";
    }
    static getTeamName() {
        return userConfig && userConfig.team || "Not specified";
    }
    static getElectronServer() {
        return userConfig && userConfig.electronOptions.server || defaults.electronOptions.server;
    }
    static getElectronCapabilities() {
        return userConfig && userConfig.electronOptions.capabilities || defaults.electronOptions.capabilities;
    }
    static getMailOptions() {
        return userConfig.mailOptions;
    }
	static getDBName() {
       return userConfig && userConfig.dbName || "Not specified";
    }
}
module.exports = Settings;
