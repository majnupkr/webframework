"use strict";
const XLSX = require("xlsx");
class ExcelReader {
    // Default value is 0 which is the first sheet
    static readExcelSheet(fileName, sheet) {
        let workbook = XLSX.readFile(fileName);
        if (sheet) {
            return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        }
        return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    }
}
exports.ExcelReader = ExcelReader;
