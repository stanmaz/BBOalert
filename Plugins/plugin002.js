(function () {
    var title = "Miscellaneous simple scripts";
    var cfg = {};
    cfg.Move_table_left = false;
    addBBOalertEvent("onDataLoad", function () {
        addConfigBox(title, cfg);
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
    addBBOalertEvent("onAnyMutation", function () {
        moveTableLeft(cfg.Move_table_left);
    });
})();