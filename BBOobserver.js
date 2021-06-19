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
    lastSelectedCall = '';
    cardLead = '';
    playedCards = '';
    callExplanationPanelDisplayed = false;
    myCardsDisplayed = '';
    dealEndPanelDisplayed = false;
    announcemenDisplayed = false;
    finalContractDisplayed = false;
    announcementText = '';
    notificationDisplayed = false;
    notificationText = '';
    lastChatMessage = '';
    srcRelnotes = "https://docs.google.com/document/d/e/2PACX-1vQ_8Iv9HbBj4nWDXSY_kHsW1ZP_4c4dbOVO0GLuObJc1vFu_TBg9oV6ZJXMWd_tLITOj7i6WaJBeZJI/pub?embedded=true";
}

initGlobals();

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
    if (isVisible(getAnnouncementPanel()) != announcemenDisplayed) {
        announcemenDisplayed = !announcemenDisplayed;
        if (announcemenDisplayed) onAnnouncementDisplayed();
    }
    if (isVisible(getNotificationPanel()) != notificationDisplayed) {
        notificationDisplayed = !notificationDisplayed;
        if (notificationDisplayed) onNotificationDisplayed();
    }
    if (isVisible(getFinalContractPanel()) != finalContractDisplayed) {
        finalContractDisplayed = !finalContractDisplayed;
        if (finalContractDisplayed) onFinalContractDisplayed();
    }
    if (currentAuction != getContext()) {
        currentAuction = getContext();
        onNewAuction();
    }
    if (activePlayer != getActivePlayer()) {
        activePlayer = getActivePlayer();
        callText = '';
        lastSelectedCall = callText;
        if (activePlayer != '') onNewActivePlayer();
    }
    if (isVisible(getExplainCallBox()) != explainCallDisplayed) {
        explainCallDisplayed = !explainCallDisplayed;
        if (explainCallDisplayed) onExplainCallDisplayed();
        else onExplainCallHidden();
    }
    if (isVisible(getDealEndPanel()) != dealEndPanelDisplayed) {
        dealEndPanelDisplayed = !dealEndPanelDisplayed;
        if (dealEndPanelDisplayed) onDealEndPanelDisplayed();
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
    if (callText != lastSelectedCall) {
        lastSelectedCall = callText;
        if (isVisible(getAuctionBox())) onNewCallSelected();
    }
    if (getLastChatMessaage() != lastChatMessage) {
        lastChatMessage = getLastChatMessaage();
        onNewChatMessage();
    }
    if (cardLead != getCard(90)) {
        cardLead = getCard(90);
        onNewLead();
    }
    if (playedCards != getPlayedCards()) {
        playedCards = getPlayedCards();
        onNewPlayedCard();
    }
    if (isVisible(getCallExplanationPanel()) != callExplanationPanelDisplayed) {
        callExplanationPanelDisplayed = !callExplanationPanelDisplayed;
        if (callExplanationPanelDisplayed) onCallExplanationPanelDisplayed();
    }
    if ((myCardsDisplayed != getMyHand()) &&  (getMyHand().length == 26)) {
        myCardsDisplayed = getMyHand();
        onMyCardsDisplayed();
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
    // move down CC table
    var ccd = document.getElementById('ccDiv');
	if (ccd != null) ccd.style.top = "";
//	if (ccd != null) ccd.style.top = "85px";
    partnershipOptions();
    checkOptionsVulnerability();
    setOptionColors();
    if ($("#adpanel2").length == 1) {
        if (document.activeElement.tagName.toLowerCase() == "input") {
//            document.activeElement.tagName.onfocus = inputOnFocus;
            if (!$("#rightDiv")[0].contains(document.activeElement)) {
                $("#adpanel2")[0].inputObject = document.activeElement;
                if (document.activeElement.onclick == null) {
                    document.activeElement.onclick = function () {
                        toggleButtons(this);
                    };
                }
            }
        }
    }
    hover_bboalert();
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
//    setExplainInputClickEvents();
    var elAlertExplain = getExplainInput();
    if (elAlertExplain.onclick == null) {
        elAlertExplain.onclick = function () {
            toggleButtons(this);
        };
    }
    elAlertExplain.onkeyup = inputOnKeyup;
//    elAlertExplain.onfocus = inputOnFocus;
    getExplainInput().setAttribute("maxlength", "69");
    execUserScript('%onBiddingBoxDisplayed%');
}

function onBiddingBoxHidden() {
    execUserScript('%onBiddingBoxHidden%');
}

function onAuctionBoxDisplayed() {
    execUserScript('%onAuctionBoxDisplayed%');
    setTimeout(function () {
        if (getContext() == '') execUserScript('%onAuctionBegin%');
    }, 200);
}

function onAuctionBoxHidden() {
    activePlayer = '';
    execUserScript('%onAuctionBoxHidden%');
    var ctx = getContext();
    if ((ctx.length >= 8) && (ctx.endsWith('------'))) {
        execUserScript('%onAuctionEnd%');
    }
}

function onFinalContractDisplayed() {
    execUserScript('%onFinalContractDisplayed%');
}

function onNewAuction() {
    if (currentAuction != '')
    if (currentAuction != '??') execUserScript('%onNewAuction%');
}

function onNewActivePlayer() {
    execUserScript('%onNewActivePlayer%');
}

function onExplainCallDisplayed() {
    dragElement(getExplainCallBox());
    getExplainCallBox().onkeyup = inputOnKeyup;
//    getExplainCallBox().onfocus = inputOnFocus;
    var e = getExplainCallInput();
    if (e.onclick == null) {
        e.onclick = function () {
            toggleButtons(this);
        };
    }
    getExplainCallBox().style.width = "auto";
    getExplainCallBox().style.height = "auto";
    dragElement(getExplainCallBox());
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
    $(window).on("beforeunload", exportUpdateData);
    $(".logoutBlock button")[0].onclick = exportUpdateData;
    setUI();
    addBBOalertTab();
    alertData = localStorage.getItem('BBOalertCache');
    if (alertData == null) alertData = 'BBOalert\n';
    if (alertData == "") alertData = 'BBOalert\n';
    alertOriginal = alertData;
    openAccountTab();
    setOptions(true);
    bboalertLog(version + "<br>Reading data<br>");
    setTimeout(() => {
        updateAlertDataAsync(alertOriginal, function () {
            alertTable = alertData.split("\n");
            saveAlertTableToClipboard();
            processTable();
            displayHeaders();
            addBBOalertLog("<br>" + alertTable.length + " records from cache");
            var elMessage = getChatInput();
            elMessage.onkeyup = inputOnKeyup;
            if (elMessage.onclick == null) {
                elMessage.onclick = function () {
                    toggleButtons(this);
                };
            }
            setPageReload();
            setTabEvents();
            partnershipOptions();
            setTimeout(function () {
                setOptions(true);
            }, 200);
            restoreSettings();
            hideUnusedOptions();
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

function onNewCallSelected() {
    if (lastSelectedCall.length == 2) execUserScript('%onNewCallSelected%');
    if (lastSelectedCall.length == 1) execUserScript('%onCallLevelSelected%');
}

function onNewLead() {
    if (myDirection() != "") {
        if (getMyHand().length == 24) {
            execUserScript('%onMyLead%');
        }
    }
}

function onNewPlayedCard() {
    if (playedCards != '') execUserScript('%onNewPlayedCard%');
}

function onCallExplanationPanelDisplayed() {
    dragElement(getCallExplanationPanel());
    execUserScript('%onCallExplanationPanelDisplayed%');
}

function onMyCardsDisplayed() {
    execUserScript('%onMyCardsDisplayed%');
}


function onDealEndPanelDisplayed() {
    execUserScript('%onDealEnd%');
}

function onAnnouncementDisplayed () {
    dragElement(getAnnouncementPanel());
    execUserScript('%onAnnouncementDisplayed%');
}

function onNotificationDisplayed () {
    execUserScript('%onNotificationDisplayed%');
}

function onNewChatMessage () {
    if (getDealNumber() != '') execUserScript('%onNewChatMessage%');
}
