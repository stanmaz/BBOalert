/*
BBOalert dataBBOalert extension will :
- be activated at www.bridgebase.com startup
- During bidding, BBOalert checks if for the actual bidding context the call is defined as alerted.
  If yes, the explanation text is retrieved from the table and shown in the 'Explanation' text field
- Explanation can be modified by hand or a new explanation can be entered. In such a case the update text
  is stored in the clipboard

BBOalert allows to define in the table keybord shortcuts which are automatically expanded during manual text entry
in 'Message' and 'Explanation' fields


*/
var version = 'BBOalert ' + chrome.runtime.getManifest().version;

var eventClick = new Event('click');
var callText = "";
var updateText = "";
var updateCount = 0;
var cbData = "";
var alertData = "";
var alertTable = alertData.split("\n");
var alertTableSize = alertTable.length;
var alertTableCursor = 0;
var clipBoard = navigator.clipboard;
var adPanel = null;
var lastDealNumber = '';
// Set BBO specific control elements


// Check every second if bidding box is present
var timerId = setInterval(() => setBiddingBox(), 500);

function saveAlertTableToClipboard() {
	var txt = '';
	if (alertTable.length < 2) return;
	for (i = 1; i < alertTable.length; i++) {
		txt = txt + alertTable[i] + '\n';
	}
	writeToClipboard(txt);
	localStorage.setItem('BBOalertCache', alertData);
}

// Find the bidding box element and check if new data present in the clipboard
function setBiddingBox() {
	if (setUI()) {
		alertData = localStorage.getItem('BBOalertCache');
		if (alertData == null) alertData = '';
		alertTable = alertData.split("\n");
		alertTableSize = alertTable.length;
		setTitleText(version + " : " + alertTable.length + " records from cache");
		saveAlertTableToClipboard();
		processTable();
	}
	setControlButtonEvents();
	partnershipOptions();
	adPanel = document.getElementById("adpanel");
	if (adPanel != null) {
		sc = document.querySelector('.statsClass');
		if (sc == null) adPanel.style.display = 'none';
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
		}
	}
	//	set BBOalert control buttons
	//	set keyboard listener to chat input
	elMessage = getVisibleMessageInput();
	if (elMessage != null) {
		elMessage.addEventListener('keyup', messageOnKeyup);
	}
	//	set keyboard listener to explanation input
	//	set listeners to bidding box buttons 
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox != null) {
		checkOptionsVulnerability();
		if (getDealNumber() != lastDealNumber) {
			lastDealNumber = getDealNumber();
		}
		elAlertExplain = getExplainInput();
		if (elAlertExplain != null) {
			elAlertExplain.addEventListener('keyup', explainOnKeyup);
		}
		elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
		if (elBiddingButtons != null) {
			setBiddingButtonEvents();
		}
	}
	else {
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
//	cleanAdPanel();
	getClipboardData(true);
}

function appendClipboardData() {
//	cleanAdPanel();
	getClipboardData(false);
}

function getDataType(data) {
	header = data.slice(0, 80);
	if (header.search(/bboalert/i) != -1) return 'BBOalert';
	if (header.indexOf('*00') != -1) return 'BSS';
	if (header.indexOf('?00') != -1) return 'BSS';
	return '';
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
		//			if (rec.length < 3) alertTable.splice(i, 1);
	}

}



function processTable() {
	clearOptionButtons();
	alertTableCursor = 0;
	var txt = '';
	while ((txt = getNextLine()) != '%EOF%') {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Option') {
				//						addOptionButton(rec[1].trim());
				addOptionButton(txt);
			}
		}
		//			if (rec.length < 3) alertTable.splice(i, 1);
	}
	setOptionsSelector();
	initOptionDefaults();
	alertTableSize = alertTable.length;
	saveAlertTableToClipboard();
}

