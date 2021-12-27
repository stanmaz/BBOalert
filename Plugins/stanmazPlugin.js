//BBOalert,stanmazPlugin version 1.0

// The script for BBO event logging
(function () {
    var title = "BBO event logging"
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
    addBBOalertEvent("onDataLoad", function () {
        console.log("addConfigBox");
        addConfigBox(title, cfg);
    });
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
        if (cfg.Enable_Log_Now && cfg.Log_onNewAuction) {
            if (auctionBoxDisplayed)
                if (getContext() != '') {
                    var s = getNow(true) + ',onNewAuction,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',' + (Date.now() - TIME_REF) + ',' + getContext();
                    console.log(s);
                    EVENT_LOG = EVENT_LOG + s + '\n';
                    localStorage.setItem('BBOalertEvents', EVENT_LOG);
                }
        }
        TIME_REF = Date.now();
    });
    addBBOalertEvent("onNewPlayedCard", function () {
        if (cfg.Enable_Log_Now && cfg.Log_onNewPlayedCard) {
            if (playedCards != '') {
                var s = getNow(true) + ',onNewPlayedCard,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',' + (Date.now() - TIME_REF) + ',' + playedCards;
                console.log(s);
                if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                EVENT_LOG = EVENT_LOG + s + '\n';
                localStorage.setItem('BBOalertEvents', EVENT_LOG);
            }
        }
        TIME_REF = Date.now();
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

(function () {
    // Default configuration
    var title = "Modified suit colors";
    var cfg = {};
    cfg.enabled = false;
    cfg.text_color_clubs = "green";
    cfg.text_color_diamonds = "darkorange";
    cfg.text_color_hearts = "crimson";
    cfg.text_color_spades = "black";
    // cfg.text_color_pass = "white";
    cfg.text_color_double = "white";
    cfg.text_color_redouble = "white";
    cfg.background_color_clubs = "lightcyan";
    cfg.background_color_diamonds = "lightyellow";
    cfg.background_color_hearts = "white";
    cfg.background_color_spâdes = "white";
    // cfg.background_color_pass = "green";
    cfg.background_color_double = "red";
    cfg.background_color_redouble = "blue";
    // Register configuration
    addBBOalertEvent("onDataLoad", function () {
        addConfigBox(title, cfg);
    });
    // User script code
    function updateColors () {
        if (cfg.enabled) {
            $(".cardArea:contains('♣')").css("color", cfg.text_color_clubs);
            $(".cardArea:contains('♦')").css("color", cfg.text_color_diamonds);
            $(".cardArea:contains('♥')").css("color", cfg.text_color_hearts);
            $(".cardArea:contains('♠')").css("color", cfg.text_color_spades);
            $(".cardArea:contains('♣')").css("background-color", cfg.background_color_clubs );
            $(".cardArea:contains('♦')").css("background-color", cfg.background_color_diamonds);
            $(".cardArea:contains('♥')").css("background-color", cfg.background_color_hearts);
            $(".cardArea:contains('♠')").css("background-color", cfg.background_color_spades);
            $(".auctionBoxCellClass span:contains('♣')").css("color",cfg.text_color_clubs);
            $(".auctionBoxCellClass span:contains('♦')").css("color", cfg.text_color_diamonds);
            $(".auctionBoxCellClass span:contains('♥')").css("color",cfg.text_color_hearts);
            $(".auctionBoxCellClass span:contains('♠')").css("color", cfg.text_color_spades);
            $(".biddingBoxClass span:contains('♣')").css("color",cfg.text_color_clubs);
            $(".biddingBoxClass span:contains('♦')").css("color", cfg.text_color_diamonds);
            $(".biddingBoxClass span:contains('♥')").css("color",cfg.text_color_hearts);
            $(".biddingBoxClass span:contains('♠')").css("color", cfg.text_color_spades);
            $(".auctionBoxCellClass:contains('Dbl')").css("color", cfg.text_color_double);
            $(".auctionBoxCellClass:contains('Dbl')").css("background-color", cfg.background_color_double);
            $(".auctionBoxCellClass:contains('Rdbl')").css("color", cfg.text_color_redouble);
            $(".auctionBoxCellClass:contains('Rdbl')").css("background-color", cfg.background_color_redouble);
        } else {
            $(".cardArea:contains('♣')").css("color", "black");
            $(".cardArea:contains('♦')").css("color", "");
            $(".cardArea:contains('♥')").css("color", "");
            $(".cardArea:contains('♠')").css("color", "black");
            $(".cardArea:contains('♣')").css("background-color", "");
            $(".cardArea:contains('♦')").css("background-color", "");
            $(".cardArea:contains('♥')").css("background-color", "");
            $(".cardArea:contains('♠')").css("background-color", "");
            $(".auctionBoxCellClass span:contains('♣')").css("color", "");
            $(".auctionBoxCellClass span:contains('♦')").css("color", "");
            $(".auctionBoxCellClass span:contains('♥')").css("color", "");
            $(".auctionBoxCellClass span:contains('♠')").css("color", "");
            $(".biddingBoxClass span:contains('♣')").css("color", "");
            $(".biddingBoxClass span:contains('♦')").css("color", "");
            $(".biddingBoxClass span:contains('♥')").css("color", "");
            $(".biddingBoxClass span:contains('♠')").css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')").css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')").css("background-color", "");
            $(".auctionBoxCellClass:contains('Rdbl')").css("color", "")
            $(".auctionBoxCellClass:contains('Rdbl')").css("background-color", "");
        }
    }
    addBBOalertEvent("onAnyMutation", updateColors);
    // End of user script code
})();

(function () {
    var title = "Miscelanous small scripts"
    var cfg = {};
    cfg.Enable_chat_timestamp = false;
    cfg.Enable_prealert = false;  
    cfg.Prealert_shortcut = "PREALERT";
    cfg.Move_table_left = false; 
    cfg.Remove_icons_from_tabs = false; 
    addBBOalertEvent("onDataLoad", function () {
        addConfigBox(title, cfg);
    });
    addBBOalertEvent("onNewChatMessage", function () {
        if (!cfg.Enable_chat_timestamp) return;
        var ci = $("#chatDiv .chatOutputClass chat-list-item").toArray();
        var cs = ci[ci.length-1].querySelector("span");
        var now = new Date();
        var hh = now.getHours().toString();
        if (hh.length == 1) hh = '0' + hh;
        var mn = now.getMinutes().toString();
        if (mn.length == 1) mn = '0' + mn;
        cs.textContent = hh + ':' + mn + ' ' + cs.textContent;
        lastChatMessage = ci[ci.length-1].textContent;
    });  
    addBBOalertEvent("onAnyOpponentChange", function () {
        if (!cfg.Enable_prealert) return;       
        setChatMessage(findShortcut(cfg.Prealert_shortcut),true);
    });
    moveTableLeft = function () {
        var nd = getNavDiv();
        if (nd != null) {
            var dt = nd.querySelector('.dealViewerToolbarClass');
            if (dt != null) {
                var cc = nd.querySelector('.coverClass');
                if (cc != null) {
                    if (cfg.Enable_move_table_left) {
                        cc.style.left = '0px';
                        var ds = nd.querySelector('.dealScreenDivClass');
                        if (ds != null) {
                            dt.style.left = ($(cc).width() + 4) + 'px';
                        }    
                    } else {
                        if (cc.style.left == '0px') {
                            redrawTable();
                        }
                    }
                }
            }
        }
    };
    removeIconsFromTabs =  function () {
        if(cfg.Remove_icons_from_tabs) $(".verticalClass mat-icon").hide();
        if(!cfg.Remove_icons_from_tabs) $(".verticalClass mat-icon").show();
        $(".area-label").css("font-weight", "bold");
    };

    addBBOalertEvent("onAnyMutation", function () {
        moveTableLeft();
        removeIconsFromTabs();       
    });  
})();
