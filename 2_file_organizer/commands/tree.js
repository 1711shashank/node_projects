let fs = require("fs"); 
let path = require('path');
function treeFn(dirPath){
    if(dirPath == undefined){
        createTreeFn(process.cwd(), "");
        return;
    }

    let doesExist = fs.existsSync(dirPath);
    if(!doesExist){
        console.log("Enter Valid Path");
        return;
    }

    createTreeFn(dirPath,"");
}
function createTreeFn(dirPath, indent){

    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile == true){
        let fileName = path.basename(dirPath);
        console.log(indent + "|--" + fileName);
        return;
    }
    else{
        let dirName = path.basename(dirPath);
        console.log(indent + "|__" + dirName);

        let childrens = fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childPath = path.join(dirPath, childrens[i]);
            createTreeFn(childPath, indent + "\t"); 
        }

    }


}


module.exports = {
    treeKey: treeFn
}



