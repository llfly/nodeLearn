

/**
 * 给定配置, 监控一个文件的变化.
 *
 * path: 要watch的目录.
 * pattern: 一个RegExp或函数,或以它们组成的数组,过滤要监控的内容.
 * callback: 检测到变化时的回调.
 * watcherName: 这个watcher的名字,通常用于打log调试.
 *
 */

const watch = (config) => {
    if (process.env.NODE_ENV === 'production') return;
    let chokidar;
    try {
      chokidar = require('chokidar');
    } catch(e){
      console.info('init chokidar failed');
      return;
    }
    let dir = config.directory || config.dir || config.path;
    let watcher = chokidar(dir);
    let pattern = config.pattern || config.patterns || /.*/
    let callback = config.callbak;
    let watcherName = config.name || 'anomynous';
    let silent = config.silent || false;
    const check = pt => [].concat(pattern).every(p => typeof p === 'function' ? p(pt) : p.test(pt));
  }
  
  
  
  
  
  
    watch: function (config) {
      if (process.env.NODE_ENV === 'production') return;
      var fsevents;
      try {
        fsevents = require('fsevents');
      } catch (e) {
        console.info('init fsevent failed');
        return;
      }
      var dir = config.directory || config.dir || config.path;
      var watcher = fsevents(dir);
      var pattern = config.pattern || config.patterns || /.*/;
      var callback = config.callback;
      var watcherName = config.name || 'anomynous';
      var silent = config.silent || false;
      function check (pt) {
        return [].concat(pattern).every(p => typeof p === 'function' ? p(pt) : p.test(pt));
      }
      watcher.start();
  
  
      watcher.start(); // To start observation
      watcher.on('change', function(_p) {
        if (!silent) {
          var root = getNodeProjectRoot(_p)
          console.log(
            'watcher [' + watcherName + '] changed:',
            path.relative(root, _p));
        }
        if (!check(_p)) return;
        try {
          callback.apply(this, [].slice.call(arguments));
        } catch (e) {
          console.log('watcher got error', e.stack);
        }
      });
    },
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  // export default {
  
  
  
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
  
  
  
  
  
  
  
  
    // injection for test reason
    // $inject: function (cfg) {
    //   fs = cfg.fs || fs;
    // },
    // $recover: function () {
    //   var origfs = fs;
    //   return function (cfg) {
    //     fs = origfs;
    //   }
    // }(),
  };
  