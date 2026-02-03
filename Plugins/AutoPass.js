(function () {
	console.log("AutoPass version 1.0");

	function clickPass() {
		try {
		getBiddingBoxButtons()[12].click();
		setTimeout(() => {
			getBiddingBoxButtons()[16].click();
		}, 100);
		getBiddingBoxButtons()[16].click();
		} catch {}
	}

	var title = "Automatic pass on teaching table";
	var cfg = {};
	cfg.West = false;
	cfg.North = false;
	cfg.East = false;
	cfg.South = false;
	addBBOalertEvent("onDataLoad", function () {
		if (addConfigBox(title, cfg) != null) {
			addBBOalertEvent("onNewActivePlayer", function () {
				var activePlayer = getActivePlayer();
				if (cfg.West && (activePlayer.charAt(0) == "W")) clickPass();
				if (cfg.North && (activePlayer.charAt(0) == "N")) clickPass();
				if (cfg.East && (activePlayer.charAt(0) == "E")) clickPass();
				if (cfg.South && (activePlayer.charAt(0) == "S")) clickPass();
			});
		}
	});
})();
