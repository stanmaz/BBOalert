console.log("IntoBridgeInit initialized");

function getAlert() {
	var fa = new BBOalertFind();
	var alertText = fa.findAlert(getContext(), getMyCall());
    if (DEBUG) console.log("alertText: " + alertText);
	trustedBid = fa.trustedBid;
	if (fa.alertedBid) setAlert(fa.alertedBid);
	alertHistoryMap.set(getContext() + callText, alertText);
	if (fa.deferredExplanation) {
		if (alertText != "") setAlert(true);
		alertText = "";
	}
	lastQueryContext = getContext();
	lastQueryCall = callText;
	alertText = execUserScript(alertText);
	var exp = alertText.split('#');
	lastQueryExplanation = normalize(exp[0]);
    setExplainText(exp[0]);
    /*
	var eventInput = new Event('input');
	if (elAlertExplain.value.trim() == '') {
		elAlertExplain.value = exp[0];
		elAlertExplain.dispatchEvent(new Event('input'));
	} else {
		saveAlert();
	}
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(new Event('input'));
	if (exp.length > 1) {
		setChatMessage(exp[1]);
		setTimeout(function () {
			if (!buttonOKvisible()) sendAlertChat();
		}, 500);
	} else {
		setChatMessage('');
	}*/
};



initGlobals();


