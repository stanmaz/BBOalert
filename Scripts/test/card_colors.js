//BBOalert
//Script,onDataLoad
(function () {
    // Default configuration
    var title = "Modified colors";
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
            $(".auctionBoxCellClass:contains('Dbl')").css("color", "");
            $(".auctionBoxCellClass:contains('Dbl')").css("background-color", "");
            $(".auctionBoxCellClass:contains('Rdbl')").css("color", "")
            $(".auctionBoxCellClass:contains('Rdbl')").css("background-color", "");
        }
    }
    addBBOalertEvent("onAnyMutation", updateColors);
    // End of user script code
})();
//Script
