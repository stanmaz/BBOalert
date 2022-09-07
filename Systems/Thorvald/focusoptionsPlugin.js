(function () {
    var title = "Options filter";
    var cfg = {};
    cfg.Enable_options_filter = false;
    addBBOalertEvent("onDataLoad", function () {
        console.log("----Register option filter Version 1.3");
        addConfigBox(title, cfg);
    });
    addBBOalertEvent("onBiddingBoxDisplayed", function () {
        console.log("----Enable_options_filter = " + cfg.Enable_options_filter);
        if (cfg.Enable_options_filter) {
            setTimeout(() => {
                filterOptions();
            }, 100);
        }
    });
    addBBOalertEvent("onBiddingBoxHidden", function () {
        console.log("----Bidding box hidden");
        setOptionsOff();
    });
    var findOptionByLabel = function (label) {
        return $('button').filter(function () {
            return $(this).text() == label;
        });
    };
    selectOptionsDisplay = function (ctx = "", opt = "", parent = "") {
        console.log("----Select options " + ctx + " " + opt);
        if (($('#bboalert-ds')[0].selectedIndex != 2) && (matchContext(ctx, stripContext(getContext())))) {
            setOptionsOn();
            $('#bttab-options')[0].click();
            if (parent == '') {
                $("button[id^='Option,']").hide(); $("button[id^='Option," + opt + "']").show();
            } else {
                var optx = findOptionByLabel(parent);
                if (optx.length == 0) return;
                if (optx[0].style.backgroundColor == "lightgreen") {
                    $("button[id^='Option," + opt + "']").attr("optionActive", true);
                    $("button[id^='Option," + opt + "']").show();
                } else {
                    $("button[id^='Option," + opt + "']").attr("optionActive", false);
                    $("button[id^='Option," + opt + "']").hide();
                }
            }
        }
    };
    filterOptions = function () {
        console.log("----Start filter");
        selectOptionsDisplay("1C", "vs_(1C)");
        selectOptionsDisplay("1D", "vs_(1D)");
        selectOptionsDisplay("1H", "vs_(1H)");
        selectOptionsDisplay("1S", "vs_(1S)");
        selectOptionsDisplay("2C", "vs_(2C)");
        selectOptionsDisplay("2D", "vs_(2D)");
        selectOptionsDisplay("2H", "vs_(2H)");
        selectOptionsDisplay("2S", "vs_(2S)");
        selectOptionsDisplay("2N", "vs_(2N)");
        selectOptionsDisplay("3C", "vs_(3C)");
        selectOptionsDisplay("3D", "vs_(3D)");
        selectOptionsDisplay("3H", "vs_(3H)");
        selectOptionsDisplay("4C", "vs_(4C)");
        selectOptionsDisplay("4D", "vs_(4D)");
        selectOptionsDisplay("1C--2C", "vs_(1C)-P-(2C)");
        selectOptionsDisplay("1D--1H", "vs_(1D)-P-(1H)");
        selectOptionsDisplay("1D--2D", "vs_(1D)-P-(2D)");
        selectOptionsDisplay("1H--3C", "vs_(1H)-P-(3C)");
        selectOptionsDisplay("1H--3H", "vs_(1H)-P-(3H)");
        selectOptionsDisplay("1S--3C", "vs_(1S)-P-(3C)");
        selectOptionsDisplay("1S--3D", "vs_(1S)-P-(3D)");
        selectOptionsDisplay("1S--3S", "vs_(1S)-P-(3S)");
        selectOptionsDisplay("1CDb", "vs_1C-(Db)");
        selectOptionsDisplay("1C1H", "vs_1C-(1H)");
        selectOptionsDisplay("1C1S", "vs_1C-(1S)");
        selectOptionsDisplay("1C1N", "vs_1C-(1N)");
        selectOptionsDisplay("1C2C", "vs_1C-(2C)");
        selectOptionsDisplay("1C2D", "vs_1C-(2D)");
        selectOptionsDisplay("1C2H", "vs_1C-(2H)");
        selectOptionsDisplay("1C2S", "vs_1C-(2S)");
        selectOptionsDisplay("1C2N", "vs_1C-(2N)");
        selectOptionsDisplay("1D2D", "vs_1D-(2D)");
        selectOptionsDisplay("1H2H", "vs_1H-(2H)");
        selectOptionsDisplay("1NDb", "vs_1N-(Db)");
        selectOptionsDisplay("1N2C", "vs_1N-(2C)");
        selectOptionsDisplay("1N2D", "vs_1N-(2D)");
        selectOptionsDisplay("1N2H", "vs_1N-(2H)");
        selectOptionsDisplay("1N2S", "vs_1N-(2S)");
    };    
})();
