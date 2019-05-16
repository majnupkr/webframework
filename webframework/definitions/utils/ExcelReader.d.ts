export declare class ExcelReader {
    static readExcelSheet(fileName: string, sheet?: string): {
        [column: string]: any;
    }[];
}
