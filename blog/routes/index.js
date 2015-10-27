//var express = require('express');
//var router = express.Router();
//
///* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
//
//module.exports = router;



module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: '标注纠错' });
  });
  app.get('/login', function (req, res) {
    res.render('login', { title: '标注纠错' });
  });
  app.get('/reg', function (req, res) {
    res.render('reg', { title: '标注纠错' });
  });
};


