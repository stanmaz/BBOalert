/*
BBOalert dataBBOalert extension will :
- be activated at www.bridgebase.com startup
- During bidding, BBOalert checks if for the actual bidding context the call is defined as alerted.
  If yes, the explanation text is retrieved from the table and shown in the 'Explanation' text field
- Explanation can be modified by hand or a new explanation can be entered. In such a case the update text
  is stored in the clipboard

BBOalert allows to define in the table keyboard shortcuts which are automatically expanded during manual text entry
in 'Message' and 'Explanation' fields

*/

var eventClick = new Event('click');
var callText = "";
var updateText = "";
var updateCount = 0;
var cbData = "";
var alertData = "";
var alertTable = alertData.split("\n");
var scriptList = [];
var alertTableCursor = 0;
var clipBoard = navigator.clipboard;
var lastDealNumber = '';
//const DATABEGIN = '↔';
const DATABEGIN = '⬛';

console.log('Location : ', location.href);


function receiveMessageCC(event) {
	if (event.origin != 'https://www.bridgebase.com') return;
	if (event.data.length == 0) return;
	// BBOalert data is appended to the Carding field
	var tac = document.getElementById('carding');
	if (tac == null) return;
	var idb = tac.value.indexOf(DATABEGIN);
	if (idb == -1) idb = tac.value.length;
	tac.value = tac.value.slice(0, idb) + DATABEGIN + stringToCC(event.data);
	var eventInput = new Event('input');
	tac.dispatchEvent(eventInput);
	var sb = document.getElementById('saveButton');
	// Make document dirty to activate the 'Save' button
	var changeEvent = new Event('change');
	tac.dispatchEvent(changeEvent);
}

function receiveMessageBBO(event) {
	// Skip if message not coming from the CC page
	if (event.origin != 'https://webutil.bridgebase.com') return;
	// Send alert data to the CC page on import request 
	if (event.data == 'Import') {
		console.log('Sending from Location ' + window.location.href + ' To ' + event.origin + ' Data ' + alertData.length);
		event.source.postMessage(alertData, event.origin);
		// Otherwise the message from Convention Card page is considered BBOalert data
	} else {
		try {
			if (event.data.length == 0) return;
			alertData = event.data;
			alertTable = alertData.split("\n");
			bboalertLog(version + " : " + getBBOalertHeaderMsg() + alertTable.length + " records from CC");
			saveAlertTableToClipboard();
			processTable();
			setTimeout(function () {
				setOptions(true);
			}, 200);
		} catch {
			console.log('Error in event.data ' + event.data.length);
		}
	}

}

function BBOalert2CC() {
	window.parent.postMessage('Import', '*');
}

function CC2BBOalert() {
	tac = document.getElementById('carding');
	if (tac == null) return;
	var idb = tac.value.indexOf(DATABEGIN);
	if (idb == -1) return;
	window.parent.postMessage(CCtoString(tac.value.slice(idb + 1)), '*');
}


function addCCbuttons() {
	var md = document.getElementById('mainDiv');
	if (md == null) return;
	var ccd = document.getElementById('ccDiv');
	if (ccd == null) return;
	var bd = document.getElementById('buttonDiv');
	if (bd == null) return;
	var ccbboa = document.getElementById('bboalert-cc');
	if (ccbboa != null) return;
	var d = document.createElement('div');
	d.style.width = bd.style.width;
	d.style.height = '18px';
	//	d.style.backgroundColor = 'yellow';
	d.id = 'bboalert-cc';
	var bc1 = document.createElement("button");
	bc1.textContent = "Get from BBOalert";
	bc1.id = 'bboalert-c1';
	//	bc1.style.fontSize = "16px";
	bc1.style.height = '100%';
	bc1.onclick = BBOalert2CC;
	d.appendChild(bc1);
	var bc2 = document.createElement("button");
	bc2.textContent = "Send to BBOalert";
	bc2.id = 'bboalert-c2';
	//	bc2.style.fontSize = "16px";
	bc2.style.height = '100%';
	bc2.onclick = CC2BBOalert;
	d.appendChild(bc2);
	var sb = document.getElementById('saveButton');
	if (sb == null) return;
	md.insertBefore(d, ccd);
}

