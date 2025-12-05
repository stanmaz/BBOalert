(function () {
	console.log("PBN Capture version 1.7.0.2");
	function hand2PBN(t) {
		// reverse string
		var n = replaceSuitSymbols(t, "").split("").reverse().join("");
		var s = n.substring(n.indexOf("S"), n.lastIndexOf("S") + 2).replaceAll(/[SHDC]/g, "");
		var h = n.substring(n.indexOf("H"), n.lastIndexOf("H") + 2).replaceAll(/[SHDC]/g, "");
		var d = n.substring(n.indexOf("D"), n.lastIndexOf("D") + 2).replaceAll(/[SHDC]/g, "");
		var c = n.substring(n.indexOf("C"), n.lastIndexOf("C") + 2).replaceAll(/[SHDC]/g, "");
		return `${s}.${h}.${d}.${c}`
	}
	function seatHandShape(seat) {
		var t = "";
		hand2PBN(getHandBySeat(seat)).split(".").forEach(((s) => { t = t + s.length }));
		return t;
	}
	function seatHCP(seat) {
		var hcp = 0;
		hand2PBN(getHandBySeat(seat)).split("").forEach(((s) => {
			hcp = hcp + "JQKA".indexOf(s) + 1;
		}));
		return hcp;
	}
	function seatTPC(seat) {
		// compute HCP
		var tpc = 0;
		hand2PBN(getHandBySeat(seat)).split("").forEach(((s) => {
			tpc = tpc + "JQKA".indexOf(s) + 1;
		}));
		// Add short suit points
		hand2PBN(getHandBySeat(seat)).split(".").forEach(((s) => {
			tpc = tpc + 3 - s.substring(0, 3).length;
		}));
		// Subtract if short suit contains at least one honnor
		hand2PBN(getHandBySeat(seat)).split(".").forEach(((s) => {
			if ((s.length < 3) && ("A" + s).match(/[QKA]/g).length > 1) tpc = tpc -1;
		}));
		return tpc;
	}
	function seatLTC(seat) {
		var ltc = 0;
		hand2PBN(getHandBySeat(seat)).split(".").forEach(((s) => {
			ltc = ltc + s.substring(0, 3).length - ("A" + s).match(/[QKA]/g).length + 1;
		}));
		return ltc;
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
	function renuùberBoards(txt) {
		t = txt.split("\n");
		var n = 1;
		for (let i = 0; i < t.length; i++) {
			if (t[i].startsWith("[Board")) {
				t[i] = `[Board "${n}"]`;
				n++;
			}
		}
		txt = t.join("\n");
		return txt;
	}
	var title = "PBN capture and auto-redeal";
	var cfg = {};
	cfg.Enable_Log = false;
	cfg.Auto_redeals = 0;
	cfg.Renumber_boards = false;
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
					bboalertLog("");
					cfg.Export_PBN = false;
					if (DEBUG) console.log("config = " + cfg);
					if (!localStorage.getItem('PBNcapture')) {
						bboalertLog("Nothing to export");
						return;
					}
					if (localStorage.getItem('PBNcapture') == "") return;
					writeToClipboard(EVENT_LOG);
					downloadTextAsFile(renuùberBoards(EVENT_LOG), "BBOalertCapture.pbn");
					localStorage.setItem('PBNcapture', EVENT_LOG);
					bboalertLog(EVENT_LOG.split("\n").length + " log records exported to clipboard and\nto Downloads/BBOalertCapture.pbn file");
				}
				if (cfg.Clear_Log) {
					cfg.Clear_Log = false;
					if (!localStorage.getItem('PBNcapture')) {
						bboalertLog("Log is empty");
						return;
					}
					if (confirm("Are you sure you want to clear log ?")) {
						EVENT_LOG = '';
						localStorage.setItem('PBNcapture', EVENT_LOG);
					}
				}
			});
			addBBOalertEvent("onNewAuction", function () {
				if (!cfg.Enable_Log) return;
				var ctx = getContext();
				if (ctx.length < 8) return;
				if (!ctx.endsWith("------")) return;
				var dealer = getDealerSeat();
				var vul = areWeVulnerable() + areTheyVulnerable();
				if (vul == "@n@N") vul = "None";
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
						if (bid == "Db") {
							risk = "X";
							bid = "X";
						}
						if (bid == "Rd") {
							risk = "XX";
							bid = "XX";
						}
					} else {
						bid = "Pass";
					}
					bid = (bid + "        ").substring(0, 8);
					auc = auc + bid;
					if (auc.length >= 32) {
						auction = auction + auc.trim() + "\n";
						auc = "";
					}
					ctx = ctx.slice(2);
				}
				var leader = getActivePlayer().substring(0, 1);
				var declarer = "?";
				switch (leader) {
					case "N": declarer = "W"; break;
					case "E": declarer = "N"; break;
					case "S": declarer = "E"; break;
					case "W": declarer = "S"; break;
				}
				auction = auction + auc + "\n";
				var msg = `
[Event "autoCapture"]
[Board "${getDealNumber()}"]
[West "${getPlayerAtSeat("W")}"]
[North "${getPlayerAtSeat("N")}"]
[East "${getPlayerAtSeat("E")}"]
[South "${getPlayerAtSeat("S")}"]
[Dealer "${dealer}"]
[Vulnerable "${vul}"]
[Deal "N:${hand2PBN(getHandBySeat('N'))} ${hand2PBN(getHandBySeat('E'))} ${hand2PBN(getHandBySeat('S'))} ${hand2PBN(getHandBySeat('W'))}"]
{Shape ${seatHandShape('N')} ${seatHandShape('E')} ${seatHandShape('S')} ${seatHandShape('W')}}
{HCP ${seatHCP('N')} ${seatHCP('E')} ${seatHCP('S')} ${seatHCP('W')}}
{TPC ${seatTPC('N')} ${seatTPC('E')} ${seatTPC('S')} ${seatTPC('W')}}
{Losers ${seatLTC('N')} ${seatLTC('E')} ${seatLTC('S')} ${seatLTC('W')}}
[Contract "${contract}${risk}"]
[Declarer "${declarer}"]
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

