/**
 * Created by kingsoft on 2015/9/18.
 */

var SelectRoleLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size

        this.curSelectRole = 0;
        this.roleIds = [210, 211];
        var selectRoleRoot = ccs.load(res.SelectRoleScene_json);
        this.addChild(selectRoleRoot.node);

        var txtRoleName = ccui.helper.seekWidgetByName(selectRoleRoot.node, "TextFieldName");
        this.txtRoleName = txtRoleName;
        txtRoleName.addEventListenerTextField(this.OnClickText,this);


        var btnCreateRole = ccui.helper.seekWidgetByName(selectRoleRoot.node, "ButtonCreateRole");
        this.btnCreateRole = btnCreateRole;
        btnCreateRole.addTouchEventListener(this.OnClickButton,this);


        var ImageSelect = ccui.helper.seekWidgetByName(selectRoleRoot.node, "ImageSelect");
        this.ImageSelect = ImageSelect;

        var btnRole1 = ccui.helper.seekWidgetByName(selectRoleRoot.node, "ButtonRole1");
        this.btnRole1 = btnRole1;
        btnRole1.addTouchEventListener(this.OnClickButton,this);


        var btnRole2 = ccui.helper.seekWidgetByName(selectRoleRoot.node, "ButtonRole2");
        this.btnRole2 = btnRole2;
        btnRole2.addTouchEventListener(this.OnClickButton,this);


        this.selectRole(this.btnRole1, 0);
        return true;
    },

    OnClickButton : function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                if(sender == this.btnCreateRole){
                    this.createRole();
                }
                else if(sender == this.btnRole1){
                    this.selectRole(this.btnRole1, 0);
                }
                else if(sender == this.btnRole2){
                    this.selectRole(this.btnRole2, 1);
                }
                break;
            default :
                break;
        }
        return true;
    },

    OnClickText : function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                if(sender == this.txtRoleName){
                    this.txtRoleName.setPlaceHolder("");
                }

                break;
            default :
                break;
        }
        return true;
    },

    createRole: function(){
        var rolename = this.txtRoleName.getString();
        var roleIndex = this.curSelectRole;
        if(rolename == "" || roleIndex < 0 || roleIndex >= this.roleIds.length()){
            alert("role name require or error roleIndex!");
            return;
        }
        creatRoleRequest(rolename, this.roleIds[roleIndex]);
    },

    selectRole: function(clickedBtn, roleId){
        if(clickedBtn != this.btnRole1 && clickedBtn != this.btnRole2){
            return;
        }
        var absPos = clickedBtn.getPosition();
        this.ImageSelect.setPosition(absPos.x, absPos.y);
        this.curSelectRole = roleId;
    },
});

var SelectRoleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectRoleLayer();
        this.addChild(layer);
    }
});


var creatRoleRequest = function(rolename, roleId){
    var pomelo = window.pomelo;
    pomelo.request("connector.roleHandler.createPlayer", {name: rolename, roleId: roleId}, function(data) {
        if (data.code == 500) {
            alert("The name already exists!");
            return;
        }

        if (data.player.id <= 0) {
            cc.director.runScene(new LoginScene());
        } else {
            afterLogin(data);
        }
    });
}