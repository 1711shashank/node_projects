// last ball commentary

const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary';

console.log("last ball commentary");
request(url, cb);

function cb(error, response, html) {
    if(error){
        console.error('error:', error);
    }
    else{
        handleHtml(html);
    }
}

function handleHtml(html){
    let $ = cheerio.load(html);
    let elementArr = $(".d-flex.match-comment-padder .match-comment-long-text");
    let text = $(elementArr[0]).text();
    console.log(text);
}