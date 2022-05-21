const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const {stdout} = process;
let filePath = (path.join(__dirname, 'secret-folder'));

async function filesData(file, filePath) {

  let par = path.parse(file.name);
  let name = par.name;
  let extension = par.ext;
  extension = extension.slice(1);
  const stats = await fsPromises.stat(path.join(filePath, file.name), (err) => {
    if (err) {throw err;}
  });
  let size = stats.size;
  stdout.write(`${name} - ${extension} - ${size}b\n`);
}

function readFolder(filePath) {

  fs.readdir(filePath, {withFileTypes: true}, (err, files) => {
    if (err) {throw err;}

    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        filesData(files[i], filePath);
      } else {
        let newfilePath = (path.join(filePath, 'image.jpg'));
        readFolder(newfilePath);
      }
    }

  });

}
readFolder(filePath);