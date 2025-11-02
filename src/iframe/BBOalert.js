


if (window.location.href.startsWith("https://www.dropbox.com/")) {
	var lst = 'Dropbox\n';
	var links = document.querySelectorAll("a.sl-link--file");
	for (var i = 0; i < links.length; i++) {
		lst = lst + links[i].href + '\n';
	}
	lst = lst + 'End\n';
	writeToClipboard(lst);
	window.close();
}

if (window.location.href.startsWith("https://docs.google.com/"))
	if (window.location.href.endsWith("/pub")) {
		$("#banners").remove();
		$("#contents")[0].style.padding = "0px";
		$("#contents")[0].style.cursor = "pointer";
		let expand = true;
		try {
			expand = !($("p")[0].textContent == "no_expand");
		} catch { }
		if (expand) $("p,li").click(function (event) {
			toggleAlertList(this, event.ctrlKey);
		});
	}


/**
 * @ignore
 */
function saveAlertTableToClipboard() {
	var txt = '';
	if (alertTable.length < 2) return;
	for (i = 1; i < alertTable.length; i++) {
		txt = txt + alertTable[i] + '\n';
	}
	//	writeToClipboard(txt);
	localStorage.setItem('BBOalertCache', alertOriginal);
}

/**
 * @ignore
 */
function exportAlertData() {
	var txt = '';
	if (alertTable.length < 2) return;
	for (i = 0; i < alertTable.length; i++) {
		txt = txt + alertTable[i] + '\n';
	}
	writeToClipboard(txt);
	localStorage.setItem('BBOalertCache', alertOriginal);
	bboalertLog(version + "<br>" + getBBOalertHeaderMsg() + alertTable.length + " records exported to clipboard");
}

/**
 * @ignore
 */
function exportOriginalData() {
	writeToClipboard(alertOriginal);
	localStorage.setItem('BBOalertCache', alertOriginal);
	bboalertLog(version + " Original data exported to clipboard");
}

/**
 * @ignore
 */
function importClipboardData() {
	getClipboardData(true);
}

/**
 * @ignore
 */
function appendClipboardData() {
	getClipboardData(false);
}

function clearData() {
	if (confirm("Are you sure you want to clear data ?")) {
		updateText = "";
		updateCount = 0;
		alertData = 'BBOalert\n';
		alertOriginal = alertData;
		bboalertLog("Reading data");
		bboalertLog(version + "<br>Clearing data<br>");
		setTimeout(() => {
			updateAlertDataAsync(alertOriginal, function () {
				if (alertData == null) alertData = 'BBOalert\n';
				alertTable = alertData.split("\n");
				saveAlertTableToClipboard();
				processTable();
				displayHeaders();
				addBBOalertLog("<br>" + alertTable.length + " records imported");
				setTimeout(function () {
					setOptions(true);
				}, 200);
			});
		}, 1000);
	}
}

/**
 * @ignore
 */
function getDataType(data) {
	if (data.startsWith("Import,")) return 'BBOalert';
	header = data.slice(0, 80);
	if (header.startsWith("https://")) return "URL";
	if (header.search(/bboalert/i) != -1) return 'BBOalert';
	if (header.indexOf('*00') != -1) return 'BSS';
	if (header.indexOf('?00') != -1) return 'BSS';
	return '';
}

/**
 * @ignore
 */
function setScriptList() {
	scriptList = [];
	var txt = '';
	var scriptText = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		var rec = txt.split(",");
		if ((rec[0].trim() == 'Script') || (rec[0].trim() == '//Script')) {
			if (scriptText != '') {
				scriptList.push(scriptText);
				scriptText = '';
				scan.trimOn = true;
			}
			if (rec.length == 2) {
				scan.trimOn = false;
				scriptText = txt + ',';
			}
			if (rec.length > 2) {
				scriptList.push(txt);
				scan.trimOn = true;
			}
		} else {
			if (scriptText != '') scriptText = scriptText + "\n" + txt;
		}
	}
}

function displayHeaders() {
	var txt = '';
	var scriptText = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextLine()) != null) {
		var rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim().toLowerCase().endsWith('bboalert')) {
				if (rec[0].trim() != '') addBBOalertLog('<br>' + rec[1].trim());
			}
		}
	}
}

/**
 * @ignore
 */
function loadJavascript() {
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		var rec = txt.split(",");
		if ((rec[0].trim() == 'Javascript') || (rec[0].trim() == '//Javascript')) {
			loadJS(rec[1].trim());
		}
	}
}

