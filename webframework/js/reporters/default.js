//####################################################################################################
//  Copyright Information : Progress Software Development @ All Rights Reserved
//  Name : Executor
//  Description : Executes tests/test suites under mocha
//  Author : tsengupta
//  Date : Feb, 2016
//  Revision    Author      Date            Comments    
//####################################################################################################
"use strict";
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const Utils = require("../utils");
const Settings = require("../lib/metadata/Settings");
const nodemailer = require("nodemailer");
class Reporter {
    static msToTime(ms) {
        let milliseconds = (ms % 1000), _seconds = Math.floor((ms / 1000) % 60), _minutes = Math.floor((ms / (1000 * 60)) % 60), _hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        return _hours + ":" + _minutes + ":" + _seconds + "." + milliseconds;
    }
    mailReport(report) {
        let mailSettings = Settings.getMailOptions();
        if (!mailSettings)
            return;
        let suites = report.Suites;
        let percentage = Math.round((report.Summary.Passed/report.Summary.TotalTests)*100)
        let reportURL = 'http://vmqaserver/AutomationReports/MainReport.html?exid=' + report.ExecutionId;
        let mailbody = "<html>" +
            "<body>" +
            "<div> " +
            " Test Results: " + report.Product + " " + report.Version + " " + report.Build + " " + report.Platform +
            "<br><br>" +
            "<div><b> Summary : </b></div><br>" +
            "<table border=0 width=30%>" +
            "<tr>" + "<td>" + "Browser:" + "</td>" + "<td>" + report.Browser.toUpperCase() + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Execution Id:" + "</td>" + "<td>" + report.ExecutionId + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Execution Type:" + "</td>" + "<td>" + report.ExecutionType + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Total Tests:" + "</td>" + "<td>" + report.Summary.TotalTests + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Time Elapsed:" + "</td>" + "<td>" + report.Summary.Elapsed + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Passed:" + "</td>" + "<td>" + report.Summary.Passed + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Failed:" + "</td>" + "<td>" + report.Summary.Failed + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Retried:" + "</td>" + "<td>" + report.Summary.Retried + "</td>" + "</tr>" +
            "<tr>" + "<td>" + "Not Run:" + "</td>" + "<td>" + report.Summary.NotRun + "</td>" + "</tr>" +
			"<tr>" + "<td>" + "Pass Percentage:" + "</td>" + "<td>" + percentage +"%"+ "</td>" + "</tr>" +
            "</table>" +
            "<br>" +
            "<div><b> Details : </b></div><br>" +
            "<table border=1 width=50%>" +
            "<tr>" +
            "<th>SuiteName</th><th>TotalTests</th><th>Passed</th><th>Failed</th><th>Retried</th><th>Not Run</th>" +
            "</tr>";
        suites.forEach(suite => {
            mailbody +=
                "<tr>" +
                    "<td>" + suite.Name + "</td>" +
                    "<td>" + suite.TotalTests + "</td>" +
                    "<td>" + suite.Passed + "</td>" +
                    "<td>" + suite.Failed + "</td>" +
                    "<td>" + suite.Retried + "</td>" +
                    "<td>" + suite.NotRun + "</td>" +
                    "</tr>";
        });
        mailbody +=
            "</table>" +
                "<br>" +
                "The Report can be found at:<br>" +
                "<a href=\"" + reportURL + "\">"
                + reportURL + "</a>" +
                "</div>" +
                "</body>" +
                "</html>";
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: mailSettings.host,
            port: mailSettings.port,
        });
        let mailOptions = {
            from: mailSettings.from,
            to: mailSettings.to,
            subject: (mailSettings.subject || ' Automation Results - New Stack '),
            html: mailbody
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('E-Mail sent to: ' + mailOptions.to);
        });
    }
    constructor(executor) {
        let _this = this;
        let uid, executionReport, suiteReport, testReport, suiteStats, execStats, timers, es;
        if (Settings.writeToDB())
            es = new Utils.ElasticSearchClient(Settings.getProduct() + Settings.getProductVersion(), 'reports');
        executor.on('initialized', function (executionId) {
            mkdirp.sync(path.join(Settings.getReportPath(), executionId));
            uid = executionId;
            let executionType;
            if (process.argv.indexOf('--tags') == -1)
                executionType = "All";
            else
                executionType = process.argv[process.argv.indexOf('--tags') + 1];
            executionType = executionType[0].toUpperCase() + executionType.slice(1);
            executionReport = {
                ExecutionId: executionId,
                Product: Settings.getProduct(),
                Version: Settings.getProductVersion(),
                Platform: Settings.getPlatform(),
                Build: Settings.getBuildId(),
                ExecutionType: executionType,
                Browser: Settings.getBrowser(),
                ReportType: 'Execution',
                Tool: 'Walnut',
                QA: Settings.getTeamName()
            };
            executionReport['Suites'] = [];
            execStats = { total: 0, failed: 0, passed: 0, notRun: 0, retried: new Set() };
            timers = {
                executionStart: new Date(), executionEnd: null,
                suiteStart: null, suiteEnd: null,
                testStart: null, testEnd: null
            };
        });
        executor.on('start setup', function (context) {
            suiteStats = { total: 0, failed: 0, passed: 0, notRun: 0, retried: new Set() };
            timers.suiteStart = new Date();
            suiteReport = {
                ExecutionId: uid,
                Product: Settings.getProduct(),
                Version: Settings.getProductVersion(),
                Browser: Settings.getBrowser(),
                Platform: Settings.getPlatform(),
                Build: Settings.getBuildId(),
                ExecutionType: executionReport['ExecutionType'],
                ReportType: 'Suite',
                Tool: 'Walnut',
                QA: Settings.getTeamName()
            };
            suiteReport['Scripts'] = [];
        });
        let logListener = function (event) {
            let metadata = event.data[1], isValidation = metadata && metadata.eventType == 'validation';
            if (isValidation)
                testReport.push({
                    Title: metadata.eventTitle,
                    Details: event.data[0],
                    Result: metadata.state,
                    Time: event.startTime.toLocaleString()
                });
        };
        executor.on('start test', function (testContext) {
            timers.testStart = new Date();
            testReport = [];
            executor.on('log', logListener);
        });
        executor.on('end test', function (testContext) {
            timers.testEnd = new Date();
            executor.removeListener('log', logListener);
        });
        executor.on('retrying', function (testContext) {
            suiteStats.retried.add(testContext.testName);
            execStats.retried.add(testContext.testName);
        });
        executor.on('end afterTest', function (testContext) {
            suiteReport["Scripts"].push({
                Name: testContext.testName,
                Result: testContext.testResult[0].toUpperCase() + testContext.testResult.slice(1),
                Retried: suiteStats.retried.has(testContext.testName),
                StartTime: timers.testStart.toLocaleString(),
                Elapsed: Reporter.msToTime(testContext.duration),
                LogFile: "",
                Verifications: testReport
            });
            suiteStats.total++, execStats.total++;
            if (testContext.testResult.toLowerCase() == 'passed')
                suiteStats.passed++, execStats.passed++;
            else
                suiteStats.failed++, execStats.failed++;
        });
        executor.on('skip test', function (testContext) {
            suiteReport["Scripts"].push({
                Name: testContext.testName,
                Result: 'Not run',
                Retried: suiteStats.retried.has(testContext.testName),
                StartTime: 'N/A',
                EndTime: 'N/A',
                Elapsed: 'N/A',
                Verifications: []
            });
            suiteStats.total++, execStats.total++, suiteStats.notRun++, execStats.notRun++;
        });
        executor.on('end teardown', function (testContext, driver) {
            timers.suiteEnd = new Date();
            let suiteSummary = {
                Name: testContext.suiteName,
                Run_Started: timers.suiteStart.toLocaleString(),
                Elapsed: Reporter.msToTime(timers.suiteEnd.getTime() - timers.suiteStart.getTime()),
                TotalTests: suiteStats.total,
                Passed: suiteStats.passed,
                Failed: suiteStats.failed,
                Retried: suiteStats.retried.size,
                NotRun: suiteStats.notRun
            };
            suiteReport['Summary'] = suiteSummary;
            executionReport['Suites'].push(suiteSummary);
            if (es)
                es.putDoc(suiteReport);
            let path = Settings.getReportPath() + '/' + uid;
            if (!fs.existsSync(path))
                fs.mkdirSync(path);
            fs.writeFileSync(path + '/' + testContext.suiteName + '.json', JSON.stringify(suiteReport, null, 3));
        });
        executor.on('terminate', function () {
            timers.executionEnd = new Date();
            executionReport["Summary"] = {
                Run_Started: timers.executionStart.toLocaleString(),
                Elapsed: Reporter.msToTime(timers.executionEnd.getTime() - timers.executionStart.getTime()),
                TotalTests: execStats.total,
                Passed: execStats.passed,
                Failed: execStats.failed,
                Retried: execStats.retried.size,
                NotRun: execStats.notRun
            };
            _this.mailReport(executionReport);
            if (es)
                es.putDoc(executionReport);
            let path = Settings.getReportPath() + '/' + executionReport['ExecutionId'];
            fs.writeFileSync(path + '/' + executionReport['ExecutionId'] + '.json', JSON.stringify(executionReport, null, 3));
        });
    }
}
module.exports = Reporter;
