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
var updateCount = 0;
var cbData = "";
var alertData = "";
var alertTable = alertData.split("\n");
var alertTableSize = 0;
var clipBoard = navigator.clipboard;
var adPanel = null;
var version = 'BBOalert ' + chrome.runtime.getManifest().version;
var p1 = document.createElement("P");
var b1 = document.createElement("button");
var b2 = document.createElement("button");
var p2 = document.createElement("P");
var defenseSelector = document.createElement("select");

// Only english UI of BBO is supported
if (document.location.href != 'https://www.bridgebase.com/v3/?lang=en') {
	document.location = "https://www.bridgebase.com/v3/?lang=en";
}

// Set BBO specific control elements
p1.textContent = "BBOalert";
p1.id = 'bboalert-p1';
p1.style.lineHeight = "0";
b1.textContent = "Import";
b1.id = 'bboalert-b1';
b1.style.width = "100%"
b1.style.fontSize = "16px"
b1.onmousedown = getClipboardData;
b2.textContent = "Export";
b2.id = 'bboalert-b2';
b2.style.width = "100%"
b2.style.fontSize = "16px"
b2.onmousedown = exportUpdateData;
p2.textContent = "Bid against:";
p2.id = 'bboalert-p2';
p1.style.lineHeight = "0";
defenseSelector.add(new Option('Default'));
defenseSelector.id = 'bboalert-ds';
defenseSelector.style.width = "100%";
defenseSelector.style.fontSize = "16px";



// Add BBOalert control elements to the panel
function setAdPanel() {
	adPanel = document.getElementById("bbo_ad1_i");
	if (adPanel.children.length > 2) return;
	adPanel.appendChild(p1);
	adPanel.appendChild(b1);
	adPanel.appendChild(b2);
	adPanel.appendChild(p2);
	adPanel.appendChild(defenseSelector);
}

