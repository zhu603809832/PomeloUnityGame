var getVersion = function() {
    return JSON.parse(localStorage.getItem('version')) || {};
};

var setVersion = function(version) {
    localStorage.setItem('version', JSON.stringify(version));
};

var Data = function(key){
    this.key = key;
    this.data = null;

    Data.prototype.set = function(data){
        this.data = data;
        var self = this;
        setTimeout(function(){
            localStorage.setItem(self.key, JSON.stringify(data))
        }, 300);
    };

    Data.prototype.findById = function(id){
      var data = this.all();
        return data[id];
    };

    Data.prototype.all = function(){
        if(!this.data){
            this.data = JSON.parse(localStorage.getItem(this.key)) || {};
        }
        return this.data;
    };

};

//animation data
var AnimationData = function(){
    this.data = {};
}

AnimationData.prototype.set = function(data) {
    data || (data = {});
    this.data = data;
    setTimeout(function() {
        for (var k in data) {
            localStorage.setItem('ani_' + k, JSON.stringify(data[k]));
        }
    }, 600);
};

AnimationData.prototype.get = function(id) {
    var ani  = this.data[id];
    if (!ani) {
        ani =  JSON.parse(localStorage.getItem('ani_' + id)) || {};
    }
    return ani;
};


//effect data
var Effect = function(data) {
    this.key = 'effect';
}

Effect.prototype.set = function(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
};

Effect.prototype.all = function(id) {
    return JSON.parse(localStorage.getItem(this.key)) || {};
};

Effect.prototype.findById = function(id) {
    var data = this.all();
    var i, result;
    for (i in data) {
        if (data[i].id == id) {
            result = data[i];
            break;
        }
    }
    return result;
};

var allData = {};
var fightskill = new Data('fightskill');
var equipment = new Data( 'equipment');
var item = new Data('item');
var character = new Data('character');
var npc = new Data('npc');
var animation = new AnimationData();
var effect = new Effect();

allData.fightskill = fightskill;
allData.equipment = equipment;
allData.item = item;
allData.character = character;
allData.npc = npc;
allData.animation = animation;
allData.effect = effect;

var setData = function(data){
    if (data) {
        for (var key in data) {
            var obj = allData[key];
            if (obj && obj.set && data[key]) {
                obj.set(data[key]);
            }
        }
    }
};
