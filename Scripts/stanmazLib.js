//BBOalert
//Javascript,https://raw.githubusercontent.com/stanmaz/BBOalert/master/Scripts/stanmazLib.js
//Script,onDataLoad,stanmazLib.HOVER_BBOALERT_TAB(true);
//Script,onAnyMutation,stanmazLib.CARD_COLORS(true);
//Script,onAnyMutation,stanmazLib.DEAL_TOOLBAR_RIGHT();
//Script,onAnyMutation,stanmazLib.REMOVE_ICONS_FROM_TABS();
//Script,onAnyMutation,stanmazLib.LARGE_BIDDING_BOX(true);
//Script,onAnyMutation,stanmazLib.NEW_OK_BUTTON();
//   Copy the code above to your data file omitting the unwanted "Script" records

window.stanmazLib = {

    HOVER_BBOALERT_TAB: function (on) {
        var t = document.getElementById('bboalert-tab');
        var rd = document.getElementById('rightDiv');
        var vt = rd.querySelector('.verticalTabBarClass');
        var tabs = vt.querySelectorAll('.verticalClass');
        var i;
        if (on) {
            if (t.onmouseover == null) t.onmouseover = function () {
                setOptions(true);
            };
            for (i = 0; i < tabs.length; i++) {
                if (tabs[i].textContent.search('BBOalert') == -1) {
                    if (tabs[i].onmouseover == null) tabs[i].onmouseover = setOptionsOff;
                }
            }
        } else {
            for (i = 0; i < tabs.length; i++) {
                tabs[i].onmouseover = null;
            }
        }
    },

    CARD_COLORS: function (on) {
        if (on) {
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
        } else {
            $(".cardArea:contains('♣')").css("color", "");
            $(".cardArea:contains('♦')").css("color", "");
            $(".cardArea:contains('♣')").css("background-color", "white");
            $(".cardArea:contains('♦')").css("background-color", "white");
            $(".auctionBoxCellClass span:contains('♣')").css("color", "");
            $(".auctionBoxCellClass span:contains('♦')").css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')").css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')").css("background-color", "");
            $(".auctionBoxCellClass:contains('Rdbl')").css("color", "")
            $(".auctionBoxCellClass:contains('Rdbl')").css("background-color", "");
        }
    },

    DEAL_TOOLBAR_RIGHT: function () {
        var nd = getNavDiv();
        if (nd != null) {
            var dt = nd.querySelector('.dealViewerToolbarClass');
            if (dt != null) {
                var cc = nd.querySelector('.coverClass');
                if (cc != null) {
                    cc.style.left = '0px';
                    var ds = nd.querySelector('.dealScreenDivClass');
                    if (ds != null) {
                        dt.style.left = ($(cc).width() + 4) + 'px';
                    }
                }
            }
        }
    },

    REMOVE_ICONS_FROM_TABS: function () {
        $(".verticalClass mat-icon").remove()
        $(".area-label").css("font-weight", "bold");
    },

    LARGE_BIDDING_BOX: function (on) {
        if (getPartnerHand() != '') return;
        if (on) {
            if (biddingBoxDisplayed) {
                if (auctionBoxDisplayed) {
                    var elAuctionBox = getAuctionBox();
                    elAuctionBox.style.height = '40%';
                    elAuctionBox.style.top = '0px';
                }
                var elBiddingBox = document.querySelector(".biddingBoxClass");
                var elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
                elBiddingBox.style.top = '40%';
                elBiddingBox.style.left = '0px';
                elBiddingBox.style.height = '35%';
                elBiddingBox.style.width = '100%';
                for (var i = 0; i < 17; i++) {
                    elBiddingButtons[i].style.height = '30%';
                    if (i < 12) elBiddingButtons[i].style.fontSize = '8vh';
                    elBiddingButtons[i].style.width = '8%';
                }
                elBiddingButtons[0].style.left = '15%';
                elBiddingButtons[1].style.left = '25%';
                elBiddingButtons[2].style.left = '35%';
                elBiddingButtons[3].style.left = '45%';
                elBiddingButtons[4].style.left = '55%';
                elBiddingButtons[5].style.left = '65%';
                elBiddingButtons[6].style.left = '75%';
                elBiddingButtons[7].style.left = '20%';
                elBiddingButtons[8].style.left = '30%';
                elBiddingButtons[9].style.left = '40%';
                elBiddingButtons[10].style.left = '50%';
                elBiddingButtons[11].style.left = '60%';
                elBiddingButtons[11].style.width = '18%';
                elBiddingButtons[7].style.top = '40%';
                elBiddingButtons[8].style.top = '40%';
                elBiddingButtons[9].style.top = '40%';
                elBiddingButtons[10].style.top = '40%';
                elBiddingButtons[11].style.top = '40%';
                elBiddingButtons[13].style.top = '33%';
                elBiddingButtons[14].style.top = '33%';
                elBiddingButtons[15].style.top = '65%';
                elBiddingButtons[16].style.left = '';
                elBiddingButtons[16].style.right = '4px';
            }
        }
    },

    NEW_OK_BUTTON: function () {
        if (callText.length == 2) {
            var txt = callText;
            var btok = $("bridge-screen bidding-box-button button")[16];
            var btnt = $("bridge-screen bidding-box-button button")[11];
            var btok_span = $("bridge-screen bidding-box-button span")[16];
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
                    $("bridge-screen bidding-box-button span")[16].style.color = "rgb(203, 0, 0)";
                }
                if (callText.slice(-1) == "H") {
                    txt = callText.charAt(0) + "♥";
                    $("bridge-screen bidding-box-button span")[16].style.color = "rgb(203, 0, 0)";
                }
                if (callText.slice(-1) == "S") txt = callText.charAt(0) + "♠";
            }
            $("bridge-screen bidding-box-button span")[16].textContent = elimineSpaces(txt);
        }
    }
};
