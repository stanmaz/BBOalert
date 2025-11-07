(function () {
	console.log("PBN Capture version 1.0");
	function hand2PBN(t) {
		// reverse string
		var n = replaceSuitSymbols(t, "").split("").reverse().join("");
		var s = n.substring(n.indexOf("S"), n.lastIndexOf("S") + 2).replaceAll(/[SHDC]/g, "");
		var h = n.substring(n.indexOf("H"), n.lastIndexOf("H") + 2).replaceAll(/[SHDC]/g, "");
		var d = n.substring(n.indexOf("D"), n.lastIndexOf("D") + 2).replaceAll(/[SHDC]/g, "");
		var c = n.substring(n.indexOf("C"), n.lastIndexOf("C") + 2).replaceAll(/[SHDC]/g, "");
		return `${s}.${h}.${d}.${c}`
	}
	function getDealerSeatNr() {
		var d = $(".vulPanelDealerClass", PWD).first();
		if (d.width() == undefined) return "-1";
		if (d.width() > d.height()) {    // NS
			if (d.position().top == 0) return 0;
			return 2;
		} else {   // EW
			if (d.position().left == 0) return 3;
			return 1;
		}
	}
	function getDealerSeat() {
		var ah = $("auction-box-header-cell", PWD).text().replaceAll(" ", "").replaceAll("\n", "");
		return ah.charAt((getDealerSeatNr() + 1) % 4)
	}
	var title = "PBN capture and auto-redeal";
	var cfg = {};
	cfg.Enable_Log = false;
	cfg.Auto_redeals = 0;
	cfg.Export_PBN = false;
	cfg.Clear_Log = false;
	var EVENT_LOG = localStorage.getItem('PBNcapture');
	if (EVENT_LOG == null) EVENT_LOG = '';
	addBBOalertEvent("onDataLoad", function () {
		if (addConfigBox(title, cfg) != null) {
			cfg.Export_PBN = false;
			cfg.Clear_Log = false;
			addBBOalertEvent("onAnyMutation", function () {
				if (cfg.Export_PBN) {
					if (DEBUG) console.log("config = " + cfg);
					if (localStorage.getItem('PBNcapture') == null) return;
					if (localStorage.getItem('PBNcapture') == "") return;
					writeToClipboard(EVENT_LOG);
					downloadTextAsFile(EVENT_LOG, "BBOalertCapture.pbn");
					localStorage.setItem('PBNcapture', EVENT_LOG);
					bboalertLog(EVENT_LOG.split("\n").length + " log records exported to clipboard and\nto Downloads/BBOalertCapture.pbn file");
					cfg.Export_PBN = false;
				}
				if (cfg.Clear_Log) {
					if (localStorage.getItem('PBNcapture') == null) return;
					if (localStorage.getItem('PBNcapture') == "") return;
					if (confirm("Are you sure you want to clear log ?")) EVENT_LOG = '';
					cfg.Clear_Log = false;
					localStorage.setItem('PBNcapture', EVENT_LOG);
				}
			});
			addBBOalertEvent("onNewAuction", function () {
				if (!cfg.Enable_Log) return;
				var ctx = getContext();
				if (ctx.length < 8) return;
				if (!ctx.endsWith("------")) return;
				var dealer = getDealerSeat();
				var vul = areWeVulnerable() + areTheyVulnerable();
				if (vul == "@n@N") vul = "none";
				if (vul == "@v@N") vul = "NS";
				if (vul == "@n@V") vul = "EW";
				if (vul == "@v@V") vul = "All";
				var ctx = getContext();
				var auc = "";
				var auction = "";
				var contract = "--";
				var risk = "";
				while (ctx.length > 0) {
					var bid = ctx.substring(0, 2);
					if (bid != "--") {
						bid = bid.replaceAll("N", "NT");
						if (/[1234567][CDHSN]/.test(bid)) {
                            contract = bid;
                            risk = "";
                        }
						if (bid == "Db") risk = "X";
						if (bid == "Rd") risk = "XX";
					} else {
						bid = "pass";
					}
					bid = (bid + "        ").substring(0, 8);
					auc = auc + bid;
					if (auc.length >= 32) {
						auction = auction + auc.trim() + "\n";
						auc = "";
					}
					ctx = ctx.slice(2);
				}
				auction = auction + auc + "\n";
				var msg = `
[Event "autoCapture"]
[Board "${getDealNumber()}"]
[Dealer "${dealer}"]
[Vulnerable "${vul}"]
[Deal "N:${hand2PBN(getHandBySeat('N'))} ${hand2PBN(getHandBySeat('E'))} ${hand2PBN(getHandBySeat('S'))} ${hand2PBN(getHandBySeat('W'))}"]
[Contract "${contract}${risk}"]
[Auction "${dealer}"]
${auction}
`;
				EVENT_LOG = EVENT_LOG + msg;
				localStorage.setItem("PBNcapture", EVENT_LOG);
				console.log(msg);
				cfg.Auto_redeals--;
				if (cfg.Auto_redeals < 1) {
					cfg.Auto_redeals = 0;
					return;
				}
				$(".redeal-button", PWD).click();
			})
		}
	});
})();