/**
 * retrieve script text by script name
 */
function getScript(scriptName) {
	var scriptText = '';
	for (var i = 0; i < scriptList.length; i++) {
		var txt = scriptList[i];
		var rec = txt.split(",");
		if (rec[1].trim() == scriptName) {
			scriptText += txt.slice(txt.indexOf(',', txt.indexOf(',') + 1) + 1);
		}

	}
	return scriptText;
}


/**
 * @ignore
 */
function setOptionsSelector() {
	clearOptionsSelector();
	alertTableCursor = 0;
	var txt = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextLine()) != null) {
		rec = txt.split(",");
		if (rec[0].trim() == 'Option') {
			if (rec.length > 2) {
				for (var j = 2; j < rec.length; j++) {
					addOptionsSelectorOption(rec[j].trim());
				}
			}
		}
	}

}

/**
 * @ignore
 */
function setShortcutButtons() {
	var txt = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Button') {
				addShortcutButton(txt);
			}
		}
	}
	txt = '';
	scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Shortcut') {
				addShortcutButton(txt + ',width=25%');
			}
		}
	}
}

/**
 * @ignore
 */
function setOptionButtons() {
	var txt = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextLine()) != null) {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Option') {
				addOptionButton(txt);
			}
		}
	}
}

/**
 * @ignore
 */
function processTable() {
	clearOptionButtons();
	setOptionButtons();
	setOptionsSelector();
	initOptionDefaults();
	hideUnusedOptions();
	clearShortcutButtons();
	setShortcutButtons();
	//	loadJavascript();
	setScriptList();
	saveAlertTableToClipboard();
	hover_bboalert();
	execUserScript('%onDataLoad%');
	BBOalertEvents().dispatchEvent(E_onDataLoad);
	setParentBBOalertData(alertOriginal);
	bidSymbolMap.clear();
}

function setParentBBOalertData(text) {
	if (window.parent.document.getElementById("BBOalertOriginal") == null) {
		var d = document.createElement("data");
		d.id = "BBOalertOriginal";
		window.parent.document.body.appendChild(d);
	}
	d = window.parent.document.getElementById("BBOalertOriginal");
	d.value = text;
}

function makeAlertData() {
	setOptions(true);
	bboalertLog("Reading data");
	bboalertLog(version + "<br>Reading data<br>");
	setTimeout(() => {
		updateAlertDataAsync(alertOriginal, function () {
			if (alertData == null) alertData = 'BBOalert\n';
			alertTable = alertData.split("\n");
			saveAlertTableToClipboard();
			processTable();
			displayHeaders();
			addBBOalertLog("<br>" + alertTable.length + " records imported");
			setTimeout(function () {
				setOptions(true);
			}, 200);
		});
	}, 1000);
}

var importedURL = "";
/**
 * @ignore
 */
