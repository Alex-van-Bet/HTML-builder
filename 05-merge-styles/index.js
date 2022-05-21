const fs = require('fs');
const path = require('path');
let fileCopy = (path.join(__dirname, 'styles'));
let filePaste = (path.join(__dirname, 'project-dist'));


fs.readdir(filePaste, {withFileTypes: true}, (err, files) => {

  if (err) {throw err;}
  for (let i = 0; i < files.length; i++) {
  
    if (files[i].isFile() && files[i].name === 'bundle.css') {
      fs.unlink(path.join(filePaste, 'bundle.css'), (err) => {
        if (err) {throw err;}
      });
      
    } 
  }
  setTimeout(() => {
    fs.writeFile(path.join(filePaste, 'bundle.css'), '', (err) => {
      if (err) {throw err;}
    });
  }, 100);
});


fs.readdir(fileCopy, {withFileTypes: true}, (err, files) => {
  if (err) {throw err;}

  for (let i = 0; i < files.length; i++) {
    let extension = path.parse(files[i].name).ext;
    if (extension === '.css') {

      fs.readFile(path.join(fileCopy, files[i].name),  'utf-8', (err, data) => {
        if (err) {throw err;}

        setTimeout(() => {

          fs.appendFile(path.join(filePaste, 'bundle.css'), data, (err) => {
            if (err) {throw err;}
          });

        }, 400);

      });

    }
  }
});