if (location.href.startsWith('https://webutil.bridgebase.com/v2/v2cc/v2cc.html')) {
	window.addEventListener("message", receiveMessageCC, false);
	console.log('Convention card');
	addCCbuttons();
} else if (location.href.startsWith('https://webutil.bridgebase.com/v2')) {
	console.log('Select convention card ');
	//	document.location.reload(true);
} else {
	window.addEventListener("message", receiveMessageBBO, false);
	var timerId = setInterval(() => setBiddingBox(), 1000);
}



function saveAlertTableToClipboard() {
	var txt = '';
	if (alertTable.length < 2) return;
	for (i = 1; i < alertTable.length; i++) {
		txt = txt + alertTable[i] + '\n';
	}
	//	writeToClipboard(txt);
	localStorage.setItem('BBOalertCache', alertData);
}

function exportAlertData() {
	var txt = '';
	if (alertTable.length < 2) return;
	for (i = 0; i < alertTable.length; i++) {
		txt = txt + alertTable[i] + '\n';
	}
	writeToClipboard(txt);
	localStorage.setItem('BBOalertCache', alertData);
	bboalertLog(version + " : " + getBBOalertHeaderMsg() + alertTable.length + " records exported to clipboard");
}

// Find the bidding box element and check if new data present in the clipboard
function setBiddingBox() {
	if (setUI()) {
		// complete initial setup
		alertData = localStorage.getItem('BBOalertCache');
		if (alertData == null) alertData = '';
		alertTable = alertData.split("\n");
		bboalertLog(version + " : " + getBBOalertHeaderMsg() + alertTable.length + " records from cache");
		saveAlertTableToClipboard();
		processTable();
		openAccountTab();
		setTimeout(function () {
			setOptions(true);
		}, 200);
	}
	if (isBBOready()) setPageReload();
	setInputClickEvents();
	setControlButtonEvents();
	setTabEvents();
	partnershipOptions();
	checkOptionsVulnerability();
	setOptionColors();
	var adPanel0 = document.getElementById("adpanel0");
	if (adPanel0 != null) {
		sc = document.querySelector('.statsClass');
		if (sc == null) setOptions(false);
	}
	if (isBBOready()) {
		setControlButtons();
		setStatTextDiv();
		var txt = '';
		if (!isSplitScreen()) {
			txt = 'BBOalert : set BBO to split screen mode (Account/Settings/Split Screen)';
			setStatText(txt);
		} else {
			setStatText('');
			if (confirmBidsSet() == '') {
				console.log('Confirm bids switch not found');
				openAccountTab();
				setTimeout(function () {
					setOptions(true);
				}, 200);
			}
		}
	}
	elMessage = getVisibleMessageInput();
	if (elMessage != null) {
		if (elMessage.onkeyup == null) elMessage.onkeyup = messageOnKeyup;
	}
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox != null) {
		if (getDealNumber() != lastDealNumber) {
			lastDealNumber = getDealNumber();
		}
		elAlertExplain = getExplainInput();
		if (elAlertExplain != null) {
			//			elAlertExplain.addEventListener('keyup', explainOnKeyup);
			if (elAlertExplain.onkeyup == null) elAlertExplain.onkeyup = explainOnKeyup;
		}
		elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
		if (elBiddingButtons != null) {
			setBiddingButtonEvents();
		}
	} else {
		elBiddingButtons = null;
	}
}

