const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const AllmatchObj = require("./Allmatche");


createDir( path.join(__dirname,"ipl") );

request(url,cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    let anchorEle = $("a[data-hover='View All Results']");
    let link = $(anchorEle).attr("href");
    link = "https://www.espncricinfo.com" +link;
    // console.log(link);
    AllmatchObj.gAlmatches(link);
}


function createDir(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }   
}
