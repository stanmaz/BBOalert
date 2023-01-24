// BBOalert,findAlert version 1
// Script,onDataLoad
function findAlert(context, call) {
	console.log("findAlert " +  context + " " + call);
	console.time("findalert");
	trustedBid = false;
	var trustedZone = false;
	var lastContext = "";
	var alertText = "";
	var txt = '';
	var matchFound = false;
	var symkey;
	var symval;
	var foundRecord = "";
	var rec;
	var originalRecord = "";
	if (document.getElementById('bboalert-ds').selectedIndex == 2) return "";
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		// Keyword Option alone end optional block
		if (txt == 'Trusted') trustedZone = true;
		if (txt == 'Untrusted') trustedZone = false;
		if (txt == 'Option') matchOption = true;
		rec = txt.split(",");		if (rec.length < 3) continue;
		rec[1] = elimineSpaces(rec[1].replace(/!/g, "").trim());
		var rec1old = rec[1];
		rec[1] = scan.replaceAliases(rec[1], "@B");
		rec[1] = execUserScript(rec[1]);
		var suffix = "";
		if (rec[1] == "") continue;
		if (rec[1] != "") {
			if (!matchContext(rec[1], call)) continue;
		} else {
			suffix = call; // if call field is empty then append the current call for matching
		}
		// replace map keys by values
		bidSymbolMap.forEach(function (values, keys) {
			rec[0] = rec[0].replaceAll(keys, values);
		});
		rec[0] = scan.replaceAliases(rec[0], "@C");
		rec[0] = elimineSpaces(rec[0].replace(/!/g, "").trim());
		currentContext = rec[0];
		if (currentContext == "+") {
			currentContext = lastContext;
		} else {
			lastContext = currentContext;
		}
		currentContext = execUserScript(scan.replaceAliases(currentContext, "C"));
		foundComment = "";
		if (matchContext(currentContext, stripContext(context) + suffix)) {
			matchFound = true;
			idx = alertTableCursor;
			alertText = scan.replaceAliases(rec[2], "E");
			trustedBid = trustedZone;
			foundContext = currentContext;
			foundCall = rec[1].trim();
			symkey = rec1old;
			symval = rec[1];
			if (rec.length > 3) foundComment = rec[3];
			foundRecord = rec.join(",");
			originalRecord = txt;
		}
		if (matchContext(currentContext, context + suffix)) {
			matchFound = true;
			alertText = scan.replaceAliases(rec[2], "E");
			trustedBid = trustedZone;
			foundContext = currentContext;
			foundCall = rec[1].trim();
			symkey = rec1old;
			symval = rec[1];
			if (rec.length > 3) foundComment = rec[3];
			foundRecord = rec.join(",");
			originalRecord = txt;
		}
	}
	if (alertText == "") return "";
	// if rec[1] contains a script, add symbol to the map
	if (symkey != symval) {
		bidSymbolMap.set(symkey, symval);
	}
	bidSymbolMap.set("alertText", alertText);
	bidSymbolMap.set("foundRecord", foundRecord);
	biddingHistory.set(foundRecord, originalRecord);
	// case of regex group of bids and multiple explanations
	if (foundCall.startsWith("("))
	if (foundCall.endsWith(")")) {
		let callList = foundCall.replaceAll("(", "").replaceAll(")", "").split("|");
		let expList = foundRecord.split(",");
		let idx = callList.indexOf(call);
		if ((idx != -1) && (idx <= expList.length-2)) alertText = expList[idx+2];
	}
	alertText = normalize(alertText);
	// Confirm bid id match not found
	if (!matchFound) trusteBid = false;
	alertText = updateAlertText(alertText);
	addLog('find:[' + getDealNumber() + '|' + mySeat() + '|' + areWeVulnerable() + '|' + ourVulnerability() + '|' + getSeatNr() +
		'|' + context + '|' + call + '|' + matchFound + '|' + alertText + '|' + trustedBid + ']');
	console.timeEnd("findalert");
	return alertText;
}
//Script
