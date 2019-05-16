declare class Settings {
    static getDefaultConfig(): any;
    static getUserConfig(): any;
    static getRetryCount(): number;
    static getBrowser(): string;
    static logLevel(): string;
    static getLogPath(): string;
    static getReportPath(): string;
    static getLogLevel(): string;
    static getTimeout(): number;
    static writeToDB(): boolean;
    static getDBHost(): string;
    static getPlatform(): string;
    static getProduct(): string;
    static getProductVersion(): string;
    static getBuildId(): string;
    static getTeamName(): string;
    static getElectronServer(): any;
    static getElectronCapabilities(): any;
    static getMailOptions(): any;
}
export = Settings;
