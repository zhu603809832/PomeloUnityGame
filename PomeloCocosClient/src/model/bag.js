/**
 * Created by kingsoft on 2015/10/29.
 */
var Bag = function(opts) {
    EventDispather.call(this);
    this.itemCount = opts.itemCount;
    this.usedCount = !!opts.items?opts.items.length:0;
    this.items = {};

    //init items, translate from array to map
    var items = opts.items;
    for(var key in items){
        var item = items[key];
        this.items[item.key] = {
            id : item.id,
            type : item.type
        };
    }
};

Bag.prototype = Object.create(EventDispather.prototype);

/**
 * add item
 *
 * @param {obj} item {id: 123, type: 'item'}
 * @return {Boolean}
 * @api public
 */
Bag.prototype.addItem = function(item, index) {
    var status = false;

    if (index < 1 || !item || !item.id || !item.type || !item.type.match(/item|equipment/)) {
        return status;
    }

    this.items[index] = item;
    this.usedCount += 1;

    this.emit('addItem', index, item);
    return index;
};

/**
 * remove item
 *
 * @param {number} index
 * @return {Boolean}
 * @api public
 */
Bag.prototype.removeItem = function(index) {
    var status = false;
    if	(this.items[index]) {
        delete this.items[index];
        this.usedCount -= 1;
        this.emit('removeItem', index);
        status = true;
    }
    return status;
};

Bag.prototype.isFull = function() {
    return this.itemCount === this.usedCount;
};