// Retrieve text from clipboard
function getClipboardData(newData) {
	navigator.clipboard.readText().then(function(cbData) {
		if (getDataType(cbData) == '') {
			setTitleText(version + ' : no valid data found in clipboard');
			return;
		}
		if ((getDataType(cbData) == 'BSS') && !newData) {
			setTitleText(version + ' : can not append BSS formatted data');
			return;
		}
		if (newData) {
			updateText = "";
			updateCount = 0;
			alertData = cbData;
			alertTable = alertData.split("\n");
			alertTableSize = alertTable.length;
			setTitleText(version + " : " + alertTable.length + " records imported");
		} else {
			alertData = alertData + cbData;
			alertTable = alertData.split("\n");
			setTitleText(version + " : " + cbData.split("\n").length + " records appended");
			alertTableSize = alertTable.length;
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
						updateText = updateText + 'Option,' + optionPrefix + ' ' + decodeOption(option) + '\n';
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
			setTitleText(version + " : " + alertTable.length + " records imported");
			updateText = "";
			updateCount = 0;
		}
		return;
	}
	);
}

function exportUpdateData() {
	if (updateCount == 0) {
		setTitleText(version + " : no data to export");
		return;
	}
	writeToClipboard(updateText);
	setTitleText(version + " : " + updateCount + " records exported to clipboard");
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


// Find explanation text for alerted call in the bidding context
function findAlert(context, call) {
	var matchOption = true;
	var lastContext = "";
	var alertText = "";
	alertTableCursor = 0;
	var txt = '';
	while ((txt = getNextLine()) != '%EOF%') {
		rec = txt.split(",");
		// Keyword Option alone end optional block
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
		if (matchContext(currentContext, stripContext(context)) && (rec[1].trim() == call)) alertText = rec[2];
		if (matchContext(currentContext, context) && (rec[1].trim() == call)) alertText = rec[2];
	}
	return elimine2Spaces(alertText);
}

// Find explanation text for alerted call in the bidding context
function findAlertOld(context, call) {
	matchOption = true;
	lastContext = "";
	idx = -1;
	alertText = "";
	for (var i = 0; i < alertTable.length; i++) {
		if (i >= alertTableSize) matchOption = true;
		rec = alertTable[i].split(",");
		// Keyword Option alone end optional block
		if (alertTable[i] == 'Option') matchOption = true;
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
		if (matchContext(currentContext, stripContext(context)) && (rec[1].trim() == call)) alertText = rec[2];
		if (matchContext(currentContext, context) && (rec[1].trim() == call)) alertText = rec[2];
	}
	return elimine2Spaces(alertText);
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
		return expandedText;
	}
	return expandedText;
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
		eventInput = new Event('input');
		elAlertExplain.dispatchEvent(eventInput);
	}
}

// Search for explanation text and set in in the bidding box
function getAlert() {
	elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	exp = findAlert(getContext(), callText).trim().split('#');
	if (exp[0] != '') setAlert(true);
	elAlertExplain.value = exp[0];
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
	if (exp.length > 1) {
		setChatMessage(exp[1]);
		setTimeout(function() { if (!buttonOKvisible()) sendChat(); }, 500);
	} else {
		setChatMessage('');
	}
};

// Append current explanation text in update table, if not found in the alert table
function saveAlert() {
	elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	explainText = elAlertExplain.value;
	if (getChatMessage().trim() != '') explainText = explainText + '#' + getChatMessage().trim();
	if (explainText == "") return;
	alertText = findAlert(getContext(), callText).trim();
	if (explainText != alertText) {
		newrec = stripContext(getContext()) + "," + callText + "," + explainText;
		newrec = newrec + "," + getNow() + " Deal " + getDealNumber();
		alertTable.push(newrec);
		updateText = updateText + newrec + '\n';
		alertData = alertData + newrec + '\n';
		updateCount++;
		saveAlertTableToClipboard();
	}
};

