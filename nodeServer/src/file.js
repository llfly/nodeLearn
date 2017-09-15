import glob from "glob";
import _ from "lodash";

var fs = require('fs');
var path = require('path');


/**
 * 找到项目所在的basedir
 */

const getNodeProjectRoot = cwd => {
  var count = 0;
  var found = false;
  // 最多查找16层
  while (count++ < 16) {
    if (fs.existsSync(path.join(cwd, 'package.json'))) {
      found = true;
      break;
    }
    cwd = path.join(cwd, '..');
  }
  if (found) return cwd;
  else throw new Error("没有在当前目录及上层目录找到package.json文件");
}



/**
 * 给定一个目录,获取其下所有文件.
 * 以`_`开头的文件或目录将被忽略.
 * @param {*} dir 
 */

const getFilesFromDir = dir =>
  glob.sync(dir + '/**/*').filter(f => {
    let rfp = path.relative(dir, f);
    if (rfp.charAt(0) !== '/') rfp = '/' + rfp;

    if (fs.lstatSync(f).isDirectory()) return; // skip directory
    if (/\/_/.test(rfp)) return false; // skip folders and files starting with "_"
    return true;
  });




/**
 * 给定一个文件的路径，获取其文件名(不含后缀)
 * @param p
 * @returns {string}
 */

const filename = p => p.replace(/\.[^/.]+$/, "").replace(/^.*\//, "");


/**
 * 给定路径abspath和对象obj,将obj写入路径对应的文件里.
 * 当overwrite=false时(默认), 会将obj和文件里已经存在的对象进行merge.
 * 当overwrite=true时,会直接将整个obj写入,覆盖已有内容.
 */


const updateFile = (abspath, obj, overwrite) => {
  let initial = {};
  try {
    if (fs.existsSync(abspath)) {
      try {
        initial = JSON.parse(fs.readFileSync(abspath, 'utf8'))
      } catch (e) {
        console.error("JSON.parse file" + abspath + ' failed',e);
      }
    }
    let updated = overwrite ? obj : _.merge(initial, obj);
    fs.writeFileSync(abspath, JSON.stringify(updated));
  } catch (e) {
    console.error('write file ' + abspath + ' failed', e);
  }
}



module.exports = {
  getNodeProjectRoot,
  getFilesFromDir,
  filename,
  updateFile
}
