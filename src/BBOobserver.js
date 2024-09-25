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
    if ($("bridge-screen", window.parent.document).is(":visible") != tableDisplayed) {
        tableDisplayed = !tableDisplayed;
        if (tableDisplayed) onTableDisplayed();
        else onTableHidden();
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
    if ((myCardsDisplayed != getMyHand()) && (getMyHand().length == 26)) {
        myCardsDisplayed = getMyHand();
        onMyCardsDisplayed();
    }
    onAnyMutation();
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

function openMessageTab() {
    var vc = parent.document.querySelectorAll('.verticalClass');
    if (vc.length < 4) return false;
    vc[0].click();
    return true;
}

// openAccountTab();

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
const targetNode = parent.document.body;
var tmr = setInterval(function () {
    console.log("Scripts loaded = " + $("script").length);
    if ($("script").length != 16) return; // be sure all scripts ale loaded
    if (!isVisible(getNavDiv())) return;
    initGlobals();
    navDivDisplayed = true;
    onNavDivDisplayed();
    clearInterval(tmr);
    observer.observe(targetNode, config);
}, 100);


function onAnyMutation() {
    // move down CC table
    var ccd = parent.document.getElementById('ccDiv');
    if (ccd != null) ccd.style.top = "";
    //	if (ccd != null) ccd.style.top = "85px";
    partnershipOptions();
    checkOptionsVulnerability();
    setOptionColors();
    if ($("#adpanel2").length == 1) {
        if (parent.document.activeElement.tagName.toLowerCase() == "input") {
            //            document.activeElement.tagName.onfocus = inputOnFocus;
            if (!parent.$("#rightDiv")[0].contains(parent.document.activeElement)) {
                $("#adpanel2")[0].inputObject = parent.document.activeElement;
                if (parent.document.activeElement.onclick == null) {
                    parent.document.activeElement.onclick = function () {
                        toggleButtons(this);
                    };
                }
            }
        }
    }
    hover_bboalert();
    BBOalertEvents().dispatchEvent(E_onAnyMutation);
    execUserScript('%onAnyMutation%');
}

function onBiddingBoxCreated() {
    lastDealNumber = '';
    LHOpponent = '';
    RHOpponent = '';
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onBiddingBoxCreated);
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
    lastUserExplanation = '';
    /*
        if (elAlertExplain.oninput == null) {
            elAlertExplain.oninput = function () {
                lastUserExplanation = elAlertExplain.value;
            };
        }
    */
    elAlertExplain.onkeyup = inputOnKeyup;
    elAlertExplain.oninput = inputChanged;
    //    elAlertExplain.onfocus = inputOnFocus;
    getExplainInput().setAttribute("maxlength", "69");
    BBOalertEvents().dispatchEvent(E_onBiddingBoxDisplayed);
    execUserScript('%onBiddingBoxDisplayed%');
}

function onBiddingBoxHidden() {
    BBOalertEvents().dispatchEvent(E_onBiddingBoxHidden);
    execUserScript('%onBiddingBoxHidden%');
}

function onAuctionBoxDisplayed() {
    BBOalertEvents().dispatchEvent(E_onAuctionBoxDisplayed);
    execUserScript('%onAuctionBoxDisplayed%');
    setTimeout(function () {
        if (getContext() == '') {
            BBOalertEvents().dispatchEvent(E_onAuctionBegin);
            bidSymbolMap.clear();
            execUserScript('%onAuctionBegin%');
        }
    }, 200);
}

function onAuctionBoxHidden() {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onAuctionBoxHidden);
    execUserScript('%onAuctionBoxHidden%');
    var ctx = getContext();
    if ((ctx.length >= 8) && (ctx.endsWith('------'))) {
        BBOalertEvents().dispatchEvent(E_onAuctionEnd);
        execUserScript('%onAuctionEnd%');
    }
}

function onFinalContractDisplayed() {
    BBOalertEvents().dispatchEvent(E_onFinalContractDisplayed);
    execUserScript('%onFinalContractDisplayed%');
}

function onNewAuction() {
    if (currentAuction == '') bidSymbolMap.clear();
    if (currentAuction != '')
        if (currentAuction != '??') {
            ctxArray = bidArray(stripContext(getContext()));
            BBOalertEvents().dispatchEvent(E_onNewAuction);
            execUserScript('%onNewAuction%');
            console.log("Active player " + activePlayer);
            if (activePlayer.slice(0, 1) == directionRHO()) {
                let txt = findAlert(getContext().slice(0, -2), getContext().slice(-2));
                BBOalertEvents().dispatchEvent(E_onPartnerAuction);
                execUserScript('%onPartnerAuction%');
            }
            if (activePlayer.slice(0, 1) == directionLHO()) {
                console.log("My bid " + getContext().slice(-2));
                BBOalertEvents().dispatchEvent(E_onMyAuction);
                execUserScript('%onMyAuction%');
            }
            if (activePlayer.slice(0, 1) == myDirection()) {
                console.log("RHO bid " + getContext().slice(-2));
                BBOalertEvents().dispatchEvent(E_onRHOAuction);
                execUserScript('%onRHOAuction%');
            }
            if (activePlayer.slice(0, 1) == partnerDirection()) {
                console.log("LHO bid " + getContext().slice(-2));
                BBOalertEvents().dispatchEvent(E_onLHOAuction);
                execUserScript('%onLHOAuction%');
            }
        }
}

