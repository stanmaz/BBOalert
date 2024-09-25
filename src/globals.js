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

BBOalertButtonHTML = `<div id="bboalert-button" style="height: 46px; width: 46px;">
<svg viewBox="0 0 170 170">
<rect style="fill:#0000ff;stroke-width:0.9695" id="rect156" width="170.91365" height="118.80013" x="-0.010153236" y="51.866543"></rect>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:48px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1;stroke:none" x="23.255058" y="100.05701" id="text4208">
<tspan id="tspan4206" x="23.255058" y="100.05701" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:48px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal">
BBO</tspan>
</text>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:40px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1;stroke:none" x="24.207453" y="147.17821" id="text11098">
<tspan id="tspan11096" x="24.207453" y="147.17821" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:40px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal">
Alert</tspan>
</text>
<rect style="fill:#0000ff;stroke-width:1.42343" id="rect30888" width="85.957748" height="28.492575" x="84.932518" y="23.367001"></rect>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1;stroke:none" x="87.319008" y="47.640041" id="text42194">
<tspan id="tspan42192" x="87.319008" y="47.640041" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal">
Alert</tspan>
</text>
<rect style="fill:#ff0000;stroke-width:1.67427" id="rect62412" width="84.908524" height="28.701813" x="0.023992665" y="23.292852"></rect>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff;fill-opacity:1;stroke:none" x="14.900936" y="44.923931" id="text65176">
<tspan id="tspan65174" x="14.900936" y="44.923931" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal">
Stop</tspan>
</text>
<rect style="fill:#008000" id="rect121122" width="74.317535" height="24.015348" x="48.270805" y="-0.2446395"></rect>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff" x="55.604736" y="21.237953" id="text141696">
<tspan id="tspan141694" x="55.604736" y="21.237953" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal">
Pass</tspan>
</text>
<rect style="fill:#ff0000" id="rect148238" width="48.301918" height="23.611641" x="122.58834" y="-0.2446395"></rect>
<rect style="fill:#0000ff;stroke-width:1.01631" id="rect148262" width="48.321392" height="24.015348" x="-0.050585855" y="-0.2446395"></rect>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff" x="129.7393" y="21.326912" id="text153080">
<tspan id="tspan153078" x="129.7393" y="21.326912" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal">
X</tspan>
</text>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#ffffff" x="6.6074371" y="21.106106" id="text157330">
<tspan id="tspan157328" x="6.6074371" y="21.106106" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:26.6667px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal">
XX</tspan>
</text>
</svg>
</div>`
