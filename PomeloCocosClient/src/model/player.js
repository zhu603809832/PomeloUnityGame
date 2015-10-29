/**
 * Created by kingsoft on 2015/10/29.
 */

/**
 * Initialize a new 'Player' with the given 'opts'.
 * It is common player, not current player
 * Player inherits Character
 *
 * @param {Object} opts
 * @api public
 */
var Player = function(opts){
    this.id = opts.id;
    this.type = EntityType.PLAYER;
    this.name = opts.name;
    this.target = null;
    Character.call(this, opts);
};

/**
 * Expose 'Player' constructor.
 */

Player.prototype = Object.create(Character.prototype);