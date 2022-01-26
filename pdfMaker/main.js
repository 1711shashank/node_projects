const fs = require('fs');
const path = require("path");
const pdfkit = require("pdfkit");
const { Image } = require('image-js');


(async function pdfMaker(){
   try{
      let photosPath = path.join(__dirname,'photos');
      let imageArr = await readPhotosFn(photosPath);

      await createPdfFn(imageArr);

   }
   catch(err){
      console.log(err);
   }
   
})()


async function createPdfFn(imageArr){
   
   let pdfPath = path.join(__dirname, "photos"+".pdf");
   let pdf = new pdfkit();
   pdf.pipe(fs.createWriteStream(pdfPath));

   for(let i=0;i<imageArr.length;i++){
      let testImage = imageArr[i];
      let orientation = await findImageOrientationFn(testImage);
      // console.log(orientation);

      if(i == 0){
         if(orientation == 'portrait'){
            pdf.image(testImage, {fit: [700,600]});
         }
         else{
            pdf.image(testImage, {fit: [400,400]});
         }
      } else {
         if(orientation == 'portrait'){
            pdf.addPage().image(testImage, {fit: [700,600]});
         }
         else{
            pdf.addPage().image(testImage, 110,60, {fit: [400,400]});
         }
      }
   }

   pdf.end();
}

async function findImageOrientationFn(img) {
   try{
      let pic = await Image.load(img);
      let orientation = await cb(pic);
      function cb(img){
         if(img.width > img.height) return 'landscape';
         else if(img.width < img.height) return'portrait';
         else return 'even';
      }
      return orientation;
   }
   catch(err){
      console.log(err);
   }
}

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
   if(ext == 'jpg' || ext == 'png' || ext == 'jpeg') return true;
   else return false;
}

