//BBOalert
//Script,onDataLoad

class bboStat {

    constructor () {
        this.BBOLOG = false;
        this.NXTLOG = false;
        this.LAST_PLAYER =  '';
        this.EVENT_LOG = '';
        this.TIME_REF = 0;   
    }


    test () {
        this.BBOLOG = true;
        return this.BBOLOG;
    }

    onDataLoad () {
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
    
    saveLog (s,t)  {
        var s1 = s;
        if (typeof(t) == "string") s1 = t;
        console.log(s1);
        this.EVENT_LOG = this.EVENT_LOG + s1 + '\n';
        localStorage.setItem('BBOalertEvents', this.EVENT_LOG);
    }

    onNewAuction (t) {
        if (this.BBOLOG)
        if (auctionBoxDisplayed)
        if (getContext() != '') {
            var s = getNow(true) + ',onNewAuction,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',' + (Date.now()-this.TIME_REF) + ',' + getContext();
            this.TIME_REF = Date.now();
            this.saveLog(s,t);
        }    
    }
    
    onNewPlayedCard (t) {
        if (this.BBOLOG)
        if (playedCards != '') {
            var s = getNow(true) + ',onNewPlayedCard,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',' + (Date.now()-this.TIME_REF) + ',' + playedCards;
            this.TIME_REF = Date.now();
            this.saveLog(s,t);
        }    
    }
    
    onAnnouncementDisplayed (t) {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onAnnouncementDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getAnnouncementPanel().textContent + '"';
            this.saveLog(s,t);
        }       
    }

    onNotificationDisplayed (t) {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onNotificationDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getNotificationPanel().textContent + '"';
            this.saveLog(s,t);
        }        
    }

    onNewDeal (t)  {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onNewDeal,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,' + getDealNumber();
            this.saveLog(s,t);
        }    
    }
    
    onDealEnd (t) {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onDealEnd,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getDealEndPanel().textContent + '"';
            this.saveLog(s,t);
        }    
    }
    
    onCallExplanationPanelDisplayed (t) {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onCallExplanationPanelDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getCallExplanationText() + '"';
            this.saveLog(s,t);
        }    
    }

    onNewChatMessage (t) {
        if (this.BBOLOG) {
            var s = getNow(true) + ',onNewChatMessage,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0,1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getLastChatMessaage() + '"';
            this.saveLog(s,t);
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
        if (this.BBOLOG) $("#adpanel2 [value='%BBOLOG%']")[0].style.backgroundColor = "lightgreen";
        if (!this.BBOLOG) $("#adpanel2 [value='%BBOLOG%']")[0].style.backgroundColor = "lightpink";
    }

    startLogOnNextDeal () {
        this.NXTLOG = confirm("Start logging at next board ?");
        if (this.NXTLOG) $("#adpanel2 [value='%NXTLOG%']")[0].style.backgroundColor = "lightgreen";
        if (!this.NXTLOG) $("#adpanel2 [value='%NXTLOG%']")[0].style.backgroundColor = "lightpink";
    }
    
    setColors () {
        if (this.BBOLOG) $("#adpanel2 [value='%BBOLOG%']")[0].style.backgroundColor = "lightgreen";
        if (!this.BBOLOG) $("#adpanel2 [value='%BBOLOG%']")[0].style.backgroundColor = "lightpink";
        if (this.NXTLOG) $("#adpanel2 [value='%NXTLOG%']")[0].style.backgroundColor = "lightgreen";
        if (!this.NXTLOG) $("#adpanel2 [value='%NXTLOG%']")[0].style.backgroundColor = "lightpink";
    }   

}
//Script

//  Mandatory
//Script,onDataLoad,BBOSTAT = new bboStat();
//Script,onDataLoad,BBOSTAT.setColors();
//Script,onLogoff,BBOSTAT.onLogoff();
//Script,CLRLOG,BBOSTAT.clearLog();
//Script,EXPLOG,BBOSTAT.exportLog();
//Script,BBOLOG,BBOSTAT.startLog();
//Script,NXTLOG,BBOSTAT.startLogOnNextDeal();
Shortcut,CLRLOG,%CLRLOG%
Shortcut,EXPLOG,%EXPLOG%
Shortcut,BBOLOG,%BBOLOG%
Shortcut,NXTLOG,%NXTLOG%

//  Optional
//     may use custom string as argument
//     will ovveride the default output string
//Script,onNewActivePlayer,BBOSTAT.onNewActivePlayer();
//Script,onAuctionBegin,BBOSTAT.onAuctionBegin();
//Script,onAuctionBegin,BBOSTAT.onAuctionBegin();
//Script,onNewAuction,BBOSTAT.onNewAuction();
//Script,onNewPlayedCard,BBOSTAT.onNewPlayedCard();
//Script,onAnnouncementDisplayed,BBOSTAT.onAnnouncementDisplayed();
//Script,onNotificationDisplayed,BBOSTAT.onNotificationDisplayed();
//Script,onNewDeal,BBOSTAT.onNewDeal();
//Script,onDealEnd,BBOSTAT.onDealEnd();
//Script,onCallExplanationPanelDisplayed,BBOSTAT.onCallExplanationPanelDisplayed();
//Script,onNewChatMessage,BBOSTAT.onNewChatMessage();