// Erase advertizing from the panel
function cleanAdPanel() {
	alertTable = alertData.split("\n");
	clearOptionButtons();
	if (alertTable.length > 1) {
		alertTableCursor = 0;
		var txt = '';
		while ((txt = getNextLine()) != '%EOF%') {
			rec = txt.split(",");
			if (rec.length > 1) {
				if (rec[0].trim() == 'Option') {
					//					addOptionButton(rec[1].trim());
					addOptionButton(txt);
				}
			}
			//			if (rec.length < 3) alertTable.splice(i, 1);
		}
		initOptionDefaults();
		//		setTitleText(version + " : " + alertTable.length + " records from cache");
	}
}



function importClipboardData() {
	getClipboardData(true);
}

function appendClipboardData() {
	getClipboardData(false);
}

function getDataType(data) {
	header = data.slice(0, 80);
	if (header.search(/bboalert/i) != -1) return 'BBOalert';
	if (header.indexOf('*00') != -1) return 'BSS';
	if (header.indexOf('?00') != -1) return 'BSS';
	return '';
}

function setScriptList() {
	scriptList = [];
	alertTableCursor = 0;
	var txt = '';
	while ((txt = getNextLine()) != '%EOF%') {
		var rec = txt.split(",");
		if (rec[0].trim() == 'Script') {
			if (rec.length > 2) {
				scriptList.push(txt);
			}
		}
	}
}

function getScript(scriptName) {
	for (var i = 0; i < scriptList.length; i++) {
		var txt = scriptList[i];
		var rec = txt.split(",");
		if (rec[1].trim() == scriptName) {
			return txt.slice(txt.indexOf(',', txt.indexOf(',') + 1) + 1);
		}

	}
	return '';
}

function getScriptOld(scriptName) {
	alertTableCursor = 0;
	var txt = '';
	var script = '';
	while ((txt = getNextLine()) != '%EOF%') {
		var rec = txt.split(",");
		if (rec[0].trim() == 'Script') {
			if (rec.length > 2) {
				if (rec[1].trim() == scriptName) {
					script = txt.slice(txt.indexOf(',', txt.indexOf(',') + 1) + 1);
				}
			}
		}
	}
	return script;
}

function setOptionsSelector() {
	clearOptionsSelector();
	alertTableCursor = 0;
	var txt = '';
	while ((txt = getNextLine()) != '%EOF%') {
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



function processTable() {
	clearOptionButtons();
	clearShortcutButtons();
	setScriptList();
	alertTableCursor = 0;
	var txt = '';
	while ((txt = getNextLine()) != '%EOF%') {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Option') {
				//						addOptionButton(rec[1].trim());
				addOptionButton(txt);
			}
			if (rec[0].trim() == 'Button') {
				addShortcutButton(txt);
			}
		}
	}
	alertTableCursor = 0;
	txt = '';
	while ((txt = getNextLine()) != '%EOF%') {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Shortcut') {
				addShortcutButton(txt + ',width=25%');
			}
		}
	}
	setOptionsSelector();
	initOptionDefaults();
	saveAlertTableToClipboard();
}

