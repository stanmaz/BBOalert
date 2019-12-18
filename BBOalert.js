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


// Global variables
var timerId;
var elBiddingBox = null;
var elBiddingButtons = null;
var elAlertExplain = null;
var eventClick = new Event('click');
var callText = "";
var updateText = "";
var cbData = "";
var alertData = "";
var alertTable = null;

var version = 'BBOalert ' + chrome.runtime.getManifest().version;


// Only english UI of BBO is supported
if (document.location.href != 'https://www.bridgebase.com/v3/?lang=en') {
	document.location = "https://www.bridgebase.com/v3/?lang=en";
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
	for (i = 0; i < t.length; i++) {
		t[i].innerHTML = txt;
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

// Get actual bidding context
function getContext() {
	ctx = ''
	bs = document.querySelectorAll('bridge-screen')
	if (bs.length == 0) {
		return "xx"
	}
	auction = bs[0].querySelectorAll('.auctionBoxCellClass')
	console.log(auction.length)
	if (auction.length == 0) {
		return "xx"
	};
	if (auction.length == 1) {
		return ""
	};
	for (i = 1; i < auction.length; i++) {
		el = auction[i].innerText;
		console.log(i, el);
		if ((ctx == '') & (el == 'Pass')) {
			continue
		};
		if (el == 'Pass') {
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

// Retrieve text from clipboard
function getClipboardData() {
	navigator.clipboard.readText().then(function(cbData) {
		console.log("Clipboard length = " + cbData.length);
		if (!cbData.startsWith("BBOalert")) {
			if (alertData == "") {
				setTitleText(version + ' : no data found in clipboard');
				alertData = "BBOalert\n\n"
			}
			return;
		}
		if (alertData.length == cbData.length) {
			console.log("Same table in clipboard");
			return;
		}
		alertData = cbData;
		alertTable = alertData.split("\n");
		setTitleText(version + " : " + alertTable.length + " records retrieved from clipboard")
		console.log("Table length = " + alertTable.length);
		return;
	}
	);
}

// Find explanation text for alerted call in the bidding context
function findAlert(context, call) {
	idx = -1;
	alertText = "";
	for (i = 0; i < alertTable.length; i++) {
		rec = alertTable[i].split(",");
		if (rec.length < 3) continue;
		if ((rec[0].trim() == context) && (rec[1].trim() == call)) alertText = rec[2];
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
	text2 = findShortcut(text1);
	console.log("Message " + text1 + " replace by " + text2);
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
	text2 = findShortcut(text1);
	console.log("Explain " + text1 + " replace by " + text2);
	if (text1 != text2) {
		elAlertExplain.value = text2;
		eventInput = new Event('input');
		elAlertExplain.dispatchEvent(eventInput);
	}
}

// Find the bidding box element and check if new data present in the clipboard
function getBiddingBox() {
	elMessage = getVisibleMessageInput();
	if (elMessage != null) {
		elMessage.addEventListener('keyup', messageOnKeyup);
	}
	getClipboardData();
	elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox != null) {
		elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
		if (elAlertExplain != null) {
			elAlertExplain.addEventListener('keyup', explainOnKeyup);
		}
		console.log("Biddingbox present");
		elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
		if (elBiddingButtons != null) {
			setButtonEvents();
			console.log(elAlertExplain);
		}
	}
	else {
		elBiddingButtons = null;
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
	elAlertExplain.value = findAlert(getContext(), callText).trim();
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
};

// Append current explanation text in update table, if not found in the alert table
function saveAlert() {
	console.log("Save Alert");
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
	explainText = elAlertExplain.value;
	if (explainText == "") return;
	alertText = findAlert(getContext(), callText).trim();
	if (explainText != alertText) {
		newrec = getContext() + "," + callText + "," + explainText;
		console.log("New record " + newrec)
		alertTable.push(newrec);
		dealElement = document.querySelector('.vulPanelInnerPanelClass');
		updateText = updateText + newrec + "," + getNow() + " Deal " + dealElement.outerText + "\n";
		writeToClipboard(updateText);
		console.log(updateText);
	}
};

// Set action for each bidding box button
function setButtonEvents() {
	elBiddingButtons[0].onmousedown = function() {
		callText = "1";
		clearAlert();
	};
	elBiddingButtons[1].onmousedown = function() {
		callText = "2";
		clearAlert();
	};
	elBiddingButtons[2].onmousedown = function() {
		callText = "3";
		clearAlert();
	};
	elBiddingButtons[3].onmousedown = function() {
		callText = "4";
		clearAlert();
	};
	elBiddingButtons[4].onmousedown = function() {
		callText = "5";
		clearAlert();
	};
	elBiddingButtons[5].onmousedown = function() {
		callText = "6";
		clearAlert();
	};
	elBiddingButtons[6].onmousedown = function() {
		callText = "7";
		clearAlert();
	};
	elBiddingButtons[7].onmousedown = function() {
		callText = callText[0] + "C";
		console.log(callText);
		getAlert();
	};
	elBiddingButtons[8].onmousedown = function() {
		callText = callText[0] + "D";
		console.log(callText);
		getAlert();
	};
	elBiddingButtons[9].onmousedown = function() {
		callText = callText[0] + "H";
		console.log(callText);
		getAlert();
	};
	elBiddingButtons[10].onmousedown = function() {
		callText = callText[0] + "S";
		console.log(callText);
		getAlert();
	};
	elBiddingButtons[11].onmousedown = function() {
		callText = callText[0] + "N";
		getAlert();
	};
	elBiddingButtons[12].onmousedown = function() {
		callText = "--";
		getAlert();
	};
	elBiddingButtons[13].onmousedown = function() {
		callText = "Db";
		getAlert();
	};
	elBiddingButtons[14].onmousedown = function() {
		callText = "Rd";
		getAlert();
	};
	elBiddingButtons[16].onmousedown = function() {
		saveAlert();
	};
}
