let fs = require("fs"); 
let path = require('path');


let types = {
    media: ["mp4", "mkv"],
    picture: ['png','jpg','jpeg'],
    document: ['docx', 'doc', 'pdf','js', 'txt'],
    software: ['exe', 'dmg']
}

function organizeFn(dirPath){

    if(dirPath == undefined){
        dirPath = process.cwd();
    }

    let doesExist = fs.existsSync(dirPath);
    if(!doesExist){
        console.log("Enter Valid Path");
        return;
    }

    let fileNames = fs.readdirSync(dirPath);

    for(let i=0;i<fileNames.length;i++){
        let fileAddres = path.join(dirPath, fileNames[i]);
        let isFile = fs.lstatSync(fileAddres).isFile();      //lstatSync give the last filename
        if(isFile){
            let category = getCategoryFn(fileNames[i]);
            sendFileFn(dirPath, category, fileAddres);
        }
    }
    
}
function sendFileFn(srcPath, category, srcFileAddres,){       // (drive, photo, drive/pic.jpg) 

    if(!fs.existsSync(category)){
        fs.mkdirSync(category);
    }

    let categoryPath = path.join(srcPath, category);            // drive/photo
    let fileName = path.basename(srcFileAddres);                // pic.jpg
    let destFileAddres = path.join(categoryPath, fileName);     // drive/photo/pic.jpg

    fs.copyFileSync(srcFileAddres,destFileAddres);

}
function getCategoryFn(fileAddres){
    let ext = path.extname(fileAddres);
    ext = ext.slice(1);

    for(let type in types){
        let typeArray = types[type];
        for(let i=0;i<typeArray.length; i++){
            if(typeArray[i] == ext){
                return type;
            }
        }
    }
    return "others";
}

module.exports = {
    organizeKey: organizeFn
}