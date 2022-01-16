#!/usr/bin/env node
let puppeteer = require("puppeteer");
let codeObj = require("./codes.js");

let url = "https://www.hackerrank.com/auth/login";


// console.log("Before");
let browserOpenPromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});
let page;
browserOpenPromise
    .then(function(browser){
        let pageArrPromise = browser.pages();
        return pageArrPromise;
    }).then(function(browserPage){
        page = browserPage[0];
        let gotoPagePromise = page.goto(url);
        return gotoPagePromise;
    }).then(function(){
        let enterEmailPromise = page.type("input[type='text']","login@gmail.com",{delay:50});
        return enterEmailPromise;
    }).then(function(){
        let enterPasswordPromise = page.type("input[type='password']","apnappg@1234",{delay:50});
        return enterPasswordPromise;
    }).then(function(){
        let clickLogInButtonPromise = page.click("button[type='submit']");
        return clickLogInButtonPromise;
    }).then(function(){
        let clickAlogPromise = waitAndClick("a[data-attr1='algorithms']",page);
        return clickAlogPromise;
    }).then(function(){
        let clickWarmUpPromise = waitAndClick("input[value='warmup']",page,{delay:100});
        return clickWarmUpPromise;
    }).then(function(){
        let waitforfewSeconds = page.waitFor(1000);
        return waitforfewSeconds;
    })
    .then(function(){
        let gotoPagePromise = page.goto("https://www.hackerrank.com/challenges/solve-me-first/problem?isFullScreen=true");
        return gotoPagePromise;
    }).then(function(){
        let clickTestInputPromise = waitAndClick("input[type='checkbox']",page);
        return clickTestInputPromise;
    }).then(function(){
        let typeCodePromise = waitAndCode("#input-1",codeObj.answer[0],page);
        return typeCodePromise;
    }).then(function(){
        let waitforfewSeconds = page.waitFor(1000);
        return waitforfewSeconds;
    }).then(function(){
        let ctrlIsPressPromise = page.keyboard.down('Control');
        return ctrlIsPressPromise;
    }).then(function(){
        let AIsPressedPromise = page.keyboard.press('A');
        return AIsPressedPromise;
    }).then(function(){
        let XIsPressedPromise = page.keyboard.press('X',{delay:50});
        return XIsPressedPromise;
    }).then(function(){
        let ctrlIsUnPressPromise = page.keyboard.up('Control');
        return ctrlIsUnPressPromise;
    }).then(function(){
        let mainEditerPromise = page.click('.hr-monaco-editor');
        return mainEditerPromise;
    }).then(function(){
        let ctrlIsPressPromise = page.keyboard.down('Control');
        return ctrlIsPressPromise;
    }).then(function(){
        let AIsPressedPromise = page.keyboard.press('A');
        return AIsPressedPromise;
    }).then(function(){
        let VIsPressedPromise = page.keyboard.press('V',{delay:50});
        return VIsPressedPromise;
    }).then(function(){
        let ctrlIsUnPressPromise = page.keyboard.up('Control');
        return ctrlIsUnPressPromise;
    }).then(function(){
        let waitforfewSeconds = page.waitFor(1000);
        return waitforfewSeconds;
    }).then(function(){
        let clickSubmitPromise = page.click('.hr-monaco-submit');
        return clickSubmitPromise;
    }).then(function(){
        resolve();
    })
    .catch(function(err){
        console.log(err);
    })





    
    
    
    
    






function waitAndClick(selector, currpage){
    return new Promise(function(resolve, reject){
        let waitForPageToLoadPromise = currpage.waitForSelector(selector);
        waitForPageToLoadPromise
            .then(function(){
                let clickModal = currpage.click(selector);
                return clickModal;
            }).then(function(){
                resolve();
            }).catch(function(err){
                reject();
            })

    })
}
function waitAndCode(selector, text, currpage){
    return new Promise(function(resolve, reject){
        let waitForPageToLoadPromise = page.waitForSelector(selector);
        waitForPageToLoadPromise
            .then(function(){
                let typeOnSelectorPromise = currpage.type(selector,text,{delay:5});
                return typeOnSelectorPromise;
            }).then(function(){
                resolve();
            }).catch(function(err){
                reject();
            })
    })
    
}









// function waitAndClick(selector, currpage){
//     let waitForPageToLoadPromise = page.waitForSelector(selector);
//     waitForPageToLoadPromise
//         .then(function(){
//             let clickOnSelectorPromise = currpage.click(selector);
//             return clickOnSelectorPromise;
//         }).catch(function(err){
//             console.log(err);
//         })
// }

// function waitAndType(selector, text, currpage){
//     let waitForPageToLoadPromise = page.waitForSelector(selector);
//     waitForPageToLoadPromise
//         .then(function(){
//             let typeOnSelectorPromise = currpage.type(selector,text,{delay:100});
//             return typeOnSelectorPromise;
//         }).catch(function(err){
//             console.log(err);
//         })
// }