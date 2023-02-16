/**
 * Global variables
 */

// Global variables
var alertData = "";
var alertOriginal = "";
var alertTable = alertData.split("\n");
CHECKED_CHAR = "✔";
var version = document.title;
var logText = version + '\n';
var logText = logText + navigator.userAgent + '\n';
COLLAPSED_BG_COLOR = "yellow";
COLLAPSED_TEXT_COLOR = "black";
var bidSymbolMap = new Map();

apiKey = "AIzaSyBDC18V7_Sw4fIHoIkOR40nRPMZAuW2QMk";

E_onAnyMutation = new Event('onAnyMutation');
E_onBiddingBoxCreated = new Event('onBiddingBoxCreated');
E_onBiddingBoxDisplayed = new Event('onBiddingBoxDisplayed');
E_onBiddingBoxHidden = new Event('onBiddingBoxHidden');
E_onAuctionBoxDisplayed = new Event('onAuctionBoxDisplayed');
E_onAuctionBegin = new Event('onAuctionBegin');
E_onAuctionBoxHidden = new Event('onAuctionBoxHidden');
E_onAuctionEnd = new Event('onAuctionEnd');
E_onFinalContractDisplayed = new Event('onFinalContractDisplayed');
E_onNewAuction = new Event('onNewAuction');
E_onMyAuction = new Event('onMyAuction');
E_onPartnerAuction = new Event('onPartnerAuction');
E_onLHOAuction = new Event('onLHOAuction');
E_onRHOAuction = new Event('onRHOAuction');
E_onNewActivePlayer = new Event('onNewActivePlayer');
E_onExplainCallDisplayed = new Event('onExplainCallDisplayed');
E_onExplainCallHidden = new Event('onExplainCallHidden');
E_onBiddingBoxRemoved = new Event('onBiddingBoxRemoved');
E_onLogin = new Event('onLogin');
E_onLogoff = new Event('onLogoff');
E_onAnyOpponentChange = new Event('onAnyOpponentChange');
E_onNewDeal = new Event('onNewDeal');
E_onNewCallSelected = new Event('onNewCallSelected');
E_onCallLevelSelected = new Event('onCallLevelSelected');
E_onMyLead = new Event('onMyLead');
E_onNewPlayedCard = new Event('onNewPlayedCard');
E_onCallExplanationPanelDisplayed = new Event('onCallExplanationPanelDisplayed');
E_onMyCardsDisplayed = new Event('onMyCardsDisplayed');
E_onDealEnd = new Event('onDealEnd');
E_onAnnouncementDisplayed = new Event('onAnnouncementDisplayed');
E_onNotificationDisplayed = new Event('onNotificationDisplayed');
E_onNewChatMessage = new Event('onNewChatMessage');
E_onDataLoad = new Event('onDataLoad');
E_onTableDisplayed = new Event('onTableDisplayed');
E_onTableHidden = new Event('onTableHidden');

function bidArray(bids) {
    let bidarr = [];
    for (var i = 0; i < bids.length; i = i + 2) {
        bidarr.push(bids.slice(i, i + 2));
    }
    return bidarr;
}
allBids = [];
allBids = bidArray("1C1D1H1S1N2C2D2H2S2N3C3D3H3S3N4C4D4H4S4N5C5D5H5S5N6C6D6H6S6N7C7D7H7S7N");


// Release notes : stable version
  srcRelnotes = "https://docs.google.com/document/d/e/2PACX-1vQ_8Iv9HbBj4nWDXSY_kHsW1ZP_4c4dbOVO0GLuObJc1vFu_TBg9oV6ZJXMWd_tLITOj7i6WaJBeZJI/pub";

// Release notes : beta version
// srcRelnotes = "https://docs.google.com/document/d/e/2PACX-1vQlUHDS_XUimLvS722emrPw5Bzpyjm8lPKxZ9jwVwOVJVq0zQd3fawML8sylwxYIGKiZB60eJENB2TG/pub";


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
    tableDisplayed = false;
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
    lastUserExplanation = '';
    recordNewAlerts = true;
    ctxArray = [];
    blogNames = [];
    blogIds = [];
}
