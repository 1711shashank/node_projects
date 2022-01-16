#!/usr/bin/env node
const { futimesSync } = require("fs");
const puppeteer = require("puppeteer");

const url = "https://www.hackerrank.com/auth/login";


console.log("Before");
const browserOpenPromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    // args:["--start-maximized"]
});
let page;
browserOpenPromise
    .then(function(browser){
        const pageArrPromise = browser.pages();
        return pageArrPromise;
    }).then(function(browserPage){
        page = browserPage[0];
        const gotoPagePromise = page.goto(url);
        return gotoPagePromise;
    }).then(function(){
        const enterEmailPromise = page.type("input[type='text']","login@gmail.com");
        return enterEmailPromise;
    }).then(function(){
        const enterPasswordPromise = page.type("input[type='password']","apnappg@1234");
        return enterPasswordPromise;
    }).then(function(){
        const clickLogInButtonPromise = page.click("button[type='submit']");
        return clickLogInButtonPromise;
    }).then(function(){
        const clickAlogPromise = waitAndClick("a[data-attr1='algorithms']",page);
        return clickAlogPromise;
    }).then(function(){
        const clickWarmUpPromise = waitAndClick("input[value='warmup']",page);
        return clickWarmUpPromise;
    })
    .then(function(){
        const waitfor3Seconds = page.waitFor(3000);
        return waitfor3Seconds;
    }).then(function(){
        const clickPromise = waitAndClick(".challenge-submit-btn",page);
        return clickPromise;
    })
    // .then(function(){
    //     const waitfor3Seconds = page.waitFor(3000);
    //     return waitfor3Seconds;
    // })
    // .then(function(){
    //     const clickTestInputPromise = waitAndClick("input[type='checkbox']",page);
    //     return clickTestInputPromise;
    // })

    



function waitAndClick(selector, currpage){
    const waitForPageToLoadPromise = page.waitForSelector(selector);
    waitForPageToLoadPromise
        .then(function(){
            const clickOnSelectorPromise = currpage.click(selector);
            return clickOnSelectorPromise;
        }).catch(function(err){
            console.log(err);
        })
}

function waitAndType(selector,text, currpage){
    const waitForPageToLoadPromise = page.waitForSelector(selector);
    waitForPageToLoadPromise
        .then(function(){
            const typeOnSelectorPromise = currpage.type(selector,text);
            return typeOnSelectorPromise;
        }).catch(function(err){
            console.log(err);
        })
}