function getClipboardData(newData) {
	navigator.clipboard.readText().then((cbd) => {
		var cbData = cbd;
		importedURL = "";
		if (getDataType(cbData) == 'URL') {
			importedURL = cbData.split("\n")[0].trim();
			cbData = "BBOalert\nImport," + cbd;
		}
		if (getDataType(cbData) == '') {
			bboalertLog(version + '<br>no valid data found in clipboard');
			return;
		}
		if ((getDataType(cbData) == 'BSS') && !newData) {
			bboalertLog(version + '<br>can not append BSS formatted data');
			return;
		}
		if (!cbData.endsWith("\n")) cbData = cbData + "\n";
		if (newData) {
			readNewData(cbData);
		} else {
			alertOriginal = alertOriginal + cbData;
			//			alertOriginal = alertData;
			bboalertLog("Reading data");
			bboalertLog(version + "<br>Reading data<br>");
			setTimeout(() => {
				updateAlertDataAsync(alertOriginal, function () {
					if (alertData == null) alertData = 'BBOalert\n';
					alertTable = alertData.split("\n");
					saveAlertTableToClipboard();
					processTable();
					displayHeaders();
					addBBOalertLog("<br>" + alertTable.length + " records imported");
					setTimeout(function () {
						setOptions(true);
					}, 200);
				});
			}, 1000);
		}
		clearOptionButtons();
		if (getDataType(cbData) == 'BBOalert') { } else {
			lvls = "1234567";
			suits = "CDHSN";
			alertTable = alertData.split("\n");
			alertOriginal = alertData;
			alertTable.sort();
			optionPrefix = 'Opening';
			option = '00';
			for (var i = 1; i < alertTable.length; i++) {
				ctx = '';
				r = alertTable[i];
				if (r.startsWith('%'))
					continue;
				theyOpen = false;
				if (r.startsWith('*')) {
					theyOpen = true;
					r = r.slice(1);
				}
				if (!r.startsWith(option)) {
					if (r.startsWith('*')) {
						option = r.slice(1, 3);
						optionPrefix = 'Overcall';
					} else {
						option = r.slice(0, 2);
						optionPrefix = 'Opening';
					}
					if (decodeOption(option) != '') {
						updateText = updateText + 'Option,' + optionPrefix + '_' + decodeOption(option) + '\n';
					} else {
						updateText = updateText + 'Option\n';
					}
				}
				rec = r.split("=");
				if (rec.length < 2)
					continue;
				if (rec[0].length < 4)
					continue;
				if (rec[1].length < 9)
					continue;
				for (var j = 2; j < rec[0].length; j++) {
					c1 = rec[0].charAt(j);
					if (lvls.indexOf(c1) != -1) {
						c2 = rec[0].charAt(j + 1);
						ctx = ctx + c1 + c2;
						j++;
					} else {
						if (c1 == "P")
							ctx = ctx + "--";
						if (c1 == "D")
							ctx = ctx + "Db";
						if (c1 == "R")
							ctx = ctx + "Rd";
					}
				}
				badRec = false;
				if (theyOpen) {
					if (ctx.length < 4) {
						badRec = true;
					}
					if ((ctx.length / 2) % 2 == 1) {
						badRec = true;
					}
				}
				ctx = ctx.slice(0, ctx.length - 2) + "," + ctx.slice(ctx.length - 2);
				if (!r.startsWith('00') && !r.startsWith('*00'))
					badrec = true;
				if (badRec)
					ctx = 'Error ' + alertTable[i] + "|" + ctx;
				n = 10;
				if (ctx.endsWith("N"))
					n = 8;
				if (ctx.endsWith("--"))
					n = 7;
				if (ctx.endsWith("Db"))
					n = 7;
				if (ctx.endsWith("Rd"))
					n = 7;
				exp = rec[1].slice(n);
				exp = exp.split(',').join(';');
				if (exp.length > 69) {
					exp = "Please read chat" + "#" + exp;
				}
				alertTable[i] = ctx + "," + exp;
				updateText = updateText + alertTable[i] + "\n";
				updateCount++;
			}
			updateText = updateText + 'Option\n';
			alertTable = updateText.split("\n");
			for (var i = 0; i < alertTable.length; i++) {
				rec = alertTable[i].split(",");
				if (rec.length > 1) {
					if (rec[0].trim() == 'Option') {
						addOptionButton(alertTable[i]);
					}
				}
			}
			alertData = updateText;
			alertOriginal = alertData;
			processTable();
			bboalertLog(version + "<br>" + alertTable.length + " BSS records imported");
			updateText = "";
			updateCount = 0;
		}
		return;
	});
}

function readNewData(cbData) {
	updateText = "";
	updateCount = 0;
	alertData = cbData;
	alertOriginal = alertData;
	if (getDataType(cbData) == 'BBOalert') {
		bboalertLog("Reading data");
		bboalertLog(version + "<br>Reading data<br>");
		setTimeout(() => {
			updateAlertDataAsync(alertOriginal, function () {
				if (alertData == null) alertData = 'BBOalert\n';
				alertTable = alertData.split("\n");
				saveAlertTableToClipboard();
				processTable();
				displayHeaders();
				addBBOalertLog("<br>" + alertTable.length + " records imported");
				setTimeout(function () {
					setOptions(true);
				}, 200);
			});
		}, 1000);
	}
}
/**
 * @ignore
 */
function exportUpdateData() {
	if (updateCount == 0) {
		bboalertLog(version + "<br>no new records to export");
		return;
	}
	writeToClipboard(updateText);
	bboalertLog(version + "<br>" + getBBOalertHeaderMsg() + updateCount + " new records exported to clipboard");
}

var trustedBid = false;
var foundContext = '';
var foundCall = '';


/**
 * retrieve alert text for given context and call
 */
function findAlertText(context, call) {
	var fa = new BBOalertFind();
	var alertText = fa.findAlert(context, call);
	return alertText;
}

