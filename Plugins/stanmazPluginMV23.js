
//BBOalert,stanmazPlugin version 1.0

function BBOcontext() {
if (document.title != 'Bridge Base Online') return window.parent.document;
return document;
}

// The script for BBO event logging
(function () {
    var title = "BBO event logging";
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
        cfg.Enable_Log_Now = false;
        cfg.Enable_Log_at_Next_Deal = false;
        cfg.Export_Log_Data = false;
        addBBOalertEvent("onAnyMutation", function () {
            if (cfg.Export_Log_Data) {
                console.log("config = " + cfg);
                writeToClipboard(EVENT_LOG);
                localStorage.setItem('BBOalertEvents', EVENT_LOG);
                bboalertLog(EVENT_LOG.split("\n").length + " log records exported to clipboard");
                cfg.Export_Log_Data = false;
            }
            if (cfg.Clear_Log_Data) {
                if (confirm("Are you sure you want to clear log ?")) EVENT_LOG = '';
                cfg.Clear_Log_Data = false;
            }
        });
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
    function updateColors() {
        if (cfg.enabled) {
            $(".cardArea:contains('♣')", BBOcontext()).css("color", cfg.text_color_clubs);
            $(".cardArea:contains('♦')", BBOcontext()).css("color", cfg.text_color_diamonds);
            $(".cardArea:contains('♥')", BBOcontext()).css("color", cfg.text_color_hearts);
            $(".cardArea:contains('♠')", BBOcontext()).css("color", cfg.text_color_spades);
            $(".cardArea:contains('♣')", BBOcontext()).css("background-color", cfg.background_color_clubs);
            $(".cardArea:contains('♦')", BBOcontext()).css("background-color", cfg.background_color_diamonds);
            $(".cardArea:contains('♥')", BBOcontext()).css("background-color", cfg.background_color_hearts);
            $(".cardArea:contains('♠')", BBOcontext()).css("background-color", cfg.background_color_spades);
            $(".auctionBoxCellClass span:contains('♣')", BBOcontext()).css("color", cfg.text_color_clubs);
            $(".auctionBoxCellClass span:contains('♦')", BBOcontext()).css("color", cfg.text_color_diamonds);
            $(".auctionBoxCellClass span:contains('♥')", BBOcontext()).css("color", cfg.text_color_hearts);
            $(".auctionBoxCellClass span:contains('♠')", BBOcontext()).css("color", cfg.text_color_spades);
            $(".biddingBoxClass span:contains('♣')", BBOcontext()).css("color", cfg.text_color_clubs);
            $(".biddingBoxClass span:contains('♦')", BBOcontext()).css("color", cfg.text_color_diamonds);
            $(".biddingBoxClass span:contains('♥')", BBOcontext()).css("color", cfg.text_color_hearts);
            $(".biddingBoxClass span:contains('♠')", BBOcontext()).css("color", cfg.text_color_spades);
            $(".auctionBoxCellClass:contains('Dbl')", BBOcontext()).css("color", cfg.text_color_double);
            $(".auctionBoxCellClass:contains('Dbl')", BBOcontext()).css("background-color", cfg.background_color_double);
            $(".auctionBoxCellClass:contains('Rdbl')", BBOcontext()).css("color", cfg.text_color_redouble);
            $(".auctionBoxCellClass:contains('Rdbl')", BBOcontext()).css("background-color", cfg.background_color_redouble);
        } else {
            $(".cardArea:contains('♣')", BBOcontext()).css("color", "black");
            $(".cardArea:contains('♦')", BBOcontext()).css("color", "");
            $(".cardArea:contains('♥')", BBOcontext()).css("color", "");
            $(".cardArea:contains('♠')", BBOcontext()).css("color", "black");
            $(".cardArea:contains('♣')", BBOcontext()).css("background-color", "");
            $(".cardArea:contains('♦')", BBOcontext()).css("background-color", "");
            $(".cardArea:contains('♥')", BBOcontext()).css("background-color", "");
            $(".cardArea:contains('♠')", BBOcontext()).css("background-color", "");
            $(".auctionBoxCellClass span:contains('♣')", BBOcontext()).css("color", "rgb(0, 0, 0)");
            $(".auctionBoxCellClass span:contains('♦')", BBOcontext()).css("color", "rgb(203, 0, 0)");
            $(".auctionBoxCellClass span:contains('♥')", BBOcontext()).css("color", "rgb(203, 0, 0)");
            $(".auctionBoxCellClass span:contains('♠')", BBOcontext()).css("color", "rgb(0, 0, 0)");
            $(".biddingBoxClass span:contains('♣')", BBOcontext()).css("color", "");
            $(".biddingBoxClass span:contains('♦')", BBOcontext()).css("color", "");
            $(".biddingBoxClass span:contains('♥')", BBOcontext()).css("color", "");
            $(".biddingBoxClass span:contains('♠')", BBOcontext()).css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')", BBOcontext()).css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')", BBOcontext()).css("background-color", "");
            $(".auctionBoxCellClass:contains('Rdbl')", BBOcontext()).css("color", "");
            $(".auctionBoxCellClass:contains('Rdbl')", BBOcontext()).css("background-color", "");
        }
    }
    addBBOalertEvent("onAnyMutation", updateColors);
    // End of user script code
})();