// Retrieve text from clipboard
function getClipboardData(newData) {
	navigator.clipboard.readText().then(function (cbData) {
		if (getDataType(cbData) == '') {
			bboalertLog(version + ' : no valid data found in clipboard');
			return;
		}
		if ((getDataType(cbData) == 'BSS') && !newData) {
			bboalertLog(version + ' : can not append BSS formatted data');
			return;
		}
		if (newData) {
			updateText = "";
			updateCount = 0;
			alertData = cbData;
			if (!alertData.endsWith("\n")) alertData = alertData + "\n";
			alertTable = alertData.split("\n");
			bboalertLog(version + " : " + getBBOalertHeaderMsg() + alertTable.length + " records imported");
		} else {
			alertData = alertData + cbData;
			if (!alertData.endsWith("\n")) alertData = alertData + "\n";
			alertTable = alertData.split("\n");
			bboalertLog(version + " : " + getBBOalertHeaderMsg() + cbData.split("\n").length + " records appended");
		}
		clearOptionButtons();
		if (getDataType(cbData) == 'BBOalert') {
			processTable();
		} else {
			lvls = "1234567";
			suits = "CDHSN";
			alertTable.sort();
			optionPrefix = 'Opening';
			option = '00';
			for (var i = 1; i < alertTable.length; i++) {
				ctx = '';
				r = alertTable[i];
				if (r.startsWith('%')) continue;
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
				if (rec.length < 2) continue;
				if (rec[0].length < 4) continue;
				if (rec[1].length < 9) continue;
				for (var j = 2; j < rec[0].length; j++) {
					c1 = rec[0].charAt(j);
					if (lvls.indexOf(c1) != -1) {
						c2 = rec[0].charAt(j + 1);
						ctx = ctx + c1 + c2;
						j++;
					} else {
						if (c1 == "P") ctx = ctx + "--";
						if (c1 == "D") ctx = ctx + "Db";
						if (c1 == "R") ctx = ctx + "Rd";
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
				if (!r.startsWith('00') && !r.startsWith('*00')) badrec = true;
				if (badRec) ctx = 'Error ' + alertTable[i] + "|" + ctx;
				n = 10;
				if (ctx.endsWith("N")) n = 8;
				if (ctx.endsWith("--")) n = 7;
				if (ctx.endsWith("Db")) n = 7;
				if (ctx.endsWith("Rd")) n = 7;
				exp = rec[1].slice(n);
				exp = exp.split(',').join(';');
				if (exp.length > 39) {
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
						//						addOptionButton(rec[1].trim());
						addOptionButton(alertTable[i]);
					}
				}
				//			if (rec.length < 3) alertTable.splice(i, 1);
			}
			//			initOptionDefaults();
			//			setOptionsSelector();
			alertData = updateText;
			processTable();
			bboalertLog(version + " : " + alertTable.length + " records imported");
			updateText = "";
			updateCount = 0;
		}
		return;
	});
}

function exportUpdateData() {
	if (updateCount == 0) {
		bboalertLog(version + " : no data to export");
		return;
	}
	writeToClipboard(updateText);
	bboalertLog(version + " : " + getBBOalertHeaderMsg() + updateCount + " records exported to clipboard");
}

function getNextLine() {
	if (alertTableCursor >= alertTable.length) return '%EOF%';
	var txt = alertTable[alertTableCursor].trim();
	while (txt.endsWith('\\')) {
		alertTableCursor++;
		txt = txt.slice(0, txt.length - 1) + alertTable[alertTableCursor].trim();
		if (alertTableCursor >= alertTable.length) return txt;
	}
	alertTableCursor++;
	return txt;
}

var trustedBid = false;
var foundContext = '';
var foundCall = '';

// Find explanation text for alerted call in the bidding context
function findAlert(context, call) {
	trustedBid = false;
	var trustedZone = false;
	var matchOption = true;
	var lastContext = "";
	var alertText = "";
	alertTableCursor = 0;
	var txt = '';
	var idx = -1;
	while ((txt = getNextLine()) != '%EOF%') {
		rec = txt.split(",");
		// Keyword Option alone end optional block
		if (txt == 'Trusted') trustedZone = true;
		if (txt == 'Untrusted') trustedZone = false;
		if (txt == 'Option') matchOption = true;
		if (rec.length < 2) continue;
		currentContext = elimineSpaces(rec[0].trim());
		if (currentContext == "+") {
			currentContext = lastContext;
		} else {
			lastContext = currentContext;
		}

		if (currentContext == 'Option') {
			matchOption = checkOption(rec);
			continue;
		}
		if (!matchOption) continue;
		if (rec.length < 3) continue;
		//		if (matchContext(currentContext, stripContext(context)) && (rec[1].trim() == call)) {
		currentContext = updateAlert(currentContext);
		//		if (currentContext.indexOf('%') != -1) currentContext = currentContext;
		if (matchContext(currentContext, stripContext(context)) && (matchContext(rec[1].trim(), call))) {
			idx = alertTableCursor;
			alertText = rec[2];
			trustedBid = trustedZone;
			foundContext = currentContext;
			foundCall = rec[1].trim();
		}
		if (matchContext(currentContext, context) && (matchContext(rec[1].trim(), call))) {
			idx = alertTableCursor;
			alertText = rec[2];
			trustedBid = trustedZone;
			foundContext = currentContext;
			foundCall = rec[1].trim();
		}
	}
	alertText = normalize(alertText);
	if (idx == -1) trustedBid = false;
	addLog('find:[' + getDealNumber() + '|' + mySeat() + '|' + areWeVulnerable() + '|' + ourVulnerability() + '|' + getSeatNr() +
		'|' + context + '|' + call + '|' + idx + '|' + alertText + '|' + trustedBid + ']');
	return alertText;
}


// Check if text ends with a shortcut and expand it
function findShortcut(text) {
	idx = -1;
	expandedText = text;
	alertTableCursor = 0;
	var txt = '';
	while ((txt = getNextLine()) != '%EOF%') {
		rec = txt.split(",");
		if (rec.length < 3) continue;
		if (rec[0].trim() != 'Shortcut') continue;
		if (!text.endsWith(rec[1].trim())) continue;
		short = rec[1].trim();
		long = rec[2].trim();
		expandedText = text.slice(0, -short.length) + long;
		return updateAlert(expandedText);
	}
	return updateAlert(expandedText);
}

// Check chat box for eventual shortcut and replace it by the text from table
function messageOnKeyup(key) {
	elMessage = getVisibleMessageInput();
	text1 = elMessage.value;
	if (key.altKey) {
		text1 = text1 + 'Alt' + key.key.toUpperCase();
	}
	text2 = findShortcut(text1);
	if (text1 != text2) {
		setChatMessage(text2, true);
	}
}

// Check explain box for eventual shortcut and replace it by the text from table
function explainOnKeyup(key) {
	elAlertExplain = getExplainInput();
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

function updateAlert(txt) {
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


// Search for explanation text and set in in the bidding box
function getAlert() {
	var eventInput = new Event('input');
	if (buttonOKvisible()) clearAlert();
	var elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	var alertText = findAlert(getContext(), callText);
	alertText = updateAlert(alertText);
	var exp = alertText.split('#');
	eventInput = new Event('input');
	if (elAlertExplain.value.trim() == '') {
		elAlertExplain.value = exp[0];
		elAlertExplain.dispatchEvent(eventInput);
	} else {
		saveAlert();
	}
	elAlertExplain.dispatchEvent(eventInput);
	if (exp.length > 1) {
		setChatMessage(exp[1]);
		setTimeout(function () {
			if (!buttonOKvisible()) sendChat();
		}, 500);
	} else {
		setChatMessage('');
	}
};

// Append current explanation text in update table, if not found in the alert table
function saveAlert() {
	var elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	//	var explainText = elimine2Spaces(elAlertExplain.value).trim();
	var explainText = normalize(elAlertExplain.value);
	if (normalize(getChatMessage()) != '') explainText = explainText + '#' + normalize(getChatMessage());
	if (explainText == "") return;
	var alertText = findAlert(getContext(), callText);
	if (alertText.indexOf('%') != -1) return;
	if (explainText != alertText) {
		var newrec = stripContext(getContext()) + "," + callText + "," + explainText;
		newrec = newrec + "," + getNow() + " Deal " + getDealNumber();
		addLog('save:[' + getDealNumber() + '|' + areWeVulnerable() + '|' + getSeatNr() + '|' + stripContext(getContext()) + '|' + callText + '|' + explainText + ']');
		alertTable.push(newrec);
		updateText = updateText + newrec + '\n';
		alertData = alertData + newrec + '\n';
		updateCount++;
		saveAlertTableToClipboard();
	}
};

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
	updateCount++;
	saveAlertTableToClipboard();
}

function setPostMortem() {
	var nd = getNavDiv();
	if (nd == null) return;
	var ec = nd.querySelector('.explainCallClass');
	if (ec == null) return;
	var ok = ec.querySelector('button');
	if (ok == null) return;
	if (ok.onclick == null) ok.onclick = savePostMortem;
}


// Set action for each bidding box button
function setBiddingButtonEvents() {
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return;
	elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return;
	if (elBiddingButtons.length < 17) return;
	setUndo();
	setPostMortem();
	if (elBiddingButtons[0].onmousedown == null) {
		elBiddingButtons[0].onmousedown = function () {
			addLog('click:[1]');
			callText = "1";
			if ((confirmBidsSet() != 'N')) clearAlert();
		};
		elBiddingButtons[0].addEventListener("touchstart", function () {
			addLog('click:[1]');
			callText = "1";
			if ((confirmBidsSet() != 'N')) clearAlert();
		});
	}
	if (elBiddingButtons[1].onmousedown == null) {
		elBiddingButtons[1].onmousedown = function () {
			addLog('click:[2]');
			callText = "2";
			if ((confirmBidsSet() != 'N')) clearAlert();
		};
		elBiddingButtons[1].addEventListener("touchstart", function () {
			addLog('click:[2]');
			callText = "2";
			if ((confirmBidsSet() != 'N')) clearAlert();
		});
	}
	if (elBiddingButtons[2].onmousedown == null) {
		elBiddingButtons[2].onmousedown = function () {
			addLog('click:[3]');
			callText = "3";
			if ((confirmBidsSet() != 'N')) clearAlert();
		};
		elBiddingButtons[2].addEventListener("touchstart", function () {
			addLog('click:[3]');
			callText = "3";
			if ((confirmBidsSet() != 'N')) clearAlert();
		});
	}
	if (elBiddingButtons[3].onmousedown == null) {
		elBiddingButtons[3].onmousedown = function () {
			addLog('click:[4]');
			callText = "4";
			if ((confirmBidsSet() != 'N')) clearAlert();
		};
		elBiddingButtons[3].addEventListener("touchstart", function () {
			addLog('click:[4]');
			callText = "4";
			if ((confirmBidsSet() != 'N')) clearAlert();
		});
	}
	if (elBiddingButtons[4].onmousedown == null) {
		elBiddingButtons[4].onmousedown = function () {
			addLog('click:[5]');
			callText = "5";
			if ((confirmBidsSet() != 'N')) clearAlert();
		};
		elBiddingButtons[4].addEventListener("touchstart", function () {
			addLog('click:[5]');
			callText = "5";
			if ((confirmBidsSet() != 'N')) clearAlert();
		});
	}
	if (elBiddingButtons[5].onmousedown == null) {
		elBiddingButtons[5].onmousedown = function () {
			addLog('click:[6]');
			callText = "6";
			if ((confirmBidsSet() != 'N')) clearAlert();
		};
		elBiddingButtons[5].addEventListener("touchstart", function () {
			addLog('click:[6]');
			callText = "6";
			if ((confirmBidsSet() != 'N')) clearAlert();
		});
	}
	if (elBiddingButtons[6].onmousedown == null) {
		elBiddingButtons[6].onmousedown = function () {
			addLog('click:[7]');
			callText = "7";
			if ((confirmBidsSet() != 'N')) clearAlert();
		};
		elBiddingButtons[6].addEventListener("touchstart", function () {
			addLog('click:[7]');
			callText = "7";
			if ((confirmBidsSet() != 'N')) clearAlert();
		});
	}
	if (elBiddingButtons[7].onmousedown == null) {
		elBiddingButtons[7].onmousedown = function () {
			addLog('click:[C]');
			callText = callText[0] + "C";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[7].addEventListener("touchstart", function () {
			addLog('click:[C]');
			callText = callText[0] + "C";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[8].onmousedown == null) {
		elBiddingButtons[8].onmousedown = function () {
			addLog('click:[D]');
			callText = callText[0] + "D";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[8].addEventListener("touchstart", function () {
			addLog('click:[D]');
			callText = callText[0] + "D";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[9].onmousedown == null) {
		elBiddingButtons[9].onmousedown = function () {
			addLog('click:[H]');
			callText = callText[0] + "H";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[9].addEventListener("touchstart", function () {
			addLog('click:[H]');
			callText = callText[0] + "H";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[10].onmousedown == null) {
		elBiddingButtons[10].onmousedown = function () {
			addLog('click:[S]');
			callText = callText[0] + "S";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[10].addEventListener("touchstart", function () {
			addLog('click:[S]');
			callText = callText[0] + "S";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[11].onmousedown == null) {
		elBiddingButtons[11].onmousedown = function () {
			addLog('click:[N]');
			callText = callText[0] + "N";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[11].addEventListener("touchstart", function () {
			addLog('click:[N]');
			callText = callText[0] + "N";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[12].onmousedown == null) {
		elBiddingButtons[12].onmousedown = function () {
			addLog('click:[--]');
			callText = "--";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[12].addEventListener("touchstart", function () {
			addLog('click:[--]');
			callText = "--";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[13].onmousedown == null) {
		elBiddingButtons[13].onmousedown = function () {
			addLog('click:[Db]');
			callText = "Db";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[13].addEventListener("touchstart", function () {
			addLog('click:[Db]');
			callText = "Db";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[14].onmousedown == null) {
		elBiddingButtons[14].onmousedown = function () {
			addLog('click:[Rd]');
			callText = "Rd";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		};
		elBiddingButtons[14].addEventListener("touchstart", function () {
			addLog('click:[Rd]');
			callText = "Rd";
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid();
		});
	}
	if (elBiddingButtons[15].onmousedown == null) {
		elBiddingButtons[15].onmousedown = function () {
			addLog('click:[Alert]');
			if (isAlertON()) {
				setExplainText('');
				setChatMessage('', false);
			}
		};
		elBiddingButtons[15].addEventListener("touchstart", function () {
			addLog('click:[Alert]');
			if (isAlertON()) {
				setExplainText('');
				setChatMessage('', false);
			}
		});
	}
	if (elBiddingButtons[16].onmousedown == null) {
		elBiddingButtons[16].onmousedown = function () {
			addLog('click:[OK]');
			saveAlert();
			sendChat();
		};
		elBiddingButtons[16].addEventListener("touchstart", function () {
			addLog('click:[OK]');
			saveAlert();
			sendChat();
		});
	}
}

function setControlButtonEvents() {
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector != null)
		if (optionsSelector.onchange == null) optionsSelector.onchange = optionsSelectorChanged;
	var bar = document.querySelector('.moreMenuDivClass');
	if (bar == null) return;
	var b = document.querySelector('#bboalert-b1');
	if (b != null)
		if (b.onmousedown == null) b.onmousedown = importClipboardData;
	b = document.querySelector('#bboalert-b2');
	if (b != null)
		if (b.onmousedown == null) b.onmousedown = appendClipboardData;
	b = document.querySelector('#bboalert-b3');
	if (b != null)
		if (b.onmousedown == null) b.onmousedown = exportAlertData;
	b = document.querySelector('#bboalert-bnew');
	if (b != null)
		if (b.onmousedown == null) b.onmousedown = exportUpdateData;
	b = document.querySelector('#bboalert-log');
	if (b != null)
		if (b.onmousedown == null) b.onmousedown = exportLogData;
	b = document.querySelector('#bboalert-sc');
	if (b != null) 
		if (b.onmousedown == null) b.onmousedown = function () {
			if (this.style.backgroundColor == "red") {
				this.style.backgroundColor = "green";
			} else {
				this.style.backgroundColor = "red";
			}
		};
}