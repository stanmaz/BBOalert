(function () {
	console.log("AutoPass version 1.0");

	var title = "Automatic pass on teaching table";
	var cfg = {};
	cfg.West = false;
	cfg.North = false;
	cfg.East = false;
	cfg.South = false;
	var EVENT_LOG = localStorage.getItem('PBNcapture');
	if (EVENT_LOG == null) EVENT_LOG = '';
	addBBOalertEvent("onDataLoad", function () {
		if (addConfigBox(title, cfg) != null) {
			addBBOalertEvent("onNewActivePlayer", function () {
				}
			});
		}
	});
})();
