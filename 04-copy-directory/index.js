const fs = require('fs');
const path = require('path');
const { mkdir, rm } = require('fs/promises');
let fileCopy = (path.join(__dirname, 'files'));
let filePaste = (path.join(__dirname, 'files-copy'));


async function copy(){

  await rm(filePaste, {force: true, recursive: true});
  await mkdir(filePaste);
  
  
  fs.readdir(fileCopy, (err, files) => {

    if (err) {throw err;}
  
    for (let i = 0; i < files.length; i++){
      fs.readFile(path.join(fileCopy, files[i]),  'utf-8', (err, data) => {
        if (err) {throw err;}
      
        fs.writeFile(path.join(filePaste, files[i]), data, (err) => {
          if (err) {throw err;}
        });
       
      });
    }
   
  });

}
copy();