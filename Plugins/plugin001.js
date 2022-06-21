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
    addBBOalertEvent("onDataLoad", function () {
        autoChatToOpponents();
    });
    autoChatToOpponents();

    addBBOalertEvent("onAnyMutation", function () {
        moveTableLeft(cfg.Move_table_left);
        removeIconsFromTabs();
    });
})();
