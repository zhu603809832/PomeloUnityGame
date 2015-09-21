/**
 * Created by zhu on 2015/9/21.
 */

var gamePreludeLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size

        var gamePreludeRoot = ccs.load(res.gamePreludeScene_json);
        this.addChild(gamePreludeRoot.node);

        var btnSkip = ccui.helper.seekWidgetByName(gamePreludeRoot.node, "ButtonSkip");
        this.btnSkip = btnSkip;
        this.btnSkip.addTouchEventListener(this.OnClickButton,this);
        return true;
    },

    OnClickButton : function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                if(sender == this.btnSkip){
                    enterScene();
                }
                break;
            default :
                break;
        }
        return true;
    },
});

var gamePreludeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gamePreludeLayer();
        this.addChild(layer);
    }
});


var enterScene = function(){
    /*pomelo.request("area.playerHandler.enterScene", null, function(data){
        app.init(data);
    });*/
};