function initGlobals() {
    /**
     * boolean = true : if main BBO panel displayed
     */
    navDivDisplayed = false;
    /**
     * boolean = true : if bidding box exists
     * Bidding box element is created when the table
     * is displayed
     */
    biddingBoxExists = false;
    /**
     * boolean = true : if bidding box is displayed
     */
    biddingBoxDisplayed = false;
    /**
     * boolean = true : when opponents ask more info
     */
    explainCallDisplayed = false;
    /**
     * boolean = true : during the auction
     */
    auctionBoxDisplayed = false;
    /**
     * string : contains current board number
     */
    lastDealNumber = '';
    /**
     * string : contains LHO user id
     */
    LHOpponent = '';
    /**
     * string : contains RHO user id
     */
    RHOpponent = '';
    /**
     * string = 'L' when LHO changed or 'R' when RHO changed
     */
    opponentChanged = '';
    /**
     * string : contains current auction
     */
    currentAuction = '??';
    /**
     * string : contains current active player direction and uid
     */
    activePlayer = '';
}

initGlobals();

// Options for the observer (which mutations to observe)
const config = {
    attributes: true,
    childList: true,
    subtree: true
};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    observer.disconnect();
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
        else onBiddingBoxHidden();
    }
    if (isVisible(getAuctionBox()) != auctionBoxDisplayed) {
        auctionBoxDisplayed = !auctionBoxDisplayed;
        if (auctionBoxDisplayed) onAuctionBoxDisplayed();
        else onAuctionBoxHidden();
    }
    if (currentAuction != getContext()) {
        currentAuction = getContext();
        onNewAuction();
    }
    if (activePlayer != getActivePlayer()) {
        activePlayer = getActivePlayer();
        onNewActivePlayer();
    }
    if (isVisible(getExplainCallBox()) != explainCallDisplayed) {
        explainCallDisplayed = !explainCallDisplayed;
        if (explainCallDisplayed) onExplainCallDisplayed();
        else onExplainCallHidden();
    }
    if ((myOpponent(true) != LHOpponent) || (myOpponent(false) != RHOpponent)) {
        onAnyOpponentChange();
    }
    if (getDealNumber() != lastDealNumber) {
        if (getDealNumber() != '') {
            onNewDeal();
        }
        lastDealNumber = getDealNumber();
    }
    onAnyMutation();
    observer.observe(targetNode, config);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
const targetNode = document.body;
observer.observe(targetNode, config);


function onAnyMutation() {
    partnershipOptions();
    checkOptionsVulnerability();
    setOptionColors();
    execUserScript('%onAnyMutation%');
}

function onBiddingBoxCreated() {
    lastDealNumber = '';
    LHOpponent = '';
    RHOpponent = '';
    activePlayer = '';
    execUserScript('%onBiddingBoxCreated%');
}

function onBiddingBoxDisplayed() {
    setBiddingButtonEvents();
    setExplainInputClickEvents();
    var elAlertExplain = getExplainInput();
    if (elAlertExplain.onclick == null) {
        elAlertExplain.onclick = function () {
            toggleButtons(this);
        };
    }
    elAlertExplain.onkeyup = explainOnKeyup;
    execUserScript('%onBiddingBoxDisplayed%');
}

function onBiddingBoxHidden() {
    execUserScript('%onBiddingBoxHidden%');
}

function onAuctionBoxDisplayed() {
    execUserScript('%onAuctionBoxDisplayed%');
    if (getContext() == '') execUserScript('%onAuctionBegin%');
}

function onAuctionBoxHidden() {
    activePlayer = '';
    execUserScript('%onAuctionBoxHidden%');
    var ctx = getContext();
    if ((ctx.length >= 8) && (ctx.endsWith('------'))) {
        execUserScript('%onAuctionEnd%');
    }
}

function onNewAuction() {
    if (currentAuction != '??') execUserScript('%onNewAuction%');
}

function onNewActivePlayer() {
    execUserScript('%onNewActivePlayer%');
}

function onExplainCallDisplayed() {
    getExplainCallBox().onkeyup = explainCallOnKeyup;
    var e = getExplainCallInput();
    if (e.onclick == null) {
        e.onclick = function () {
            toggleButtons(this);
        };
    }
    execUserScript('%onExplainCallDisplayed%');
}

function onExplainCallHidden() {
    execUserScript('%onExplainCallHidden%');
}

function onBiddingBoxRemoved() {
    setBiddingButtonEvents();
    execUserScript('%onBiddingBoxRemoved%');
}

function onNavDivDisplayed() {
    // complete initial setup
    setUI();
    addBBOalertTab();
    alertData = localStorage.getItem('BBOalertCache');
    alertOriginal = alertData;
    openAccountTab();
    setOptions(true);
    bboalertLog(version + "<br>Reading data<br>");
    setTimeout(() => {
        updateAlertDataAsync(alertOriginal, function () {
            if (alertData == null) alertData = '';
            alertTable = alertData.split("\n");
            saveAlertTableToClipboard();
            processTable();
            addBBOalertLog(getBBOalertHeaderMsg() + alertTable.length + " records from cache");
            var elMessage = getChatInput();
            elMessage.onkeyup = messageOnKeyup;
            if (elMessage.onclick == null) {
                elMessage.onclick = function () {
                    toggleButtons(this);
                };
            }
            setChatInputClickEvents();
            setControlButtonEvents();
            setPageReload();
            setTabEvents();
            partnershipOptions();
            setTimeout(function () {
                setOptions(true);
            }, 200);
            execUserScript('%onLogin%');
        });
    }, 500);
}

function onNavDivHidden() {
    setButtonPanel(false);
    setOptionsOff();
    initGlobals();
    localStorage.setItem('BBOalertCache', alertOriginal);
    execUserScript('%onLogoff%');
}

function onAnyOpponentChange() {
    if (!biddingBoxExists) return;
    opponentChanged = '';
    if (myOpponent(true) != LHOpponent) {
        opponentChanged = 'L';
        LHOpponent = myOpponent(true);
    }
    if (myOpponent(false) != RHOpponent) {
        opponentChanged = opponentChanged + 'R';
        RHOpponent = myOpponent(false);
    }
    execUserScript('%onAnyOpponentChange%');
}

function onNewDeal() {
    activePlayer = '';
    execUserScript('%onNewDeal%');
}