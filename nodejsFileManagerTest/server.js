/**
 * main file,please start this file
 */
var http = require('http');

var fileOperating = require('./js/lib/fileOperating')


var server = http.createServer(function(req,res){

    var data = fileOperating.getFileData(req.url,function(err,data){
        return data;
    });

    console.log(data);

})

server.listen(9000);