const fs = require('fs');
const path = require("path");
const pdfkit = require("pdfkit");
const { Image } = require('image-js');

//self calling function
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


// This function create the PDF file
async function createPdfFn(imageArr){
   
   let pdfPath = path.join(__dirname, "photos"+".pdf");  // location to save the pdf
   let pdf = new pdfkit();                               // pdf object
   pdf.pipe(fs.createWriteStream(pdfPath));              

   for(let i=0;i<imageArr.length;i++){
      let img = "./photos/" + imageArr[i];
      let orientation = await findImageOrientationFn(img);     // landscape or portrait

      // addPage() is not needed for the 1st image as its allready been created
      if(i == 0){

         // pdf.image(img, (orientation == 'portrait') ? {fit: [650,650]} : {fit: [400,400]} );
         // OR
         
         if(orientation == 'portrait'){
            pdf.image(img, {fit: [650,650]});
         }
         else{
            pdf.image(img, {fit: [400,400]});
         }
      } 
      else {
         if(orientation == 'portrait'){
            pdf.addPage().image(img, {fit: [650,650]});
         }
         else{
            pdf.addPage().image(img, 110,60, {fit: [400,400]});
         }
      }

      console.log("Image added in the PDF is :", imageArr[i] );
   }
   console.log("~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("PDF created sucessfully");
   console.log("~~~~~~~~~~~~~~~~~~~~~~~");

   pdf.end();
}


//This fuunction find the Orientation of the image
async function findImageOrientationFn(img) {
   try{
      let pic = await Image.load(img); 
      let orientation = await imageOrientationFn(pic);
      function imageOrientationFn(img){
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


// This function insert all the image in an array of the given folder
function readPhotosFn(dirPath){
   let photosArr = [];
   let fileNames = fs.readdirSync(dirPath);
   for(let i=0;i<fileNames.length;i++){
      let fileAddres = path.join(dirPath, fileNames[i]);
      let isFile = fs.lstatSync(fileAddres).isFile();
      if(isFile){
         let isPhoto = checkForPhotoFn(fileNames[i]);
         if(isPhoto){
            photosArr.push(fileNames[i]);
         }
      }
   }
   return photosArr;
}


// This function check for the required file type (Photo)
function checkForPhotoFn(fileAddres){
   let ext = path.extname(fileAddres);
   ext = ext.slice(1);
   if(ext == 'jpg' || ext == 'png' || ext == 'jpeg') return true;
   else return false;
}

