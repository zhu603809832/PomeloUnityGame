/**
 * Module dependencies
 *
 */
//var Animation = require('animation');

/**
 * The factory of creating objectPool.
 */
var ObjectPoolFactory = function() {
	this.name = ['LeftUpStand', 'RightUpStand', 'LeftUpWalk', 'RightUpWalk', 'LeftUpAttack', 'RightUpAttack', 'LeftUpDead', 'RightUpDead',
		'LeftDownStand', 'RightDownStand', 'LeftDownWalk', 'RightDownWalk', 'LeftDownAttack', 'RightDownAttack', 'LeftDownDead',
		'RightDownDead'];
};

/**
 * Create pools for each kindId and add the created pool to objectPoolManager.pools
 *
 * @param {Number} kindId
 * @param {String} type
 * @api public
 */
ObjectPoolFactory.prototype.createPools = function(kindId, type) {
	var name = this.name;

	for (var i = 0; i < name.length; i++) {
		var animationName = name[i];
		var objectPool = createPool(kindId, type, animationName);
		var poolName = getPoolName(kindId, animationName);
		//app.getObjectPoolManager().addPool(poolName, objectPool);
	}
};

/**
 * Create object pool.
 *
 * @return {ObjectPool}
 * @api private
 */
var createPool = function(kindId, type, name, flipx) {
	var getAniamtion = function() {
		return new Animation({
			kindId: kindId,
			type: type,
			name: name,
			flipx: flipx
		}).create();
	};
	return new ObjectPool({
		getNewObject: getAniamtion
	});
};

