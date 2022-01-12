#!/usr/bin/env node
let fs = require("fs");

// input
inputArr = process.argv.slice(2);

let optionArr = [];
let fileArr = [];
for(let i=0; i<inputArr.length; i++){
    if(inputArr[i].charAt(0) == '-'){
        optionArr.push(inputArr[i]);
    }
    else{
        fileArr.push(inputArr[i]);
    }
}

//invalid file name
for(let i=0;i<fileArr.length;i++){
    if(fs.existsSync(fileArr[i]) == false){
        console.log(`file ${fileArr[i]} does not exist`);
        return;
    }
}
// -n -b
if(optionArr.includes("-b") && optionArr.includes("-n")){
    console.log("Please enter either -b or -n");
    return;
}

let content ="";
for(let i=0;i<fileArr.length;i++){
    content += fs.readFileSync(fileArr[i]) + "\n";
}

let contentArr = content.split("\n");

// -s
let ifSPresent = optionArr.includes("-s");
if(ifSPresent){
    for(let i=contentArr.length-2; i>=0; i--){
        if(contentArr[i] == '' && contentArr[i+1] == ''){
            contentArr[i+1] = null;
        }
    }
    let tempArr = [];
    for(let i=0;i<contentArr.length; i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

// -n
let ifNPresent = optionArr.includes("-n");
if(ifNPresent){

    for(let i=0;i<contentArr.length; i++){
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}

// -b
let ifBPresent = optionArr.includes("-b");
if(ifBPresent){
    let count=1;
    for(let i=0;i<contentArr.length; i++){
        if(contentArr[i] != '' && contentArr[i] != null){
            contentArr[i] = `${count+1} ${contentArr[i]}`;
            count++;
        }
    }
}


console.log(contentArr.join("\n"));
