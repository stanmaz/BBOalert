//BBOalert, stanmaz new events 
//BBOalert, version 20240318
//Script,onAnyMutation
if ((dummyCardsDisplayed != getDummyCards().toString()) && (getDummyCards().join("").length == 26)) {
    dummyCardsDisplayed = getDummyCards().toString();
    onDummyCardsDisplayed();
}
//Script,onNewDeal
console.log(Date.now() + " onNewDeal " + getDealNumber());
//Script,onMyCardsDisplayed
console.log(Date.now() + " onMyCardsDisplayed " + myCardsDisplayed);
currentAuction = '';
dummyCardsDisplayed = "";
execUserScript('%onNewContext%');
//Script,onNewAuction
console.log(Date.now() + " onNewAuction");
//Script,onNewContext
console.log(Date.now() + " onNewContext " + currentAuction);
if ((currentAuction.length >= 8) && (currentAuction.endsWith('------'))) {
    execUserScript('%onAuctionEnd%');
} else {
    if (getContext() == '') {
        BBOalertEvents().dispatchEvent(E_onAuctionBegin);
        bidSymbolMap.clear();
        execUserScript('%onAuctionBegin%');
    }
    if (isMyTurn()) execUserScript('%onMyTurnToBid%');
}
//Script,onAuctionBegin
console.log(Date.now() + " onAuctionBegin");
//Script,onAuctionEnd
console.log(Date.now() + " onAuctionEnd");
execUserScript('%onBeforePlayingCard%');
if (isMyTurnToPlay()) execUserScript('%onMyTurnToPlay%');
//Script,onBiddingBoxDisplayed
console.log(Date.now() + " onBiddingBoxDisplayed");
//Script,onAuctionBoxDisplayed
console.log(Date.now() + " onAuctionBoxDisplayed");
//Script,onMyLead
console.log(Date.now() + " onMyLead");
//Script,onDealEnd
console.log(Date.now() + " onDealEnd");
//Script,onNewPlayedCard
console.log(Date.now() + " onNewPlayedCard " + getPlayedCards() + " turn " + whosTurn());
if (whosTurn() != "") {
    execUserScript('%onBeforePlayingCard%');
    if (isMyTurnToPlay()) execUserScript('%onMyTurnToPlay%');
}
//Script,onBeforePlayingCard
console.log(Date.now() + " onBeforePlayingCard " + whosTurn());
//Script,onNewActivePlayer
console.log(Date.now() + " onNewActivePlayer " + activePlayer);
//Script,onMyTurnToBid
console.log(Date.now() + " onMyTurnToBid context: " + getContext());
//Script,onMyTurnToPlay
console.log(Date.now() + " onMyTurnToPlay Cards played: " + getPlayedCards());
//Script

//BBOalert,myFunctions
//Script,onDataLoad
currentContext = "??";
dummyCardsDisplayed = "";
getCardByValue = function (cval) {
    let cv =  cval.replace("T", "10");
    var card = $("bridge-screen", parent.window.document).find(".topLeft:visible").filter(function () {
        if (replaceSuitSymbols(this.textContent, "") == cv) return this;
    });
    if (card.length != 0) return card[0];
    return null;
}

playCardByValue = function (cv) {
    var card = getCardByValue(cv);
    if (card != null) {
        card.click();
        card.click();
    }
}

getCardsByDirection = function (direction) {
    let cards = [];
    let zidx = "";
    switch (direction) {
        case "S" : zidx = "1"; break;
        case "W" : zidx = "2"; break;
        case "N" : zidx = "3"; break;
        case "E" : zidx = "4"; break;
        default : return cards;
    }
    $("bridge-screen .cardSurfaceClass", getNavDiv()).find(".cardClass:visible").each(function () {
        if (this.style.zIndex.startsWith(zidx)) {
            let c = $(this).find(".topLeft").text();
            c = replaceSuitSymbols(c, "").replace("10", "T");
            if (c.length == 2) cards.push(c);
        }
    });
    return cards;
}

function getCard(index) {
    var card = parent.$(".cardClass:visible").filter(function () {
        return $(this).css('z-index') == index;
    }).text();
    if (card.length == 6) {
        card = "T" + card.slice(-1);
    } else card = card.slice(0, 2);
    return card;
}

