//BBOalert, stanmaz new events 
//BBOalert, version 20240314.1
//Script,onAnyMutation
//console.log(Date.now() + " onAnyMutation");
//Script,onNewDeal
console.log(Date.now() + " onNewDeal");
//Script,onMyCardsDisplayed
console.log(Date.now() + " onMyCardsDisplayed " + myCardsDisplayed);
//Script,onNewAuction
setTimeout(function () {
    console.log(Date.now() + " onNewAuction " + currentAuction + " turn " + whosTurn() + " " + isMyTurn());
    if (!((currentAuction.length >= 8) && (currentAuction.endsWith('------')))) {
        if (isMyTurn()) execUserScript('%onMyTurnToBid%');
    }
}, 50);
//Script,onAuctionBegin
console.log(Date.now() + " onAuctionBegin" + " myTurn " + isMyTurn());
if (isMyTurn()) execUserScript('%onMyTurnToBid%');
//Script,onAuctionEnd
console.log(Date.now() + " onAuctionEnd");
execUserScript('%onBeforePlayingCard%');
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
}
//Script,onBeforePlayingCard
var who = "opponent";
if (whosTurn() == myDirection()) who = "me";
if (whosTurn() == directionLHO()) who = "lho";
if (whosTurn() == partnerDirection()) who = "partner";
if (whosTurn() == directionRHO()) who = "rho";
console.log(Date.now() + " onBeforePlayingCard " + whosTurn() + " " + who);
if ((who == "partner" && partnerDirection() == getDummyDirection()) || (isMyTurn())) execUserScript('%onMyTurnToPlay%');
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
getCardByValue = function (cv) {
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

getDummyCards = function () {
    playedCards = [];
    var cards = $("bridge-screen", parent.window.document).find(".cardClass:visible").each(function () {
        if (this.style.zIndex.startsWith("3")) {
            var c = $(this).find(".topLeft").text();
            playedCards.push(replaceSuitSymbols(c, ""));
        }
    });
    return playedCards;
}

getMyCards = function () {
    playedCards = [];
    var cards = $("bridge-screen", parent.window.document).find(".cardClass:visible").each(function () {
        if (this.style.zIndex.startsWith("1")) {
            var c = $(this).find(".topLeft").text();
            playedCards.push(replaceSuitSymbols(c, ""));
        }
    });
    return playedCards;
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

isMyTurn = function () {
    if ($("bridge-screen", parent.window.document).find(".nameBarClass:visible").first().css("background-color") == 'rgb(255, 206, 0)') {
        return (activePlayer.substring(1).toLowerCase() == whoAmI().toLowerCase());
    }
    return false;
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
    return ((uid.toLowerCase == whoAmI().toLowerCase));
}

onNewContext = function () {
    execUserScript('%onNewContext%');
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
    if (currentAuction == '') {
        if (getContext() == '') {
            BBOalertEvents().dispatchEvent(E_onAuctionBegin);
            bidSymbolMap.clear();
            execUserScript('%onAuctionBegin%');
        }
        bidSymbolMap.clear();
    }
    if (currentAuction != '')
        if (currentAuction != '??') {
            if ((currentAuction.length >= 8) && (currentAuction.endsWith('------'))) {
                BBOalertEvents().dispatchEvent(E_onAuctionEnd);
                execUserScript('%onAuctionEnd%');
            }
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

//Script

