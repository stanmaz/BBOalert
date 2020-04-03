/*
BBOalert dataBBOalert extension will :
- be activated at www.bridgebase.com startup
- During bidding, BBOalert checks if for the actual bidding context the call is defined as alerted.
  If yes, the explanation text is retrieved from the table and shown in the 'Explanation' text field
- Explanation can be modified by hand or a new explanation can be entered. In such a case the update text
  is stored in the clipboard

BBOalert allows to define in the table keybord shortcuts which are automatically expanded during manual text entry
in 'Message' and 'Explanation' fields

2.6.2 - BBOalert data : header identification no more case sensitive
2.6.2 - BBOalert and BSS data : bss header identification detection within first 80 characters
2.6.2 - BBOalert data : allow spaces in context field
2.6.2 - BBOalert data reader : strip multiple spaces and tabs from explanation text
2.7	  - automatic switching of vulnerability- and seat-dependent optional blocks
2.7.1 - bug fix : misinterpretation of NT calls in multilingual user interface
*/
// Only english UI of BBO is supported

var version = 'BBOalert ' + chrome.runtime.getManifest().version;

// Global variables
var elBiddingBox = null;
var elBiddingButtons = null;
var elAlertExplain = null;
var eventClick = new Event('click');
var callText = "";
var updateText = "";
var updateCount = 0;
var cbData = "";
var alertData = "";
var alertTable = alertData.split("\n");
var alertTableSize = 0;
var clipBoard = navigator.clipboard;
var adPanel = null;
var b0 = document.createElement("button");
var b1 = document.createElement("button");
var b2 = document.createElement("button");
var b3 = document.createElement("button");
var lastDealNumber = '';
// Set BBO specific control elements
b0.textContent = "Options";
b0.id = 'bboalert-b0';
b0.style.fontSize = "22px"
b0.onmousedown = toggleOptions;
b0.style.verticalAlign = 'middle';
b0.style.marginRight = "5px";
b0.style.top = "47px";
b1.textContent = "Import";
b1.id = 'bboalert-b1';
b1.style.fontSize = "22px"
b1.onmousedown = importClipboardData;
b1.style.verticalAlign = 'middle';
b1.style.marginRight = "5px";
b2.textContent = "Export";
b2.id = 'bboalert-b2';
b2.style.fontSize = "22px"
b2.onmousedown = exportUpdateData;
b2.style.verticalAlign = 'middle';
b2.style.marginRight = "5px";
b3.textContent = "Append";
b3.id = 'bboalert-b3';
b3.style.fontSize = "22px"
b3.onmousedown = appendClipboardData;
b3.style.verticalAlign = 'middle';
b3.style.marginRight = "5px";

var alertShown = false;

// Check every second if bidding box is present
var timerId = setInterval(() => setBiddingBox(), 500);

// Find the bidding box element and check if new data present in the clipboard
function setBiddingBox() {
	adPanel = document.getElementById("adpanel");
	if (adPanel != null) {
		sc = document.querySelector('.statsClass');
		if (sc == null) adPanel.style.display = 'none';
	}
	if (isBBOready()) {
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
	setControlButtons();
	//	set keyboard listener to chat input
	elMessage = getVisibleMessageInput();
	if (elMessage != null) {
		elMessage.addEventListener('keyup', messageOnKeyup);
	}
	//	set keyboard listener to explanation input
	//	set listeners to bidding box buttons 
	elBiddingBox = document.querySelector(".biddingBoxClass");
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
			setButtonEvents();
		}
	}
	else {
		elBiddingButtons = null;
	}
}

function setControlButtons() {
	// Wait until user logged in
	bar = document.querySelector('.moreMenuDivClass');
	if (bar == null) return;
	// Return if buttons already set
	ds = document.getElementById('bboalert-b1');
	if (ds != null) return;
	bar.insertBefore(b2, bar.firstChild);
	bar.insertBefore(b3, bar.firstChild);
	bar.insertBefore(b1, bar.firstChild);
	bar.insertBefore(b0, bar.firstChild);
	cleanAdPanel();
}


