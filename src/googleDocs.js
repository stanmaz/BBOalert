if (window.location.href.startsWith("https://docs.google.com/"))
	if (window.location.href.endsWith("/pub")) {
		console.log('Google Drive HTML : ' + window.location.href);
		$("#banners").remove();
		$("#contents")[0].style.padding = "0px";
		$("#contents")[0].style.cursor = "pointer";
		let expand = true;
		try {
			expand = !($("p")[0].textContent == "no_expand");
		} catch {}
		if (expand) $("p,li").click(function (event) {
			toggleAlertList(this, event.ctrlKey);
		});
	}

    COLLAPSED_BG_COLOR = "yellow";
    COLLAPSED_TEXT_COLOR = "black";
    
    function toggleAlertList(el, expandTree) {
        function ulLevel(ul) {
            if (ul.tagName.toLowerCase() != "ul") return -1;
            try {
                return parseInt(ul.classList[1].split("-")[2]);
            } catch {
                return -1;
            }
        }
        var l = $("p,li");
        for (let i = 0; i < l.length; i++) {
            l[i].itemNr = i;
            l[i].level = ulLevel(l[i].parentNode);
        }
        var l0 = el.level;
        var l1 = l[el.itemNr + 1].level;
        //    if (l0 < 0) return;
        var treeVisible = $(l[el.itemNr + 1]).is(":visible");
        for (let i = el.itemNr + 1; i < l.length; i++) {
            if ((l[i].level <= l0) || i == (l.length - 1)) {
                for (let i = 0; i < l.length - 1; i++) {
                    if ($(l[i]).is(":visible") && $(l[i + 1]).is(":hidden")) {
                        $(l[i]).css("background-color", COLLAPSED_BG_COLOR);
                        $(l[i]).children().css("background-color", COLLAPSED_BG_COLOR);
                        //					l[i].style.color = COLLAPSED_TEXT_COLOR;
                    } else {
                        $(l[i]).css("background-color", "");
                        $(l[i]).children().css("background-color", "");
                    }
                }
                return false;
            }
            if (treeVisible) {
                if (l[i].level > l0) {
                    $(l[i]).hide();
                }
            } else {
                if ((l[i].level == l1) || expandTree) {
                    $(l[i]).show();
                }
            }
    
        }
    }
    
    