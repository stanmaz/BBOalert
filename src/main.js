navDivDisplayed = false;
BBOalertTabPresent = false;
DEBUG = false;

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
  if (($("#bboalert-tab").length > 0) != BBOalertTabPresent) {
    BBOalertTabPresent = !BBOalertTabPresent;
    if (BBOalertTabPresent) getBBOlanguage();
  }
  observer.observe(targetNode, config);
};

//initBBOalertIframe();

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
const targetNode = document.body;
window.onload = function() {
  observer.observe(targetNode, config);
};

function onNavDivDisplayed() {
  if (DEBUG) console.log("navDiv displayed");
  initBBOalertIframe();
}

function onNavDivHidden() {
  if (DEBUG) console.log("navDiv hidden");
  $("#adpanel0").hide();
}

function getBBOlanguage() {
  function onLanguageDetected(langInfo) {
    for (lang of langInfo.languages) {
      $("html").attr("lang", lang.language);
      break;
    }
  }
  var text = $("#navDiv").map(function () { return this.textContent }).get().join(',');
  var detecting = chrome.i18n.detectLanguage(text);
  detecting.then(onLanguageDetected);
}

if (window.location.href.startsWith("https://drive.google.com/file/d/") && window.location.href.endsWith("/preview")) {
  let attemptCount = 0;
  const maxAttempts = 20;
  const intervalId = setInterval(() => {
    try {
      const textContent = $("pre").text();
      if (textContent.length > 0) {
        const message = {
          url: window.location.href,
          text: textContent
        };
        window.parent.postMessage(message, "*");
        clearInterval(intervalId);
      }
      attemptCount++;
      if (attemptCount > maxAttempts) {
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error("Error occurred during interval execution:", error);
      clearInterval(intervalId);
    }
  }, 100);
}

