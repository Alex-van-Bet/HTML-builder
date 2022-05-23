const fs = require('fs');
const path = require('path');
const {stdin,stdout} = process;
const filePath = (path.join(__dirname, 'text.txt'));


process.on('exit', () => stdout.write('Удачи!'));

process.on('SIGINT', () => {
  process.exit();
});

fs.appendFile(filePath, '', (err) => {
  if (err) {throw err;}
});

stdout.write('введите текст\n');

stdin.on('data',  (data) => {  
  let addText = data.toString();
  addText = addText.substring(0, addText.length - 2);
  if (addText === 'exit') {
    process.exit();
  }
  fs.appendFile(filePath, data, (err) => {
    if (err) {throw err;}
  });
  stdout.write('введите текст\n'); 
});

