/**
 * Created by kingsoft on 2015/10/29.
 */

/**
 * Initialize a new 'Item' with the given 'opts'.
 * Item inherits Entity
 *
 * @param {Object} opts
 * @api public
 */
var Item = function (opts) {
    this.type = EntityType.ITEM;
    this.name = opts.name;
    this.desc = opts.desc;
    this.kind = opts.kind;
    this.hp = opts.hp;
    this.mp = opts.mp;
    this.price = opts.price;
    this.heroLevel = opts.heroLevel;
    this.imgId = opts.imgId;
    Entity.call(this, opts);
};

Item.prototype = Object.create(Entity.prototype);