getMyCards = function () {
    return getCardsByDirection(mySeat());
}

getDummyCards = function () {
    return getCardsByDirection(getDummyDirection());
}

getDeclarerCards = function () {
    return getCardsByDirection(getDeclarerDirection());
}

isMyTurnToBid = function () {
    return isItMe(getPlayerAtSeat(getDirectionToBid()));
}

isMyTurnToPlay = function () {
    if (whosTurn() == getDummyDirection())
        if (isItMe(getPlayerAtSeat(getDeclarerDirection()))) return true;
    return isItMe(getPlayerAtSeat(whosTurn()));
}

isMyTurn = function () {
    return (isMyTurnToBid()||isMyTurnToPlay());
}

whosTurn = function () {
    return $("bridge-screen,parent", parent.window.document).find(".nameBarClass:visible").filter(function () {
        if (this.style.backgroundColor == 'rgb(255, 206, 0)') return this;
    }).find(".directionClass").text();
}

delayedAlert = function (txt, delay = 0) {
    setTimeout(function () {
        alert(txt);
    }, delay)
}

selectBid = function (bid, alert = false) {
    let bbb = parent.$("bidding-box button");
    if (bbb.length != 17) return;
    if (alert != (bbb[15].style.backgroundColor == 'rgb(255, 255, 255)')) bbb[15].click();
    switch (bid) {
        case "--": bbb[12].click(); break;
        case "Db": bbb[13].click(); break;
        case "Rd": bbb[14].click(); break;
        default:
            $(bbb).each(function (idx) {
                if (idx < 12)
                    if (bid.indexOf(replaceSuitSymbols(this.textContent.substring(1), "")) != -1) this.click();
            });
    }
}

isItMe = function (uid) {
    return ((uid.toLowerCase() == whoAmI().toLowerCase()));
}

onNewContext = function () {
    execUserScript('%onNewContext%');
}

getDealerDirection = function () {
    return "NESW".charAt((getDealNumber() - 1) % 4);
}

getDirectionToBid = function () {
    if (getContext() == "??") return "";
    return "NESW".charAt((getDealNumber() - 1 + getContext().length / 2) % 4);
}

getPlayerAtSeat = function (seat) {
    return $(".nameBarDivClass", getNavDiv()).filter(function () {
        return (this.textContent.startsWith(seat));
    }).text().substring(1);
}

getDeclarerDirection = function () {
    return $(".tricksPanelTricksLabelClass:visible", getNavDiv()).text().substring(0, 1);
}

getDummyDirection = function () {
    let declarer = getDeclarerDirection();
    if (declarer == "") return "";
    return "NESWNESW".charAt("NESW".indexOf(declarer) + 2);
}

window.getCard = function (index) {
    $(".tricksPanelTricksLabelClass:visible", getNavDiv()).text().substring(0, 1);
    var card = parent.$(".cardClass:visible").filter(function () {
        return ($(this).css('z-index') == index);
    }).text();
    if (card.length == 6) {
        card = "T" + card.slice(-1);
    } else card = card.slice(0, 2);
    return card;
}

window.onAuctionBoxHidden = function () {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onAuctionBoxHidden);
    execUserScript('%onAuctionBoxHidden%');
}

window.onNewAuction = function onNewAuction() {
    if (!auctionBoxDisplayed) return;
    execUserScript('%onNewContext%');
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

window.onAuctionBoxHidden = function () {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onAuctionBoxHidden);
    execUserScript('%onAuctionBoxHidden%');
}

window.onNewActivePlayer = function () {
    if (lastDealNumber != "") {
        BBOalertEvents().dispatchEvent(E_onNewActivePlayer);
        execUserScript('%onNewActivePlayer%');
    }
}

window.mySeat = function() {
    return $(".auction-header",getNavDiv()).text().slice(-2,-1);
}

window.onDummyCardsDisplayed = function () {
//    BBOalertEvents().dispatchEvent(E_onMyCardsDisplayed);
    execUserScript('%onDummyCardsDisplayed%');
}
//Script

