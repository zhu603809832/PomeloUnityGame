/**
 * Created by kingsoft on 2015/10/29.
 */
/**
 * Initialize a new 'Equipment' with the given 'opts'.
 * Equipment inherits Entity
 *
 * @param {Object} opts
 * @api public
 */
var Equipment = function (opts) {
    this.type = EntityType.EQUIPMENT;
    this.name = opts.name;
    this.kind = opts.kind;
    this.attackValue = opts.attackValue;
    this.defenceValue = opts.defenceValue;
    this.price = opts.price;
    this.color = opts.color;
    this.heroLevel = opts.heroLevel;
    this.playerId = opts.playerId;
    this.imgId = opts.imgId;
    Entity.call(this, opts);
};


Equipment.prototype = Object.create(Entity.prototype);