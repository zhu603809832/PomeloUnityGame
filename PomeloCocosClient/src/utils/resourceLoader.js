/**
 * Created by zhu on 2015/9/20.
 */

var pomelo = window.pomelo;
var dataApi = Data;
var imagURL = config.IMAGE_URL;
var EntityType = EntityType;
var aniOrientation = aniOrientation;
//var EventEmitter = window.EventEmitter;
//var ObjectPoolFactory = require('objectPoolFactory');

var ResourceLoader = function(opt){
    //EventEmitter.call(this);
    opt || (opt = {});
    this.totalCount = 0;
    this.loadedCount = 0;
    this.jsonLoad = !!opt.jsonLoad;
};

var pro = ResourceLoader.prototype;

pro.setTotalCount = function(count){
    this.totalCount = count;
    var event = new cc.EventCustom("loading");
    var jsonData = {"total": this.totalCount, "loaded": this.loadedCount };
    var stringData = JSON.stringify(jsonData);
    event.setUserData(stringData);
    cc.eventManager.dispatchEvent(event);
};

pro.setLoadedCount = function(count){
    this.loadedCount = count;
    //this.emit('loading', {total: this.totalCount, loaded: this.loadedCount});

    var event = new cc.EventCustom("loading");
    var jsonData = {"total": this.totalCount, "loaded": this.loadedCount };
    var stringData = JSON.stringify(jsonData);
    event.setUserData(stringData);
    cc.eventManager.dispatchEvent(event);

    if (this.loadedCount === this.totalCount) {
        var event = new cc.EventCustom("complete");
        cc.eventManager.dispatchEvent(event);
    }
};

pro.loadJsonResource = function(callback){
    if (this.jsonLoad === false) {
        if (callback) {
            setTimeout(function(){
                callback();
            }, 50);
        }
        return;
    }
    var version = dataApi.getVersion();
    pomelo.request('area.resourceHandler.loadResource', {version: version},  function(result) {
        dataApi.setData(result.data);
        dataApi.setVersion(result.version);
        this.jsonLoad = false;
        if (callback) {
            callback();
        }
    });
};

pro.loadAreaResource = function(){
    var self = this;
    pomelo.request('area.resourceHandler.loadAreaResource', {}, function(data) {
        var totalCount = 1 + 1 + (data.players.length  + data.mobs.length) * 16 + data.npcs.length + data.items.length + data.equipments.length;
        self.setTotalCount(totalCount);

        self.loadJsonResource(function(){
            self.setLoadedCount(self.loadedCount + 1);
            self.loadMap(data.mapName);
            self.loadCharacter(data.players);
            self.loadCharacter(data.mobs);
            self.loadNpc(data.npcs);
            self.loadItem(data.items);
            self.loadEquipment(data.equipments);
            initObjectPools(data.mobs, EntityType.MOB);
            initObjectPools(data.players, EntityType.PLAYER);
        });
    });
};

pro.loadImg = function(src) {
    var self = this;
    var img = new Image();
    img.onload = function() {
        self.setLoadedCount(self.loadedCount + 1);
    };

    img.onerror = function() {
        self.setLoadedCount(self.loadedCount + 1);
    };

    img.src = src;
};

pro.loadMap = function(name) {
    this.loadImg(imgURL + 'map/' + name + ".jpg");
};

pro.loadCharacter = function(ids) {
    var animation = ['Attack', 'Stand', 'Walk', 'Dead'];
    var self = this;
    ids.forEach(function(id) {
        animation.forEach(function(action) {
            for (var key in aniOrientation) {
                self.loadImg(imgURL + 'animation/' + id + '/' +aniOrientation[key] + action + '.png');
            }
        });
    });
};

pro.loadNpc = function(ids) {
    var self = this;
    ids.forEach(function(id) {
        self.loadImg(imgURL + 'npc/' + id + '.png');
    });
};

pro.loadItem = function(ids) {
    if (ids.length > 0) {
        var self = this;
        var items = dataApi.item.all();
        ids.forEach(function(id) {
            self.loadImg(imgURL + 'item/item_' + items[id].imgId + '.png');
        });
    }
};

pro.loadEquipment = function(ids) {
    if (ids.length > 0) {
        var self = this;
        var equipments = dataApi.equipment.all();
        ids.forEach(function(id) {
            self.loadImg(imgURL + 'equipment/item_' + equipments[id].imgId + '.png');
        });
    }
};

/**
 * Initialize objectPool
 *
 * @param {Array} ids
 * @api private
 */
var initObjectPools = function(ids, type) {
    var of = new ObjectPoolFactory();
    for (var i = 0; i < ids.length; i ++) {
        var kindId = ids[i];
        of.createPools(kindId, type);
    }
};