function updateAlertText(alertText) {
	var newAlertText = execUserScript("%onFindAlertText%");
	if (newAlertText != "%onFindAlertText%") return newAlertText;
	else return execUserScript(alertText);
}


/**
 * @ignore
 */
function findAlert(context, call) {
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
	if (document.getElementById('bboalert-ds').selectedIndex == 2) return "";
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		// Keyword Option alone end optional block
		if (txt == 'Trusted') trustedZone = true;
		if (txt == 'Untrusted') trustedZone = false;
		if (txt == 'Option') matchOption = true;
		rec = txt.split(",");
		if (rec.length < 3) continue;
		recTemp = rec;
		rec[1] = elimineSpaces(rec[1].replace(/!/g, "").trim());
		var rec1old = rec[1];
		rec[1] = scan.replaceAliases(rec[1], "@B");
		rec[1] = execUserScript(rec[1]);
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
		var suffix = "";
		if (rec[1] == "") continue;
		if (rec[1] != "") {
			if (!matchContext(rec[1], call)) continue;
		} else {
			suffix = call; // if call field is empty then append the current call for matching
		}
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
		}
	}
	// if rec[1] contains a script, add symbol to the map
	if (symkey != symval) {
		bidSymbolMap.set(symkey, symval);
	}
	// case of regex group of bids and multiple explanations
	if (foundCall.startsWith("("))
		if (foundCall.endsWith(")")) {
			let callList = foundCall.replaceAll("(", "").replaceAll(")", "").split("|");
			let expList = foundRecord.split(",").slice(2);
			let idx = callList.indexOf(call);
			if (idx != -1) {
				if (idx < expList.length - 1) alertText = expList[idx]
				else alertText = expList[expList.length - 1];
			}
		}
	alertText = normalize(alertText);
	// Confirm bid id match not found
	if (!matchFound) trusteBid = false;
	alertText = updateAlertText(alertText);
	addLog('find:[' + getDealNumber() + '|' + mySeat() + '|' + areWeVulnerable() + '|' + ourVulnerability() + '|' + getSeatNr() +
		'|' + context + '|' + call + '|' + matchFound + '|' + alertText + '|' + trustedBid + ']');
	console.timeEnd("findalert");
	if (isSettingON(6)) return "";
	return alertText;
}

/**
 * @ignore
 */
function findShortcut(text) {
	var idx = -1;
	var expandedText = text;
	var alertTableCursor = 0;
	var txt = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		rec = txt.split(",");
		if (rec.length < 3) continue;
		if (rec[0].trim() != 'Shortcut') continue;
		if (rec[1].trim() == '') continue;
		if (!text.endsWith(rec[1].trim())) continue;
		short = rec[1].trim();
		long = rec[2].trim();
		expandedText = text.slice(0, -short.length) + long;
		return replaceSuitSymbols(execUserScript(expandedText), "!");
	}
	return replaceSuitSymbols(execUserScript(expandedText), "!");
}

function inputOnFocus() {
	$("#bttab-buttons").click();
}

function inputOnBlur() {
	if (this.openTab == "data") $("#bttab-bboalert")[0].click();
	if (this.openTab == "data") $("#bttab-options")[0].click();
	if (this.openTab == "info") $("#bttab-info")[0].click();
}

/**
 * @ignore
 */
function inputOnKeyup(key) {
	var text1 = this.value;
	var text1a = text1.slice(0, this.selectionStart);
	var text1b = text1.slice(this.selectionStart, text1.length);
	if (key.altKey) {
		text1a = text1a + 'Alt' + key.key.toUpperCase();
		text2 = findShortcut(text1a) + text1b;
		if (text1 != text2) {
			setInputMessage(text2, false, this);
			this.focus();
			this.selectionStart = text2.length - text1b.length;
			this.selectionEnd = text2.length - text1b.length;
		}
	}
}

function inputChanged() {
	var text1 = this.value;
	var text1a = text1.slice(0, this.selectionStart);
	var text1b = text1.slice(this.selectionStart, text1.length);
	text2 = findShortcut(text1a) + text1b;
	if (text1 != text2) {
		setInputMessage(text2, false, this);
		this.focus();
		this.selectionStart = text2.length - text1b.length;
		this.selectionEnd = text2.length - text1b.length;
	}
	if (this == getExplainInput()) lastUserExplanation = this.value;
}


/**
 * @ignore
 */
