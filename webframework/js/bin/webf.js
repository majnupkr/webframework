#!/usr/bin/env node
"use strict";
const path = require("path");
var args = [path.join(__dirname, 'launcher.js')];
var spawn = require('child_process').spawn;
if (process.argv.indexOf('--debug-brk') != -1)
    args.unshift('--debug-brk');
else if (process.argv.indexOf('--debug') != -1)
    args.unshift('--debug');
args.push(...process.argv.slice(2));
var proc = spawn(process.execPath, args, { stdio: 'inherit' });
process.on('SIGINT', function () {
    proc.kill('SIGINT');
    proc.kill('SIGTERM');
});
proc.on('exit', function (code, signal) {
    process.on('exit', function () {
        if (signal) {
            process.kill(process.pid, signal);
        }
        else {
            process.exit(code);
        }
    });
});
