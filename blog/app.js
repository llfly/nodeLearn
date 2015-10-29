var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');
//var users = require('./routes/users');


var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//生成express实例app
var app = express();

// 设置 views 文件夹为存放模板文件的地方
app.set('views', path.join(__dirname, 'views'));
//设置视图模板引擎为 ejs。
app.set('view engine', 'ejs');

app.use(flash());

app.use(session({
  secret:settings.cookieSecret,//防止篡改cookie
  key:settings.db,//cookie名字
  cookie:{maxAge:1000*60*60*24*30},//生存期30天
  store:new MongoStore({//把会话信息存储到数据库
    db:settings.db,
    host:settings.host,
    port:settings.port
  })
}))


// 设置/public/favicon.ico为favicon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//加载日志中间件
app.use(logger('dev'));
//加载解析json的中间件
app.use(bodyParser.json());
//加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
//路由控制器
//app.use('/', routes);
//app.use('/users', users);
routes(app);

// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//导出app实例供其他模块调用
module.exports = app;
