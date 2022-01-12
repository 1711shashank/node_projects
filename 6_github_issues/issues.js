// const url = "https://github.com/facebook/create-react-app/issues";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

function getIssuesPage(url) {

    request(url, cb);
    function cb(err, response, html) {
        if(err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        }
        else {
            extractLink(html);
            // console.log(html);
        }
    }
    function extractLink(html){
        let $ = cheerio.load(html);
        let issueEleArr = $(".d-flex.Box-row--drag-hide.position-relative");
        for(let i=0;i<issueEleArr.length;i++){
            let issueLink = $(issueEleArr[i]).find("a").attr("href");
            issueLink = `https://github.com/${issueLink}`;
            console.log(issueLink);

        }
        
        

    }
}

module.exports = getIssuesPage;