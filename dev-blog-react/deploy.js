#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const path = require('path');

const reactStaticDir = path.join(__dirname, '..', 'react-static');
fs.removeSync(reactStaticDir);
console.log('react-static is deleted');

fs.copySync(path.join(__dirname, 'build'), reactStaticDir);
console.log('copied react-static to build');

const rootIdx = path.join(__dirname, '..', 'index.html');
fs.removeSync(rootIdx);
console.log('index.html is deleted');

fs.moveSync(path.join(reactStaticDir, 'index.html'), path.join(rootIdx));
console.log('done');
