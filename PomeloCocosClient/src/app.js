/**
 * Created by zhu on 2015/9/20.
 */

/*var switchManager = require('switchManager');	// page switch manager
var ui = require('ui');
var Area = require('area');
var ResMgr = require('resmgr').ResMgr;
var ObjectPoolManager = require('objectPoolManager');
var chat = require('chat');
var view = require("view");
var director = require('director');
var helper = require("helper");
var resMgr = null;
var poolManager = null;
*/

var app = function(){
    app.instance = null;
    this.loading = false;
    this.inited = false;
    this.skch = null;
    this.gd = null;
    this.gv = null;
    this.area = null;
    this.player = null;
    this.poolManager = null;
    this.delayTime = null;
    this.pomelo = window.pomelo;
    this.pomelo.on('websocket-error', function(){
        this.loading = false;
    });
};

app.instance = null;

app.getInstance = function(){
    if(!app.instance){
        app.instance = new app();
    }
    return app.instance;
};

app.prototype.init = function(data){
    var map = data.map;
    pomelo.player = data.curPlayer;
    this.player = data.curPlayer;
    cc.director.runScene(new gameMainScene());
    if(this.inited){
        this.configData(data);
        //area = new Area(data, map);
    }else{
        //initColorBox();
        this.configData(data);
        //area = new Area(data, map);
        //area.run();
        //chat.init();
        this.inited = true;
    }
    ui.init();
};

app.prototype.setLoading = function(loading){
    this.loading = loading;
};

app.prototype.getLoading = function(){
    return this.loading;
};

app.prototype.configData = function(data){
    data.skch = this.skch;
    data.gd = this.gd;
    data.gv = this.gv;
};

app.prototype.getArea = function () {
    return this.area;
};

app.prototype.getCurPlayer = function(){
    return this.getArea().getCurPlayer();
};


app.prototype.setDelayTime = function (time) {
    this.delayTime = time;
}

app.prototype.getDelayTime = function () {
    return this.delayTime;
};

app.prototype.getObjectPoolManager = function () {
    if (!this.poolManager) {
        this.poolManager = new ObjectPoolManager();
    }
    return this.poolManager;
}

function initColorBox(){
    /*
    if(!app.skch){
        //var width = parseInt(getComputedStyle(document.getElementById("m-main")).width);
        //var height = parseInt(getComputedStyle(document.getElementById("m-main")).height);
        //app.skch = helper.createSketchpad(width, height, document.getElementById("m-main"));
        //app.skch.cmpSprites = cmpSprites;
    }

     app.gv = new view.HonestView(this.skch);
     app.gv.showUnloadedImage(false);
     app.gd = director.director({
     view: gv
     });
     */
}

/*
/!**
 * Get current player
 *!/

function getResMgr(){
    if(!resMgr){
        resMgr = new ResMgr();
    }

    return resMgr;
}


/!**
 * Reconfig the init data for area
 * @param data {Object} The init data for area
 * @api private
 *!/

var cmpSprites = function(s1, s2) {
    var m1 = s1.exec('matrix');
    var m2 = s2.exec('matrix');
    var dz = m1.tz - m2.tz;
    if(dz === 0) {
        var dy = m1.ty - m2.ty;
        if(dy === 0) {
            return m1.tx - m2.tx;
        }
        return dy;
    }
    return dz;
};
*/