// Erase advertizing from the panel
function cleanAdPanel() {
	if (document.getElementById("adpanel") != null) return;
	appPanel = document.getElementById("bbo_app");
	sc = document.querySelector('.statsClass');
	//	bboad1Panel = document.getElementById("bbo_ad1");
	adPanel = document.createElement("div");
	adPanel.style.position = 'absolute';
	adPanel.style.left = '0px';
	adPanel.style.top = '47px';
	adPanel.style.width = '161px';
	adPanel.style.height = '100%';
	adPanel.id = "adpanel";
	adPanel.style.backgroundColor = 'red';
	adPanel.style.display = "none";
	adPanel.style.overflow = "scroll";
	adPanel.style.overflowX = "hidden";
	adPanel.style.zIndex = "1";
	document.body.insertBefore(adPanel, appPanel);
}

// Erase all BBOalert buttons
function clearOptionButtons() {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	while (adPanel.hasChildNodes()) {
		adPanel.removeChild(adPanel.firstChild);
	}
}


// For each group of options, select only the first one
function initOptionDefaults() {
	adPanel = document.getElementById("adpanel");
	oldPrefix = "";
	for (var i = 0; i < adPanel.children.length; i++) {
		txt = adPanel.children[i].textContent;
		txt1 = txt.split(" ");
		if (txt1[0] == oldPrefix) {
			adPanel.children[i].style.backgroundColor = 'white';
		} else {
			adPanel.children[i].style.backgroundColor = 'lightgreen';
			adPanel.children[i].style.marginTop = "10px";
		}
		oldPrefix = txt1[0];
	}
	checkOptionsVulnerability();
}

// Make sure thet only the selected option is acvite
function unselectOtherButtons(selectedOption) {
	var adPanel = document.getElementById("adpanel");
	var txt0 = selectedOption.split(" ");
	for (var i = 0; i < adPanel.children.length; i++) {
		var txt = adPanel.children[i].textContent;
		var txt1 = txt.split(" ");
		if (txt.trim() == selectedOption.trim()) continue;
		if (txt0[0] != txt1[0]) continue;
		adPanel.children[i].style.backgroundColor = 'white';
	}
}

// Make sure thet only the selected option is acvite
function checkOptionsSeat() {
	var vText = '@' + areWeVulnerable()
	if (vText == '@') return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	for (var i = 0; i < adPanel.children.length; i++) {
		var txt = adPanel.children[i].textContent.trim();
		if (vText == '@n') {
			if (txt.indexOf('@n') != -1) {
				adPanel.children[i].style.backgroundColor = 'lightgreen';
			}
			if (txt.indexOf('@v') != -1) adPanel.children[i].style.backgroundColor = 'white';
		} else {
			if (txt.indexOf('@v') != -1) {
				adPanel.children[i].style.backgroundColor = 'lightgreen';
			}
			if (txt.indexOf('@n') != -1) adPanel.children[i].style.backgroundColor = 'white';
		}
	}
}

// Make sure thet only the selected option is acvite
function checkOptionsVulnerability() {
	var vText = areWeVulnerable()
	if (vText == '') return;
	sText = getSeatNr();
	if (sText == '') return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	for (var i = 0; i < adPanel.children.length; i++) {
		// Clear all auto selectable options 
		var txt = adPanel.children[i].textContent.trim();
		if (matchVulSeat(vText, sText, txt) == '') continue;
		if (matchVulSeat(vText, sText, txt) == 'Y') adPanel.children[i].style.backgroundColor = 'lightgreen';
		if (matchVulSeat(vText, sText, txt) == 'N') adPanel.children[i].style.backgroundColor = 'white';
	}
}

// Add option selection button
function addOptionButton(lbl) {
	var adPanel = document.getElementById("adpanel");
	var bt = document.createElement("button");
	bt.textContent = lbl;
	bt.id = lbl;
	bt.style.width = "100%";
	bt.style.backgroundColor = 'white';
	bt.style.textAlign = 'left';
	bt.addEventListener('click', function() {
		if (this.style.backgroundColor == 'white') {
			this.style.backgroundColor = 'lightgreen';
			unselectOtherButtons(this.textContent);
		} else {
			this.style.backgroundColor = 'white';
		}
	})
	adPanel.appendChild(bt);
}

