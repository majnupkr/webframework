/**
 * Used to store test information at runtime
 */
export declare class TestContext {
    suiteName: string;
    data: any;
    testName: string;
    file: string;
    _hookfailed: boolean;
    testResult: string;
    hasTimedOut: boolean;
    duration: number;
}
/**
 * Supported data source types for input data
 */
export declare enum DataSource {
    Excel = 0,
}
/**
 * Verifies conditions in unit tests using true/false propositions.
 */
export declare class Assert {
    static areEqual: (act: any, exp: any, msg?: string) => void;
    static areNotEqual: (act: any, exp: any, msg?: string) => void;
    static areDeepEqual: (act: any, exp: any, msg?: string) => void;
    static notDeepEqual: (act: any, exp: any, msg?: string) => void;
    static isTrue: (val: any, msg?: string) => void;
    static isFalse(value: boolean, message?: string): void;
    static isNull(value: any, message?: string): void;
    static isNotNull(value: any, message?: string): void;
    static fail(message?: string): void;
    static isNaN(value: any, message?: string): void;
    static isNotNaN(value: any, message?: string): void;
}
