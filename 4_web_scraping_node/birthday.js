// Player's birthday

const url =
    "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
const path = require("path");


console.log("Player's birthday");
request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.error("error:", error);
    } else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let $ = cheerio.load(html);  

    let batsmanArr = $(".text-nowrap>a");
    for(let i=0;i<batsmanArr.length;i++){
        let playerName = $(batsmanArr[i]).text();
        let link = $(batsmanArr[i]).attr("href");
        link = "https://www.espncricinfo.com" + link ;
        
        getBirthdayFn(link, playerName);
    }

    
}


function getBirthdayFn(url, playerName){
    request(url, cb);
    function cb(error, response, html) {
        if (error) {
            console.error("error:", error);
        } else {
            extractBirthdat(html,playerName);
        }
    }
}

function extractBirthdat(html,playerName){
    let $ = cheerio.load(html);

    let playerDetails = $(".player-card-description");
    
    let birthDay = $(playerDetails[1]).text();

    console.log(`${playerName} was born on ${birthDay} `);
    
    
    
    
}