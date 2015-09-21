/**
 * Created by zhu on 2015/8/27.
 */

var LoginLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size

        var loginsceneRoot = ccs.load(res.LoginScene_json);
        this.addChild(loginsceneRoot.node);

        var btnLogin = ccui.helper.seekWidgetByName(loginsceneRoot.node, "ButtonLogin");
        this.btnLogin = btnLogin;
        this.btnLogin.addTouchEventListener(this.OnClickButton,this);

        var btnRegister = ccui.helper.seekWidgetByName(loginsceneRoot.node, "ButtonRegister");
        this.btnRegister = btnRegister;
        this.btnRegister.addTouchEventListener(this.OnClickButton, this);

        var txtAccount = ccui.helper.seekWidgetByName(loginsceneRoot.node, "TextFieldAccount");
        this.txtAccount = txtAccount;
        this.txtAccount.addEventListenerTextField(this.OnClickText, this);

        var txtPassword = ccui.helper.seekWidgetByName(loginsceneRoot.node, "TextFieldPassword");
        this.txtPassword = txtPassword;
        this.txtPassword.addEventListenerTextField(this.OnClickText, this);
        return true;
    },

    OnClickButton : function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                if(sender == this.btnLogin){
                    this.login();
                }
                else if(sender == this.btnRegister){
                    cc.director.runScene(new RegisterScene());
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

                break;
            default :
                break;
        }
        return true;
    },

    login : function(){
        if (app.getLoading()) {
            return;
        }
        app.setLoading(true);
        var account = this.txtAccount.getString();
        var password = this.txtPassword.getString();
        if(!account){
            alert("account require");
            app.setLoading(false);
            return;
        }

        if(!password){
            alert("password require");
            app.setLoading(false);
            return;
        }
        httpPostRequest(account, password);
    },
});

var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});

var httpPostRequest = function(username, password){
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("POST", config.GATE_HOST_LOGIN, true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var httpStatus = xhr.statusText;
            var response = xhr.responseText;

            var data = eval('(' + response + ')');
            var code = data.code;
            switch(code){
                case 500:
                    alert("username not exist!");
                    app.setLoading(false);
                    break;
                case 501:
                    alert("password incorrect!");
                    app.setLoading(false);
                    break;
                case 200://success
                    authEntry(data.uid, data.token, function() {
                        app.setLoading(false);
                    });
                    localStorage.setItem('username', username);

                    break;
                default :
                    app.setLoading(false);
                    break;
            }
        }
    };
    var data = "username=" + username + "&" + "password=" + password;
    xhr.send(data);
}

var authEntry  = function(uid, token, callback) {
    queryEntry(uid, function(host, port) {
        entry(host, port, token, callback);
    });
};

var queryEntry = function(uid, callback){
    var pomelo = window.pomelo;
    var host = config.GATE_HOST;
    var port = config.GATE_PORT;

    pomelo.init({host: host, port: port, log: true}, function() {
        var route = "gate.gateHandler.queryEntry";
        pomelo.request(route, { uid: uid}, function(data) {
            pomelo.disconnect();
            if(data.code === 2001){
                alert('Servers error!');
                return;
            }
            callback(config.ENTRY_HOST, data.port);
            });
    });
};

var entry = function(host, port, token, callback){
    var pomelo = window.pomelo;
    // TODO for development
    pomelo.init({host: host, port: port, log: true}, function() {
        var route = 'connector.entryHandler.entry';
        pomelo.request(route, {token: token}, function(data) {
            var player = data.player;

            if (callback) {
                callback(data.code);
            }

            if (data.code == 1001) {
                alert('Login fail!');
                return;
            } else if (data.code == 1003) {
                alert('Username not exists!');
                return;
            }

            if (data.code != 200) {
                alert('Login Fail!');
                return;
            }

            // init handler
            loginMsgHandler.init();
            gameMsgHandler.init();

            if (!player || player.id <= 0) {
                cc.director.runScene(new SelectRoleScene());
            } else {
                afterLogin(data);
            }
        });
    });
};

var afterLogin = function(data){
    var pomelo = window.pomelo;
    var userData = data.user;
    var playerData = data.player;

    var areaId = playerData.areaId;
    var areas = {1: {map: {id: 'jiangnanyewai.png', width: 3200, height: 2400}, id: 1}};

    if (!!userData) {
        pomelo.uid = userData.id;
    }
    pomelo.playerId = playerData.id;
    pomelo.areaId = areaId;
    pomelo.player = playerData;

    loadResource({jsonLoad: true}, function() {
        gamePrelude();
    });
};

var loadResource = function(opt, callback){
    cc.director.runScene(new LoadingScene());
    var loader = new ResourceLoader(opt);
    loader.setLoadingCallBackFun(function(data){
        var percent = parseInt(data.loaded * 100 / data.total, 10);
        var txtShow = percent + "%";
    });

    loader.setCompleteCallbackFn(function(){
        if(callback){
            setTimeout(function(){
                callback()
            }, 500);
        }
    });

    loader.loadAreaResource();
};

var gamePrelude = function(){
    cc.director.runScene(new gamePreludeScene());
    /*
    var entered = false;
    $('#id_skipbnt').on('click', function() {
        if (!entered) {
            entered = true;
            enterScene();
        }
    });
    setTimeout(function(){
        if (!entered) {
            entered = true;
            enterScene();
        }
    }, 12000);
    */
};

var enterScene = function(){
    var pomelo = window.pomelo;
    pomelo.request("area.playerHandler.enterScene", null, function(data){
        //app.init(data);
    });
};