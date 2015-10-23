/**
 * Created by kingsoft on 2015/10/20.
 */
/**
 * Created by zhu on 2015/9/21.
 */

var gameMainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size

        var gameMainRoot = ccs.load(res.gameMainScene_json);
        this.addChild(gameMainRoot.node);

        var tileMapObjInfo = ccui.helper.seekWidgetByName(gameMainRoot.node, "Map");
        this.tileMapObjInfo = tileMapObjInfo;

        return true;
    },

    OnClickButton : function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            default :
                break;
        }
        return true;
    },
});

var gameMainScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var layer = new gameMainLayer();
        this.addChild(layer);
    },
    onEnter:function () {
        this._super();
    }
});
