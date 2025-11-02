(function () {
	function hand2PBN(t) {
	// reverse string
		var n = replaceSuitSymbols(t, "").split("").reverse().join("");
		var s = n.substring(n.indexOf("S"),n.lastIndexOf("S")+2).replaceAll(/[SHDC]/g,"");
		var h = n.substring(n.indexOf("H"),n.lastIndexOf("H")+2).replaceAll(/[SHDC]/g,"");
		var d = n.substring(n.indexOf("D"),n.lastIndexOf("D")+2).replaceAll(/[SHDC]/g,"");
		var c = n.substring(n.indexOf("C"),n.lastIndexOf("C")+2).replaceAll(/[SHDC]/g,"");
		return `${s}.${h}.${d}.${c}`
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
				if (cfg.max_deals < 1) {
					if (confirm("Press OK to copy data to the clipboard")) {
						writeToClipboard(txt);
						return;
					}
				}
				var ctx = getContext();
				if (ctx.length < 8) return;
				if (!ctx.endsWith("------")) return;
				var dealer = "NESW".charAt((getDealNumber() - 1) % 4);
				var vul = areWeVulnerable()+areTheyVulnerable();
				if (vul == "@n@N") vul = "none";
				if (vul == "@v@N") vul = "NS";
				if (vul == "@n@V") vul = "EW";
				if (vul == "@v@V") vul = "All";
				setChatDestination("Table");
				var msg = `${getContext()},[Event "autoRedeal"]
				[Board "${getDealNumber()}"]
				[Dealer "${dealer}"]
				[Vulnerable "${vul}"]
				[Deal "N:${hand2PBN(getHandBySeat('N'))} ${hand2PBN(getHandBySeat('E'))} ${hand2PBN(getHandBySeat('S'))} ${hand2PBN(getHandBySeat('W'))}]`;
				msg = replaceSuitSymbols(msg, "");
				txt = txt+msg;
				console.log(msg);
//				setChatMessage(msg + "\\n", true);
				cfg.max_deals--;
				$(".redeal-button", PWD).click();
			})
		}
	});
})();
