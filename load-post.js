#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const srcPath = path.join(__dirname, '_posts');
console.log('from :' + srcPath);

const dstPath = path.join(__dirname, 'src', 'posts');
const dstDataPath = path.join(dstPath, 'data');
console.log('to : ' + dstPath);

fs.removeSync(dstPath); //일단 비우고 시작

fs.copySync(srcPath, dstDataPath);
console.log('copy success');

const files = fs.readdirSync(dstDataPath);
console.log('read posts/data folder');

let idxData = '';
for (const i in files) {
  const file = files[i];
  idxData += `import post${i} from 'posts/data/${file}';\n`;
  const filePath = path.join(dstDataPath, file);
  const data = fs.readFileSync(filePath);
  const fd = fs.openSync(filePath, 'w');
  const buf = Buffer.from('avoidjekyllparse'); //지킬 파싱을 막기위한 일종의 대칭키지문
  fs.writeSync(fd, buf, 0, buf.length, 0);
  fs.writeSync(fd, data, 0, data.length, buf.length);
  fs.close(fd);
}
const dstFilePath = path.join(dstPath, 'index.js');
fs.writeFileSync(
  dstFilePath,
  idxData +
    `const fileList = [${files
      .map((file, i) => `post${i}`)
      .reduce((prev, post) => prev + ', ' + post)}];\n` +
    'export default fileList;',
);
console.log('done');

execSync(`yarn prettier -w "${dstFilePath}"`);
console.log(`yarn prettier -w "${dstFilePath}"`);
