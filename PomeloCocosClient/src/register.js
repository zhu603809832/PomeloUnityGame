/**
 * Created by kingsoft on 2015/9/19.
 */

var RegisterLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var registersceneRoot = ccs.load(res.RegisterScene_json);
        this.addChild(registersceneRoot.node);

        var txtAccount = ccui.helper.seekWidgetByName(registersceneRoot.node, "TextFieldAccount");
        this.txtAccount = txtAccount;
        this.txtAccount.addEventListenerTextField(this.OnClickText, this);


        var txtPassword = ccui.helper.seekWidgetByName(registersceneRoot.node, "TextFieldPassword");
        this.txtPassword = txtPassword;
        this.txtPassword.addEventListenerTextField(this.OnClickText, this);

        var txtPasswordConfirm = ccui.helper.seekWidgetByName(registersceneRoot.node, "TextFieldPasswordConfirm");
        this.txtPasswordConfirm = txtPasswordConfirm;
        this.txtPasswordConfirm.addEventListenerTextField(this.OnClickText, this);


        var btnRegister = ccui.helper.seekWidgetByName(registersceneRoot.node, "ButtonRegister");
        this.btnRegister = btnRegister;
        btnRegister.addTouchEventListener(this.OnClickButton, this);

        var btnBack = ccui.helper.seekWidgetByName(registersceneRoot.node, "ButtonBack");
        this.btnBack = btnBack;
        btnBack.addTouchEventListener(this.OnClickButton, this);

        return true;
    },

    OnClickButton : function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                if(sender == this.btnRegister){
                    this.register();
                }
                else if(sender == this.btnBack){
                    cc.director.runScene(new LoginScene());
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
                if(sender == this.txtAccount){
                    this.txtAccount.setPlaceHolder("");
                }
                else if(sender == this.txtPassword){
                    this.txtPassword.setPlaceHolder("");
                }
                else if(sender == this.txtPasswordConfirm){
                    this.txtPasswordConfirm.setPlaceHolder("");
                }
                break;
            default :
                break;
        }
        return true;
    },

    register:function(){
        var account = this.txtAccount.getString();
        var password = this.txtPassword.getString();
        var passwordConfirm = this.txtPasswordConfirm.getString();
        if(account == "" || password == "" || passwordConfirm == ""){
            alert("input error, please check!");
            return ;
        }
        if(password != passwordConfirm){
            alert("Two times the password is not consistent!");
            return ;
        }
        registerPostRequest(account, password);
    }
});

var RegisterScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new RegisterLayer();
        this.addChild(layer);
    }
});


var registerPostRequest = function(account, password){
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("POST", config.GATE_HOST_REGISTER, true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var httpStatus = xhr.statusText;
            var response = xhr.responseText;

            var data = eval('(' + response + ')');
            var code = data.code;
            switch(code){
                case 501:
                    alert("username already exist!");
                    break;
                case 200://register success
                    authEntry(data.uid, data.token, function() {

                    });
                    localStorage.setItem('username', username);
                    break;
                default :
                    alert("register fail!");
                    break;
            }
        }
    };
    var data = "name=" + account + "&" + "password=" + password;
    xhr.send(data);
}