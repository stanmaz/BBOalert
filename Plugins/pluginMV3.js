
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
            $(".cardArea:contains('♣')", window.parent.document).css("color", cfg.text_color_clubs);
            $(".cardArea:contains('♦')", window.parent.document).css("color", cfg.text_color_diamonds);
            $(".cardArea:contains('♥')", window.parent.document).css("color", cfg.text_color_hearts);
            $(".cardArea:contains('♠')", window.parent.document).css("color", cfg.text_color_spades);
            $(".cardArea:contains('♣')", window.parent.document).css("background-color", cfg.background_color_clubs);
            $(".cardArea:contains('♦')", window.parent.document).css("background-color", cfg.background_color_diamonds);
            $(".cardArea:contains('♥')", window.parent.document).css("background-color", cfg.background_color_hearts);
            $(".cardArea:contains('♠')", window.parent.document).css("background-color", cfg.background_color_spades);
            $(".auctionBoxCellClass span:contains('♣')", window.parent.document).css("color", cfg.text_color_clubs);
            $(".auctionBoxCellClass span:contains('♦')", window.parent.document).css("color", cfg.text_color_diamonds);
            $(".auctionBoxCellClass span:contains('♥')", window.parent.document).css("color", cfg.text_color_hearts);
            $(".auctionBoxCellClass span:contains('♠')", window.parent.document).css("color", cfg.text_color_spades);
            $(".biddingBoxClass span:contains('♣')", window.parent.document).css("color", cfg.text_color_clubs);
            $(".biddingBoxClass span:contains('♦')", window.parent.document).css("color", cfg.text_color_diamonds);
            $(".biddingBoxClass span:contains('♥')", window.parent.document).css("color", cfg.text_color_hearts);
            $(".biddingBoxClass span:contains('♠')", window.parent.document).css("color", cfg.text_color_spades);
            $(".auctionBoxCellClass:contains('Dbl')", window.parent.document).css("color", cfg.text_color_double);
            $(".auctionBoxCellClass:contains('Dbl')").css("background-color", cfg.background_color_double);
            $(".auctionBoxCellClass:contains('Rdbl')", window.parent.document).css("color", cfg.text_color_redouble);
            $(".auctionBoxCellClass:contains('Rdbl')", window.parent.document).css("background-color", cfg.background_color_redouble);
        } else {
            $(".cardArea:contains('♣')", window.parent.document).css("color", "black");
            $(".cardArea:contains('♦')", window.parent.document).css("color", "");
            $(".cardArea:contains('♥')", window.parent.document).css("color", "");
            $(".cardArea:contains('♠')", window.parent.document).css("color", "black");
            $(".cardArea:contains('♣')", window.parent.document).css("background-color", "");
            $(".cardArea:contains('♦')", window.parent.document).css("background-color", "");
            $(".cardArea:contains('♥')", window.parent.document).css("background-color", "");
            $(".cardArea:contains('♠')", window.parent.document).css("background-color", "");
            $(".auctionBoxCellClass span:contains('♣')", window.parent.document).css("color", "rgb(0, 0, 0)");
            $(".auctionBoxCellClass span:contains('♦')", window.parent.document).css("color", "rgb(203, 0, 0)");
            $(".auctionBoxCellClass span:contains('♥')", window.parent.document).css("color", "rgb(203, 0, 0)");
            $(".auctionBoxCellClass span:contains('♠')", window.parent.document).css("color", "rgb(0, 0, 0)");
            $(".biddingBoxClass span:contains('♣')", window.parent.document).css("color", "");
            $(".biddingBoxClass span:contains('♦')", window.parent.document).css("color", "");
            $(".biddingBoxClass span:contains('♥')", window.parent.document).css("color", "");
            $(".biddingBoxClass span:contains('♠')", window.parent.document).css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')", window.parent.document).css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')", window.parent.document).css("background-color", "");
            $(".auctionBoxCellClass:contains('Rdbl')", window.parent.document).css("color", "");
            $(".auctionBoxCellClass:contains('Rdbl')", window.parent.document).css("background-color", "");
        }
    }
    addBBOalertEvent("onAnyMutation", updateColors);
    // End of user script code
})();
