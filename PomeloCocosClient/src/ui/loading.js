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

        this.percent = 0;
        var txtPercent = ccui.helper.seekWidgetByName(loadingRoot.node, "TextPercent");
        this.txtPercent = txtPercent;

        var ImageProcess = ccui.helper.seekWidgetByName(loadingRoot.node, "ImageProcess");
        this.ImageProcess = ImageProcess;
        this.originContentSize = this.ImageProcess.getContentSize();
        this.setPercentBar(0);
        return true;
    },

    setPercentBar : function(percent){
        this.percent = percent;
        var txtShow = this.percent + "%";
        this.txtPercent.setString(txtShow);
        var contentSize = {width:this.percent / 100 * this.originContentSize.width, height:this.originContentSize.height};
        this.ImageProcess.setContentSize(contentSize);
    }
});

var LoadingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoadingLayer();
        this.addChild(layer);
        this.loadingLayer = layer;
    }
});

LoadingScene.prototype.setPercentBar = function(percent){
    if(this.loadingLayer){
        this.loadingLayer.setPercentBar(percent);
    }
};