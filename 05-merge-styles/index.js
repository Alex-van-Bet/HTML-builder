const fs = require('fs');
const path = require('path');
const {stdout} = process;
let filePath = (path.join(__dirname));
let fileCopy = (path.join(__dirname, 'styles'));
let filePaste = (path.join(__dirname, 'project-dist'));



fs.readdir(filePaste, {withFileTypes: true}, (err, files) => {

  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    console.log(path.join(filePaste, 'bundle.css'));
  
    if (files[i].isFile() && files[i].name === 'bundle.css') {
      fs.unlink(path.join(filePaste, 'bundle.css'), (err) => {
        if (err) {console.log(err);}
      })
      
    } 
  }
  setTimeout(() => {
    fs.writeFile(path.join(filePaste, 'bundle.css'), '', (err) => {
      if (err) {console.log(err);}
    })
  }, 100)
});




 fs.readdir(fileCopy, {withFileTypes: true}, (err, files) => {
  for (let i = 0; i < files.length; i++) {
    let extension = path.parse(files[i].name).ext;
    if (extension === '.css') {

      fs.readFile(path.join(fileCopy, files[i].name),  'utf-8', (err, data) => {

        setTimeout(() => {

          fs.appendFile(path.join(filePaste, 'bundle.css'), data, err => {
            if (err) {throw err;}
          });

        }, 400)

      })

    }
  }
 })