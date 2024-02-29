//BBOalert, log 2024-02-28, Play with BEN
//Script,onNewDeal
console.log(getNow(true) + " onNewDeal");
//Script,onMyCardsDisplayed
console.log(getNow(true) + " onMyCardsDisplayed " + myCardsDisplayed);
//Script,onNewAuction
console.log(getNow(true) + " onNewAuction " + currentAuction + " next " + whosTurn() + " " + isMyTurn());
var ctx = getContext();
if ((ctx.length >= 8) && (ctx.endsWith('------'))) {
    dummyDirection = "NESWNESW".charAt("NESW".indexOf(whosTurn())+1);
    declarerDirection = "NESWNESW".charAt("NESW".indexOf(whosTurn())+3);
    execUserScript('%onBeforePlayingCard%');
}
//Script,onAuctionBegin
console.log(getNow(true) + " onAuctionBegin" + " " + isMyTurn());
dummyDirection = "";
declarerDirection = "";
//Script,onAuctionEnd
console.log(getNow(true) + " onAuctionEnd");
//Script,onBiddingBoxDisplayed
console.log(getNow(true) + " onBiddingBoxDisplayed");
//Script,onAuctionBoxDisplayed
console.log(getNow(true) + " onAuctionBoxDisplayed");
//Script,onMyLead
console.log(getNow(true) + " onMyLead");
//Script,onDealEnd
console.log(getNow(true) + " onDealEnd");
//Script,onNewPlayedCard
console.log(getNow(true) + " onNewPlayedCard " + getPlayedCards() + whosTurn());
if (whosTurn() != "") {
    execUserScript('%onBeforePlayingCard%');
}
//Script,onBeforePlayingCard
var who = "opponent";
if (whosTurn() == myDirection()) who = "me";
if (whosTurn() == directionLHO()) who = "lho";
if (whosTurn() == partnerDirection()) who = "partner";
if (whosTurn() == directionRHO()) who = "rho";
console.log(getNow(true) + " onBeforePlayingCard " + whosTurn() + " " + who);
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
    return ($("bridge-screen" ,parent.window.document).find(".nameBarClass:visible").first().css("background-color") == 'rgb(255, 206, 0)')
}

whosTurn = function () {
    return $("bridge-screen,parent",parent.window.document).find(".nameBarClass:visible").filter(function() {
        if (this.style.backgroundColor == 'rgb(255, 206, 0)') return this;
    }).find(".directionClass").text();
}

//Script
