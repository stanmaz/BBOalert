class bboStat {

    constructor () {
        this.BBOLOG = false;
        this.NXTLOG = false;
        this.LAST_PLAYER =  '';
        this.EVENT_LOG = '';
        this.TIME_REF = 0;
        this.BBOLOG = false;
        this.NXTLOG = false;    
        this.EVENT_LOG = localStorage.getItem('BBOalertEvents');
        if (typeof(this.EVENT_LOG) == "undefined") this.EVENT_LOG = '';
        this.TIME_REF = Date.now();
        this.LAST_PLAYER = '';
    }

    onLogoff () {
        writeToClipboard(this.EVENT_LOG);
        localStorage.setItem('BBOalertEvents', this.EVENT_LOG);
    }

    onNewActivePlayer () {
        setTimeout(() => {
            this.LAST_PLAYER = activePlayer;
        }, 200);   
    }
    
    onAuctionBegin () {
        if (this.NXTLOG) {
            this.BBOLOG = true;
            this.NXTLOG = false;
        }
        this.LAST_PLAYER = getActivePlayer();
        this.TIME_REF = Date.now();   
    }
    
    saveLog (s)  {
        if (s == '') return;
        console.log(s);
        this.EVENT_LOG = this.EVENT_LOG + s + '\n';
        localStorage.setItem('BBOalertEvents', this.EVENT_LOG);
    }

    onNewAuction () {
        if (this.BBOLOG)
        if (auctionBoxDisplayed)
        if (getContext() != '') {
            var s = getNow(true) + ',onNewAuction,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',' + (Date.now()-this.TIME_REF) + ',' + getContext();
            this.TIME_REF = Date.now();
            this.saveLog(s);
        }    
    }
    
    onNewPlayedCard () {
        if (this.BBOLOG)
        if (playedCards != '') {
            var s = getNow(true) + ',onNewPlayedCard,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',' + (Date.now()-this.TIME_REF) + ',' + playedCards;
            this.TIME_REF = Date.now();
            this.saveLog(s);
        }    
    }
    
    onAnnouncementDisplayed () {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onAnnouncementDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getAnnouncementPanel().textContent + '"';
            this.saveLog(s);
        }       
    }

    onNotificationDisplayed () {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onNotificationDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getNotificationPanel().textContent + '"';
            this.saveLog(s);
        }        
    }

    onNewDeal ()  {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onNewDeal,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,' + getDealNumber();
            this.saveLog(s,t);
        }    
    }
    
    onDealEnd () {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onDealEnd,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getDealEndPanel().textContent + '"';
            this.saveLog(s);
        }    
    }
    
    onCallExplanationPanelDisplayed () {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onCallExplanationPanelDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getCallExplanationText() + '"';
            this.saveLog(s);
        }    
    }

    onNewChatMessage () {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onNewChatMessage,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getLastChatMessaage() + '"';
            this.saveLog(s);
        }   
    }
    
    clearLog () {
        if (confirm("Are you sure you want to clear log ?")) this.EVENT_LOG = '';
    }

    exportLog ()  {
        writeToClipboard(this.EVENT_LOG);
        localStorage.setItem('BBOalertEvents', this.EVENT_LOG);
        alert(this.EVENT_LOG.split("\n").length + " records exported to clipboard");
    }

    startLog () {
        this.BBOLOG = confirm("Start logging ?");
        if (this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightgreen";
        if (!this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightpink";
    }

    startLogOnNextDeal () {
        this.NXTLOG = confirm("Start logging at next board ?");
        if (this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightgreen";
        if (!this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightpink";
    }
    
    setColors () {
        if (this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightgreen";
        if (!this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightpink";
        if (this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightgreen";
        if (!this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightpink";
    }   

}

if ((typeof BBOSTAT) == "undefined") {
    BBOSTAT = new bboStat();
    addShortcutButton("Shortcut,CLRLOG,");
    addShortcutButton("Shortcut,EXPLOG,");
    addShortcutButton("Shortcut,BBOLOG,");
    addShortcutButton("Shortcut,NXTLOG,");
    BBOSTAT.setColors();
    $("#adpanel2 button:contains(CLRLOG)").click(function() {BBOSTAT.clearLog();});
    $("#adpanel2 button:contains(EXPLOG)").click(function() {BBOSTAT.exportLog();});
    $("#adpanel2 button:contains(BBOLOG)").click(function() {BBOSTAT.startLog();});
    $("#adpanel2 button:contains(NXTLOG)").click(function() {BBOSTAT.startLogOnNextDeal();});
    userEvents().addEventListener("onLogoff", function () {BBOSTAT.onLogoff();}, false);
    userEvents().addEventListener("onNewActivePlayer", function () {BBOSTAT.onNewActivePlayer();}, false);
    userEvents().addEventListener("onAuctionBegin", function () {BBOSTAT.onAuctionBegin();}, false);
    userEvents().addEventListener("onNewAuction", function () {BBOSTAT.onNewAuction();}, false);
    userEvents().addEventListener("onNewPlayedCard", function () {BBOSTAT.onNewPlayedCard();}, false);
    userEvents().addEventListener("onAnnouncementDisplayed", function () {BBOSTAT.onAnnouncementDisplayed();}, false);
    userEvents().addEventListener("onNotificationDisplayed", function () {BBOSTAT.onNotificationDisplayed();}, false);
    userEvents().addEventListener("onNewDeal", function () {BBOSTAT.onNewDeal();}, false);
    userEvents().addEventListener("onDealEnd", function () {BBOSTAT.onDealEnd();}, false);
    userEvents().addEventListener("onCallExplanationPanelDisplayed", function () {BBOSTAT.onCallExplanationPanelDisplayed();}, false);
    userEvents().addEventListener("onNewChatMessage", function () {BBOSTAT.onNewChatMessage();}, false);
}
