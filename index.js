const fs = require('fs');
const lockfile = require('@yarnpkg/lockfile');
const { exit } = require('process');

// import fs from 'fs';
// import * as lockfile from '@yarnpkg/lockfile';

let file = fs.readFileSync('vite-yarn.lock', 'utf8');
let json = lockfile.parse(file);

if (json.type != 'success') {
	console.log('failed')
	exit(1)
}

let obj = json.object

let file2 = fs.readFileSync('yarn.lock', 'utf8');
let json2 = lockfile.parse(file2);

if (json2.type != 'success') {
	console.log('failed')
	exit(1)
}

let obj2 = json2.object

Object.assign(obj, obj2);

// console.log(Object.keys(obj))

const fd = fs.openSync("temp.lock", "w+"); 

let text = lockfile.stringify(json.object);

const position = 0; 
  
const numberOfBytesWritten =  
    fs.writeSync(fd, text, position, 'utf8'); 


// let o1 = { a: 1 };
// let o2 = { a: 2 };
// let obj9 = { ...o1, ...o2 };
// console.log(o9)