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

var scriptList = [];
var alertTableCursor = 0;
var clipBoard = navigator.clipboard;
var lastDealNumber = '';
//const DATABEGIN = '↔';
const DATABEGIN = '⬛';

if (window.location.href.startsWith("https://www.dropbox.com/")) {
	console.log('Dropbox : ' + window.location.href);
	var lst = 'Dropbox\n';
	var links = document.querySelectorAll("a.sl-link--file");
	for (var i = 0; i < links.length; i++) {
		lst = lst + links[i].href + '\n';
	}
	lst = lst + 'End\n';
	writeToClipboard(lst);
	window.close();
}


/**
 * @ignore
 */
function receiveMessageCC(event) {
	if (event.origin != 'https://www.bridgebase.com') return;
	if (event.data.length == 0) return;
	if (event.data.startsWith("onlyCC")) {
		setCC(event.data);
		return;
	}
	alertData = event.data;
	setCC(alertData);
	// BBOalert data is appended to the Carding field
	var tac = document.getElementById('carding');
	if (tac == null) return;
	var idb = tac.value.indexOf(DATABEGIN);
	if (idb == -1) idb = tac.value.length;
	tac.value = tac.value.slice(0, idb) + "\n" + DATABEGIN + stringToCC(event.data);
	var eventInput = new Event('input');
	tac.dispatchEvent(eventInput);
	var sb = document.getElementById('saveButton');
	// Make document dirty to activate the 'Save' button
	var changeEvent = new Event('change');
	tac.dispatchEvent(changeEvent);
}

function setCC(CCtxt) {
	var changeEvent = new Event('change');
	alertData = CCtxt;
	alertTable = alertData.split('\n');
	var scan = new BBOalertData();
	scan.trimOn = false;
	var txt = '';
	var ccText = '';
	var el = null;
	while ((txt = scan.getNextRecord()) != null) {
		var rec = txt.split(",");
		//		if (rec.length < 3) continue;
		if (rec[0].trim() == 'CC') {
			if (rec.length > 2) {
				el = document.getElementById(rec[1].trim());
				if (el != null) {
					//					el.style.fontFamily = "arial";
					ccText = rec[2].split(/\\n/).join('\n');
					el.value = ccText;
					el.dispatchEvent(changeEvent);
					ccText = '';
				}
				ccText = '';
			} else if (rec.length == 2) {
				if (el != null) {
					//					el.style.fontFamily = "arial";
					el.value = ccText;
					el.dispatchEvent(changeEvent);
					ccText = '';
				}
				el = document.getElementById(rec[1].trim());
			} else if (rec.length == 1) {
				if (el != null) {
					//					el.style.fontFamily = "arial";
					el.value = ccText;
					el.dispatchEvent(changeEvent);
					ccText = '';
				}
			}
		} else {
			if (el != null) ccText = ccText + replaceSpacesByUnderscore(txt) + "\n";
		}
	}

}

/**
 * @ignore
 */
function receiveMessageBBO(event) {
	// Skip if message not coming from the CC page
	if (event.origin != 'https://webutil.bridgebase.com') return;
	// Send alert data to the CC page on import request 
	if (event.data == 'Import') {
		event.source.postMessage(getBBOalertData(), event.origin);
		// Otherwise the message from Convention Card page is considered BBOalert data
	} else if (event.data == 'getCC') {
		navigator.clipboard.readText().then((cbData) => {
			event.source.postMessage("onlyCC\n" + cbData, event.origin);
		});
		// Otherwise the message from Convention Card page is considered BBOalert data
	} else {
		try {
			if (event.data.length == 0) return;
			console.log("event data = " + event.data);
			execIframeMessage("alertOriginal=data.msg; makeAlertData();", event.data, null);
			/*
			alertData = event.data;
			alertOriginal = alertData;
			bboalertLog(version + "<br>Reading data<br>");
			setTimeout(() => {
				updateAlertDataAsync(alertOriginal, function () {
					if (alertData == null) alertData = 'BBOalert\n';
					alertTable = alertData.split("\n");
					saveAlertTableToClipboard();
					processTable();
					displayHeaders();
					addBBOalertLog("<br>" + alertTable.length + " records from CC");
					setTimeout(function () {
						setOptions(true);
					}, 200);
				});
			}, 1000);
			*/
		} catch {}
	}

}

function Clipboard2CC() {}


