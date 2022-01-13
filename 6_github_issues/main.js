const url = "https://github.com/topics";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const getReposPage = require("./reposPage");

createDir( path.join(__dirname,"topics"));

request(url,cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log("page not found");
    }
    else {
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    let topicEleArr = $(".topic-box>a");
    for(let i=0;i<topicEleArr.length;i++){
        let link = $(topicEleArr[i]).attr("href");
        let topic = link.split('/')[2];
        link = `https://github.com/${link}`;
        // console.log(link);
        getReposPage(topic,link);
        console.log(`Issue file created for topic ${topic}`); 
    }
    

}

function createDir(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }   
}