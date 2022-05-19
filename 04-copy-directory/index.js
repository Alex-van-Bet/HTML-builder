const fs = require('fs');
const path = require('path');
const {stdout} = process;
let filePath = (path.join(__dirname));
let fileCopy = (path.join(__dirname, 'files'));
let filePaste = (path.join(__dirname, 'files-copy'));



fs.readdir(filePath, {withFileTypes: true}, (err, files) => {

  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
  
    if ((!files[i].isFile()) && files[i].name === 'files-copy') {
      fs.rm(filePaste, { recursive: true }, (err) => {
        if (err) {throw err};
      })
      
    } 
  }
  setTimeout(() => {
    fs.mkdir(filePaste, (err) => {
      if (err) {throw err};
    })
  }, 100)
});


fs.readdir(fileCopy, (err, files) => {
  for (let i = 0; i < files.length; i++){
    fs.readFile(path.join(fileCopy, files[i]),  'utf-8', (err, data) => {

      setTimeout(() => {
        fs.writeFile(path.join(filePaste, files[i]), data, () => {
        })
      }, 200)

    })
  }
 
});