// Erase advertizing from the panel
function cleanAdPanel() {
	adPanel = document.getElementById("bbo_ad1_i");
	if (adPanel == null) return;
	for (i = 0; i < adPanel.children.length; i++) {
		if (adPanel.children[i].id.startsWith('RTK_')) {
			adPanel.children[i].remove();
		}
	}
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
	//	console.log(auction.length)
	if (auction.length == 0) {
		return "xx"
	};
	if (auction.length == 1) {
		return ""
	};
	for (i = 1; i < auction.length; i++) {
		el = auction[i].innerText;
		//		console.log(i, el);
		//		if ((ctx == '') & (el == 'Pass')) {
		//			continue
		//		};
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


// Reset defense option selector
function clearDefenseSelector() {
	if (defenseSelector == null) return;
	//	console.log('Selector length ' + defenseSelector.options.length);
	for (var i = defenseSelector.options.length; i > 0; i--) {
		defenseSelector.remove(i);
	}

}

// Add defense option selector avoiding duplication
function addDefenseSelectorOption(optionText) {
	//	console.log('Add option ' + optionText);
	var opt;
	for (var i = 0, len = defenseSelector.options.length; i < len; i++) {
		opt = defenseSelector.options[i];
		if (opt.text == optionText) return;
	}
	defenseSelector.add(new Option(optionText));
}

// Retrieve text from clipboard
function getClipboardData() {
	navigator.clipboard.readText().then(function(cbData) {
		//		console.log("Clipboard length = " + cbData.length);
		if (!cbData.startsWith("BBOalert")) {
			setTitleText(version + ' : no valid data found in clipboard');
			if (alertData == "") {
				alertData = "BBOalert\n\n"
			}
			return;
		}
		if (alertData.length == cbData.length) {
			setTitleText(version + ' : same data in clipboard');
			//			console.log("Same table in clipboard");
			return;
		}
		alertData = cbData;
		alertTable = alertData.split("\n");
		clearDefenseSelector();
		for (var i = 0; i < alertTable.length; i++) {
			rec = alertTable[i].split(",");
			if (rec.length > 1) {
				if (rec[0] == 'Against') {
					for (var j = 1; j < rec.length; j++) {
						//						console.log('Option ' + rec[j].trim())
						addDefenseSelectorOption(rec[j]);
					}
				}
			}
			//			if (rec.length < 3) alertTable.splice(i, 1);
		}
		alertTableSize = alertTable.length;
		setTitleText(version + " : " + alertTable.length + " records retrieved from clipboard")
		//		console.log("Table length = " + alertTable.length);
		return;
	}
	);
}

function exportUpdateData() {
	if (updateCount == 0) {
		setTitleText(version + " : no data to export")
		return;
	}
	writeToClipboard(updateText);
	setTitleText(version + " : " + updateCount + " records exported to clipboard")
}


// Check if actual bidding context matches refeence context from the table
function matchContext(refContext, actContext) {
	if (refContext == actContext) return true;
	if (refContext.length != actContext.length) return false;
	for (j = 0; j < refContext.length; j++) {
		if (refContext.substr(j, 1) == '_') continue;
		if (refContext.substr(j, 1) == '*') continue;
		if (refContext.substr(j, 1) != actContext.substr(j, 1)) return false;
	}
	return true;
}


// Check if the selected defense option matches table option
function checkOption(r) {
	selopt = defenseSelector.selectedIndex;
	if (selopt < 1) return false;
	seltext = defenseSelector.options[selopt].text.trim();
	for (var i = 1; i < r.length; i++) {
		if (seltext == r[i].trim()) return true;
	}
	return false;
}


// Find explanation text for alerted call in the bidding context
function findAlert(context, call) {
	//	console.log('findAlert :' + context + ':' + call);
	matchOption = true;
	idx = -1;
	alertText = "";
	for (i = 0; i < alertTable.length; i++) {
		if (i >= alertTableSize) matchOption = true;
		rec = alertTable[i].split(",");
		if (rec.length < 2) continue;
		if (rec[0].trim() == 'Against') {
			matchOption = checkOption(rec);
		}
		if (!matchOption) continue;
		if (rec.length < 3) continue;
		if (matchContext(rec[0].trim(), stripContext(context)) && (rec[1].trim() == call)) alertText = rec[2];
		if (matchContext(rec[0].trim(), context) && (rec[1].trim() == call)) alertText = rec[2];
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
		//		console.log('Alt' + key.key.toUpperCase());
		text1 = text1 + 'Alt' + key.key.toUpperCase();
	}
	text2 = findShortcut(text1);
	//	console.log("Message " + key.key + ' ' + key.altKey + ' ' + text1 + " replace by " + text2);
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
		//		console.log('Alt' + key.key.toUpperCase());
		text1 = text1 + 'Alt' + key.key.toUpperCase();
	}
	text2 = findShortcut(text1);
	//	console.log("Explain " + text1 + " replace by " + text2);
	if (text1 != text2) {
		elAlertExplain.value = text2;
		eventInput = new Event('input');
		elAlertExplain.dispatchEvent(eventInput);
	}
}

// Find the bidding box element and check if new data present in the clipboard
function getBiddingBox() {
var adPanel = document.getElementById("bbo_ad1_i");
adPanel.style.backgroundColor = "rgb(240, 238, 208)";
	cleanAdPanel();
	setAdPanel();
	elMessage = getVisibleMessageInput();
	if (elMessage != null) {
		elMessage.addEventListener('keyup', messageOnKeyup);
	}
	//	getClipboardData();
	elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox != null) {
		elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
		if (elAlertExplain != null) {
			elAlertExplain.addEventListener('keyup', explainOnKeyup);
		}
		//		console.log("Biddingbox present");
		elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
		if (elBiddingButtons != null) {
			setButtonEvents();
			//			console.log(elAlertExplain);
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
	//	console.log("Save Alert");
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
	explainText = elAlertExplain.value;
	if (explainText == "") return;
	alertText = findAlert(getContext(), callText).trim();
	if (explainText != alertText) {
		newrec = stripContext(getContext()) + "," + callText + "," + explainText;
//		console.log("New record " + newrec)
		alertTable.push(newrec);
		dealElement = document.querySelector('.vulPanelInnerPanelClass');
		updateText = updateText + newrec + "," + getNow() + " Deal " + dealElement.outerText + "\n";
		updateCount++;
		writeToClipboard(updateText);
		//		console.log(updateText);
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
		//		console.log(callText);
		getAlert();
	};
	elBiddingButtons[7].addEventListener("touchstart", function() {
		callText = callText[0] + "C";
		//		console.log(callText);
		getAlert();
	});
	elBiddingButtons[8].onmousedown = function() {
		callText = callText[0] + "D";
		//		console.log(callText);
		getAlert();
	};
	elBiddingButtons[8].addEventListener("touchstart", function() {
		callText = callText[0] + "D";
		//		console.log(callText);
		getAlert();
	});
	elBiddingButtons[9].onmousedown = function() {
		callText = callText[0] + "H";
		//		console.log(callText);
		getAlert();
	};
	elBiddingButtons[9].addEventListener("touchstart", function() {
		callText = callText[0] + "H";
		//		console.log(callText);
		getAlert();
	});
	elBiddingButtons[10].onmousedown = function() {
		callText = callText[0] + "S";
		//		console.log(callText);
		getAlert();
	};
	elBiddingButtons[10].addEventListener("touchstart", function() {
		callText = callText[0] + "S";
		//		console.log(callText);
		getAlert();
	});
	elBiddingButtons[11].onmousedown = function() {
		callText = callText[0] + "N";
		getAlert();
	};
	elBiddingButtons[11].addEventListener("touchstart", function() {
		callText = callText[0] + "N";
		//		console.log(callText);
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