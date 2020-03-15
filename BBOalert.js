/*
BBOalert extension will :
- be activated at www.bridgebase.com startup
- check periodically if clipboard contains the apropriate data and read it to the internal alert table.
  If data in the clipboard is changed, the table will be overwritten.
- During bidding, BBOalert checks if for the actual bidding context the call is defined as alerted.
  If yes, the explanation text is retrieved from the table and shown in the 'Explanation' text field
- Explanation can be modified by hand or a new explanation can be entered. In such a case the update text
  is stored in the clipboard

BBOalert allows to define in the table keybord shortcuts which are automatically expanded during manual text entry
in 'Message' and 'Explanation' fields
*/
// Only english UI of BBO is supported
var version = 'BBOalert ' + chrome.runtime.getManifest().version;
if (document.location.href != 'https://www.bridgebase.com/v3/?lang=en') {
	window.alert(version + " : BBO will be restarted with English user interface");
	document.location = "https://www.bridgebase.com/v3/?lang=en";
} else {
	window.alert(version + " started. Make sure : \n - ad blockers are disabled\n - BBO is in Split Screen mode\n - Confirm Bids is set");
};

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
var b1 = document.createElement("button");
var b2 = document.createElement("button");
var b3 = document.createElement("button");
// Set BBO specific control elements
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

// Check every second if bidding box is present
var timerId = setInterval(() => getBiddingBox(), 1000);

// Find the bidding box element and check if new data present in the clipboard
function getBiddingBox() {
	//	switch advertizing off
	adPanel0 = document.getElementById("bbo_ad1");
	adPanel0.style.display = "none";
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
		elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
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
}


// Erase advertizing from the panel
function cleanAdPanel() {
	if (document.getElementById("adpanel") != null) return;
	appPanel = document.getElementById("bbo_app");
	bboad1Panel = document.getElementById("bbo_ad1");
	adPanel = document.createElement("div");
	adPanel.style.cssText = bboad1Panel.style.cssText;
	adPanel.id = "adpanel";
	adPanel.style.backgroundColor = 'black';
	adPanel.style.display = "block";
	adPanel.style.overflow = "scroll";
	adPanel.style.overflowX = "hidden";
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
}

// Make sure thet only the selected option is acvite
function unselectOtherButtons(selectedOption) {
	adPanel = document.getElementById("adpanel");
	txt0 = selectedOption.split(" ");
	for (var i = 0; i < adPanel.children.length; i++) {
		txt = adPanel.children[i].textContent;
		txt1 = txt.split(" ");
		if (txt == selectedOption) continue;
		if (txt0[0] != txt1[0]) continue;
		adPanel.children[i].style.backgroundColor = 'white';
	}
}

