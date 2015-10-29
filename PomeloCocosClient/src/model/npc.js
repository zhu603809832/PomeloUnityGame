/**
 * Created by kingsoft on 2015/10/29.
 */

/**
 * Initialize a new 'Npc' with the given 'opts'.
 * Npc inherits Entity
 *
 * @param {Object} opts
 * @api public
 */
var Npc = function (opts){
    this.type = EntityType.NPC;
    Entity.call(this, opts);
};

Npc.prototype = Object.create(Entity.prototype);
