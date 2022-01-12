const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx=require("xlsx");

// url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
function processScorecard(url) {
    request(url, cb);
}
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractMatchDetails(html);
    }
}

//  Venue date opponent result runs balls fours sixes sr
    // ipl 
    // team 
    //     player 
    //         runs balls fours sixes sr opponent venue date  result
    // venue date 
    // .event .description
    // result ->  .event.status - text
function extractMatchDetails(html) {
    let $ = cheerio.load(html);

    let result = $('.event .status-text').text();
    let descriptionArr = $(".header-info .description").text().split(',');
    let venue = descriptionArr[1].trim();
    let date = descriptionArr[2].trim();

    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");

    for(let i=0;i<innings.length;i++){
        let opponentIndex = (i==0)?1:0;

        let teamName = $(innings[i]).find("h5").text()
        teamName = teamName.split("INNINGS")[0].trim();

        let opponentName = $(innings[opponentIndex]).find("h5").text()
        opponentName = opponentName.split("INNINGS")[0].trim();

        console.log(`${venue}| ${date} |${teamName}| ${opponentName} |${result}`);

        let inning = $(innings[i]);
        let allRows = $(inning).find(".table.batsman tbody tr");
        for(let j=0;j<allRows.length;j++){
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if(isWorthy){
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);

                processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result);
            }
        }
    }
}

function processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result){
    let teamPath = path.join(__dirname,"ipl", teamName);
    createDir(teamPath);

    let filePath = path.join(teamPath,playerName+".xlsx");
    let content = excelReader(filePath,playerName);
    let playerObj = { 
        teamName,
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentName,
        venue,
        date,
        result
    }
    content.push(playerObj);
    excelWriter(filePath,content,playerName);
}

function createDir(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }   
}
function excelWriter(filePath, json, sheetName){
    let newWB = xlsx.utils.book_new();                          // create  new worksheet 
    let newWS = xlsx.utils.json_to_sheet(json);                 // json data -> excel format convert
    xlsx.utils.book_append_sheet(newWB,newWS,sheetName);        //add
    xlsx.writeFile(newWB, filePath);                            // overwrite
}
function excelReader(filePath, sheetName){
    if(!fs.existsSync(filePath)){
        return [];
    }
    let wb = xlsx.readFile(filePath);
    let excelData = wb.Sheets[sheetName];
    let ansData = xlsx.utils.sheet_to_json(excelData);

    // console.log(excelData);
    return ansData;
}

module.exports = {
    ps: processScorecard
}