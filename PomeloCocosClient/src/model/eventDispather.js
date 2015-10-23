/**
 * Created by kingsoft on 2015/10/23.
 */

var EventDispather = function(){
    this.init();
};

EventDispather.prototype.init = function(){
    this._listenerMap = new Object();
};

EventDispather.prototype.addLisener = function(event, callback){
    if(!event || !callback){
        return;
    }
    var listenList = this._listenerMap[event];
    if(!listenList){
        listenList = this._listenerMap[event] = new Array();
    }

    for(var i = 0; i < listenList.length; i++){
        if(listenList[i] == callback){
            return;
        }
    }
    listenList.push(callback);
};

EventDispather.prototype.removeListener = function(event, callback){
    if(!event || ! callback){
        return;
    }
    var listenList = this._listenerMap[event];
    if(listenList){
        for(var i = 0; i < listenList.length; i++){
            listenList.splice(i, 1);
            return;
        }
    }
};

EventDispather.prototype.dispatchEvent = function(event){
    if(this._listenerMap[event]){
        var listeners = this._listenerMap[event].slice();
        for(var i = 0 ; i < listeners.length; i++){
            listeners[i]();
        }
    }
};