"use strict";
const fs = require("fs");
var join = require('path').join;
let moduleRootPath = __filename.substr(0, __filename.lastIndexOf('js\\bin'));
let exes = ['chromedriver.exe', 'geckodriver.exe'];
let projectRootPath = process.cwd();
["config", "inputData", "output", "output\\logs",
    "src", "src\\pages", "src\\repository", "src\\testCases", "src\\testSuites", "src\\utilities"].forEach(element => {
    if (!fs.existsSync(join(projectRootPath, element))) {
        fs.mkdirSync(join(projectRootPath, element));
    }
    else {
        console.log(element + " already exists");
    }
});
exes.forEach(file => {
    try {
        // fs.renameSync(join(moduleRootPath, file), join(projectRootPath, file))
        fs.createReadStream(join(moduleRootPath, file)).pipe(fs.createWriteStream(join(projectRootPath, file)));
    }
    catch (ex) {
    }
});
if (!fs.existsSync(join(projectRootPath, "config/config.json"))) {
    let source = fs.createReadStream(join(moduleRootPath, '/js/lib/metadata/config.json'));
    let dest = fs.createWriteStream(join(projectRootPath, "config/config.json"));
    source.on('error', (err) => {
        console.log('Error reading metadata');
        console.log(moduleRootPath);
    });
    dest.on('error', (err) => {
        console.log('Error reading metadata');
    });
    source.pipe(dest);
}
else
    console.log("Config File Already exists");
