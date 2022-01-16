// pptr.dev
// flaviocopes.com/puppeteer
// nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples

const puppeteer = require("puppeteer");
let page;
console.log("Before");
const browserOpenPromise = puppeteer.launch({
    headless: false, 
    defaultViewport: null,
    args: ["--start-maximized"]

});

browserOpenPromise
    .then(function (browser){
        const pageArrPromise = browser.pages();        //currently open tab
        return pageArrPromise;
        // console.log("Browser Opened");
    }).then(function(browserPage){
        // 1st tab in the browser
        page = browserPage[0];
        const gotoPagePromise = page.goto("https://www.google.com");
        return gotoPagePromise;
    }).then(function(){
        // type int the search bar 
        const keyWillBeSendPromise = page.type("input[type='text']","pepcoding");
        return keyWillBeSendPromise;
    }).then(function(){
        // press enter 
        const enterWillBePreased = page.keyboard.press("Enter");
        return enterWillBePreased;
    }).then(function(){
            let elementWaitPromise = page.waitForSelector("h3.LC20lb.DKV0Md");
            return elementWaitPromise;
    }).then(function(){
        const keyWillBeSendPromise = page.click("h3.LC20lb.DKV0Md");
        return keyWillBeSendPromise;
    }).catch(function(err){
        console.log(err);
    })




console.log("After");
