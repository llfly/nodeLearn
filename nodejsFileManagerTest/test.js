/**
 * Created by fangyou on 2015/10/19.
 */
var fs = require('fs');
var path = require('path');
var http = require('http');
http.createServer(function(req,res){
    var filePath = path.resolve();
    var reqPath = path.normalize(req.url);
    var pathname = path.join(filePath,reqPath);


    console.log(filePath);
    console.log(reqPath);
    console.log(pathname);

}).listen(6080);


res.then(function(){

},function(err){

},function(chunk){

});


var promisify = function(res){
    var deferred = new Deferred();
    var result = '';
    res.on('data',function(chunk){
        result += chunk;
        deferred.progress(chunk);
    });
    res.on('end',function(){
        deferred.resolve(result);
    });
    res.on('error',function(err){
        deferred.reject(err);
    })
    return deferred.promise;
}

promisify(res).then(function(){

},function(){

})