console.log("IntoBridgeInit initialized");

function getAlert() {
	setExplainText("");
	var fa = new BBOalertFind();
	var alertText = fa.findAlert(getContext(), getMyCall());
	if (DEBUG) console.log("alertText: " + alertText);
	trustedBid = fa.trustedBid;
	alertHistoryMap.set(getContext() + callText, alertText);
	lastQueryContext = getContext();
	lastQueryCall = callText;
	alertText = execUserScript(alertText);
	lastQueryExplanation = normalize(alertText);
	var exp = (alertText + "#").split('#');
	if (alertText.length > 42) {
		exp[1] = alertText;
		exp[0] = "See chat";
	}
	setExplainText(exp[0]);
	lastAlertChat = exp[1];
	lastQueryExplanation = normalize(exp[0]);
};



initGlobals();