// Set action for each bidding box button
function setBiddingButtonEvents() {
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return;
	elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return;
	if (elBiddingButtons.lebgth < 17) return;
	elBiddingButtons[0].onmousedown = function() {
		callText = "1";
		clearAlert();
	};
	elBiddingButtons[0].addEventListener("touchstart", function() {
		callText = "1";
		clearAlert();
	});
	elBiddingButtons[1].onmousedown = function() {
		callText = "2";
		clearAlert();
	};
	elBiddingButtons[1].addEventListener("touchstart", function() {
		callText = "2";
		clearAlert();
	});
	elBiddingButtons[2].onmousedown = function() {
		callText = "3";
		clearAlert();
	};
	elBiddingButtons[2].addEventListener("touchstart", function() {
		callText = "3";
		clearAlert();
	});
	elBiddingButtons[3].onmousedown = function() {
		callText = "4";
		clearAlert();
	};
	elBiddingButtons[3].addEventListener("touchstart", function() {
		callText = "4";
		clearAlert();
	});
	elBiddingButtons[4].onmousedown = function() {
		callText = "5";
		clearAlert();
	};
	elBiddingButtons[4].addEventListener("touchstart", function() {
		callText = "5";
		clearAlert();
	});
	elBiddingButtons[5].onmousedown = function() {
		callText = "6";
		clearAlert();
	};
	elBiddingButtons[5].addEventListener("touchstart", function() {
		callText = "6";
		clearAlert();
	});
	elBiddingButtons[6].onmousedown = function() {
		callText = "7";
		clearAlert();
	};
	elBiddingButtons[6].addEventListener("touchstart", function() {
		callText = "7";
		clearAlert();
	});
	elBiddingButtons[7].onmousedown = function() {
		callText = callText[0] + "C";
		getAlert();
	};
	elBiddingButtons[7].addEventListener("touchstart", function() {
		callText = callText[0] + "C";
		getAlert();
	});
	elBiddingButtons[8].onmousedown = function() {
		callText = callText[0] + "D";
		getAlert();
	};
	elBiddingButtons[8].addEventListener("touchstart", function() {
		callText = callText[0] + "D";
		getAlert();
	});
	elBiddingButtons[9].onmousedown = function() {
		callText = callText[0] + "H";
		getAlert();
	};
	elBiddingButtons[9].addEventListener("touchstart", function() {
		callText = callText[0] + "H";
		getAlert();
	});
	elBiddingButtons[10].onmousedown = function() {
		callText = callText[0] + "S";
		getAlert();
	};
	elBiddingButtons[10].addEventListener("touchstart", function() {
		callText = callText[0] + "S";
		getAlert();
	});
	elBiddingButtons[11].onmousedown = function() {
		callText = callText[0] + "N";
		getAlert();
	};
	elBiddingButtons[11].addEventListener("touchstart", function() {
		callText = callText[0] + "N";
		getAlert();
	});
	elBiddingButtons[12].onmousedown = function() {
		callText = "--";
		getAlert();
	};
	elBiddingButtons[12].addEventListener("touchstart", function() {
		callText = "--";
		getAlert();
	});
	elBiddingButtons[13].onmousedown = function() {
		callText = "Db";
		getAlert();
	};
	elBiddingButtons[13].addEventListener("touchstart", function() {
		callText = "Db";
		getAlert();
	});
	elBiddingButtons[14].onmousedown = function() {
		callText = "Rd";
		getAlert();
	};
	elBiddingButtons[14].addEventListener("touchstart", function() {
		callText = "Rd";
		getAlert();
	});
	elBiddingButtons[15].onmousedown = function() {
		if (isAlertON()) {
			setExplainText('');
			setChatMessage('', false);
		}
	};
	elBiddingButtons[15].addEventListener("touchstart", function() {
		if (isAlertON()) {
			setExplainText('');
			setChatMessage('', false);
		}
	});
	elBiddingButtons[16].onmousedown = function() {
		saveAlert();
		sendChat();
	};
	elBiddingButtons[16].addEventListener("touchstart", function() {
		saveAlert();
		sendChat();
	});
}

function setControlButtonEvents() {
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector != null) optionsSelector.onchange = optionsSelectorChanged;
	var bar = document.querySelector('.moreMenuDivClass');
	if (bar == null) return;
	var b = bar.querySelector('#bboalert-b1');
	if (b != null) b.onmousedown = importClipboardData;
	if (b != null) b.addEventListener("touchstart", importClipboardData);
	b = bar.querySelector('#bboalert-b2');
	if (b != null) b.onmousedown = appendClipboardData;
	if (b != null) b.addEventListener("touchstart", appendClipboardData);
	b = bar.querySelector('#bboalert-b3');
	if (b != null) b.onmousedown = exportUpdateData;
	if (b != null) b.addEventListener("touchstart", exportUpdateData);
}
