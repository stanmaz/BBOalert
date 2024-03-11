//BBOalert, stanmaz new events 
//BBOalert, version 20240309
//Script,onNewDeal
console.log(Date.now() + " onNewDeal");
//Script,onMyCardsDisplayed
console.log(Date.now() + " onMyCardsDisplayed " + myCardsDisplayed);
//Script,onNewAuction
console.log(Date.now() + " onNewAuction " + currentAuction + " turn " + whosTurn() + " " + isMyTurn());

//Script,onAuctionBegin
console.log(Date.now() + " onAuctionBegin" + " myTurn " + isMyTurn());
if (isMyTurn()) execUserScript('%onMyTurnToBid%');
dummyDirection = "";
declarerDirection = "";
//Script,onAuctionEnd
console.log(Date.now() + " onAuctionEnd");
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
if ((who == "partner" && partnerDirection() == dummyDirection) || (isMyTurn())) execUserScript('%onMyTurnToPlay%');
//Script,onNewActivePlayer
console.log(Date.now() + " onNewActivePlayer " + activePlayer);
if (auctionBoxDisplayed) {
    let ctx = getContext();
    if ((ctx.length >= 8) && (ctx.endsWith('------'))) {
        dummyDirection = "NESWNESW".charAt("NESW".indexOf(whosTurn())+1);
        declarerDirection = "NESWNESW".charAt("NESW".indexOf(whosTurn())+3);
        execUserScript('%onBeforePlayingCard%');
    } else {
        if (isMyTurn()) execUserScript('%onMyTurnToBid%');
    }
}
//Script,onMyTurnToBid
console.log(Date.now() + " onMyTurnToBid context: "+ getContext());
//Script,onMyTurnToPlay
console.log(Date.now() + " onMyTurnToPlay Cards played: " + getPlayedCards());
//Script

//BBOalert,myFunctions
//Script,onDataLoad
dummyDirection = "";
declarerDirection = "";
getCardByValue = function (cv) {
    var card =  $("bridge-screen" ,parent.window.document).find(".topLeft:visible").filter(function () {
        if (replaceSuitSymbols(this.textContent,"") == cv) return this;
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
    var cards =  $("bridge-screen" ,parent.window.document).find(".cardClass:visible").each(function () {
        if (this.style.zIndex.startsWith("3")) {
            var c = $(this).find(".topLeft").text();
            playedCards.push(replaceSuitSymbols(c, ""));
        }
    });
    return playedCards;
}

getMyCards = function () {
    playedCards = [];
    var cards =  $("bridge-screen" ,parent.window.document).find(".cardClass:visible").each(function () {
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
    if ($("bridge-screen" ,parent.window.document).find(".nameBarClass:visible").first().css("background-color") == 'rgb(255, 206, 0)') {
        return (activePlayer.substring(1).toLowerCase() == whoAmI().toLowerCase());
    }
    return false;
}

whosTurn = function () {
    return $("bridge-screen,parent",parent.window.document).find(".nameBarClass:visible").filter(function() {
        if (this.style.backgroundColor == 'rgb(255, 206, 0)') return this;
    }).find(".directionClass").text();
}

delayedAlert = function (txt, delay = 0) {
    setTimeout(function() {
        alert(txt);
    }, delay)
}


window.getCard = function (index) {
	var card = parent.$(".cardClass:visible").filter(function () {
		return ($(this).css('z-index') == index);
	}).text();
	if (card.length == 6) {
		card = "T" + card.slice(-1);
	} else card = card.slice(0, 2);
	return card;
}

//Script

