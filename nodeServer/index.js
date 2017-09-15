import babelFolder from './lib/babel-folder';
let path = require('path');
const sourceFolder = path.join(__dirname, 'src');
const buildFolder = path.join(__dirname, 'disc');

babelFolder(sourceFolder, buildFolder);
