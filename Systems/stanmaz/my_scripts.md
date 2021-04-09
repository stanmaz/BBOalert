    //Script,toggleButtons,$('#adpanel2').toggle();
    Shortcut,AltX,%toggleButtons%,display=none

    Script,suitBid,R=B.slice(-1);
    Script,transfer,\
    var suit = B.slice(-1);\
    if (/C/.test(suit)) R=B.slice(0,1) + "!D";\
    if (/D/.test(suit)) R=B.slice(0,1) + "!H";\
    if (/H/.test(suit)) R=B.slice(0,1) + "!S";\
    if (/S/.test(suit)) R=B.slice(0,1) + "NT";\
    if (/N/.test(suit)) R="!C";
    Script,texas,\
    var suit = B.slice(-1);\
    if (/C/.test(suit)) R="!D";\
    if (/D/.test(suit)) R="!H";\
    if (/H/.test(suit)) R="!S";\
    if (/S/.test(suit)) R="NT";\
    if (/N/.test(suit)) R="!C";
    Script,selectSuit
        var bb = getBiddingBox();
        var us = document.createElement("select");
        us.style.position = "absolute";
        us.style.right = "0px";
        us.style.top = "0px";
        us.style.fontSize = "20px";
        us.style.zIndex = 5000;
        us.style.width = "80px";
        us.style.textAlign = 'center';
        us.add(new Option('♣',' !C'));
        us.add(new Option('♦',' !D'));
        us.add(new Option('♥',' !H'));
        us.add(new Option('♠',' !S'));
        us.options[1].style.color = "red";
        us.options[2].style.color = "red";
        us.size = 4;
        us.selectedIndex = -1;
        us.onchange = function () {
            var selectedText = this.options[this.selectedIndex].value;\
            setExplainText(getExplainInput().value + selectedText);\
            this.remove();
        };
        bb.appendChild(us);
    Script

    Script,onNewData
    TIME_REF = Date.now();
    LAST_PLAYER = '';
    if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';

    Script,onLogin
    EVENT_LOG = localStorage.getItem('BBOalertEvents');
    if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
    TIME_REF = Date.now();
    LAST_PLAYER = '';

    Script,onLogoff
    writeToClipboard(EVENT_LOG);
    localStorage.setItem('BBOalertEvents', EVENT_LOG);


    Script,onNewActivePlayer
    setTimeout(function () {
        LAST_PLAYER = activePlayer;
    }, 200);


    Script,onAuctionBegin
    LAST_PLAYER = getActivePlayer();
    TIME_REF = Date.now();


    Script,onNewAuction
    if (getContext() != '') {
        var s = getNow(true) + ',' + getDealNumber() + ',' + LAST_PLAYER.slice(0,1) + ',' + LAST_PLAYER.slice(1) + ',' + (Date.now()-TIME_REF) + ',' + getContext();
        console.log(s);
        TIME_REF = Date.now();
        EVENT_LOG = EVENT_LOG + s + '\n';
        localStorage.setItem('BBOalertEvents', EVENT_LOG);
    }

    Script,CLRLOG
    EVENT_LOG = '';
    Script

    Script,EXPLOG
    writeToClipboard(EVENT_LOG);
    localStorage.setItem('BBOalertEvents', EVENT_LOG);
    Script

    Shortcut,CLRLOG,%CLRLOG%
    Shortcut,EXPLOG,%EXPLOG%

    Option,Large BBox
    //Script,onAnyMutation
    LARGE_BIDDING_BOX();
    //Script
    Option

    Script,onDataLoad
    var b = document.getElementById("Option,Large BBox");
    if (b != null) {
        b.optionSelected = false;
        setOptionColor(b);
    }
    b = document.getElementById("Option,Updates");
    if (b != null) {
        b.optionSelected = false;
        setOptionColor(b);
    }
	setScriptList();
    Script

    Script,onBiddingBoxDisplayed,getExplainInput().setAttribute("maxlength", "69");
    Script,onExplainCallDisplayed,setExplainCallText("");
    Script,onAnyMutation,$('.announcementPanelClass').draggable();

    Script,onAnyMutation
    $(".cardArea:contains('♣')").css("color", "green");
    $(".cardArea:contains('♦')").css("color", "darkorange");
    $(".cardArea:contains('♣')").css("background-color", "lightcyan");
    $(".cardArea:contains('♦')").css("background-color", "lightyellow");
    $(".auctionBoxCellClass span:contains('♣')").css("color", "green");
    $(".auctionBoxCellClass span:contains('♦')").css("color", "darkorange");
    $(".auctionBoxCellClass:contains('Dbl')").css("color", "white");
    $(".auctionBoxCellClass:contains('Dbl')").css("background-color", "rgb(203, 0, 0)");
    $(".auctionBoxCellClass:contains('Rdbl')").css("color", "white")
    $(".auctionBoxCellClass:contains('Rdbl')").css("background-color", "rgb(67, 119, 169)");
    Script


    bboalert
    Script,onAnyMutation
    $(".verticalClass mat-icon").remove()
    $(".area-label").css("font-weight", "bold");
    Script

