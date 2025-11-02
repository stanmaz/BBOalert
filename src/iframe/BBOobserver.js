// Options for the observer (which mutations to observe)
const config = {
    attributes: true,
    attributeFilter: ['id', 'class', 'style'],
    childList: true,
    subtree: true
};

// Callback function to execute when mutations are observed
const BBOobserverCallback = function (mutationsList, observer) {
    observer.disconnect();
    checkBiddingBox();
    checkNavDiv();
    checkTableDisplayed();
    checkBiddingBoxDisplayed();
    checkAuctionBoxDisplayed();
    checkAnnouncementPanel();
    checkNotificationPanel();
    checkFinalContractPanel();
    checkCurrentAuction();
    checkActivePlayer();
    checkExplainCallBox();
    checkDealEndPanel();
    checkOpponents();
    checkDealNumber();
    checkCallText();
    checkOKbuttonVisible();
    checkOKbuttonPressed();
    checkChatMessage();
    checkCardLead();
    checkPlayedCards();
    checkCallExplanationPanel();
    checkMyCardsDisplayed();
    checkProfileBoxDisplayed();
    checkOpenProfileBBOalertURL();
    onAnyMutation();
    observer.observe(targetNode, config);
};

function checkBiddingBox() {
    if ((getBiddingBox() != null) != biddingBoxExists) {
        biddingBoxExists = !biddingBoxExists;
        if (biddingBoxExists) onBiddingBoxCreated();
        else onBiddingBoxRemoved();
    }
}

function checkNavDiv() {
    if (isVisible(getNavDiv()) != navDivDisplayed) {
        navDivDisplayed = !navDivDisplayed;
        if (navDivDisplayed) onNavDivDisplayed();
        else onNavDivHidden();
    }
}

function checkTableDisplayed() {
    if ($("bridge-screen", window.parent.document).is(":visible") != tableDisplayed) {
        tableDisplayed = !tableDisplayed;
        if (tableDisplayed) onTableDisplayed();
        else onTableHidden();
    }
}

function checkBiddingBoxDisplayed() {
    if (isVisible(getBiddingBox()) != biddingBoxDisplayed) {
        biddingBoxDisplayed = !biddingBoxDisplayed;
        if (biddingBoxDisplayed) onBiddingBoxDisplayed();
        else onBiddingBoxHidden();
    }
}

function checkAuctionBoxDisplayed() {
    if (isVisible(getAuctionBox()) != auctionBoxDisplayed) {
        auctionBoxDisplayed = !auctionBoxDisplayed;
        if (auctionBoxDisplayed) onAuctionBoxDisplayed();
        else onAuctionBoxHidden();
    }
}

function checkAnnouncementPanel() {
    if (isVisible(getAnnouncementPanel()) != announcemenDisplayed) {
        announcemenDisplayed = !announcemenDisplayed;
        if (announcemenDisplayed) onAnnouncementDisplayed();
    }
}

function checkNotificationPanel() {
    if (isVisible(getNotificationPanel()) != notificationDisplayed) {
        notificationDisplayed = !notificationDisplayed;
        if (notificationDisplayed) onNotificationDisplayed();
    }
}

function checkFinalContractPanel() {
    if (isVisible(getFinalContractPanel()) != finalContractDisplayed) {
        finalContractDisplayed = !finalContractDisplayed;
        if (finalContractDisplayed) onFinalContractDisplayed();
    }
}

function checkCurrentAuction() {
    if (currentAuction != getContext()) {
        currentAuction = getContext();
        onNewAuction();
    }
}

function checkActivePlayer() {
    if (activePlayer != getActivePlayer()) {
        activePlayer = getActivePlayer();
        callText = '';
        lastSelectedCall = callText;
        if (activePlayer != '') onNewActivePlayer();
    }
}

function checkExplainCallBox() {
    if (isVisible(getExplainCallBox()) != explainCallDisplayed) {
        explainCallDisplayed = !explainCallDisplayed;
        if (explainCallDisplayed) onExplainCallDisplayed();
        else onExplainCallHidden();
    }
}

function checkDealEndPanel() {
    if (isVisible(getDealEndPanel()) != dealEndPanelDisplayed) {
        dealEndPanelDisplayed = !dealEndPanelDisplayed;
        if (dealEndPanelDisplayed) onDealEndPanelDisplayed();
    }
}

function checkOpponents() {
    if ((myOpponent(true) != LHOpponent) || (myOpponent(false) != RHOpponent)) {
        onAnyOpponentChange();
    }
}

function checkDealNumber() {
    if (getDealNumber() != lastDealNumber) {
        if (getDealNumber() != '') {
            onNewDeal();
        }
        lastDealNumber = getDealNumber();
    }
}

function checkCallText() {
    if (getMyCall() != lastSelectedCall) {
        lastSelectedCall = getMyCall();
        if (isVisible(getAuctionBox())) onNewCallSelected();
    }
}
function checkOKbuttonVisible() {
    if (buttonOKvisible() != OKbuttonVisible) {
        OKbuttonVisible = buttonOKvisible();
        if (isVisible(getAuctionBox())) {
            if (OKbuttonVisible) {
                onOKbuttonDisplayed();
            } else { onOKbuttonHidden(); }
        }
    }
}

function checkOKbuttonPressed() {
    if (buttonOKpressed() != OKbuttonPressed) {
        OKbuttonPressed = buttonOKpressed();
        if (isVisible(getAuctionBox())) {
            if (OKbuttonPressed) { onOKbuttonPressed(); }
        }
    }
}

function checkChatMessage() {
    if (getLastChatMessaage() != lastChatMessage) {
        lastChatMessage = getLastChatMessaage();
        onNewChatMessage();
    }
}

function checkCardLead() {
    if (cardLead != getCard(90)) {
        cardLead = getCard(90);
        onNewLead();
    }
}

function checkPlayedCards() {
    if (playedCards != getPlayedCards()) {
        playedCards = getPlayedCards();
        onNewPlayedCard();
    }
}

function checkCallExplanationPanel() {
    if (isVisible(getCallExplanationPanel()) != callExplanationPanelDisplayed) {
        callExplanationPanelDisplayed = !callExplanationPanelDisplayed;
        if (callExplanationPanelDisplayed) onCallExplanationPanelDisplayed();
    }
}

function checkMyCardsDisplayed() {
    if ((myCardsDisplayed != getMyHand()) && (getMyHand().length == 26)) {
        myCardsDisplayed = getMyHand();
        onMyCardsDisplayed();
    }
}

function checkProfileBoxDisplayed() {
    if (getOpenProfileBBOid() != openProfileBBOid) {
        openProfileBBOid = getOpenProfileBBOid();
    }
}

function checkOpenProfileBBOalertURL() {
    if (getOpenProfileBBOalertURL() != openProfileBBOalertURL) {
        openProfileBBOalertURL = getOpenProfileBBOalertURL();
        if (openProfileBBOalertURL != "") {
            addBBOalertButtonToProfile();
        } else {
            removeBBOalertButtonFromProfile();
        }
    }
}  

/**
 * @ignore
 */

// openAccountTab();



// Create an observer instance linked to the callback function
const BBOobserver = new MutationObserver(BBOobserverCallback);

// Start observing the target node for configured mutations
const targetNode = parent.document.body;
var tmr = setInterval(function () {
    if (!isVisible(getNavDiv())) return;
    initGlobals();
    navDivDisplayed = true;
    onNavDivDisplayed();
    clearInterval(tmr);
    BBOobserver.observe(targetNode, config);
}, 100);

