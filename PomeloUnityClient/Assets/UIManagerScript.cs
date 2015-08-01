using UnityEngine;
using System.Collections;
using System;
using System.IO;
using SimpleJson;
using pomeloUnityClient;

public class UIManagerScript : MonoBehaviour {

    static PomeloClient m_PomeloClient;
	// Use this for initialization
	void Start () {
        JsonObject jsonConfig = ReadFromJsonFile("./server.json");
        string szURL = (string)jsonConfig["host"];
        m_PomeloClient = new PomeloClient(szURL);
        m_PomeloClient.init();

        string szRoute = "connector.entryHandler.entry";
        m_PomeloClient.On(szRoute, (data) =>
        {
            Debug.Log(data.ToString());
        });
        Debug.Log("Pomelo client init.");
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public static JsonObject ReadFromJsonFile(string szFilePath)
    {
        StreamReader file = new StreamReader(szFilePath);

        String str = file.ReadToEnd();

        return (JsonObject)SimpleJson.SimpleJson.DeserializeObject(str);
    }

    public void OnClickLoginBtn()
    {
        JsonObject jsonMessage = new JsonObject();
        jsonMessage.Add("key", "OnClickLoginBtn");
        m_PomeloClient.request("connector.entryHandler.login", jsonMessage, (data) =>
        {
            Debug.Log(data.ToString());
        });
    }

    public void OnClickCancelBtn()
    {
        JsonObject jsonMessage = new JsonObject();
        jsonMessage.Add("key", "OnClickCancelBtn");
        m_PomeloClient.request("connector.entryHandler.cancel", jsonMessage, (data) =>
        {
            Debug.Log(data.ToString());
        });
    }

    public void OnSendMsgBtn()
    {
        string szRoute = "connector.entryHandler.notify";
        JsonObject jsonMessage = new JsonObject();
        jsonMessage.Add("key", "OnSendMsgBtn");
        m_PomeloClient.notify(szRoute, jsonMessage);
    }
}
