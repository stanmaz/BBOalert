//BBOalert,BBOstat version 2
//Script,onDataLoad
(function () {
    var title = "BBO statistics version 2"
    var cfg = {};
    cfg.Enable_Log_Now = false;
    cfg.Enable_Log_at_Next_Deal = false;
    cfg.Export_Log_Data = false;
    cfg.Clear_Log_Data = false;
    cfg.Log_onNewAuction = true;
    cfg.Log_onNewPlayedCard = true;
    cfg.Log_onAnnouncementDisplayed = true;
    cfg.Log_onNotificationDisplayed = true;
    cfg.Log_onNewDeal = true;
    cfg.Log_onDealEnd = true;
    cfg.Log_onNewChatMessage = true;
    cfg.Log_onCallExplanationPanelDisplayed = true;
    var TIME_REF = Date.now();
    var LAST_PLAYER = '';
    if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
    addConfigBox(title, cfg);
    addBBOalertEvent("onLogin", function () {
        cfg.Enable_Log_Now = false;
        cfg.Enable_Log_at_Next_Deal = false;
        TIME_REF = Date.now();
        LAST_PLAYER = '';
        if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
    });
    addBBOalertEvent("onLogoff", function () {
        writeToClipboard(EVENT_LOG);
        localStorage.setItem('BBOalertEvents', EVENT_LOG);
    });
    addBBOalertEvent("onNewActivePlayer", function () {
        setTimeout(function () {
            LAST_PLAYER = activePlayer;
        }, 200);
    });
    addBBOalertEvent("onAuctionBegin", function () {
        if (cfg.Enable_Log_at_Next_Deal) {
            cfg.Enable_Log_Now = true;
            cfg.Enable_Log_at_Next_Deal = false;
        }
        LAST_PLAYER = getActivePlayer();
        TIME_REF = Date.now();
    });
    addBBOalertEvent("onNewAuction", function () {
        TIME_REF = Date.now();
        if (cfg.Enable_Log_Now && cfg.Log_onNewAuction)
            if (auctionBoxDisplayed)
                if (getContext() != '') {
                    var s = getNow(true) + ',onNewAuction,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',' + (Date.now() - TIME_REF) + ',' + getContext();
                    console.log(s);
                    EVENT_LOG = EVENT_LOG + s + '\n';
                    localStorage.setItem('BBOalertEvents', EVENT_LOG);
                }
    });
    addBBOalertEvent("onNewPlayedCard", function () {
        TIME_REF = Date.now();
        if (cfg.Enable_Log_Now && cfg.Log_onNewPlayedCard)
            if (playedCards != '') {
                var s = getNow(true) + ',onNewPlayedCard,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',' + (Date.now() - TIME_REF) + ',' + playedCards;
                console.log(s);
                if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                EVENT_LOG = EVENT_LOG + s + '\n';
                localStorage.setItem('BBOalertEvents', EVENT_LOG);
            }
    });
    addBBOalertEvent("onAnnouncementDisplayed", function () {
        if (cfg.Enable_Log_Now && cfg.Log_onAnnouncementDisplayed) {
            var s = getNow(true) + ',onAnnouncementDisplayed,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getAnnouncementPanel().textContent + '"';
            console.log(s);
            if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
            EVENT_LOG = EVENT_LOG + s + '\n';
            localStorage.setItem('BBOalertEvents', EVENT_LOG);
        }
    });
    addBBOalertEvent("onNotificationDisplayed", function () {
        if (cfg.Enable_Log_Now && cfg.Log_onNotificationDisplayed) {
            var s = getNow(true) + ',onNotificationDisplayed,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getNotificationPanel().textContent + '"';
            console.log(s);
            if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
            EVENT_LOG = EVENT_LOG + s + '\n';
            localStorage.setItem('BBOalertEvents', EVENT_LOG);
        }
    });
    addBBOalertEvent("onNewDeal", function () {
        if (cfg.Enable_Log_Now && cfg.Log_onNewDeal) {
            var s = getNow(true) + ',onNewDeal,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,' + getDealNumber();
            console.log(s);
            if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
            EVENT_LOG = EVENT_LOG + s + '\n';
            localStorage.setItem('BBOalertEvents', EVENT_LOG);
        }
    });
    addBBOalertEvent("onDealEnd", function () {
        if (cfg.Enable_Log_Now && cfg.Log_onDealEnd) {
            var s = getNow(true) + ',onDealEnd,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getDealEndPanel().textContent + '"';
            console.log(s);
            if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
            EVENT_LOG = EVENT_LOG + s + '\n';
            localStorage.setItem('BBOalertEvents', EVENT_LOG);
        }
    });
    addBBOalertEvent("onNewChatMessage", function () {
        if (cfg.Enable_Log_Now && cfg.Log_onNewChatMessage) {
            var s = getNow(true) + ',onNewChatMessage,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getLastChatMessaage() + '"';
            console.log(s);
            if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
            EVENT_LOG = EVENT_LOG + s + '\n';
            localStorage.setItem('BBOalertEvents', EVENT_LOG);
        }
    });
    addBBOalertEvent("onCallExplanationPanelDisplayed", function () {
        if (cfg.Enable_Log_Now && cfg.Log_onCallExplanationPanelDisplayed) {
            var s = getNow(true) + ',onCallExplanationPanelDisplayed,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getCallExplanationText() + '"';
            console.log(s);
            if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
            EVENT_LOG = EVENT_LOG + s + '\n';
            localStorage.setItem('BBOalertEvents', EVENT_LOG);
        }
    });
    addBBOalertEvent("onAnyMutation", function () {
        if (cfg.Export_Log_Data) {
            writeToClipboard(EVENT_LOG);
            localStorage.setItem('BBOalertEvents', EVENT_LOG);
            bboalertLog(EVENT_LOG.split("\n").length + " records exported to clipboard");
            cfg.Export_Log_Data = false;
        }
        if (cfg.Clear_Log_Data) {
            if (confirm("Are you sure you want to clear log ?")) EVENT_LOG = '';
            cfg.Clear_Log_Data = false;
        }
    });
})();
//Script
