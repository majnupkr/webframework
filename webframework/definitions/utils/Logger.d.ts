/// <reference types="node" />
import events = require('events');
export declare type LogLevel = 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL' | 'OFF';
export declare type Metadata = {
    'eventType': 'action' | 'validation' | 'error' | 'hook';
    'eventTitle': string;
    'state': 'starting' | 'started' | 'finished' | 'passed' | 'failed';
    'error'?: Error;
    [prop: string]: any;
};
export declare class Logger {
    private logger;
    private name;
    private id;
    private esLogger;
    static logEmitter: events.EventEmitter;
    /**
     * Creates a logger if name is unique otherwise returns the logger with the name
     * @param name name of the log file
     * @param destination folder name. This parameter specifies single folder and not a path
     */
    constructor(name: string, id: string);
    setLogLevel(level: LogLevel): void;
    private _log(level, message, data);
    debug(message: string, data?: Metadata): void;
    info(message: string, data?: Metadata): void;
    warn(message: string, data?: Metadata): void;
    error(message: string, data?: Metadata): void;
    fatal(message: string, data?: Metadata): void;
    dispose(): void;
}
