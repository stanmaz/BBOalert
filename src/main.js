navDivDisplayed = false;

// Options for the observer (which mutations to observe)
const config = {
  attributes: true,
  attributeFilter: ['id', 'class', 'style'],
  childList: true,
  subtree: true
};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  observer.disconnect();
  if ($("#navDiv").is(":visible") != navDivDisplayed) {
    navDivDisplayed = !navDivDisplayed;
    if (navDivDisplayed) onNavDivDisplayed();
    else onNavDivHidden();
  }
  observer.observe(targetNode, config);
};

/**
 * @ignore
 */
function openAccountTab() {
  var vc = parent.document.querySelectorAll('.verticalClass');
  if (vc.length < 4) return false;
  vc[3].click();
  return true;
}


//initBBOalertIframe();

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
const targetNode = document.body;
observer.observe(targetNode, config);


function onNavDivDisplayed() {
  console.log("navDiv displayed");
  //  initBBOalertIframe();
  //  loadScripts();
  //  setTimeout(() => {
  initBBOalertIframe();
  //  }, 2000);
}

function onNavDivHidden() {
  console.log("navDiv hidden");
  $("#adpanel0").hide();
}

console.log("A " + window.location.href);
if (window.location.href.startsWith("https://drive.google.com/file/d/"))
if (window.location.href.endsWith("/preview")) {
  window.onload = function () {
    setTimeout(function () {
      let t = $("pre").text();
      var msg = {};
      msg.url = window.location.href;
      msg.text = t;
      window.parent.postMessage(msg, "*");  
    },100);
  };
}
