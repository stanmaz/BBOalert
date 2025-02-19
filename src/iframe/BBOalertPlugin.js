
//BBOalert,stanmazPlugin version 3.6.3
function PluginInit() {
    if (DEBUG) console.log("Plugin version : build-in");

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
        EVENT_LOG = localStorage.getItem('BBOalertEvents');
        if (EVENT_LOG == null) EVENT_LOG = '';
        addBBOalertEvent("onDataLoad", function () {
            if (addConfigBox(title, cfg) != null) {
                cfg.Enable_Log_Now = false;
                cfg.Enable_Log_at_Next_Deal = false;
                cfg.Export_Log_Data = false;
                addBBOalertEvent("onAnyMutation", function () {
                    if (cfg.Export_Log_Data) {
                        if (DEBUG) console.log("config = " + cfg);
                        writeToClipboard(EVENT_LOG);
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                        bboalertLog(EVENT_LOG.split("\n").length + " log records exported to clipboard");
                        cfg.Export_Log_Data = false;
                    }
                    if (cfg.Clear_Log_Data) {
                        if (confirm("Are you sure you want to clear log ?")) EVENT_LOG = '';
                        cfg.Clear_Log_Data = false;
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                    }
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
                                if (DEBUG) console.log(s);
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
                            if (DEBUG) console.log(s);
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
                        if (DEBUG) console.log(s);
                        if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                        EVENT_LOG = EVENT_LOG + s + '\n';
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                    }
                });
                addBBOalertEvent("onNotificationDisplayed", function () {
                    if (cfg.Enable_Log_Now && cfg.Log_onNotificationDisplayed) {
                        var s = getNow(true) + ',onNotificationDisplayed,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getNotificationPanel().textContent + '"';
                        if (DEBUG) console.log(s);
                        if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                        EVENT_LOG = EVENT_LOG + s + '\n';
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                    }
                });
                addBBOalertEvent("onNewDeal", function () {
                    if (cfg.Enable_Log_Now && cfg.Log_onNewDeal) {
                        var s = getNow(true) + ',onNewDeal,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,' + getDealNumber();
                        if (DEBUG) console.log(s);
                        if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                        EVENT_LOG = EVENT_LOG + s + '\n';
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                    }
                });
                addBBOalertEvent("onDealEnd", function () {
                    if (cfg.Enable_Log_Now && cfg.Log_onDealEnd) {
                        var s = getNow(true) + ',onDealEnd,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getDealEndPanel().textContent + '"';
                        if (DEBUG) console.log(s);
                        if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                        EVENT_LOG = EVENT_LOG + s + '\n';
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                    }
                });
                addBBOalertEvent("onNewChatMessage", function () {
                    if (cfg.Enable_Log_Now && cfg.Log_onNewChatMessage) {
                        var s = getNow(true) + ',onNewChatMessage,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getLastChatMessaage() + '"';
                        if (DEBUG) console.log(s);
                        if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                        EVENT_LOG = EVENT_LOG + s + '\n';
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                    }
                });
                addBBOalertEvent("onCallExplanationPanelDisplayed", function () {
                    if (cfg.Enable_Log_Now && cfg.Log_onCallExplanationPanelDisplayed) {
                        var s = getNow(true) + ',onCallExplanationPanelDisplayed,' + getDealNumber() + ',' + LAST_PLAYER.slice(0, 1) + ',' + LAST_PLAYER.slice(1) + ',,"' + getCallExplanationText() + '"';
                        if (DEBUG) console.log(s);
                        if ((typeof EVENT_LOG) == "undefined") EVENT_LOG = '';
                        EVENT_LOG = EVENT_LOG + s + '\n';
                        localStorage.setItem('BBOalertEvents', EVENT_LOG);
                    }
                });
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
            if (addConfigBox(title, cfg) != null) {
                addBBOalertEvent("onAnyMutation", updateColors);
            }
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
                $("auction-box-cell .call-strain.clubs", BBOcontext()).css("color", cfg.text_color_clubs);
                $("auction-box-cell .call-strain.diamonds", BBOcontext()).css("color", cfg.text_color_diamonds);
                $("auction-box-cell .call-strain.hearts", BBOcontext()).css("color", cfg.text_color_hearts);
                $("auction-box-cell .call-strain.spades", BBOcontext()).css("color", cfg.text_color_spades);
                $(".biddingBoxClass span:contains('♣')", BBOcontext()).css("color", cfg.text_color_clubs);
                $(".biddingBoxClass span:contains('♦')", BBOcontext()).css("color", cfg.text_color_diamonds);
                $(".biddingBoxClass span:contains('♥')", BBOcontext()).css("color", cfg.text_color_hearts);
                $(".biddingBoxClass span:contains('♠')", BBOcontext()).css("color", cfg.text_color_spades);
                $(".auction-box-cell:contains('Dbl')", BBOcontext()).css("color", cfg.text_color_double);
                $(".auction-box-cell:contains('Dbl')", BBOcontext()).css("background-color", cfg.background_color_double);
                $(".auction-box-cell:contains('Rdbl')", BBOcontext()).css("color", cfg.text_color_redouble);
                $(".auction-box-cell:contains('Rdbl')", BBOcontext()).css("background-color", cfg.background_color_redouble);
            } else {
                $(".cardArea:contains('♣')", BBOcontext()).css("color", "black");
                $(".cardArea:contains('♦')", BBOcontext()).css("color", "");
                $(".cardArea:contains('♥')", BBOcontext()).css("color", "");
                $(".cardArea:contains('♠')", BBOcontext()).css("color", "black");
                $(".cardArea:contains('♣')", BBOcontext()).css("background-color", "");
                $(".cardArea:contains('♦')", BBOcontext()).css("background-color", "");
                $(".cardArea:contains('♥')", BBOcontext()).css("background-color", "");
                $(".cardArea:contains('♠')", BBOcontext()).css("background-color", "");
                $("auction-box-cell .call-strain.clubs", BBOcontext()).css("color", "rgb(0, 0, 0)");
                $("auction-box-cell .call-strain.diamonds", BBOcontext()).css("color", "rgb(203, 0, 0)");
                $("auction-box-cell .call-strain.hearts", BBOcontext()).css("color", "rgb(203, 0, 0)");
                $("auction-box-cell .call-strain.spades", BBOcontext()).css("color", "rgb(0, 0, 0)");
                $(".biddingBoxClass span:contains('♣')", BBOcontext()).css("color", "");
                $(".biddingBoxClass span:contains('♦')", BBOcontext()).css("color", "");
                $(".biddingBoxClass span:contains('♥')", BBOcontext()).css("color", "");
                $(".biddingBoxClass span:contains('♠')", BBOcontext()).css("color", "");
                $(".auction-box-cell:contains('Dbl')", BBOcontext()).css("color", "");
                $(".auction-box-cell:contains('Dbl')", BBOcontext()).css("background-color", "");
                $(".auction-box-cell:contains('Rdbl')", BBOcontext()).css("color", "");
                $(".auction-box-cell:contains('Rdbl')", BBOcontext()).css("background-color", "");
            }
        }
        // End of user script code
    })();

    (function () {
        var title = "Automatic prealert";
        var cfg = {};
        cfg.Enable_prealert = false;
        cfg.Prealert_shortcut = "PREALERT";
        var lockPrealert = false;
        addBBOalertEvent("onDataLoad", function () {
            if (addConfigBox(title, cfg) != null) {
                addBBOalertEvent("onAnyOpponentChange", function () {
                    if (!cfg.Enable_prealert) return;
                    if (lockPrealert) return;
                    lockPrealert = true;
                    setTimeout(function () {
                        setChatMessage(findShortcut(cfg.Prealert_shortcut), true);
                        setTimeout(function () {
                            lockPrealert = false;
                        }, 3000);
                    }, 2000);
                });
            }
        });
    })();

    (function () {
        var title = "Bidding timeout";
        var cfg = {};
        cfg.Enable_timeout = false;
        cfg.Timeout_value = 45;
        cfg.Timeout_shortcut = "TIMEOUT";
        cfg.Timeout_warning = 10;
        cfg.Warning_shortcut = "TIMEOUT_WARNING";
        timer = null;
        function timeout() {
            if (!cfg.Enable_timeout) return;
            if (!auctionBoxDisplayed) return;
            var secs_left = cfg.Timeout_value;
            if (timer != null) clearInterval(timer);
            timer = setInterval(function () {
                secs_left--;
                //            if (DEBUG) console.log("Left " + secs_left);
                if (secs_left == 0) {
                    clearInterval(timer);
                    setChatDestination("Table");
                    setTimeout(function () {
                        setChatMessage(findShortcut(cfg.Timeout_shortcut), true);
                    }, 500);
                }
                if (secs_left == cfg.Timeout_warning) {
                    setChatDestination("Table");
                    setTimeout(function () {
                        setChatMessage(findShortcut(cfg.Warning_shortcut), true);
                    }, 500);
                }
            }, 1000);
        }
        addBBOalertEvent("onDataLoad", function () {
            if (addConfigBox(title, cfg) != null) {
                addBBOalertEvent("onNewActivePlayer", function () {
                    timeout();
                });
                addBBOalertEvent("onAuctionBegin", function () {
                    timeout();
                });
            }
        });
    })();

    (function () {
        var title = "Miscellaneous simple scripts";
        var cfg = {};
        cfg.Enable_chat_timestamp = false;
        cfg.Move_table_left = false;
//        cfg.Remove_icons_from_tabs = false;
        cfg.Large_bidding_box = false;
        cfg.Modified_OK_button = false;
        cfg.Swap_bidding_buttons = false;
        cfg.Auto_chat_to_opponents = false;
        cfg.Disable_alerts_with_casual_partner = false;
//        cfg.Remove_Ads = false;
        cfg.T_for_10 = false;
        addBBOalertEvent("onDataLoad", function () {
            if (DEBUG) console.log("Title = " + title);
            if (addConfigBox(title, cfg) != null) {
                addBBOalertEvent("onNewChatMessage", function () {
                    if (!cfg.Enable_chat_timestamp) return;
                    var ci = $("#chatDiv .chatOutputClass chat-list-item", BBOcontext()).toArray();
                    //                var cs = ci[ci.length - 1].querySelector("span");
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
                addBBOalertEvent("onAnyMutation", function () {
                    moveTableLeft(cfg.Move_table_left);
//                    removeIconsFromTabs(cfg.Remove_icons_from_tabs);
                    largeBiddingBox(cfg.Large_bidding_box);
                    swapBiddingButtons(cfg.Swap_bidding_buttons);
                    removeAds(cfg.Move_table_left);
                    T_for_10(cfg.T_for_10);
                });
                addBBOalertEvent("onNewDeal", function () {
                    disableAlertsWithCasualPartner(cfg.Disable_alerts_with_casual_partner);
                });
                addBBOalertEvent("onNewCallSelected", function () {
                    modified_OK_button(cfg.Modified_OK_button);
                });
            }
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
                var t = moveTableLeftStyleText
                    .replace("coverclasspos", $("#navDiv .dealViewerToolbarClass", BBOcontext())
                        .outerWidth() + "px");
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
        removeIconsFromTabs = function (on) {
            if (on) {
                $(".verticalClass svg", BBOcontext()).hide()
            } else {
                $(".verticalClass svg", BBOcontext()).show();
            }
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
        #navDiv bidding-box input {
            font-size: 36px !important;
            font-weight: bold !important;
        }
        #navDiv bidding-box :has(>input) {
            top: 20px !important;
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
        largeBiddingBox = function (on) {
            //        if (getPartnerHand() != '') return;
            if (on) {
                if (BBOcontext().head.querySelector("#large-box-style") == null) BBOcontext().head.appendChild(largeBoxStyle);
            } else {
                $("#large-box-style", BBOcontext().head).remove();
            }
        };
        modified_OK_button = function (on) {
            var btok = $("bridge-screen bidding-box-button button", BBOcontext())[16];
            var btok_span = $("span", btok)[0];
            if (on) {
                if (callText.length == 2) {
                    var txt1 = ""
                    var txt2 = "OK";
                    var btnt = $("bridge-screen bidding-box-button button", BBOcontext())[11];
                    var bkg = "white";
                    var clr = "black";
                    var fntsiz = "";
                    switch (callText) {
                        case "Db":
                            txt2 = 'Dbl';
                            bkg = "rgb(203, 0, 0)";
                            clr = "black";
                            break;
                        case "Rd":
                            txt2 = 'Rdbl';
                            bkg = "rgb(67, 119, 169";
                            clr = "black";
                            break;
                        case "--":
                            txt2 = 'Pass';
                            bkg = "rgb(16, 102, 16)";
                            clr = "black";
                            break;
                        default:
                            txt1 = callText.charAt(0);
                            bkg = "rgb(255, 206, 0)";
                            switch (callText.charAt(1)) {
                                case "N":
                                    txt1 = txt1 + elimineSpaces(btnt.textContent);
                                    txt2 = "";
                                    clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(11).find("span").first().css("color");
                                    fntsiz = "";
                                    break
                                case "C":
                                    txt2 = "♣";
                                    clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(7).find("span").first().css("color");
                                    fntsiz = "larger";
                                    break
                                case "D":
                                    txt2 = "♦";
                                    clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(8).find("span").first().css("color");
                                    fntsiz = "larger";
                                    break
                                case "H":
                                    txt2 = "♥";
                                    clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(9).find("span").first().css("color");
                                    fntsiz = "larger";
                                    break
                                case "S":
                                    txt2 = "♠";
                                    clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(10).find("span").first().css("color");
                                    fntsiz = "larger";
                                    break
                            }
                            break;
                    }
                    var h = '<span class="temp">' + txt1 + '</span><span class="temp" style="color:' + clr + '; font-size: ' + fntsiz + ';">' + txt2 + '</span>';
                    $(btok_span).hide();
                    $(btok).find(".temp").remove();
                    $(btok_span).after(h);

                }
            } else {
                $(btok_span).show();
                $(btok).find(".temp").remove();
            };
        }
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
            if (tableType() != 'game') return;
            addBBOalertEvent('onTableDisplayed', function () {
                if (cfg.Auto_chat_to_opponents) {
                    setTimeout(function () {
                        setChatDestination('Table');
                    }, 2000);
                }
            });
            addBBOalertEvent('onMyCardsDisplayed', function () {
                if (myDirection() != '') {
                    if (cfg.Auto_chat_to_opponents) setChatDestination('Table');
                }
            });
            addBBOalertEvent('onNewAuction', function () {
                if (myDirection() != '') {
                    if (cfg.Auto_chat_to_opponents) setChatDestination('Opponents');
                }
            });
            addBBOalertEvent('onNewPlayedCard', function () {
                if (getContext() == '') return;
                if (myDirection() != '') {
                    if (cfg.Auto_chat_to_opponents) setChatDestination('Opponents');
                }
            });
            addBBOalertEvent('onDealEnd', function () {
                if (myDirection() != '') {
                    if (cfg.Auto_chat_to_opponents) setChatDestination('Table');
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
                var optionsSelector = document.getElementById('bboalert-ds');
                if (optionsSelector.selectedIndex == i) return;
                optionsSelector.selectedIndex = i;
                optionsSelectorChanged();
            }
        };
        addBBOalertEvent("onDataLoad", function () {
            autoChatToOpponents();
        });
        var removeAdsStyleText = `
            #bbo_app {
                left: 0px !important;
                right: 0px !important;
                width: "" !important;
            }
            #bbo_ad1,#bbo_ad2 {
                display: none !important;
            }
        `
        var removeAdsStyle = BBOcontext().createElement('style');
        removeAdsStyle.id = 'remove-ads-style';
        removeAdsStyle.innerHTML = removeAdsStyleText;       
        removeAds = function (on) {
            if (on && (tableType() == "game")) {
                BBOcontext().head.appendChild(removeAdsStyle);
            } else {
                $("#remove-ads-style", BBOcontext()).remove();
            }
        };
        T_for_10 = function (on) {
            if (on) {
                $(".cardSurfaceClass .topLeft div:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
                $(".cardSurfaceClass .bottomRight div:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
                $(".cardSurfaceClass .handDiagramCardClass:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
                $(".cardSurfaceClass .handDiagramCurrentTrickClass .innerDivClass:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
                $("history-screen .topLeft div:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
                $("history-screen .bottomRight div:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
                $("history-screen .handDiagramCardClass:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
                $("history-screen .handDiagramCurrentTrickClass .innerDivClass:contains('10')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("10", "T"));
                });
            } else {
                $(".cardSurfaceClass .topLeft div:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
                $(".cardSurfaceClass .bottomRight div:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
                $(".cardSurfaceClass .handDiagramCardClass:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
                $(".cardSurfaceClass .handDiagramCurrentTrickClass .innerDivClass:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
                $("history-screen .topLeft div:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
                $("history-screen .bottomRight div:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
                $("history-screen .handDiagramCardClass:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
                $("history-screen .handDiagramCurrentTrickClass .innerDivClass:contains('T')", window.parent.document).each(function () {
                    $(this).html($(this).html().replace("T", "10"));
                });
            }
        };
    })();


}