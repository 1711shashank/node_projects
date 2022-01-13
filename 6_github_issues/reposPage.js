// const url = "https://github.com/topics/hacktoberfest";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const getIssuesPage = require("./issues");

function getReposPage(topic,url) {
    createDir( path.join(__dirname,"topics",topic));

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
        let repoEleArr = $("nav[aria-label='Repository menu']>ul");
        // console.log(topic);
        for(let i=0;i<3;i++){
            let headerCards = $(repoEleArr[i]).find("li").find("a");
            let issueEle = $(headerCards)[1];
            let issueLink = $(issueEle).attr("href");
            let repoName = issueLink.split('/')[2];
            issueLink = "https://github.com"+issueLink;
            // console.log(issueLink);
            // console.log(repoName);
            getIssuesPage(topic,repoName,issueLink);
        }
    
    }
} 
function createDir(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }   
}




module.exports = getReposPage;