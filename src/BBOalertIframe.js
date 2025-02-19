function initBBOalertIframe() {
//  if (document.getElementById("adpanel0") != null) return;
  var appPanel = document.getElementById("rightDiv");
  if (appPanel == null) return;
  $("#adpanel0").remove();
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
  var version = chrome.runtime.getManifest().name + ' ' + chrome.runtime.getManifest().version;
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
        <script defer src="${chrome.runtime.getURL("iframe/globals.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBO_DOM.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/blogspot.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/functions.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOalertData.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOalertFind.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOalertUI.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOalertOptions.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOobserver.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOobserverHandlers.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOalert.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOalertConfig.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/custom_syntax.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/webStorage.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/BBOalertPlugin.js")}" crossorigin='anonymous'></script>
        <script defer src="${chrome.runtime.getURL("iframe/init.js")}" crossorigin='anonymous'></script>
        <title>` + version + `</title>
  </head>
  
  <body>
  <!--BBOalert panel-->
  </body>
  
  </html>`;
  //  ifrm.style.display = 'block';
  adPanel0.appendChild(ifrm);
}