function toggleOptions() {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	sc = document.querySelector('.statsClass');
	if (adPanel.style.display == 'none') {
		if (sc != null) {
			if (isVisible(sc)) adPanel.style.top = Math.ceil(sc.getBoundingClientRect().top).toString() + 'px';
		}
		adPanel.style.display = 'block';
	} else {
		adPanel.style.display = 'none';
	}
}

function importClipboardData() {
	cleanAdPanel();
	getClipboardData(true)
}

function appendClipboardData() {
	cleanAdPanel();
	getClipboardData(false)
}

function getDataType (data) {
	header = data.slice(0,80);
	if (header.search(/bboalert/i) != -1) return 'BBOalert';
	if (header.indexOf('*00') != -1) return 'BSS';
	if (header.indexOf('?00') != -1) return 'BSS';
	return '';
}


// Retrieve text from clipboard
function getClipboardData(newData) {
	navigator.clipboard.readText().then(function(cbData) {
		if (getDataType(cbData) == '') {
			setTitleText(version + ' : no valid data found in clipboard');
			if (alertData == "") {
				alertData = "BBOalert\n\n"
			}
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
		} else {
			alertData = alertData + cbData;
		}
		alertTable = alertData.split("\n");
		clearOptionButtons();
		if (getDataType(cbData) == 'BBOalert') {
			for (var i = 0; i < alertTable.length; i++) {
				rec = alertTable[i].split(",");
				if (rec.length > 1) {
					if (rec[0].trim() == 'Option') {
						addOptionButton(rec[1].trim());
					}
				}
				//			if (rec.length < 3) alertTable.splice(i, 1);
			}
			initOptionDefaults();
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
				if (!r.startsWith('00') && !r.startsWith('00')) badrec = true;
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
						addOptionButton(rec[1].trim());
					}
				}
				//			if (rec.length < 3) alertTable.splice(i, 1);
			}
			initOptionDefaults();
		}
		alertTableSize = alertTable.length;
		setTitleText(version + " : " + alertTable.length + " records")
		return;
	}
	);
}

function exportUpdateData() {
	if (updateCount == 0) {
		setTitleText(version + " : no data to export")
		return;
	}
	writeToClipboard("BBOalert\n" + updateText);
	setTitleText(version + " : " + updateCount + " records exported to clipboard")
}



// Check if the selected defense option matches table option
function checkOption(r) {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) {
		return false;
	}
	for (var i = 0; i < adPanel.children.length; i++) {
		txt = adPanel.children[i].textContent;
		if (adPanel.children[i].style.backgroundColor == 'white') continue;
		if (txt.trim() == r[1].trim()) {
			return true;
		}
	}
	return false;
}


// Find explanation text for alerted call in the bidding context
function findAlert(context, call) {
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
	for (i = 0; i < alertTable.length; i++) {
		rec = alertTable[i].split(",");
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
		elMessage.value = text2;
		eventInput = new Event('input');
		elMessage.dispatchEvent(eventInput);
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

// Clear explanation text field
function clearAlert() {
	elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	elAlertExplain.value = "";
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
};

// Search for explanation text and set in in the bidding box
function getAlert() {
	elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	exp = findAlert(getContext(), callText).trim().split('#');
	elAlertExplain.value = exp[0];
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
	elMessage = getVisibleMessageInput();
	if (elMessage == null) return;
	if (exp.length > 1) {
		elMessage.value = exp[1];
	} else {
		elMessage.value = "";
	}
	eventInput = new Event('input');
	elMessage.dispatchEvent(eventInput);
};

// Append current explanation text in update table, if not found in the alert table
function saveAlert() {
	elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	explainText = elAlertExplain.value;
	if (explainText == "") return;
	alertText = findAlert(getContext(), callText).trim();
	if (explainText != alertText) {
		newrec = stripContext(getContext()) + "," + callText + "," + explainText;
		alertTable.push(newrec);
		dealElement = document.querySelector('.vulPanelInnerPanelClass');
		updateText = updateText + newrec + "," + getNow() + " Deal " + dealElement.outerText + "\n";
		updateCount++;
		writeToClipboard(updateText);
	}
};

// Set action for each bidding box button
function setButtonEvents() {
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
	elBiddingButtons[16].onmousedown = function() {
		saveAlert();
	};
	elBiddingButtons[16].addEventListener("touchstart", function() {
		saveAlert();
	});
}