// Add option selection button
function addOptionButton(lbl) {
	adPanel = document.getElementById("adpanel");
	bt = document.createElement("button");
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

// BBO titile bar is used to show BBOalert messages
function setTitleText(txt) {
	t = document.querySelector('.titleClass');
	if (isVisible(t)) {
		t.innerText = txt;
		return;
	}
	t = document.querySelectorAll('div.titleSpanClass');
	if (t.length == 0) return;
	for (var i = 0; i < t.length; i++) {
		t[i].textContent = txt;
	}
}

// Check if element is visible
function isVisible(e) {
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

// Get formatted actual date and time
function getNow() {
	now = new Date();
	yyyy = now.getFullYear().toString();
	mm = now.getMonth().toString();
	dd = now.getDate().toString();
	hh = now.getHours().toString();
	mn = now.getMinutes().toString();
	return yyyy + mm + dd + "_" + hh + ":" + mn;
}

// Strip context from leading passes
function stripContext(ctx) {
	if (ctx.startsWith('------')) return ctx.substr(6);
	if (ctx.startsWith('----')) return ctx.substr(4);
	if (ctx.startsWith('--')) return ctx.substr(2);
	return ctx;
}

// Get actual bidding context
function getContext() {
	ctx = ''
	bs = document.querySelectorAll('bridge-screen')
	if (bs.length == 0) {
		return "xx"
	}
	auction = bs[0].querySelectorAll('.auctionBoxCellClass')
	if (auction.length == 0) {
		return "xx"
	};
	if (auction.length == 1) {
		return ""
	};
	for (var i = 1; i < auction.length; i++) {
		el = auction[i].innerText;
		//	Translate Double, Redouble and Pass from different language interfaces
		if (el.startsWith('R')) {
			ctx = ctx + 'Rdbl';
			continue
		};
		if (el == 'X') el = 'Dbl';
		if (el == 'XX') el = 'Rdbl';
		if (el == 'p') el = 'P';
		if (el.startsWith('P')) {
			ctx = ctx + '--';
			continue
		};
		if (el.length > 1) {
			el = el.el = el.substr(0, 2);
			if (el.charCodeAt(1) == 9827) {
				el = el[0] + 'C'
			};
			if (el.charCodeAt(1) == 9830) {
				el = el[0] + 'D'
			};
			if (el.charCodeAt(1) == 9829) {
				el = el[0] + 'H'
			};
			if (el.charCodeAt(1) == 9824) {
				el = el[0] + 'S'
			};
			ctx = ctx + el;
		}
	}
	return ctx;
}

// Write text to clipboard
function writeToClipboard(txt) {
	navigator.clipboard.writeText(txt).then(function() {
	}
		, function() {
		}
	);
}

function importClipboardData() {
	cleanAdPanel();
	getClipboardData(true)
}

function appendClipboardData() {
	cleanAdPanel();
	getClipboardData(false)
}


// Retrieve text from clipboard
function getClipboardData(newData) {
	navigator.clipboard.readText().then(function(cbData) {
		if (!cbData.startsWith("BBOalert") && !cbData.startsWith("*00") && !cbData.startsWith("?00")) {
			setTitleText(version + ' : no valid data found in clipboard');
			if (alertData == "") {
				alertData = "BBOalert\n\n"
			}
			return;
		}
		if (!cbData.startsWith("BBOalert") && !newData) {
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
		if (cbData.startsWith("BBOalert")) {
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
			for (var i = 1; i < alertTable.length; i++) {
				ctx = '';
				r = alertTable[i];
				theyOpen = false;
				if (r.startsWith('*')) {
					theyOpen = true;
					r = r.slice(1);
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
					exp = "Explanation too long; Please read chat" + "#" + exp;
				}
				alertTable[i] = ctx + "," + exp;
				updateText = updateText + alertTable[i] + "\n";
				updateCount++;
			}

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


// Check if actual bidding context matches refeence context from the table
function matchContext(refContext, actContext) {
	if (refContext == actContext) return true;
	if (refContext.length != actContext.length) return false;
	for (var j = 0; j < refContext.length; j++) {
		if (refContext.substr(j, 1) == '_') continue;
		if (refContext.substr(j, 1) == '*') continue;
		if (refContext.substr(j, 1) != actContext.substr(j, 1)) return false;
	}
	return true;
}


// Check if the selected defense option matches table option
function checkOption(r) {
	//	selopt = defenseSelector.selectedIndex;
	//	if (selopt < 1) return false;
	//	seltext = defenseSelector.options[selopt].text.trim();
	//	for (var i = 1; i < r.length; i++) {
	//		if (seltext == r[i].trim()) return true;
	//	}
	//	return false;
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
		currentContext = rec[0].trim();
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
	return alertText;
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
	elMessage = elMessage = getVisibleMessageInput();
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

// Get visible message input element
function getVisibleMessageInput() {
	cr = document.querySelectorAll('.chatRowClass');
	if (cr.length == 0) return null;
	m = cr[0].querySelector('.messageInputClass');
	if (m == null) return null;
	if (isVisible(m)) return m;
	if (cr.length == 1) return null;
	m = cr[1].querySelector('.messageInputClass');
	if (m == null) return null;
	if (isVisible(m)) return m;
	return null;
}

// Check explain box for eventual shortcut and replace it by the text from table
function explainOnKeyup(key) {
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
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

// Check every 2 secs if bidding box is present
timerId = setInterval(() => getBiddingBox(), 2000);

// Clear explanation text field
function clearAlert() {
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
	elAlertExplain.value = "";
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
};

// Search for explanation text and set in in the bidding box
function getAlert() {
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
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
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
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

