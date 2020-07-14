const fs = require('fs');

// const data = fs.readFileSync('data.txt', 'utf8');
// console.log(data);

// const data2 = fs.readFile('data.txt', 'utf8', (err, data) => {
//   console.log(data)
// })

const readableStream = fs.createReadStream('data.txt', {encoding: 'utf8'});
const writableStream = fs.createWriteStream('data2.txt');

// readableStream.on('data', dataChunk => {
//   console.log('data chunk received');
//   writableStream.write(dataChunk)
// });

readableStream.pipe(writableStream);