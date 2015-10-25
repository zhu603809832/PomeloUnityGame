/**
 * Created by zhu on 2015/10/25.
 */
EVENT_CHANGE_VALUE = "event_change";

var Entity = function(opts){
    EventDispather.call(this);
    this.entityId = opts.entityId;
    this.kindId = opts.kindId;
    this.englishName = opts.englishName;
    this.type = opts.type;

    this.x = opts.x;
    this.y = opts.y;

    this.scene = opts.scene;
    this.map = opts.map;

    //this.sprite = new Sprite(this);
    this.sprite = null;
};

Entity.prototype = Object.create(EventDispather.prototype);

Entity.prototype.getKindId = function(){
    return this.kindId;
};

Entity.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
};

Entity.prototype.getPosition = function(){
    return {x:this.x, y:this.y};
};

Entity.prototype.getSprite = function(){
    return this.sprite;
};

Entity.prototype.destory = function(){
    var sprite = this.getSprite();
    sprite.destory();
};

Entity.prototype.set = function(property, value){
    this[property] = value;
    this.dispatchEvent(EVENT_CHANGE_VALUE);
};