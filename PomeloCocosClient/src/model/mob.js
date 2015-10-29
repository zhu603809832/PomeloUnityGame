/**
 * Created by kingsoft on 2015/10/29.
 */

/**
 * Initialize a new 'Mob' with the given 'opts'.
 * Mob inherits Character
 *
 * @param {Object} opts
 * @api public
 */
var Mob = function(opts){
    this.type = EntityType.MOB;

    Character.call(this, opts);
};

/**
 * Expose 'Mob' constructor
 */

Mob.prototype=Object.create(Character.prototype);
