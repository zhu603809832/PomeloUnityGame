var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MainScene_json : "res/MainScene.json",
    LoginScene_json : "res/LoginScene.json",
    RegisterScene_json : "res/RegisterScene.json",
    SelectRoleScene_json : "res/SelectRoleScene.json",
    LoadingScene_json : "res/LoadingScene.json",
    gamePreludeScene_json : "res/GamePreludeScene.json",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
