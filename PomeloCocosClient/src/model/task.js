/**
 * Created by kingsoft on 2015/10/29.
 */
var Task = function(opts){
    this.id = opts.id;
    this.taskState = opts.taskState;
    this.taskData = opts.taskData;
    this.name = opts.name;
    this.acceptTalk = opts.acceptTalk;
    this.workTalk = opts.workTalk;
    this.finishTalk = opts.finishTalk;
    this.exp = opts.exp;
    this.item = opts.item;
    this.completeCondition = opts.completeCondition;

    EventDispather.call(this, opts);
};

/**
 * Expose 'Task' constructor.
 */

Task.prototype=Object.create(EventDispather.prototype);

/**
 * Set taskState.
 *
 * @param {Number} state
 * @api public
 */
Task.prototype.setState = function(state) {
    this.taskState = state;
    this.emit('change:state');
};