/**
 * Created by kingsoft on 2015/10/20.
 */
var delayTime = 0;
var TIME_OUT = 60 * 1000;

var timeSync = function() {
    app.getDelayTime();
    setInterval(function() {
        app.getDelayTime();
    }, TIME_OUT);
};

var getDelayTime = function() {
    var pomelo = window.pomelo;
    var beforeTime = new Date().getTime();
    pomelo.request('connector.timeSyncHandler.timeSync',{clientTime: beforeTime},function(result) {
        if (result.code === 200) {
            var afterTime = new Date().getTime();
            delayTime = (afterTime - beforeTime)/2;
            app.setDelayTime(delayTime);
        }
    });
};