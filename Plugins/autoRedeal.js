(function () {
	console.log("autoRedeal version 1.2");
	function hand2PBN(t) {
	// reverse string
		var n = replaceSuitSymbols(t, "").split("").reverse().join("");
		var s = n.substring(n.indexOf("S"),n.lastIndexOf("S")+2).replaceAll(/[SHDC]/g,"");
		var h = n.substring(n.indexOf("H"),n.lastIndexOf("H")+2).replaceAll(/[SHDC]/g,"");
		var d = n.substring(n.indexOf("D"),n.lastIndexOf("D")+2).replaceAll(/[SHDC]/g,"");
		var c = n.substring(n.indexOf("C"),n.lastIndexOf("C")+2).replaceAll(/[SHDC]/g,"");
		return `${s}.${h}.${d}.${c}`
	}
	function getDealerSeat() {
    	var d =$(".vulPanelDealerClass", PWD).first();
    	if (d.width() == undefined) return "";
    	if (d.width() > d.height()) {    // NS
        	if (d.position().top == 0) return "N";
        	return "S";
    	} else {   // EW
        	if (d.position().left == 0) return "W";
        return "E";
    	}
	}
	var title = "Auto redeal at auction end";
	var cfg = {};
	cfg.Enable_redeal = false;
	cfg.max_deals = 64;
	var txt = "";
	addBBOalertEvent("onDataLoad", function () {
		if (addConfigBox(title, cfg) != null) {
			addBBOalertEvent("onNewAuction", function () {
				if (!cfg.Enable_redeal) return;
				var ctx = getContext();
				if (ctx.length < 8) return;
				if (!ctx.endsWith("------")) return;
				var dealer = getDealerSeat();
				var vul = areWeVulnerable()+areTheyVulnerable();
				if (vul == "@n@N") vul = "none";
				if (vul == "@v@N") vul = "NS";
				if (vul == "@n@V") vul = "EW";
				if (vul == "@v@V") vul = "All";
				var ctx = getContext();
				var auc = "";
				var auction = "";
				while (ctx.length > 0) {
    				var bid = ctx.substring(0, 2);
    				auc = auc + bid + "      ";
    				if (auc.length == 32) {
        				auction = auction + auc + "\n";
        				auc = "";
    				}
    			ctx = ctx.slice(2);
				}
				auction = auction + auc + "\n";
				auction = auction.replaceAll("Db", "X ").replaceAll("Rd", "XX").replaceAll("--  ", "Pass");
				setChatDestination("Table");
				var msg = `
[Event "autoRedeal"]
[Board "${getDealNumber()}"]
[Dealer "${dealer}"]
[Vulnerable "${vul}"]
[Deal "N:${hand2PBN(getHandBySeat('N'))} ${hand2PBN(getHandBySeat('E'))} ${hand2PBN(getHandBySeat('S'))} ${hand2PBN(getHandBySeat('W'))}]
[Auction "${dealer}"]
${auction}
`;
				msg = replaceSuitSymbols(msg, "");
				txt = txt+msg;
				localStorage.setItem("autoRedealLog",txt);
				console.log(msg);
//				setChatMessage(msg + "\\n", true);
				cfg.max_deals--;
				if (cfg.max_deals < 0) {
						return;
				}
				$(".redeal-button", PWD).click();
			})
		}
	});
})();
