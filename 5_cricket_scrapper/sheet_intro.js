let fs = require("fs");
let xlsx = require("xlsx");

let data = require("./example.json");


// wb-> filePath, ws -> name, json data 

function excelWriter(filePath, json, sheetName){
    let newWB = xlsx.utils.book_new();                          // create  new worksheet 
    let newWS = xlsx.utils.json_to_sheet(json);                 // json data -> excel format convert
    xlsx.utils.book_append_sheet(newWB,newWS,sheetName);        //add
    xlsx.writeFile(newWB, filePath);                            // overwrite
}

function excelReader(filePath, sheetName){
    if(fs.existsSync(filePath) == false){
        return [];
    }
    let wb = xlsx.readFile(filePath);
    let excelData = wb.Sheets[sheetName];
    let ansData = xlsx.utils.sheet_add_json(excelData);

    // console.log(excelData);
    return ansData;
}