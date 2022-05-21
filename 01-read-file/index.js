const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname,'text.txt'), 'utf-8', (err) => {
  if (err) {throw err;}
});
stream.on('data', chunk => console.log(chunk));