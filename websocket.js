  // need to change to websocket server's address
  var wsUri = "ws://<websocket server's IP address>:<websocket server's port number>";
  var output;

  function init()
  {
    output = document.getElementById("output");
    testWebSocket();
  }

  function testWebSocket()
  {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }

  function onOpen(evt)
  {
    writeToScreen("CONNECTED");
    doSend();
  }

  function onClose(evt)
  {
    writeToScreen("DISCONNECTED");
  }

  function onMessage(evt)
  {
    var message = JSON.parse(evt.data);
    writeToScreen('<span style="color: blue;">RESPONSE: ' + message.device_id + ' : ' + message.result +'</span>');
    showNotification(message);
    websocket.close();
  }

  function onError(evt)
  {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function doSend()
  {
    var message = {
        "msg_type" : "command",
        "device_id" : "IFX001",
        "command" : "ON"
    };

    writeToScreen("SENT: " + JSON.stringify(message));
    websocket.send(JSON.stringify(message));
  }

  function writeToScreen(message)
  {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
  }

  function showNotification(message)
  {
    if (message.device_id == 'IFX001')
    {
        var device = "Light";
    }

    if (message.result == 'TRUE')
    {
        var status = "ON";
    }
    var lunaReq= webOS.service.request("luna://com.webos.notification",
        {
            method:"createToast",
            parameters:{
                "sourceId" : "com.sample.websocket",
                "message" : device + ' is turned ' + status 
            },
            onSuccess: function (args) {

            },
            onFailure: function (args) {
            }
        });
  }

  window.addEventListener("load", init, false);
