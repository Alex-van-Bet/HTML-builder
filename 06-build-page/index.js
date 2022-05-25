const fs = require('fs');
const path = require('path');

const { readdir, mkdir, rm, readFile } = require('fs/promises');
let currentFolder = (path.join(__dirname)); /* текущая папка */
let projectDist = (path.join(__dirname, 'project-dist')); /* папка проекта */
let assets = (path.join(__dirname, 'assets')); /* папка с картинками */
let styles = (path.join(__dirname, 'styles')); /* папка с css */
let components = (path.join(__dirname, 'components'));
let assetsCopy = (path.join(projectDist, 'assets')); /* папка с картинками в project-dist*/


/* копируем стили css в  один файл */
function addCss(files) {

  fs.readFile(path.join(styles, files), 'utf-8', (err, data) => {
    if (err) {throw err;}

    fs.appendFile(path.join(projectDist, 'style.css'), data, (err) => {
      if (err) {throw err;}
    });
  });

}

function createStyle() {

  fs.readdir(styles, {withFileTypes: true}, (err, files) => {
    if (err) {throw err;}


    for (let i = files.length - 1; i >= 0; i--) {
      let extension = path.parse(files[i].name).ext;
      if (extension === '.css') {

        addCss(files[i].name);

      }

    }

  });

}


/* копирование папки с картинками */
function copyFolderImg(checkpWay, pasteWay) {

  fs.readdir(checkpWay, {withFileTypes: true}, (err, files) => {
    if (err) {throw err;}

    for (let i = 0; i < files.length; i++) {
      let way = checkpWay;
      let copy = pasteWay;

      if (!files[i].isFile()) {
        way = (path.join(way, files[i].name));
        copy = (path.join(copy, files[i].name));

        fs.mkdir(copy, (err) => {
          if (err) {throw err;}
        });

        copyFolderImg(way, copy);

      } else {
        fs.readFile(path.join(way, files[i].name), (err, data) => {
          if (err) {throw err;}

          fs.writeFile(path.join(copy, files[i].name), data, (err) => {
            if (err) {throw err;}
          });
        });

      }

    }

  });

}


/* создание  index.html*/
async function addhtml() {
  
    let files = await readdir(components, {withFileTypes: true})
    let temp = await readFile(path.join(projectDist, 'index.html'), 'utf-8')
    for (const i of files) {
     
      let extension = path.parse(i.name).ext;
      let name = path.parse(i.name).name;
      let data =  await readFile(path.join(components, i.name), 'utf-8')
      temp = temp.replace(`{{${name}}}`, data);
      const paste = fs.createWriteStream(path.join(projectDist, 'index.html'))
      
      if (extension === '.html') {
        paste.write(temp);
      }
    }
}


/* создание папки project-dist, запуск сборки */
async function createFolder() {
  try {

    await rm(projectDist, {recursive: true, force: true,})
    await mkdir(projectDist, {recursive: true, force: true,})

    fs.readdir(currentFolder, {withFileTypes: true, force: true,}, (err, files) => {
      if (err) {throw err;}
  
      fs.mkdir(assetsCopy, (err) => {
        if (err) {throw err;}
        
        copyFolderImg(assets, assetsCopy);
        
      });
  
      fs.writeFile(path.join(projectDist, 'style.css'), '', (err) => {
        if (err) {throw err;}
        
        createStyle();
      });
  
    });

    fs.readFile(path.join(currentFolder, 'template.html'), (err, data) => {
      if (err) {throw err;}
      fs.writeFile(path.join(projectDist, 'index.html'), data, (err) => {
        if (err) {throw err;}
       
        addhtml();
      });
    });
  

  }

  catch {
    console.log(err);
  }



}
createFolder();