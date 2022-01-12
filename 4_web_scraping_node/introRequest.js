const request = require('request');
const cheerio = require('cheerio');
// const chalk = require("chalk");

console.log("Before");
request('https://www.worldometers.info/coronavirus', cb);
console.log("After");

function cb(error, response, html) {
    if(error){
        console.error('error:', error);
    }
    else{
        handleHtml(html);
    }
}
function handleHtml(html){
    let selTool = cheerio.load(html); 
    let contentArr = selTool(".maincounter-number span");

    // [] -> wrap selTool
    let total = selTool(contentArr[0]).text();
    let deaths = selTool(contentArr[1]).text();
    let recovered = selTool(contentArr[2]).text();

    
    console.log("Deaths: "+deaths);
    console.log("Recovery : "+recovered);
    console.log("Total Cases: "+total);

}