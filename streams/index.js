const fs = require('fs');
const Transform = require('stream').Transform;
const inherits = require('util').inherits;

// const ActualBears = () => {
//   Transform.call(this);
// }
function ActualBears(){
  Transform.call(this);
}

inherits(ActualBears, Transform);

ActualBears.prototype._transform = function(chunk, enc, done){
  chunk = chunk.toString().split('\n').filter(function(bear){ return bear !== 'koala'})
    .join('\n');
  this.push(chunk);
  done();
}

const read = fs.createReadStream('bears.txt');
const write = fs.createWriteStream('actualbears.txt');
read.pipe(new ActualBears()).pipe(write)

// const bears = fs.createReadStream('bears.txt');
// bears.on('data', data => {
//   console.log(data.toString())
// })
// bears.pipe(process.stdout)
// const actualbears = fs.createWriteStream('actualbears.txt');
// bears.pipe(actualbears);