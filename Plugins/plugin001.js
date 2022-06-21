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
        var ci = $("#chatDiv .chatOutputClass chat-list-item", window.parent.document).toArray();
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
    var moveTableLeftStyle = parent.document.createElement('style');
    moveTableLeftStyle.id = 'move-table-left--style';
    moveTableLeft = function (on) {
        if (on) {
            var t = moveTableLeftStyleText.replace("coverclasspos", $("#navDiv .dealViewerToolbarClass", window.parent.document).width() + "px");
            if (parent.document.head.querySelector("#move-table-left--style") == null) {
                moveTableLeftStyle.innerHTML = t;
                parent.document.head.appendChild(moveTableLeftStyle);
            } else {
                parent.document.head.querySelector("#move-table-left--style").innerHTML = t;
            }
        } else {
            $("#move-table-left--style", window.parent.document).remove();
        }
    };
    removeIconsFromTabs = function () {
        if (cfg.Remove_icons_from_tabs) $(".verticalClass mat-icon", window.parent.document).hide();
        if (!cfg.Remove_icons_from_tabs) $(".verticalClass mat-icon", window.parent.document).show();
        $(".area-label", window.parent.document).css("font-weight", "bold");
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
    var largeBoxStyle = document.createElement('style');
    largeBoxStyle.id = 'large-box-style';
    largeBoxStyle.innerHTML = largeBoxStyleText;
    parent.document.head.appendChild(largeBoxStyle);
    largeBiddingBox = function (on) {
        //        if (getPartnerHand() != '') return;
        if (on) {
            if (parent.document.head.querySelector("#large-box-style") == null) parent.document.head.appendChild(largeBoxStyle);
        } else {
            $("#large-box-style", window.parent.document).remove();
        }
    };
    modified_OK_button = function (on) {
        if (on) {
            if (callText.length == 2) {
                var txt = callText;
                var btok = $("bridge-screen bidding-box-button button", window.parent.document)[16];
                var btnt = $("bridge-screen bidding-box-button button", window.parent.document)[11];
                var btok_span = $("bridge-screen bidding-box-button span", window.parent.document)[16];
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
                        $("bridge-screen bidding-box-button span", window.parent.document)[16].style.color = "rgb(203, 0, 0)";
                    }
                    if (callText.slice(-1) == "H") {
                        txt = callText.charAt(0) + "♥";
                        $("bridge-screen bidding-box-button span", window.parent.document)[16].style.color = "rgb(203, 0, 0)";
                    }
                    if (callText.slice(-1) == "S") txt = callText.charAt(0) + "♠";
                }
                $("bridge-screen bidding-box-button span", window.parent.document)[16].textContent = elimineSpaces(txt);
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
    var swapBiddingButtonsStyle = document.createElement('style');
    swapBiddingButtonsStyle.id = 'swap-bidding-buttons-style';
    swapBiddingButtonsStyle.innerHTML = swapBiddingButtonsStyleText;
    swapBiddingButtons = function (on) {
        if (on && (confirmBidsSet() == "Y")) {
            if (parent.document.head.querySelector("#swap-bidding-buttons-style") == null) parent.document.head.appendChild(swapBiddingButtonsStyle);
        } else {
            $("#swap-bidding-buttons-style", window.parent.document).remove();
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
            var optionsSelector = document.getElementById('bboalert-ds');
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
