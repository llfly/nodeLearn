/**
 * Created by fangyou on 2015/10/21.
 */
var events = require('events');
var EventEmitter = events.EventEmitter;
var util = require('util');


var Promise =function(){
    EventEmitter.call(this);
}

util.inherits(Promise,EventEmitter);

Promise.prototype.then = function(fulfilledHandler,errorHandler,progressHandler){
    if(typeof fulfilledHandler == 'function'){
        this.once('success',fulfilledHandler);
    }
    if(typeof errorHandler == 'function'){
        this.once('error',errorHandler);
    }
    if(typeof progressHandler == 'function'){
        this.on('progress',progressHandler);
    }
    return this;
}

var Deferred = function(){
    this.state = 'unfulfilled';
    this.promise = new Promise();
}
Deferred.prototype.resolve = function(obj){
    this.state = 'fulfilled';
    this.promise.emit('success',obj);
};
Deferred.prototype.reject = function(err){
    this.state = 'failed';
    this.promise.emit('error',err);
};
Deferred.prototype.progress = function(data){
    this.promise.emit('progress',data);
};


Deferred.prototype.all = function(promises){
    var count = promises.length;
    var that = this;
    var results = {};
    promises.forEach(function(promise,i){
        promise.then(function(data){
            count--;
            results[i] = data;
            if(count ==0 ){
                that.resolve(results);
            }
        },function(err){
            that.reject(err);
        })
    })
    return this.promise;
}


module.exports.Deferred = Deferred;
