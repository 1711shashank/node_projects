// const url = "https://github.com/facebook/create-react-app/issues";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuesPage(topic,repoName,url) {


    request(url, cb);
    function cb(err, response, html) {
        if(err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        }
        else {
            getIssue(html);
            // console.log(html);
        }
    }
    function getIssue(html){
        let $ = cheerio.load(html);
        let issueEleArr = $(".d-flex.Box-row--drag-hide.position-relative");
        let arr = [];
        for(let i=0;i<issueEleArr.length;i++){
            let issueLink = $(issueEleArr[i]).find("a").attr("href");
            issueLink = "https://github.com"+issueLink;
            // console.log(issueLink);
            arr.push(issueLink);
        }
        // console.log(arr);
        let dirPath = path.join(__dirname,"topics",topic);
        createDir(dirPath);
        let filePath = path.join(dirPath,repoName+".pdf");
        let issueText = JSON.stringify(arr);

        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(issueText);
        pdfDoc.end();

        
    }
    
}

function createDir(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }   
}

module.exports = getIssuesPage;