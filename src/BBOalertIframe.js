function initBBOalertIframe() {
  if (document.getElementById("adpanel0") != null) return;
  var appPanel = document.getElementById("rightDiv");
  if (appPanel == null) return;
  var adPanel0 = document.createElement("div");
  adPanel0.id = 'adpanel0';
  adPanel0.style.position = 'absolute';
  adPanel0.style.top = '0px';
  adPanel0.style.left = '0px';
  adPanel0.style.backgroundColor = 'black';
  adPanel0.style.zIndex = "5000";
  adPanel0.style.display = 'none';
  adPanel0.style.height = '100%';
  adPanel0.style.right = '57px';
  appPanel.appendChild(adPanel0);
  $('#bboalert-iframe').remove();
  ifrm = document.createElement("iframe");
  ifrm.allow = "clipboard-read; clipboard-write";
  ifrm.sandbox = 'allow-scripts allow-same-origin allow-modals allow-popups';
  ifrm.id = 'bboalert-iframe';
  ifrm.width = "100%";
  ifrm.height = "100%";
  ifrm.onload = loadScripts;
  var version = chrome.runtime.getManifest().name + ' ' + chrome.runtime.getManifest().version;
  //  ifrm.src = BBOalertIframeSource;
  ifrm.srcdoc = `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta http-equiv="Content-Security-Policy" content="img-src * data: ; media-src * data: ;
        default-src *; font-src * data: 'self' 'unsafe-inline' 'unsafe-eval';
        style-src * 'self' 'unsafe-inline' 'unsafe-eval'; 
        script-src * 'self' 'unsafe-inline' 'unsafe-eval';
        connect-src * ws: wss: ;">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" integrity="sha512-aOG0c6nPNzGk+5zjwyJaoRUgCdOrfSDhmMID2u4+OIslr0GjpLKo7Xm0Ao3xmpM4T8AmIouRkqwj1nrdVsLKEQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <title>` + version + `</title>
  </head>
  
  <body>
      <script>
          window.addEventListener('message', event => {
              const mainWindow = event.source;
              var data = event.data;
              var msg = data.msg;
              var script = data.script;
              console.log("data.id     = " + data.id);
              console.log("data.script = " + data.script);
              var R;
              try {
                  R = "";
                  eval(script);
              } catch (err) {
                  R = "Error" + err;
              }
              data.result = R;
              console.log("result = " + R);
              mainWindow.postMessage(data, event.origin);
          });  
      </script>
  </body>
  
  </html>`;
  //  ifrm.style.display = 'block';
  adPanel0.appendChild(ifrm);
  messageQueue = new Map();
  waitForEvent = (element, type) => new Promise(r => element.addEventListener(type, r));
  window.addEventListener('message', process_message);
}

function loadScripts() {
  $("#adpanel0").show();
  addIframeScript("globals.js");
  addIframeScript("BBO_DOM.js");
  addIframeScript("blogspot.js");
  addIframeScript("functions.js");
  addIframeScript("BBOalertData.js");
  addIframeScript("BBOalertUI.js");
  addIframeScript("BBOalertOptions.js");
  addIframeScript("BBOobserver.js");
  addIframeScript("BBOalert.js");
  addIframeScript("BBOalertConfig.js");
  addIframeScript("custom_syntax.js");
  addIframeScript("webStorage.js");
  addIframeScript("init.js");
}

function addIframeScript(script) {
  url = chrome.runtime.getURL(script);
  $.get(url, function (data) {
    console.log("adding script : " + script);
    execIframeMessage("$('body').append($('<script id=\"" + script + "\">').html(msg));", data, null);
  });
}

function process_message(event) {
//  console.log("Origin = " + event.origin);
  if (event.origin == 'https://webutil.bridgebase.com') return;
//  console.log("Script = " + event.data.script);
//  console.log("ID     = " + event.data.id);
//  if (event.data.msg.length < 200) console.log("Msg    = " + event.data.msg);
//  console.log("Result = " + event.data.result);
  /*
    if (event.origin != BBOalertIframeSource) return;
    if (event.data.id == "noID") {
      if (event.data.script == "button_shortcut") return processButtonClick(event.data);
      if (event.data.script == "trustedBid") return processTrustedBid(event.data);
    }
  */
  var fn = messageQueue.get(event.data.id);
  if ((typeof fn) == "function") fn(event.data);
  messageQueue.delete(event.data.id);
}

function execIframeMessage(script, msg, clback) {
  var ifrm = document.getElementById("bboalert-iframe");
  if (ifrm == null) return;
  data = {};
  //  data.id = Date.now().toString();
  data.id = generateId();
  data.script = script;
  data.msg = msg;
  messageQueue.set(data.id, clback);
  ifrm.contentWindow.postMessage(data, "*");
}

async function execIframeMessageAndWait(script, msg, clback) {
  var ifrm = document.getElementById("bboalert-iframe");
  if (ifrm == null) return;
  data = {};
  data.id = generateId();
  //  data.id = Date.now().toString();
  data.script = script;
  data.msg = msg;
  messageQueue.set(data.id, clback);
  ifrm.contentWindow.postMessage(data, "*");
  e = await waitForEvent(window, "message");
  console.log("Done " + e.data);
}

function getEvalResult(data) {
  console.log("Final Result  = " + data.result);
  return data.result;
}

// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

