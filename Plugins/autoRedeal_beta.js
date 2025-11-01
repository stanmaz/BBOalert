(function () {
	var title = "Auto redeal at auction end";
	var cfg = {};
	cfg.Enable_redeal = false;
	cfg.max_deals = 64;
	addBBOalertEvent("onDataLoad", function () {
		if (addConfigBox(title, cfg) != null) {
			addBBOalertEvent("onNewAuction", function () {
				if (!cfg.Enable_redeal) return;
				if (cfg.max_deals < 1) return
				var ctx = getContext();
				if (ctx.length < 8) return;
				if (!ctx.endsWith("------")) return;
				setChatDestination("Table");
				var msg = `autoRedeal,${getContext()},${getHandBySeat('N')},${getHandBySeat('E')},${getHandBySeat('S')},${getHandBySeat('W')}`;
				console.log(msg);
				msg = replaceSuitSymbols(msg, "") + "\\n";
				setChatMessage(msg, true);
				cfg.max_deals--;
				$(".redeal-button", PWD).click();
			})
		}
	});
})();
