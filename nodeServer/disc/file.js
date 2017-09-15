"use strict";

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

/**
 * 找到项目所在的basedir
 */

var getNodeProjectRoot = function getNodeProjectRoot(cwd) {
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
  if (found) return cwd;else throw new Error("没有在当前目录及上层目录找到package.json文件");
};

/**
 * 给定一个目录,获取其下所有文件.
 * 以`_`开头的文件或目录将被忽略.
 * @param {*} dir 
 */
var getFilesFromDir = function getFilesFromDir(dir) {
  return _glob2.default.sync(dir + '/**/*').filter(function (f) {
    var rfp = path.relative(dir, f);
    if (rfp.charAt(0) !== '/') rfp = '/' + rfp;

    if (fs.lstatSync(f).isDirectory()) return; // skip directory
    if (/\/_/.test(rfp)) return false; // skip folders and files starting with "_"
    return true;
  });
};

module.exports = {
  getNodeProjectRoot: getNodeProjectRoot,
  getFilesFromDir: getFilesFromDir

  // export default {
  //   /**
  //    * 给定一个文件的路径, 获取其文件名(不含后缀)
  //    * @param p
  //    * @returns {string}
  //    */
  //   filename: function (p) {
  //     return p.replace(/\.[^/.]+$/, "").replace(/^.*\//, '');
  //   },
  //   /**
  //    * 给定一个JS文件的绝对路径,检查其语法.
  //    */
  //   checkSyntax: function (file) {
  //     try {
  //       var babel = require('babel-core');
  //       babel.transform(fs.readFileSync(file, 'utf-8'), {
  //         presets: ['turbo', 'react'],
  //         plugins: []
  //       });
  //       return true;
  //     } catch (e) {
  //       console.log('verify syntax error', e);
  //       return false;
  //     }
  //   },
  //   /**
  //    * 给定一个两个数组,
  //    * array里的元素必须按order中规定的顺序排序.
  //    */
  //   predefinedSort: function (array, order) {
  //     return order
  //       .filter(function(x) { return array.indexOf(x) > -1 })
  //       .concat(
  //         array.filter(function (x) { return order.indexOf(x) === -1 })
  //       );
  //   },
  //   /**
  //    * 给定路径abspath和对象obj,将obj写入路径对应的文件里.
  //    * 当overwrite=false时(默认), 会将obj和文件里已经存在的对象进行merge.
  //    * 当overwrite=true时,会直接将整个obj写入,覆盖已有内容.
  //    */
  //   updateFile: function (abspath, obj, overwrite) {
  //     var initial = {};
  //     try {
  //       if (fs.existsSync(abspath)) {
  //         try {
  //           initial = JSON.parse(fs.readFileSync(abspath, 'utf8'));
  //         } catch (e) {
  //           // do nothing
  //         }
  //       }
  //       var updated = overwrite ? obj : _.merge(initial, obj);
  //       fs.writeFileSync(abspath, JSON.stringify(updated));
  //     } catch (e) {
  //       console.error('write file ' + abspath + ' failed', e);
  //     }
  //   },
  //   /**
  //    * 猜测当前所在项目的base dir.
  //    * PS: 并不靠谱。
  //    */
  //   getProjectBasePath: function() {
  //     getNodeProjectRoot(path.join(__dirname, '..', '..'));
  //   },
  //   getRc(root) {
  //       var f = path.join(root, '.turborc');
  //       if (fs.existsSync(f)) {
  //           return eval('(' + fs.readFileSync(f, 'utf-8') + ')');
  //       }
  //       return {};
  //   },
  //   // safely invoke a function
  //   safe(fn) {
  //       try {
  //           fn();
  //       } catch (e) {
  //           // do nothing!
  //       }
  //   },
  //   /**
  //    * 给定配置, 监控一个文件的变化.
  //    *
  //    * path: 要watch的目录.
  //    * pattern: 一个RegExp或函数,或以它们组成的数组,过滤要监控的内容.
  //    * callback: 检测到变化时的回调.
  //    * watcherName: 这个watcher的名字,通常用于打log调试.
  //    *
  //    */
  //   watch: function (config) {
  //     if (process.env.NODE_ENV === 'production') return;
  //     var fsevents;
  //     try {
  //       fsevents = require('fsevents');
  //     } catch (e) {
  //       console.info('init fsevent failed');
  //       return;
  //     }
  //     var dir = config.directory || config.dir || config.path;
  //     var watcher = fsevents(dir);
  //     var pattern = config.pattern || config.patterns || /.*/;
  //     var callback = config.callback;
  //     var watcherName = config.name || 'anomynous';
  //     var silent = config.silent || false;


  //     function check (pt) {
  //       return [].concat(pattern).every(p => typeof p === 'function' ? p(pt) : p.test(pt));
  //     }

  //     watcher.start(); // To start observation
  //     watcher.on('change', function(_p) {
  //       if (!silent) {
  //         var root = getNodeProjectRoot(_p)
  //         console.log(
  //           'watcher [' + watcherName + '] changed:',
  //           path.relative(root, _p));
  //       }
  //       if (!check(_p)) return;
  //       try {
  //         callback.apply(this, [].slice.call(arguments));
  //       } catch (e) {
  //         console.log('watcher got error', e.stack);
  //       }
  //     });
  //   },
  //   // injection for test reason
  //   $inject: function (cfg) {
  //     fs = cfg.fs || fs;
  //   },
  //   $recover: function () {
  //     var origfs = fs;
  //     return function (cfg) {
  //       fs = origfs;
  //     }
  //   }(),
  // };

};