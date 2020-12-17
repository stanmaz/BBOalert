const targetNode = document.body;
navDivDisplayed = false;
biddingBoxExists = false;
biddingBoxDisplayed = false;
lastDealNumber = "";
explainCallDisplayed = false;

// Options for the observer (which mutations to observe)
const config = {
    attributes: true,
    childList: true,
    subtree: true
};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    if ((getBiddingBox() != null) != biddingBoxExists) {
        biddingBoxExists = !biddingBoxExists;
        if (biddingBoxExists) onBiddingBoxCreated();
        else onBiddingBoxRemoved();
    }
    if (isVisible(getNavDiv()) != navDivDisplayed) {
        navDivDisplayed = !navDivDisplayed;
        if (navDivDisplayed) onNavDivDisplayed();
        else onNavDivHidden();
    }
    if (isVisible(getBiddingBox()) != biddingBoxDisplayed) {
        biddingBoxDisplayed = !biddingBoxDisplayed;
        if (biddingBoxDisplayed) onBiddingBoxDisplayed();
        console.log('myLog biddingBoxDiv visible  = ' + biddingBoxDisplayed);
    }
    if (isVisible(getExplainCallBox()) != explainCallDisplayed) {
        explainCallDisplayed = !explainCallDisplayed;
        if (explainCallDisplayed) onexplainCallDisplayed();
        console.log('myLog explainCall visible  = ' + explainCallDisplayed);
    }
    if (getDealNumber() != lastDealNumber) {
        if (getDealNumber() != '') {
            console.log('myLog Deal number ' + getDealNumber());
            newDeal();
        }
        lastDealNumber = getDealNumber();
    }
    onAnyMutation();
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);


function onAnyMutation() {
    partnershipOptions();
    checkOptionsVulnerability();
    setOptionColors();
}

function onBiddingBoxCreated() {
    console.log('myLog bidding box created');
    var ecc = getExplainCallBox();
    if (ecc != null) {
        dragElement(ecc);
    }
}

function onBiddingBoxDisplayed() {
    console.log('myLog bidding box displayed');
    setBiddingButtonEvents();
    setExplainInputClickEvents();
}

function onexplainCallDisplayed() {
    var ecc = getExplainCallBox();
    ecc.style.width = getBiddingBox().style.width;
    ecc.style.left = getBiddingBox().style.left;
    ecc.style.top = getBiddingBox().style.top;
    var ei = ecc.querySelector('.explainContainerClass');
    var eh = ecc.querySelector('.headingClass');
    ei.style.width = '85%';
    ei.style.fontSize = eh.style.fontSize;
}

function onBiddingBoxRemoved() {
    console.log('myLog bidding box removed');
    setBiddingButtonEvents();
}

function onNavDivDisplayed() {
    // complete initial setup
    console.log('myLog navDiv displayed');
    setUI();
    alertData = localStorage.getItem('BBOalertCache');
    if (alertData == null) alertData = '';
    alertTable = alertData.split("\n");
    bboalertLog(version + "<br>" + getBBOalertHeaderMsg() + alertTable.length + " records from cache");
    saveAlertTableToClipboard();
    processTable();
    openAccountTab();
    setTimeout(function () {
        setOptions(true);
    }, 200);
    setChatInputClickEvents();
    setControlButtonEvents();
    setPageReload();
    setTabEvents();
    partnershipOptions();
    updateAlert('%initBBOalert%');
}

function onNavDivHidden() {
    console.log('myLog navDiv hidden');
    setButtonPanel(false)
    setOptionsOff();
}

function newDeal() {}