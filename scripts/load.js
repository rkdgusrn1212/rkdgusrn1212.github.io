#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const postsPath = path.join(__dirname, '..', 'src', 'assets', 'posts');
const indexPath = path.join(postsPath, 'index.js');

fs.removeSync(indexPath); //일단 지우고 시작
console.log(indexPath + ' has been removed');

const files = fs.readdirSync(postsPath);

let idxData = '';
for (const i in files) {
  idxData += `import post${i} from './${files[i]}';\n`;
}
idxData +=
  `const fileList = [${files
    .map((file, i) => `post${i}`)
    .reduce((prev, post) => prev + ', ' + post)}];\n` +
  'export default fileList;';
fs.writeFileSync(indexPath, idxData);
console.log(indexPath + ' have bean successfully created');

execSync(`yarn prettier -w "${postsPath}"`);
console.log(`yarn prettier -w "${postsPath}"`);
