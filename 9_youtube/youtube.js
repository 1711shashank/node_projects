#!/usr/bin/env node
let puppeteer = require("puppeteer");
const pdf = require('pdfkit');
const fs = require('fs');
const url = 'https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq';

let page;
(async function(){
    try {
        let browserInstance = await puppeteer.launch({ headless:false, defaultViewport:null, args:["--start-maximized"] });
        let tabs = await browserInstance.pages();
        page = tabs[0];
        await page.goto(url);
        await page.waitForSelector('h1#title');

        let playlistTitle = await page.evaluate( function (select){return document.querySelector(select).innerText}, 'h1#title');
        let playlistData = await page.evaluate( getPlaylistData, '#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer');
        console.log(playlistTitle, playlistData.onOfVideos, playlistData.onOfViews);
        
        let totalVideo = playlistData.onOfVideos.split(" ")[0];     // total number of videoes in the playlist
        let currLoadedVideo = await getNoOfVideosLoaded();          // number of videoes loaded in one snap

        //scrolling page till the last video
        while (totalVideo - currLoadedVideo >= 20) {
            await scrollToBottom();
            currLoadedVideo = await getNoOfVideosLoaded();
        }


        // vidoes data for the pdf
        let finalList = await getList();

        // create pdf file 
        let pdfDoc = new pdf();
        pdfDoc.pipe(fs.createWriteStream("playlistData.pdf"));
        pdfDoc.text(JSON.stringify(finalList));
        pdfDoc.end();


        console.log("PDF Created");
    } catch (error) {
        console.log(error);
    }

})();



async function getList(){
    let list = await page.evaluate(getNameAndDuration, "#video-title" ,"#container>#thumbnail .style-scope ytd-thumbnail-overlay-time-status-renderer"); // (function, selector1, selector2)
    return list;
}
function getNameAndDuration(videoSelector, durationSelector){
    let videoEle = document.querySelectorAll(videoSelector);
    let durationEle = document.querySelectorAll(durationSelector);

    let currList = [];
    for(let i=0; i<durationEle.length; i++){
        let videoTitle = videoEle[i].innerText;
        let durationTitle = durationEle[i].innerText;
        currList.push({videoTitle,durationTitle});
    }
    return currList;
}


function getNoOfVideosLoaded(){
    return page.evaluate( getNoOfvideos,'.style-scope ytd-playlist-video-list-renderer #index-container');    
}
function getNoOfvideos(videosEleArr){
    return document.querySelectorAll(videosEleArr).length;
}


function getPlaylistData(selecter){
    let allData = document.querySelectorAll(selecter);
    let onOfVideos = allData[0].innerText;
    let onOfViews = allData[1].innerText;

    return{
        onOfVideos,
        onOfViews   
    }

}


async function scrollToBottom(){
    await page.evaluate(gotoBottom);
    function gotoBottom(){
        window.scrollBy(0,window.innerHeight);
    }
}