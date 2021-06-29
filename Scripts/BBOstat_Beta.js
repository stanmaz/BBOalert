window.BBOSTAT = [];
window.BBOSTAT.BBOLOG = false;
window.BBOSTAT.NXTLOG = false;
window.BBOSTAT.LAST_PLAYER = '';
window.BBOSTAT.EVENT_LOG = '';
window.BBOSTAT.TIME_REF = 0;
window.BBOSTAT.BBOLOG = false;
window.BBOSTAT.NXTLOG = false;
window.BBOSTAT.TIME_REF = Date.now();
window.BBOSTAT.LAST_PLAYER = '';

window.BBOSTAT.onLogoff = function () {
    writeToClipboard(this.EVENT_LOG);
    localStorage.setItem('BBOalertEvents', this.EVENT_LOG);
};

window.BBOSTAT.onNewActivePlayer = function () {
    setTimeout(() => {
        this.LAST_PLAYER = activePlayer;
    }, 200);
};

window.BBOSTAT.onAuctionBegin = function () {
    if (this.NXTLOG) {
        this.BBOLOG = true;
        this.NXTLOG = false;
    }
    this.LAST_PLAYER = getActivePlayer();
    this.TIME_REF = Date.now();
};

window.BBOSTAT.saveLog = function (s) {
    if (s == '') return;
    console.log(s);
    this.EVENT_LOG = this.EVENT_LOG + s + '\n';
    localStorage.setItem('BBOalertEvents', this.EVENT_LOG);
};

window.BBOSTAT.onNewAuction = function () {
    if (this.BBOLOG)
        if (auctionBoxDisplayed)
            if (getContext() != '') {
                var s = getNow(true) + ',onNewAuction,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',' + (Date.now() - this.TIME_REF) + ',' + getContext();
                this.TIME_REF = Date.now();
                this.saveLog(s);
            }
};

window.BBOSTAT.onNewPlayedCard = function () {
    if (this.BBOLOG)
        if (playedCards != '') {
            var s = getNow(true) + ',onNewPlayedCard,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',' + (Date.now() - this.TIME_REF) + ',' + playedCards;
            this.TIME_REF = Date.now();
            this.saveLog(s);
        }
};

window.BBOSTAT.onAnnouncementDisplayed = function () {
    if (this.BBOLOG) {
        var s = getNow(true) + ',onAnnouncementDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getAnnouncementPanel().textContent + '"';
        this.saveLog(s);
    }
};

window.BBOSTAT.onNotificationDisplayed = function () {
    if (this.BBOLOG) {
        var s = getNow(true) + ',onNotificationDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getNotificationPanel().textContent + '"';
        this.saveLog(s);
    }
};

window.BBOSTAT.onNewDeal = function () {
    if (this.BBOLOG) {
        var s = getNow(true) + ',onNewDeal,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',,' + getDealNumber();
        this.saveLog(s, t);
    }
};

window.BBOSTAT.onDealEnd = function () {
    if (this.BBOLOG) {
        var s = getNow(true) + ',onDealEnd,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getDealEndPanel().textContent + '"';
        this.saveLog(s);
    }
};

window.BBOSTAT.onCallExplanationPanelDisplayed = function () {
    if (this.BBOLOG) {
        var s = getNow(true) + ',onCallExplanationPanelDisplayed,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getCallExplanationText() + '"';
        this.saveLog(s);
    }
};

window.BBOSTAT.onNewChatMessage = function () {
    if (this.BBOLOG) {
        var s = getNow(true) + ',onNewChatMessage,' + getDealNumber() + ',' + this.LAST_PLAYER.slice(0, 1) + ',' + this.LAST_PLAYER.slice(1) + ',,"' + getLastChatMessaage() + '"';
        this.saveLog(s);
    }
};

window.BBOSTAT.clearLog = function () {
    if (confirm("Are you sure you want to clear log ?")) this.EVENT_LOG = '';
};

window.BBOSTAT.exportLog = function () {
    writeToClipboard(this.EVENT_LOG);
    localStorage.setItem('BBOalertEvents', this.EVENT_LOG);
    alert(this.EVENT_LOG.split("\n").length + " records exported to clipboard");
};

window.BBOSTAT.startLog = function () {
    this.BBOLOG = confirm("Start logging ?");
    if (this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightgreen";
    if (!this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightpink";
};

window.BBOSTAT.startLogOnNextDeal = function () {
    this.NXTLOG = confirm("Start logging at next board ?");
    if (this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightgreen";
    if (!this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightpink";
};

window.BBOSTAT.setColors = function () {
    if (this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightgreen";
    if (!this.BBOLOG) $("#adpanel2 button:contains(BBOLOG)")[0].style.backgroundColor = "lightpink";
    if (this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightgreen";
    if (!this.NXTLOG) $("#adpanel2 button:contains(NXTLOG)")[0].style.backgroundColor = "lightpink";
};

userEvents().addEventListener("onDataLoad", function () {
    console.log("abc");
}, false);

userEvents().addEventListener("onDataLoad", function () {
    window.BBOSTAT.EVENT_LOG = localStorage.getItem('BBOalertEvents');
    if (window.BBOSTAT.EVENT_LOG == null) window.BBOSTAT.EVENT_LOG = '';
    console.log("onDataLoad " + typeof window.BBOSTAT);
    addShortcutButton("Shortcut,CLRLOG,");
    addShortcutButton("Shortcut,EXPLOG,");
    addShortcutButton("Shortcut,BBOLOG,");
    addShortcutButton("Shortcut,NXTLOG,");
    window.BBOSTAT.setColors();
    $("#adpanel2 button:contains(CLRLOG)").click(function () {
        window.BBOSTAT.clearLog();
    });
    $("#adpanel2 button:contains(EXPLOG)").click(function () {
        window.BBOSTAT.exportLog();
    });
    $("#adpanel2 button:contains(BBOLOG)").click(function () {
        window.BBOSTAT.startLog();
    });
    $("#adpanel2 button:contains(NXTLOG)").click(function () {
        window.BBOSTAT.startLogOnNextDeal();
    });
    userEvents().addEventListener("onLogoff", function () {
        window.BBOSTAT.onLogoff();
    }, false);
    userEvents().addEventListener("onNewActivePlayer", function () {
        window.BBOSTAT.onNewActivePlayer();
    }, false);
    userEvents().addEventListener("onAuctionBegin", function () {
        window.BBOSTAT.onAuctionBegin();
    }, false);
    userEvents().addEventListener("onNewAuction", function () {
        window.BBOSTAT.onNewAuction();
    }, false);
    userEvents().addEventListener("onNewPlayedCard", function () {
        window.BBOSTAT.onNewPlayedCard();
    }, false);
    userEvents().addEventListener("onAnnouncementDisplayed", function () {
        window.BBOSTAT.onAnnouncementDisplayed();
    }, false);
    userEvents().addEventListener("onNotificationDisplayed", function () {
        window.BBOSTAT.onNotificationDisplayed();
    }, false);
    userEvents().addEventListener("onNewDeal", function () {
        window.BBOSTAT.onNewDeal();
    }, false);
    userEvents().addEventListener("onDealEnd", function () {
        window.BBOSTAT.onDealEnd();
    }, false);
    userEvents().addEventListener("onCallExplanationPanelDisplayed", function () {
        window.BBOSTAT.onCallExplanationPanelDisplayed();
    }, false);
    userEvents().addEventListener("onNewChatMessage", function () {
        window.BBOSTAT.onNewChatMessage();
    }, false);
}, false);
