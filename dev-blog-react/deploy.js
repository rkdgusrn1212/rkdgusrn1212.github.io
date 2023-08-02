#!/usr/bin/env node

'use strict';

import { removeSync, copySync, moveSync } from 'fs-extra';
import { join } from 'path';

const reactStaticDir = join(__dirname, '..', 'react-static');
removeSync(reactStaticDir);
console.log('react-static is deleted');

copySync(join(__dirname, 'build'), reactStaticDir);
console.log('copied react-static to build');

const rootIdx = join(__dirname, '..', 'index.html');
removeSync(rootIdx);
console.log('index.html is deleted');

moveSync(join(reactStaticDir, 'index.html'), join(rootIdx));
console.log('done');