function messageOnKeyup(key) {
	var elMessage = getVisibleMessageInput();
	if (elMessage == undefined) return;
	text1 = elMessage.value;
	if (key.altKey) {
		text1 = text1 + 'Alt' + key.key.toUpperCase();
	}
	text2 = findShortcut(text1);
	if (text1 != text2) {
		setChatMessage(text2, true);
	}
}

/**
 * @ignore
 */
function explainOnKeyup(key) {
	var elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	text1 = elAlertExplain.value;
	if (key.altKey) {
		text1 = text1 + 'Alt' + key.key.toUpperCase();
	}
	text2 = findShortcut(text1);
	if (text1 != text2) {
		elAlertExplain.value = text2;
		var eventInput = new Event('input');
		elAlertExplain.dispatchEvent(eventInput);
	}
}

/**
 * @ignore
 */
function explainCallOnKeyup(key) {
	var ecc = getExplainCallBox();
	var elAlertExplain = ecc.querySelector('input');
	if (elAlertExplain == null) return;
	text1 = elAlertExplain.value;
	if (key.altKey) {
		text1 = text1 + 'Alt' + key.key.toUpperCase();
	}
	text2 = findShortcut(text1);
	if (text1 != text2) {
		elAlertExplain.value = text2;
		var eventInput = new Event('input');
		elAlertExplain.dispatchEvent(eventInput);
	}
}


/**
 * @ignore
 */
function execUserScript(txt) {
	var rec = txt.split('%');
	if (rec.length < 2) return txt;
	var txt1 = '';
	var script;
	for (var i = 0; i < rec.length; i++) {
		if (i % 2 == 0) {
			txt1 = txt1 + rec[i];
		} else {
			script = getScript(rec[i]);
			if (script != '') {
				txt1 = txt1 + userScript(script, foundContext, getContext(), foundCall, callText);
			} else {
				txt1 = txt1 + "%" + rec[i];
				if (i < rec.length - 1) txt1 = txt1 + "%";
			}
		}
	}
	return txt1;
}

lastQueryContext = "";
/**
 * @ignore
 */
function getAlert() {
	if (buttonOKvisible()) clearAlert();
	var elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	var fa = new BBOalertFind();
	var alertText = fa.findAlert(getContext(), callText);
	trustedBid = fa.trustedBid;
	if(fa.alertedBid) setAlert(fa.alertedBid);
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
	}
};

/**
 * @ignore
 */
function saveAlert() {
	var explainText = normalize(lastUserExplanation);
	lastUserExplanation = "";
	if (isSettingON(5)) return;
	if (!recordNewAlerts) return;
	if (explainText == "") return;
	if (explainText != lastQueryExplanation) {
		var newrec = stripContext(lastQueryContext) + "," + lastQueryCall + "," + explainText;
		newrec = newrec + "," + getNow() + " Deal " + getDealNumber() + " " + myPartner();
		addLog('save:[' + getDealNumber() + '|' + areWeVulnerable() + '|' + getSeatNr() + '|' + stripContext(getContext()) + '|' + callText + '|' + explainText + ']');
		alertTable.push(newrec);
		updateText = updateText + newrec + '\n';
		alertData = alertData + newrec + '\n';
		alertOriginal = alertOriginal + newrec + '\n';
		updateCount++;
		saveAlertTableToClipboard();
	}
};

/**
 * @ignore
 */
function savePostMortem() {
	var nd = getNavDiv();
	if (nd == null) return;
	var ec = nd.querySelector('.explainCallClass');
	if (ec == null) return;
	var hd = ec.querySelector('.headingClass').textContent.split(' ');
	var cl = hd[hd.length - 1];
	cl = translateCall(cl);
	ct = getContext();
	var n = ct.search(cl);
	if (n == -1) return;
	ct = ct.slice(0, n);
	var newrec = stripContext(ct) + "," + cl + "," + ec.querySelector('input').value;
	newrec = newrec + "," + getNow() + " Deal " + getDealNumber();
	alertTable.push(newrec);
	updateText = updateText + newrec + '\n';
	alertData = alertData + newrec + '\n';
	alertOriginal = alertOriginal + newrec + '\n';
	updateCount++;
	saveAlertTableToClipboard();
}

/**
 * @ignore
 */
function setPostMortem() {
	var nd = getNavDiv();
	if (nd == null) return;
	var ec = nd.querySelector('.explainCallClass');
	if (ec == null) return;
	var ok = ec.querySelector('button');
	if (ok == null) return;
	if (ok.onclick == null) ok.onclick = savePostMortem;
}

