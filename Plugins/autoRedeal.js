(function () {
	var title = "Auto redeal";
	var cfg = {};
	cfg.Enable_redeal = false;
	cfg.max_deals = 64;
	addBBOalertEvent("onDataLoad", function () {
		if (addConfigBox(title, cfg) != null) {
			addBBOalertEvent("onNewAuction", function () {
				if (!cfg.Enable_redeal) return;
				if (getDealNumber() < cfg.max_deals) {
					var ctx = getContext();
					if ((ctx.length > 6) && ctx.endsWith("------")) $(".redeal-button", PWD).click();
				}
			});
		}
	});
})();