function onNewActivePlayer() {
    BBOalertEvents().dispatchEvent(E_onNewActivePlayer);
    execUserScript('%onNewActivePlayer%');
}

function onExplainCallDisplayed() {
    dragElement(getExplainCallBox());
    getExplainCallBox().onkeyup = inputOnKeyup;
    getExplainCallBox().oninput = inputChanged;
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
    BBOalertEvents().dispatchEvent(E_onExplainCallDisplayed);
    execUserScript('%onExplainCallDisplayed%');
}

function onExplainCallHidden() {
    BBOalertEvents().dispatchEvent(E_onExplainCallHidden);
    execUserScript('%onExplainCallHidden%');
}

function onBiddingBoxRemoved() {
    setBiddingButtonEvents();
    BBOalertEvents().dispatchEvent(E_onBiddingBoxRemoved);
    execUserScript('%onBiddingBoxRemoved%');
}

function checkNewVersion() {
    var oldVersion = localStorage.getItem("BBOalertVersion");
    var curVersion = document.title;
    if (oldVersion != curVersion) {
        setTimeout(function () {
            alert("\nNew BBOalert version loaded : " + curVersion + "\n\nPlease read release notes on the 'Documents' tab");
            localStorage.setItem("BBOalertVersion", curVersion);
        }, 100);
    }
}

function onNavDivDisplayed() {
    console.log("Iframe navDiv displayed");
    // complete initial setup
    $(window).on("beforeunload", exportUpdateData);
    parent.document.querySelector(".logoutBlock button")
    setUI();
    addBBOalertTab();
    alertData = localStorage.getItem('BBOalertCache');
    if (alertData == null) alertData = 'BBOalert\n';
    if (alertData == "") alertData = 'BBOalert\n';
    alertOriginal = alertData;
    openAccountTab();
    openMessageTab();
    restoreSettings();
    setOptions(!isSettingON(7));
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
            elMessage.oninput = inputChanged;
            if (elMessage.onclick == null) {
                elMessage.onclick = function () {
                    toggleButtons(this);
                };
            }
            setPageReload();
            setTabEvents();
            partnershipOptions();
            setTimeout(function () {
                setOptions(!isSettingON(7));
            }, 200);
//            restoreSettings();
            hideUnusedOptions();
            BBOalertEvents().dispatchEvent(E_onLogin);
            execUserScript('%onLogin%');
            checkNewVersion();
            setBBOalertButton(isSettingON(8));
        });
    }, 500);
}

function onNavDivHidden() {
    console.log("Iframe navDiv displayed");
    setButtonPanel(false);
    setOptionsOff();
    initGlobals();
    localStorage.setItem('BBOalertCache', alertOriginal);
    BBOalertEvents().dispatchEvent(E_onLogoff);
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
    BBOalertEvents().dispatchEvent(E_onAnyOpponentChange);
    execUserScript('%onAnyOpponentChange%');
}

function onNewDeal() {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onNewDeal);
    execUserScript('%onNewDeal%');
}

function onNewCallSelected() {
    if (lastSelectedCall.length == 2) {
        BBOalertEvents().dispatchEvent(E_onNewCallSelected);
        execUserScript('%onNewCallSelected%');
    }
    if (lastSelectedCall.length == 1) {
        BBOalertEvents().dispatchEvent(E_onCallLevelSelected);
        execUserScript('%onCallLevelSelected%');
    }
}

function onNewLead() {
    if (myDirection() != "") {
        if (getMyHand().length == 24) {
            BBOalertEvents().dispatchEvent(E_onMyLead);
            execUserScript('%onMyLead%');
        }
    }
}

function onNewPlayedCard() {
    if (playedCards != '') {
        BBOalertEvents().dispatchEvent(E_onNewPlayedCard);
        execUserScript('%onNewPlayedCard%');
    }
}

function onCallExplanationPanelDisplayed() {
    dragElement(getCallExplanationPanel());
    BBOalertEvents().dispatchEvent(E_onCallExplanationPanelDisplayed);
    execUserScript('%onCallExplanationPanelDisplayed%');
}

function onMyCardsDisplayed() {
    lastUserExplanation = '';
    BBOalertEvents().dispatchEvent(E_onMyCardsDisplayed);
    execUserScript('%onMyCardsDisplayed%');
}


function onDealEndPanelDisplayed() {
    BBOalertEvents().dispatchEvent(E_onDealEnd);
    execUserScript('%onDealEnd%');
}

function onAnnouncementDisplayed() {
    dragElement(getAnnouncementPanel());
    BBOalertEvents().dispatchEvent(E_onAnnouncementDisplayed);
    execUserScript('%onAnnouncementDisplayed%');
}

function onNotificationDisplayed() {
    BBOalertEvents().dispatchEvent(E_onNotificationDisplayed);
    execUserScript('%onNotificationDisplayed%');
}

function onNewChatMessage() {
    BBOalertEvents().dispatchEvent(E_onNewChatMessage);
    execUserScript('%onNewChatMessage%');
}

function onTableDisplayed() {
    BBOalertEvents().dispatchEvent(E_onTableDisplayed);
    execUserScript('%onTableDisplayed%');
}


function onTableHidden() {
    BBOalertEvents().dispatchEvent(E_onTableHidden);
    execUserScript('%onTableHidden%');
}