(function () {
    var title = "Automatic prealert";
    var cfg = {};
    cfg.Enable_prealert = false;
    cfg.Prealert_shortcut = "PREALERT";
    addBBOalertEvent("onDataLoad", function () {
        addConfigBox(title, cfg);
    });
    addBBOalertEvent("onAnyOpponentChange", function () {
        if (!cfg.Enable_prealert) return;
        setChatMessage(findShortcut(cfg.Prealert_shortcut), true);
    });
})();

(function () {
    var title = "Miscellaneous simple scripts";
    var cfg = {};
    cfg.Enable_chat_timestamp = false;
    cfg.Move_table_left = false;
    cfg.Remove_icons_from_tabs = false;
    cfg.Large_bidding_box = false;
    cfg.Modified_OK_button = false;
    cfg.Swap_bidding_buttons = false;
    cfg.Auto_chat_to_opponents = false;
    cfg.Disable_alerts_with_casual_partner = false;
    addBBOalertEvent("onDataLoad", function () {
        addConfigBox(title, cfg);
    });
    addBBOalertEvent("onNewChatMessage", function () {
        if (!cfg.Enable_chat_timestamp) return;
        var ci = $("#chatDiv .chatOutputClass chat-list-item", BBOcontext()).toArray();
        var cs = ci[ci.length - 1].querySelector("span");
        var now = new Date();
        var hh = now.getHours().toString();
        if (hh.length == 1) hh = '0' + hh;
        var mn = now.getMinutes().toString();
        if (mn.length == 1) mn = '0' + mn;
        ci.forEach(function (cx) {
            if (cx.textContent.match(/^[0-2][0-9][:][0-6][0-9]/) == null) {
                var cs = cx.querySelector("span");
                cs.textContent = hh + ':' + mn + ' ' + cs.textContent;
            }
        });
    });
    var moveTableLeftStyleText = `
    #navDiv .dealViewerToolbarClass {
        left: 0px !important;
    }    
    #navDiv .coverClass {
        left: coverclasspos !important;
    }    
    `;
    var moveTableLeftStyle = BBOcontext().createElement('style');
    moveTableLeftStyle.id = 'move-table-left--style';
    moveTableLeft = function (on) {
        if (on) {
            var t = moveTableLeftStyleText.replace("coverclasspos", $("#navDiv .dealViewerToolbarClass", BBOcontext()).width() + "px");
            if (BBOcontext().head.querySelector("#move-table-left--style") == null) {
                moveTableLeftStyle.innerHTML = t;
                BBOcontext().head.appendChild(moveTableLeftStyle);
            } else {
                BBOcontext().head.querySelector("#move-table-left--style").innerHTML = t;
            }
        } else {
            $("#move-table-left--style", BBOcontext()).remove();
        }
    };
    removeIconsFromTabs = function () {
        if (cfg.Remove_icons_from_tabs) $(".verticalClass mat-icon", BBOcontext()).hide();
        if (!cfg.Remove_icons_from_tabs) $(".verticalClass mat-icon", BBOcontext()).show();
        $(".area-label", BBOcontext()).css("font-weight", "bold");
    };
    var largeBoxStyleText = `
    #navDiv .auctionBoxClass {
        top: 0px !important;
        height: 33% !important;
    }
    #navDiv .scrollerClass {
        height: 100% !important;
    }
    #navDiv .biddingBoxClass {
        top: 34% !important;
        left: 0px !important;
        height: 45% !important;
        width: 100% !important;
    }
    #navDiv .explainInputClass {
        left: 15% !important;
        width: 80% !important;
        font-size: 4vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(1) .biddingBoxButtonClass {
        left: 15% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(2) .biddingBoxButtonClass {
        left: 25% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(3) .biddingBoxButtonClass {
        left: 35% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(4) .biddingBoxButtonClass {
        left: 45% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(5) .biddingBoxButtonClass {
        left: 55% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(6) .biddingBoxButtonClass {
        left: 65% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(7) .biddingBoxButtonClass {
        left: 75% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(8) .biddingBoxButtonClass {
        left: 20% !important;
        top: 40% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(9) .biddingBoxButtonClass {
        left: 30% !important;
        top: 40% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(10) .biddingBoxButtonClass {
        left: 40% !important;
        top: 40% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(11) .biddingBoxButtonClass {
        left: 50% !important;
        top: 40% !important;
        height: 30% !important;
        width: 8% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(12) .biddingBoxButtonClass {
        left: 60% !important;
        top: 40% !important;
        height: 30% !important;
        width: 18% !important;
        font-size: 8vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(13) .biddingBoxButtonClass {
        height: 30% !important;
        width: 11% !important;
        font-size: 4vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(14) .biddingBoxButtonClass {
        height: 30% !important;
        width: 11% !important;
        top: 33% !important;
        font-size: 4vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(15) .biddingBoxButtonClass {
        height: 30% !important;
        width: 11% !important;
        top: 33% !important;
        font-size: 4vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(16) .biddingBoxButtonClass {
        height: 30% !important;
        width: 11% !important;
        top: 65% !important;
        font-size: 4vh !important;
    }
    #navDiv bidding-box-button:nth-of-type(17) .biddingBoxButtonClass {
        height: 30% !important;
        width: 11% !important;
        left: unset !important;
        right: 4px !important;
        font-size: 4vh !important;
    }
    `;
    var largeBoxStyle = BBOcontext().createElement('style');
    largeBoxStyle.id = 'large-box-style';
    largeBoxStyle.innerHTML = largeBoxStyleText;
    BBOcontext().head.appendChild(largeBoxStyle);
    largeBiddingBox = function (on) {
        //        if (getPartnerHand() != '') return;
        if (on) {
            if (BBOcontext().head.querySelector("#large-box-style") == null) BBOcontext().head.appendChild(largeBoxStyle);
        } else {
            $("#large-box-style",BBOcontext().head).remove();
        }
    };
    modified_OK_button = function (on) {
        if (on) {
            if (callText.length == 2) {
                var txt = callText;
                var btok = $("bridge-screen bidding-box-button button", BBOcontext())[16];
                var btnt = $("bridge-screen bidding-box-button button", BBOcontext())[11];
                var btok_span = $("bridge-screen bidding-box-button span", BBOcontext())[16];
                if (callText == "Db") {
                    txt = 'Dbl';
                    btok.style.backgroundColor = "rgb(203, 0, 0)";
                    btok_span.style.color = "white";
                } else if (callText == "Rd") {
                    txt = 'Rdbl';
                    btok.style.backgroundColor = "rgb(67, 119, 169)";
                    btok_span.style.color = "white";
                } else if (callText == "--") {
                    txt = 'Pass';
                    btok.style.backgroundColor = "rgb(16, 102, 16)";
                    btok_span.style.color = "white";
                } else {
                    btok_span.style.color = "black";
                    btok.style.backgroundColor = "rgb(172, 197, 197)";
                    if (callText.slice(-1) == "N") txt = callText.charAt(0) + btnt.textContent;
                    if (callText.slice(-1) == "C") txt = callText.charAt(0) + "♣";
                    if (callText.slice(-1) == "D") {
                        txt = callText.charAt(0) + "♦";
                        $("bridge-screen bidding-box-button span", BBOcontext())[16].style.color = "rgb(203, 0, 0)";
                    }
                    if (callText.slice(-1) == "H") {
                        txt = callText.charAt(0) + "♥";
                        $("bridge-screen bidding-box-button span", BBOcontext())[16].style.color = "rgb(203, 0, 0)";
                    }
                    if (callText.slice(-1) == "S") txt = callText.charAt(0) + "♠";
                }
                $("bridge-screen bidding-box-button span", BBOcontext())[16].textContent = elimineSpaces(txt);
            }
        }
    };
    var swapBiddingButtonsStyleText = `
    #navDiv .explainInputClass {
        left: 4px !important;
    }
    #navDiv bidding-box-button:nth-of-type(13) .biddingBoxButtonClass {
        right: 4px !important;
        left: unset !important;
    }
    #navDiv bidding-box-button:nth-of-type(14) .biddingBoxButtonClass {
        right: 4px !important;
        left: unset !important;
    }
    #navDiv bidding-box-button:nth-of-type(15) .biddingBoxButtonClass {
        right: 4px !important;
        left: unset !important;
    }
    #navDiv bidding-box-button:nth-of-type(16) .biddingBoxButtonClass {
        right: 4px !important;
        left: unset !important;
    }
    #navDiv bidding-box-button:nth-of-type(17) .biddingBoxButtonClass {
        left: 4px !important;
    }
    `;
    var swapBiddingButtonsStyle = BBOcontext().createElement('style');
    swapBiddingButtonsStyle.id = 'swap-bidding-buttons-style';
    swapBiddingButtonsStyle.innerHTML = swapBiddingButtonsStyleText;
    swapBiddingButtons = function (on) {
        if (on && (confirmBidsSet() == "Y")) {
            if (BBOcontext().head.querySelector("#swap-bidding-buttons-style") == null) BBOcontext().head.appendChild(swapBiddingButtonsStyle);
        } else {
            $("#swap-bidding-buttons-style", BBOcontext()).remove();
        }
    };
    autoChatToOpponents = function () {
        addBBOalertEvent('onMyCardsDisplayed', function () {
            if (myDirection() != '') {
                if (cfg.Auto_chat_to_opponents) setChatDestination('Opponents');
            }
        });
        addBBOalertEvent('onNewChatMessage', function () {
            if (myDirection() != '') {
                if (cfg.Auto_chat_to_opponents) setChatDestination('Opponents');
            }
        });
    };
    disableAlertsWithCasualPartner = function (on) {
        if (on) {
            if (myDirection() == '') return;
            if (myPartner() == '') return;
            var i = searchOptionsSelector(myPartner() + '+' + whoAmI());
            if (i == -1) {
                i = searchOptionsSelector(whoAmI() + '+' + myPartner());
                if (i == -1) {
                    i = searchOptionsSelector(myPartner());
                }
            }
            if (i != -1) return;
            i = 2;
            var optionsSelector = BBOcontext().getElementById('bboalert-ds');
            if (optionsSelector.selectedIndex == i) return;
            optionsSelector.selectedIndex = i;
            optionsSelectorChanged();
        }
    };
    addBBOalertEvent("onDataLoad", function () {
        autoChatToOpponents();
    });
    autoChatToOpponents();

    addBBOalertEvent("onAnyMutation", function () {
        moveTableLeft(cfg.Move_table_left);
        removeIconsFromTabs();
        largeBiddingBox(cfg.Large_bidding_box);
        modified_OK_button(cfg.Modified_OK_button);
        swapBiddingButtons(cfg.Swap_bidding_buttons);
    });
    addBBOalertEvent("onNewDeal", function () {
        disableAlertsWithCasualPartner(cfg.Disable_alerts_with_casual_partner);
    });
})();
