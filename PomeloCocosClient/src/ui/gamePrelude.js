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

        this.enteredScene = false;


        setTimeout(function(){
            if (!this.enteredScene) {
                this.enteredScene = true;
                enterScene();
            }
        }, 12000);

        return true;
    },

    OnClickButton : function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                if(sender == this.btnSkip){
                    if (!this.enteredScene) {
                        this.enteredScene = true;
                        enterScene();
                    }
                }
                break;
            default :
                break;
        }
        return true;
    },

    setEnteredSceneFlag: function(enteredScene){
        this.enteredScene = enteredScene;
    },
});

var gamePreludeScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var layer = new gamePreludeLayer();
        this.addChild(layer);
        this.gamePreludeLayer = layer;
        this.gamePreludeLayer.setEnteredSceneFlag(false);
    },
    onEnter:function () {
        this._super();
    }
});

gamePreludeScene.prototype.setEnteredSceneFlag = function (enteredScene){
    if(this.gamePreludeLayer){
        this.gamePreludeLayer.setEnteredSceneFlag(enteredScene);
    }
};

var enterScene = function(){
    var pomelo = window.pomelo;
    pomelo.request("area.playerHandler.enterScene", null, function(data){
        app.getInstance().init(data);
    });
};