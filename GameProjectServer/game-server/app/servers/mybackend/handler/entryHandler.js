module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
	console.log("Hello World!Pomelo!");
  	next(null, {code: 200, msg: 'game server is ok.'});
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};

//2015/7/31 19:29:13
Handler.prototype.login = function(msg, session, next) {
	console.log("Handler.prototype.login")
	var result = {code: 200, msg: 'game server is ok.'}
  	next(null, result);
};

Handler.prototype.cancel = function(msg, session, next) {
	console.log("Handler.prototype.cancel")
	var result = {code: 200, msg: 'game server is ok.'}
  	next(null, result);
};

Handler.prototype.notify = function(msg, session, next) {
	console.log("Handler.prototype.notify")
	var result = {code: 200, msg: 'game server is ok.'}
  	next(null, result);
};