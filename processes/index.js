const fs = require('fs');
const exec = require('child_process').exec; 
const spawn = require('child_process').spawn; 

console.log(process.argv)

const msg = 'hello';
process.stdout.write(msg)

fs.createReadStream(__filename).pipe(process.stdout)
let count = 0;
setInterval(() => {
  count++
  if(count > 10) process.exit();
}, 100)

exec('cat index.js', (err, stdout, stderr) => {
  console.log('the content of our cat file', stdout);
})

let bears = 0
bears += 1;

if(process.argv[2] === 'child'){
  console.log('I am inside the child');
  console.log('child', bears);
}else{
  const child = spawn(process.execPath, [__filename, 'child']);
  child.stdout.on('data', (data) => {
    console.log('from child', data.toString())
  })

  //or output this way since its a stream
  child.stdout.pipe(process.stdout)

  //or inherit the process stdio
  const child = spawn(process.execPath, [__filename, 'child'], {stdio: 'inherit'});
  console.log('parent', bears);
}

// Communication between parent and child process
if(process.argv[2] === 'child'){
  const net = require('net');
  const pipe = new net.Socket({fd: 3});
  pipe.write('killme');
}else{
  const child = spawn(process.execPath, [__filename, 'child'], {
    stdio: [null, null, null, 'pipe']
  });
  child.stdio[3].on('data', (data) => {
    if(data.toString() === 'killme'){
      console.log('killing child process');
      child.kill();
    }
  })
}