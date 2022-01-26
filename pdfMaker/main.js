const fs = require('fs');
const path = require("path");
const pdfkit = require("pdfkit");


let photosPath = path.join(__dirname,'photos');
let imageArr = readPhotosFn(photosPath);
createPdfFn();



function readPhotosFn(dirPath){
   let photosArr = [];
   let fileNames = fs.readdirSync(dirPath);
   for(let i=0;i<fileNames.length;i++){
      let fileAddres = path.join(dirPath, fileNames[i]);
      let isFile = fs.lstatSync(fileAddres).isFile();
      if(isFile){
         let isPhoto = checkForPhotoFn(fileNames[i]);
         if(isPhoto){
            photosArr.push("./photos/" + fileNames[i]);
         }
      }
   }
   return photosArr;
}
function checkForPhotoFn(fileAddres){
   let ext = path.extname(fileAddres);
   ext = ext.slice(1);
   if(ext == 'jpg' || ext == 'png') return true;
   else return false;
}

function createPdfFn(){
   
   let pdfPath = path.join(__dirname, "photos"+".pdf");

   let pdf = new pdfkit();
   pdf.pipe(fs.createWriteStream(pdfPath));

   // let imageArr = ["./image1.jpg"];

   pdf.image(imageArr[0], 50, 50, {fit: [500, 500]}) // add page in not needed for the 1st image
   for(let i=1;i<imageArr.length;i++){
      pdf.addPage().image(imageArr[i], 50, 50, {fit: [500, 500]})
   }

   pdf.end();

}









// inside for loop
// pdf.addPage().image(imageArr[i], 50, 50, {cover: [pdf.page.width - 100, pdf.page.height - 300], fit: [300, 300]})
