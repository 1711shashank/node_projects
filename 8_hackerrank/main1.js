#!/usr/bin/env node
let puppeteer = require("puppeteer");
let codeObj = require("./codes.js");

let url = "https://www.hackerrank.com/auth/login";

// Async -await 
(async function automation(){
    try{
        let browserInstance = await puppeteer.launch({ headless:false, defaultViewport:null, args:["--start-maximized"] });
        let newTab = await browserInstance.newPage();
        await newTab.goto(url);
        await newTab.type("input[type='text']","login@gmail.com", {delay:50});
        await newTab.type("input[type='password']","apnappg@1234", {delay:50});
        await newTab.click("button[type='submit']");
        await waitAndClick("a[data-attr1='algorithms']", newTab);
        await waitAndClick("input[value='warmup']", newTab, {delay:100});
        let questionArr = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        await questionSolver(newTab, questionArr[0], codeObj.answer[0]);
    }
    catch(error){
        console.log(error);
    }
})();

async function waitAndClick(selector, currpage){
    await currpage.waitForSelector(selector);
    return currpage.click(selector);
}


async function questionSolver(page, question, answer){
    try {
        await question.click();
        await waitAndClick('.monaco-editor.no-user-select.vs',page);
        await waitAndClick('.checkbox-input', page);
        await page.waitForSelector('#input-1', page);
        await page.type('#input-1',answer);
        await page.keyboard.down('Control');
        await page.keyboard.press('A',{delay:500});
        await page.keyboard.press('X',{delay:500});
        await page.keyboard.up('Control');
        await page.click('.hr-monaco-editor');
        await page.keyboard.down('Control');
        await page.keyboard.press('A',{delay:500});
        await page.keyboard.press('V',{delay:500});
        await page.keyboard.up('Control');
        await page.click('.hr-monaco-submit');
        
    } catch (error) {
        console.log(error);
        
    }




}