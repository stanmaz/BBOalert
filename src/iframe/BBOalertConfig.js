function addConfigBox(label, cfg) {
    if (DEBUG) console.log(cfg.name);
    var configSelector = document.getElementById('bboalert-menu-config');
    if (configSelector == null) return null;
    var opt = new Option(label);
    var s = localStorage.getItem('BBOalertPlugin ' + label);
    if (s != null) {
        testobj1 = cfg;
        testobj2 = JSON.parse(s);
        $.extend(cfg, JSON.parse(s));
        testobj3 = cfg;
    }
    // Avoid duplication
    var exists = false;
    $("#bboalert-menu-config option").each(function (index) {
        if (index != 0) {
            if (DEBUG) console.log($(this).text() + " " + label);
            if ($(this).text() == label) {
                if (DEBUG) console.log("Exists " + label);
                exists = true;
            }
        }
    });
    if (exists) return null;
    if (DEBUG) console.log("Add " + label);
    opt.cfgObj = cfg;
    opt.cfgLabel = label;
    configSelector.add(opt);
    $("#bboalert-menu-config").show();
    return cfg;
}

function clearConfigMenu() {
    var configSelector = document.getElementById('bboalert-menu-config');
    for (var i = configSelector.options.length - 1; i > 0; i--) {
        configSelector.options[i].remove();
    }

    //    $("#bboalert-config-panel").hide();
//    $("#bboalert-menu-config").hide();
}

function setConfigBox(title, cfg) {
    if ((typeof cfg).toLowerCase() != 'object') return;
    var k = Object.keys(cfg);
    var v = Object.values(cfg);
    h = '<div id="dialog"><table>';
    for (let i = 0; i < v.length; i++) {
        t = '';
        if ((typeof (v[i])) == "boolean") {
            t = '"checkbox"';
            if (v[i] == true) t = t + ' checked';
        }
        if ((typeof (v[i])) == "number") {
            t = '"number" value=' + v[i];
        }
        if ((typeof (v[i])) == "string") {
            t = '"text" value="' + v[i] + '"';
        }
        if (t != '') h = h + '<tr><td>' + k[i].replace(/_/g, ' ') + ' :</td><td><input type=' + t + '></input></td></tr>';
    }
    h = h + '</table><button>Cancel</button><button>OK</button>';
    var d = document.createElement('DIV');
    d.innerHTML = h;
    d.style.fontSize = "small";
    var b = d.querySelectorAll("button");
    b[0].onclick = function () {
        clearInterval(ti);
        $("#adpanel0").show();
        $(d).dialog("destroy");
    };
    b[1].onclick = function () {
        var j = d.querySelectorAll('input');
        for (let i = 0; i < v.length; i++) {
            if ((typeof (v[i])) == "boolean") {
                eval('cfg.' + k[i] + '=' + j[i].checked);
            }
            if ((typeof (v[i])) == "number") {
                eval('cfg.' + k[i] + '=' + j[i].value);
            }
            if ((typeof (v[i])) == "string") {
                eval('cfg.' + k[i] + '="' + j[i].value + '"');
            }
        }
        localStorage.setItem('BBOalertPlugin ' + title, JSON.stringify(cfg));
        clearInterval(ti);
        $("#adpanel0").show()
        BBOalertEvents().dispatchEvent(E_onAnyMutation);
        $(d).dialog("destroy");
    };
    $("#adpanel0").hide();
    var ti = setInterval(function () {
        $(".ui-dialog").show();
    }, 100);
    $(d).dialog().css("font-size", "16px");
    $(d).dialog({
        title: title
    });
    $(d).dialog({
        width: "auto"
    });
    $(d).dialog({
        modal: true
    });
    $(".ui-button").remove();
}

function redrawTable() { }