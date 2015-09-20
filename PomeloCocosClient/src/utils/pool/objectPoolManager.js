/**
 * Module dependencies
 */

var ObjectPoolManager = function() {
	this.pools = {};
};

//Add pool named name to pools
ObjectPoolManager.prototype.addPool = function(name, pool) {
	this.pools[name] = pool;
};


//get pool named name from pools
ObjectPoolManager.prototype.getPool = function(name) {
	return this.pools[name];
};
