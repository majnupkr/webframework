#!/usr/bin/env node
"use strict";
const Mocha = require("mocha");
const program = require("commander");
const fs = require("fs");
const path = require("path");
const child_proc = require("child_process");
const Settings = require("../lib/metadata/Settings");
var Executor = require('../lib/Executor').Executor;
program['_name'] = 'webf';
program
    .usage('[debug] [options] [files]')
    .option('--tags <tag1,tag2...>', 'Run tests having at least one of the given tags')
    .option('--reporter <name>', 'Reporter to use', 'default')
    .option('--debug-brk', "Enable node's debugger breaking on the first line")
    .option('--debug', "Enable node's debugger")
    .option('--post-exec <file>', "Worker to run after test execution");
program.command('init')
    .description('--Creates necessary files and folders')
    .action(function () {
    child_proc.spawnSync(process.execPath, [path.join(__dirname, 'init.js')], { stdio: 'inherit' });
    process.exit(0);
});
let mocha = new Mocha();
let reporter;
let postExec;
program.parse(process.argv);
try {
    reporter = require('../reporters/' + program['reporter']);
}
catch (ex) {
    if (ex.message.indexOf('Cannot find module') != -1) {
        try {
            reporter = require(path.resolve(program['reporter']));
        }
        catch (ex2) {
            console.log('Error loading reporter: ' + program['reporter']);
            throw ex2;
        }
    }
}
if (program.args.length == 0)
    program.args.push(process.cwd());
if (program['debugBrk'] || program['debug'])
    Settings.getUserConfig().writeToDB = false;
program.args.forEach(loc => {
    let locType = fs.statSync(loc);
    if (locType.isDirectory()) {
        fs.readdirSync(loc).forEach(file => {
            if (file.endsWith('.js'))
                mocha.addFile(path.join(loc, file));
        });
    }
    else if (locType.isFile() && loc.endsWith('.js'))
        mocha.addFile(loc);
});
if (program['tags']) {
    mocha.grep(program['tags'].replace(/\s/g, '').replace(',', '|'));
}
if (program['postExec']) {
    try {
        postExec = require(path.resolve(program['postExec']));
    }
    catch (ex) {
        console.log(ex);
    }
}
Executor.init(reporter);
mocha.run(function () {
    Executor.done();
    postExec && postExec(Executor.getUid());
});