function CCfromClipboard() {
	window.parent.postMessage('getCC', '*');
}

/**
 * @ignore
 */
function BBOalert2CC() {
	window.parent.postMessage('Import', '*');
}

/**
 * @ignore
 */
 function CC2BBOalert() {
	tac = document.getElementById('carding');
	if (tac == null) return;
	var idb = tac.value.indexOf(DATABEGIN);
	if (idb == -1) return;
	window.parent.postMessage(CCtoString(tac.value.slice(idb + 1)), '*');
}



function replaceUnderscoreOnCC() {
	var ccd = document.getElementById('ccDiv');
	var tas = ccd.querySelectorAll('textarea');
	var fs = "\u2007";
	for (var i = 0; i < tas.length; i++) {
		tas[i].value = tas[i].value.replace(/_/g, fs);
		$(tas[i]).trigger("change");
	}
}

function replaceSpacesByUnderscore(txt) {
	var txt1 = txt.replace(/ /g, '_').slice(0, 40);
	while (txt1.length < 40) txt1 = txt1 + '_';
	return txt1;
}


/**
 * @ignore
 */
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
	//	d.style.width = bd.style.width;
	d.style.height = '30px';
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
	var bc3 = document.createElement("button");
	bc3.textContent = "Import CC";
	bc3.id = 'bboalert-c3';
	//	bc2.style.fontSize = "16px";
	bc3.style.height = '100%';
	bc3.onclick = CCfromClipboard;
	d.appendChild(bc3);
	var sb = document.getElementById('saveButton');
	if (sb == null) return;
	sb.onmousedown = replaceUnderscoreOnCC;
	var tb = document.getElementById("entireTable");
	ccd.insertBefore(d, tb);
	$("#titleEdit").width(100);
	$("#ccDiv").css("top", "90px");
}


/* CC feature disabled
if (location.href.startsWith('https://webutil.bridgebase.com/v2/v2cc/v2cc.html')) {
	window.addEventListener("message", receiveMessageCC, false);
	addCCbuttons();
} else if (location.href.startsWith('https://webutil.bridgebase.com/v2')) {} else {
	window.addEventListener("message", receiveMessageBBO, false);
	$("#titleEdit").width(100);
	$("#ccDiv").css("top", "90px");
}
*/

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
function stringToCC(s) {
	ref = shiftChars(s, 256);
	var t = '';
	for (i = 0; i < ref.length; i = i + 30) {
		t = t + '\n' + ref.substr(i, 30);
	}
	return t;
}

/**
 * @ignore
 */
function CCtoString(s) {
	if (s == undefined) return '';
	if (s == null) return '';
	if (s == '') return '';
	var ref = s.replace(/ /g, '');
	if (getDataType(s) == 'BBOalert') {
		ref = ref.replace(/←/g, '\n');
		ref = ref.replace(/→/g, '\t');
		ref = ref.replace(/↓/g, '!');
		ref = ref.replace(/…/g, ' ');
	} else {
		return shiftChars(ref.replace(/\n/g, ""), -256);
	}
	return ref;
}

/**
 * @ignore
 */
function getDataType(data) {
	header = data.slice(0, 80);
	if (header.startsWith("https://")) return "URL";
	if (header.search(/bboalert/i) != -1) return 'BBOalert';
	if (header.indexOf('*00') != -1) return 'BSS';
	if (header.indexOf('?00') != -1) return 'BSS';
	return '';
}

function shiftChars(s, d) {
	var s1 = s.split('');
	for (var i = 0; i < s1.length; i++) {
		s1[i] = String.fromCharCode(s1[i].charCodeAt(0) + d);
	}
	return s1.join('');
}

function setBBOalertData(text) {
	if (document.getElementById("BBOalertOriginal") == null) {
		var d = document.createElement("data");
		d.id = "BBOalertOriginal";
		document.body.appendChild(d);
	}
	d = document.getElementById("BBOalertOriginal");
	d.value = text;
}

function getBBOalertData() {
	if (document.getElementById("BBOalertOriginal") == null) {
		var d = document.createElement("data");
		d.id = "BBOalertOriginal";
		document.body.appendChild(d);
		return "";
	}
	d = document.getElementById("BBOalertOriginal");
	return d.value;
}

// Elimine spaces and tabs
function elimineSpaces(str) {
	var s = str.replace(/\s+/g, '');
	s = s.replace(/\t+/g, '');
	return s;
}
