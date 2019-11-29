var timerId;
var elBiddingBox = null;
var elBiddingButtons = null;
var elAlertExplain = null;
var eTable;
var eventInput = new Event('input');
var callText = "";
var updateText = "";
var cbData = "";
var alertData = "";

alertTable = null;
/* force user interface language to english*/
console.log("Navigator language = " + window.navigator.language);
if (document.location != 'https://www.bridgebase.com/v3/?lang=en') {
document.location = "https://www.bridgebase.com/v3/?lang=en";
}

/* 
Get actual date and time
*/
function getNow() {
	now = new Date();
	yyyy = now.getFullYear().toString();
	mm = now.getMonth().toString();
	dd = now.getDate().toString();
	hh = now.getHours().toString();
	mn = now.getMinutes().toString();
	return yyyy + mm + dd + "_" + hh + ":" + mn;
}

/*
Get actual bidding context
*/
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

/*
Write text to clipboard
*/
function writeToClipboard(txt) {
	navigator.clipboard.writeText(txt).then(function() {
	}
		, function() {
		}
	);
}

/*
Retrieve text from clipboard
*/
function getClipboardData() {
	navigator.clipboard.readText().then(function(cbData) {
		console.log("Clipboard length = " + cbData.length);
		if (!cbData.startsWith("BBOalert")) {
			if (alertData == "") {
				alert("Alert table not found in the clipboard\n\n \
Open alert table text file, select all text and copy to clipboard")
				alertTable = null;
			}
			return;
		}
		if (alertData.length == cbData.length) {
			console.log("Same table in clipboard");
			return;
		}
		alertData = cbData;
		alertTable = alertData.split("\n");
		alert("Alert table retrieved from clipboard\n\n \
BBOalert ready")
		console.log("Table length = " + alertTable.length);
		return;
	}
	);
}

/*
Find explanation text for alerted call in the bidding context
*/
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

/*
Check chat box for eventual shortcut and replace it by the text from table
*/
function messageOnKeyup(key) {
	elMessage = document.querySelector("[placeholder=\"Message\"]");
	msgText = findAlert("Message", elMessage.value);
	console.log("Message " + elMessage.value + " replace by " + msgText);
	if (msgText != "") elMessage.value = msgText;
}

/*
Find the bidding box
*/
function getBiddingBox() {
	elMessage = document.querySelector("[placeholder=\"Message\"]");
	if (elMessage == null) {
		return
	}
	elMessage.addEventListener('keyup', messageOnKeyup);
	getClipboardData();
	elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox != null) {
		if (elBiddingButtons == null) {
			elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
			setButtonEvents();
			console.log("Biddingbox present");
			console.log(elAlertExplain);
		}
	}
	else {
		elBiddingButtons = null;
	}
};
timerId = setInterval(() => getBiddingBox(), 2000);

/*
Clear explanation text field
*/
function clearAlert() {
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
	elAlertExplain.value = "";
	elAlertExplain.dispatchEvent(eventInput);
};

/*
Retrieve text from the chat box
*/
function getMessage() {
	elMessage = document.querySelector("[placeholder=\"Message\"]");
	return elMessage.value;
}

/*
Set message text in the chat box
*/
function setMessage(msg) {
	elMessage = document.querySelector("[placeholder=\"Message\"]");
	elMessage.value = msg;
}

/*
Search for explanation text and set in in the bidding box
*/
function getAlert() {
	console.log("Get Alert");
	elAlertExplain = elBiddingBox.querySelector("[placeholder=\"Explain\"]");
	elAlertExplain.value = findAlert(getContext(), callText).trim();
	elAlertExplain.dispatchEvent(eventInput);
};

/*
Append current explanation text, if not found in the alert table
*/
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

/*
Set action for each bidding box button
*/
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
		getAlert();
	};
	elBiddingButtons[8].onmousedown = function() {
		callText = callText[0] + "D";
		getAlert();
	};
	elBiddingButtons[9].onmousedown = function() {
		callText = callText[0] + "H";
		getAlert();
	};
	elBiddingButtons[10].onmousedown = function() {
		callText = callText[0] + "S";
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
