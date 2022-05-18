const fs = require('fs');
const path = require('path');
const {stdin,stdout} = process;
const filePath = (path.join(__dirname));

fs.readdir(`${filePath}/secret-folder`,{withFileTypes: true}, (err, files) => {
    if(err) throw err; 
    for (let i = 0; i < files.length; i++){
        if (files[i].isFile()){
            stdout.write(`${files[i].name}\n`);
        }
    }
    
 });