const request = require("request");
const cheerio = require("cheerio");
const scoreCardObj = require("./scorecard");

function getAllMatchesLink(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            extractAllLinks(html);
        }
    })
}

function extractAllLinks(html){
    let $ = cheerio.load(html);
    let scoreCardArr = $("a[data-hover='Scorecard']");
    
    for(let i=0;i<scoreCardArr.length;i++){
        let scoreCardLink = $(scoreCardArr[i]).attr("href");
        scoreCardLink = "https://www.espncricinfo.com"+scoreCardLink;
        
        // console.log(scoreCardLink);
        scoreCardObj.ps(scoreCardLink);
    }

}

module.exports = {
    gAlmatches: getAllMatchesLink
}