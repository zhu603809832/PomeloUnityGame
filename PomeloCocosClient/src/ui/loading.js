/**
 * Created by zhu on 2015/9/20.
 */

var LoadingLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size

        var loadingRoot = ccs.load(res.LoadingScene_json);
        this.addChild(loadingRoot.node);

        return true;
    },
});

var LoadingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoadingLayer();
        this.addChild(layer);
    }
});
