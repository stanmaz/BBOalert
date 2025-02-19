function getBBOalertHeaderMsg() {
	try {
		var r = alertTable[0].split(',')[1];
		if (r == undefined) return '';
		if (alertTable[0].toUpperCase().indexOf('BBOALERT') == -1) return '';
		return ' ' + r.trim() + ' ';
	} catch {
		return '';
	}
}

/**
 * execute script
 * @param {string} S Javascript code
 * @param {string} CR  context field (optional) 
 * @param {string} C  current bidding context (optional) 
 * @param {string} BR  call field (optional) 
 * @param {string} B  current call (optional)
 * @returns R = value of reserved variable
 */
function userScript(S, CR, C, BR, B) {
	R = '';
	try {
		eval(S);
		return R;
	} catch (error) {
		addLog('Error in script');
		addLog(error);
		addLog(S);
		return 'ERROR';
	}
}

/**
 * tranform string s into RegExp object
 * @param {string} s
 * @returns {RegExp}
 */
function makeRegExp(s) {
	var re;
	if (s.startsWith('/') && s.endsWith('/')) {
		re = new RegExp(s.slice(1, s.length - 1));
	} else {
		var ref = s.replace(/\*/g, '.');
		ref = ref.replace(/_/g, '.');
		re = new RegExp(ref);
	}
	return re;
}

/**
 * @ignore
 */
function setPageReload() {
	var nb = parent.document.querySelector('.navBarClass');
	if (nb == null) return;
	var nadc = nb.querySelector('.nonAnonDivClass');
	if (nadc == null) return;
	var lob = nadc.querySelector('button');
	if (lob == null) return;
	if (lob.onclick == null) lob.onclick = preparePageReload;
}

/**
 * @ignoreµ
 */
function preparePageReload() {
	var db = parent.document.querySelector('mat-dialog-container');
	if (db == null) return;
	var bt = db.querySelector('button');
	if (bt == null) return;
	bt.onclick = pageReload;
}

/**
 * @ignore
 */
function pageReload() {
	setOptions(false);
}

/**
 * @ignore
 */
function normalize(s) {
	return elimine2Spaces(s.replace(/,+/g, ';')).trim();
}


/**
 * @ignore
 */
function addLog(txt) {
	logText = logText + getNow(true) + ',' + txt + '\n';
}

/**
 * @ignore
 */
function exportLogData() {
	bboalertLog(version + "<br>" + (logText.split('\n').length - 1) + ' records exported');
	writeToClipboard(logText);
}

/**
 * @ignore
 */
var triggerDragAndDrop = function (selectorDrag, selectorDrop, dist) {

	// function for triggering mouse events
	var fireMouseEvent = function (type, elem, centerX, centerY) {
		var evt = parent.document.createEvent('MouseEvents');
		evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
		elem.dispatchEvent(evt);
	};

	// fetch target elements
	var elemDrag = parent.document.querySelector(selectorDrag);
	var elemDrop = parent.document.querySelector(selectorDrop);
	if (!elemDrag || !elemDrop) return false;

	// calculate positions
	var pos = elemDrag.getBoundingClientRect();
	var center1X = Math.floor((pos.left + pos.right) / 2);
	var center1Y = Math.floor((pos.top + pos.bottom) / 2);
	pos = elemDrop.getBoundingClientRect();
	var center2X = Math.floor((pos.left + pos.right) / 2) + dist;
	var center2Y = Math.floor((pos.top + pos.bottom) / 2);

	// mouse over dragged element and mousedown
	fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
	fireMouseEvent('mouseenter', elemDrag, center1X, center1Y);
	fireMouseEvent('mouseover', elemDrag, center1X, center1Y);
	fireMouseEvent('mousedown', elemDrag, center1X, center1Y);

	// start dragging process over to drop target
	fireMouseEvent('dragstart', elemDrag, center1X, center1Y);
	fireMouseEvent('drag', elemDrag, center1X, center1Y);
	fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
	fireMouseEvent('drag', elemDrag, center2X, center2Y);
	fireMouseEvent('mousemove', elemDrop, center2X, center2Y);

	// trigger dragging process on top of drop target
	fireMouseEvent('mouseenter', elemDrop, center2X, center2Y);
	fireMouseEvent('dragenter', elemDrop, center2X, center2Y);
	fireMouseEvent('mouseover', elemDrop, center2X, center2Y);
	fireMouseEvent('dragover', elemDrop, center2X, center2Y);

	// release dragged element on top of drop target
	fireMouseEvent('drop', elemDrop, center2X, center2Y);
	fireMouseEvent('dragend', elemDrag, center2X, center2Y);
	fireMouseEvent('mouseup', elemDrag, center2X, center2Y);

	return true;
};

/**
 * @ignore
 */
function isUndoCommand(t) {
	if (t.search('Undo') != -1) return true;
	if (t.search('悔牌') != -1) return true;
	if (t.search('Fortryd') != -1) return true;
	if (t.search('Ακύρωση') != -1) return true;
	if (t.search('Deshacer') != -1) return true;
	if (t.search('בטל') != -1) return true;
	if (t.search('Visszavonás') != -1) return true;
	if (t.search('やり直す') != -1) return true;
	if (t.search('Ongedaan maken') != -1) return true;
	if (t.search('Angre') != -1) return true;
	if (t.search('Cofnij') != -1) return true;
	if (t.search('Desfazer') != -1) return true;
	if (t.search('Cere înapoi') != -1) return true;
	if (t.search('Geri al') != -1) return true;
	if (t.search('Merusak') != -1) return true;
	if (t.search('Zpět') != -1) return true;
	if (t.search('Откат') != -1) return true;
	if (t.search('Vraćanje') != -1) return true;
	if (t.search('Pöydän asetukset') != -1) return true;
	if (t.search('重來') != -1) return true;
	if (t.search('Ångra') != -1) return true;
	return false;
}

/**
 * @ignore
 */
function isTable(t) {
	if (t.search('→Table') != -1) return true;
	if (t.search('→Маса') != -1) return true;
	if (t.search('→牌 桌') != -1) return true;
	if (t.search('→Bord') != -1) return true;
	if (t.search('→Tisch') != -1) return true;
	if (t.search('→Τραπέζι') != -1) return true;
	if (t.search('→Table') != -1) return true;
	if (t.search('→Asztal') != -1) return true;
	if (t.search('→Tavolo') != -1) return true;
	if (t.search('→テーブル') != -1) return true;
	if (t.search('→Tafel') != -1) return true;
	if (t.search('→Stół') != -1) return true;
	if (t.search('→Mesa') != -1) return true;
	if (t.search('→Masa') != -1) return true;
	if (t.search('→Tabel') != -1) return true;
	if (t.search('→Stůl') != -1) return true;
	if (t.search('→Стол') != -1) return true;
	if (t.search('→Stol') != -1) return true;
	if (t.search('→Pöytä') != -1) return true;
	if (t.search('→牌桌') != -1) return true;
	return false;
}

/**
 * @ignore
 */
function isOpponents(t) {
	if (t.search('→Opponents') != -1) return true;
	if (t.search('→Противници') != -1) return true;
	if (t.search('→对手') != -1) return true;
	if (t.search('→Modstandere') != -1) return true;
	if (t.search('→Gegner') != -1) return true;
	if (t.search('→Αντίπαλοι') != -1) return true;
	if (t.search('→Oponentes') != -1) return true;
	if (t.search('→Adversaires') != -1) return true;
	if (t.search('→Ellenfelek') != -1) return true;
	if (t.search('→Avversari') != -1) return true;
	if (t.search('→対戦相手') != -1) return true;
	if (t.search('→Tegenstanders') != -1) return true;
	if (t.search('→Motstandere') != -1) return true;
	if (t.search('→Przeciwnicy') != -1) return true;
	if (t.search('→Adversários') != -1) return true;
	if (t.search('→Adversari') != -1) return true;
	if (t.search('→Rakipler') != -1) return true;
	if (t.search('→Penentang') != -1) return true;
	if (t.search('→Soupeři') != -1) return true;
	if (t.search('→Оппоненты') != -1) return true;
	if (t.search('→Protivnici') != -1) return true;
	if (t.search('→Vastustajille') != -1) return true;
	if (t.search('→Motståndare') != -1) return true;
	return false;
}



/**
 * @ignore
 * match vulnerability and seat conditions in text
 * @param {*} v 
 * @param {*} V 
 * @param {*} s 
 * @param {*} t 
 */
function matchVulSeat(v, V, s, t) {
	// set option only during the first round of bidding
	if (s == '') return '';
	// Check if seat dependence specified
	if ((t.indexOf('@1') > 0) || (t.indexOf('@2') > 0) || (t.indexOf('@3') > 0) || (t.indexOf('@4') > 0)) {
		if (t.indexOf(s) == -1) return 'N';
	}
	// Check if our vulnerability dependence specified
	if ((t.indexOf('@n') > 0) || (t.indexOf('@v') > 0)) {
		if (t.indexOf(v) == -1) return 'N';
	}
	// Check if their vulnerability dependence specified
	if ((t.indexOf('@N') > 0) || (t.indexOf('@V') > 0)) {
		if (t.indexOf(V) == -1) return 'N';
	}
	return 'Y';
}

/**
 * Check if element e is visible
 */
function isVisible(e) {
	if (e == null) return false;
	if (e == undefined) return false;
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

/**
 * get formatted actual date and time
 * if secs=true resultion up to seconds
 */
function getNow(secs) {
	var now = new Date();
	var yyyy = now.getFullYear().toString();
	var m = now.getMonth() + 1;
	var mm = m.toString();
	if (mm.length == 1) mm = '0' + mm;
	var dd = now.getDate().toString();
	if (dd.length == 1) dd = '0' + dd;
	var hh = now.getHours().toString();
	if (hh.length == 1) hh = '0' + hh;
	var mn = now.getMinutes().toString();
	if (mn.length == 1) mn = '0' + mn;
	if (!secs) return yyyy + mm + dd + "_" + hh + ":" + mn;
	var ss = now.getSeconds().toString();
	if (ss.length == 1) ss = '0' + ss;
	return yyyy + mm + dd + "_" + hh + ":" + mn + ":" + ss;
}

/**
 * elimine spaces and tabs from string str
 */
function elimine2Spaces(str) {
	var s = str.replace(/\t+/g, ' ');
	s = s.replace(/\u0020\u0020+/g, ' ');
	return s;
}


// Elimine spaces and tabs
function elimineSpaces(str) {
	var s = str.replace(/\s+/g, '');
	s = s.replace(/\t+/g, '');
	return s;
}

/**
 * @ignore
 */
function readFromClipboard(callback) {
	navigator.clipboard.readText().then((cbData) => {
		callback(cbData);
	});
}

/**
 * copy string txt to the clipboard
 */
function writeToClipboard(txt) {
	navigator.clipboard.writeText(txt).then(function () { }, function () { });
}

/**
 * Strip context ctx from leading passes
 */
function stripContext(ctx) {
	if (ctx.startsWith('------')) return ctx.substr(6);
	if (ctx.startsWith('----')) return ctx.substr(4);
	if (ctx.startsWith('--')) return ctx.substr(2);
	return ctx;
}

/**
 * @ignore
 */
function decodeOption(opt) {
	if (opt.length != 2) return opt;
	optText = '';
	if (opt.slice(0, 1) == '1') optText = optText + '@1';
	if (opt.slice(0, 1) == '2') optText = optText + '@2';
	if (opt.slice(0, 1) == '3') optText = optText + '@3';
	if (opt.slice(0, 1) == '4') optText = optText + '@4';
	if (opt.slice(0, 1) == '5') optText = optText + '@1@2';
	if (opt.slice(0, 1) == '6') optText = optText + '@3@4';
	if (opt.slice(1, 2) == '1') optText = optText + '@n@N';
	if (opt.slice(1, 2) == '2') optText = optText + '@v@N';
	if (opt.slice(1, 2) == '3') optText = optText + '@n@V';
	if (opt.slice(1, 2) == '4') optText = optText + '@v@V';
	if (opt.slice(1, 2) == '5') optText = optText + '@n';
	if (opt.slice(1, 2) == '6') optText = optText + '@v';
	if (opt.slice(1, 2) == '7') optText = optText + '@N';
	if (opt.slice(1, 2) == '8') optText = optText + '@V';
	return optText;
}

/**
 * @ignore
 */
function translateCall(call) {
	if (call == 'D') return 'Db';
	if (call == 'Dbl') return 'Db';
	if (call == 'Ktr.') return 'Db';
	if (call == 'Ktr') return 'Db';
	if (call == 'ктр') return 'Db';
	if (call == 'X') return 'Db';
	if (call == 'Rktr') return 'Rd';
	if (call == 'рктр') return 'Rd';
	if (call == 'Rdbl') return 'Rd';
	if (call == 'RD') return 'Rd';
	if (call == 'XX') return 'Rd';
	if (call == 'p') return '--';
	if (call == 'P') return '--';
	if (call == 'Pass') return '--';
	if (call == 'Pas') return '--';
	if (call == 'Paso') return '--';
	if (call == 'пас') return '--';
	el = call;
	if (el.length > 1) {
		el = el.substr(0, 2);
		if (el.charCodeAt(1) == 9827) {
			return el[0] + 'C';
		}
		if (el.charCodeAt(1) == 9830) {
			return el[0] + 'D';
		}
		if (el.charCodeAt(1) == 9829) {
			return el[0] + 'H';
		}
		if (el.charCodeAt(1) == 9824) {
			return el[0] + 'S';
		}
		return el[0] + 'N';
	}
	return el;
}

/**
 * get seat number tag of the openeer
 */
function getSeatNr() {
	var c = getContext();
	if (c.startsWith('------')) return '@4';
	if (c.startsWith('----')) return '@3';
	if (c.startsWith('--')) return '@2';
	return '@1';
}

/**
 * Get actual bidding context
 */
function getContext() {
    var nd;
	if ((nd = getNavDiv()) == null) return '??';
	var ctx = '';
	var bs = nd.querySelector('bridge-screen');
	if (bs == null) {
		return "??";
	}
	var auctionBox = nd.querySelector('auction-box');
	if (auctionBox == null) {
		return "??";
	}	
	var auction = auctionBox.querySelectorAll('.auction-cell');
	if (auction.length == 0) {
		return "";
	}
	for (var i = 0; i < auction.length; i++) {
		el = translateCall(auction[i].textContent);
		ctx = ctx + el;
		//	Translate Double, Redouble and Pass from different language interfaces
	}
	return ctx;
}


/**
 * @ignore
 */
function matchContextOld(refContext, actContext) {
	if (refContext == actContext) return true;
	if (refContext.length != actContext.length) return false;
	for (var j = 0; j < refContext.length; j++) {
		if (refContext.substr(j, 1) == '_') continue;
		if (refContext.substr(j, 1) == '*') continue;
		if (refContext.substr(j, 1) != actContext.substr(j, 1)) return false;
	}
	return true;
}

/**
 * Check if actual bidding context matches refeence context from the table
 */
function matchContext(refContext, actContext) {
	var re;
	try {
		if (refContext.startsWith('/') && refContext.endsWith('/')) {
			re = new RegExp(refContext.slice(1, refContext.length - 1));
			return re.test(actContext);
		}
		if (refContext.startsWith('/')) {
			var idx_dollar = refContext.indexOf("$");
			var ref = refContext.replaceAll("\/", "").replaceAll("$", "");
			if (idx_dollar != -1) ref = ref + "$";
			re = new RegExp(ref);
			return re.test(actContext);
		}
		if (matchContextOld(refContext, actContext)) return true;
		var ref = refContext.replace(/\*/g, '.');
		ref = ref.replace(/_/g, '.');
		ref = '^' + ref + '$';
		re = new RegExp(ref);
		if (!re.test(actContext)) return false;
		return (actContext.match(re)[0].length == actContext.length);
	} catch {
		return false;
	}
}


/**
 * @ignore
 */
function clearOptionsSelector() {
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector == null) return;
	for (var i = optionsSelector.options.length; i > 2; i--) {
		optionsSelector.remove(i);
	}
	optionsSelector.selectedIndex = 0;
}

function saveRecentURL() {
	var fileSelector = document.getElementById("bboalert-menu-file");
	if (fileSelector == null) return;
	var txt = "";
	for (var i = 9; i < fileSelector.options.length; i++) {
		txt = txt + fileSelector.options[i].label + "," + fileSelector.options[i].value + "\n";
	}
	window.localStorage.setItem("BBOAlertRecentURL", txt);
}

function loadRecentURL() {
	var fileSelector = document.getElementById("bboalert-menu-file");
	if (fileSelector == null) return;
	var txt = "";
	for (let i = fileSelector.options.length - 1; i >= 9; i--) {
		fileSelector.options.remove(i);
	}
	txt = window.localStorage.getItem("BBOAlertRecentURL");
	if (txt == null) return;
	var t = txt.split("\n");
	for (let i = 0; i < t.length; i++) {
		let r = t[i].split(",");
		if (DEBUG) console.log(i + " " + r[0] + " " + r[1]);
		if (r[0] == "") continue;
		importedURL = r[1];
		addRecentURL(r[0], r[1]);
	}
}


function clearRecentURL() {
	var fileSelector = document.getElementById("bboalert-menu-file");
	if (fileSelector == null) return;
	for (var i = fileSelector.options.length - 1; i >= 9; i--) {
		fileSelector.options.remove(i);
	}
	saveRecentURL();
	$(fileSelector.options[8]).hide();
}

function addRecentURL(label, url) {
	var fileSelector = document.getElementById("bboalert-menu-file");
	if (fileSelector == null) return;
	if (label == "") return;
	if (url == "") return;
	if (makeDirectLink(importedURL) != url) return;
	var lbl = label.replaceAll("<br>", "");
	lbl = lbl.replaceAll("<b>", "");
	lbl = lbl.replaceAll("</b>", "");
	for (var i = 9; i < fileSelector.options.length; i++) {
		if (fileSelector.options[i].value == url) {
			fileSelector.options.remove(i);
		}
	}
	var opt = new Option(lbl, url);
	opt.style.backgroundColor = "LightGray";
	fileSelector.add(opt, 9);
	$(fileSelector.options[8]).show();
	saveRecentURL();
}

function isSettingON(idx) {
	var sm = $("#bboalert-menu-settings")[0];
	if (idx >= sm.options.length) return false;
	return sm.options[idx].textContent.startsWith(CHECKED_CHAR);
}

function saveSettings() {
	var sm = $("#bboalert-menu-settings")[0];
	// Save settings to cache
	var s = '';
	for (var i = 1; i < sm.options.length; i++) {
		if (sm.options[i].textContent.startsWith(CHECKED_CHAR)) s = s + 'Y';
		else s = s + 'N';
	}
	localStorage.setItem("BBOalertSettings", s);
}

function restoreSettings() {
	var s = localStorage.getItem('BBOalertSettings');
	if (s == null) s = "NNNN"
	var sm = $("#bboalert-menu-settings")[0];
	for (var i = 0; i < s.length; i++) {
		if (s.charAt(i) == 'Y')
			if (!sm.options[i + 1].textContent.startsWith(CHECKED_CHAR))
				sm.options[i + 1].textContent = CHECKED_CHAR + sm.options[i + 1].textContent;
		if (s.charAt(i) == 'N')
			if (sm.options[i + 1].textContent.startsWith(CHECKED_CHAR))
				sm.options[i + 1].textContent = sm.options[i + 1].textContent.slice(1);
	}
	hideUnusedOptions();
}

/**
 * display text on the BBOalert blue panel
 */
function bboalertLog(txt) {
	var p1 = document.getElementById('bboalert-p1');
	if (p1 == null) return;
	p1.innerHTML = '';
	p1.innerHTML = txt;
}

function addBBOalertLog(txt) {
	var p1 = document.getElementById('bboalert-p1');
	if (p1 == null) return;
	p1.innerHTML = p1.innerHTML + txt;
}


/**
 * @ignore
 */
function documentOnKeyup(key) {
	if (key.altKey) {
		setChatMessage('Alt' + key.key.toUpperCase(), true);
		sendChat();
	}
}


/**
 * @ignore
 */
function getPartnerAlert() {
	var partnerContext = getContext().slice(0, -4);
	var partnerCall = getContext().slice(-4, -2);
	return findAlert(partnerContext, partnerCall);
}



/**
 * sen chat text to both opponents
 */
function sendMessageToOpponents(text) {
	sendPrivateChat(myOpponent(true), text);
	sendPrivateChat(myOpponent(false), text);
}

/**
 * reverse characters in the strin
 */
function reverseString(str) {
	return str.split("").reverse().join("");
}

/**
 * make element draggeable
 */
function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}


	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}

}

function getBBOalertHeader(data) {
	var txt = '';
	var scan = new BBOalertData();
	scan.setData(data);
	while ((txt = scan.getNextLine()) != null) {
		var rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim().toUpperCase().indexOf('BBOALERT') != -1) {
				if (rec[0].trim() != '') {
					return rec[1].trim();
				}
			}
		}
	}
	return "";
}

function updateAlertDataAsync(at, callback) {
	function findURL(url, parent) {
		var idx = parent;
		if (parent == -1) return false;
		while (idx != -1) {
			if (urls[idx] == url) return true;
			idx = parents[idx];
		}
		return false;
	}

	function addrecs(txt, to, parent) {
		if (txt != null) {
			var ti = txt.split('\n');
			ti.forEach((element) => {
				var r = element.split(',');
				var last = to.length;
				to.push(element);
				var r0 = r[0].trim();
				if ((r0 == 'Import') || (r0 == 'Javascript') || (r0 == '//Javascript')) {
					if (r.length == 1) return;
					if (r.length == 2) {
						var r1 = r[1].trim();
						if (!r1.startsWith("https:")) {
							r2 = URLmap.get(r1);
							if (r2 == undefined) return;
							r[1] = r2;
						}
					}
					if (r.length > 2) {
						URLmap.set(r[1].trim(), r[2].trim());
						return;
					}
					urlOriginal = r[1].trim();
					var url = makeDirectLink(urlOriginal);
					if (findURL(url, parent)) {
						if (DEBUG) console.log('Error : circular reference :');
						if (DEBUG) console.log('to  ' + url);
						if (DEBUG) console.log('in  ' + urls[parent]);
					} else {
						if (DEBUG) console.log(' Reading ' + url);
						urls.push(url);
						parents.push(parent);
						var myIdx = urls.length - 1;
						pending++;
						fetchWebData(url, function (data) {
							if (DEBUG) console.log('Done    ' + url);
							data = HTMLpage2text(data, url, urlOriginal);
							if (DEBUG) console.log('Header  ' + getBBOalertHeader(data));
							addRecentURL(getBBOalertHeader(data), url);
							if (data != '') {
								if (r0 == 'Import') {						
									to[last] = [];
									addrecs(data, to[last], myIdx);
								} else {
									to[last] = [];
									JS = data;
									eval(data);
									addrecs("**//Javascript," + url, to[last], myIdx);
								}
							}
						},
							function (error) {
								if (DEBUG) console.log('Error  ' + error + ' ' + url);
								addBBOalertLog('<br>Error<br>' + error + ' ' + url);
								addBBOalertLog('<br>Export Log<br>');
								to[last] = [];
								addrecs(('Error\n' + error + ' ' + url), to[last]);
							});
					}
				}
			});
		}
		pending--;
		if (pending == 0) {
			//			console.timeEnd("Read time");
			timer = Date.now() - timer;
			if (DEBUG) console.log('Total ' + tab.flat(999).length + ' records in ' + timer / 1000 + " secs");
			alertData = parseMarkdown(tab.flat(999).join('\n'));
			callback();
		}
	}
	var tab = [];
	var urls = [];
	var URLmap = new Map ();
	var parents = [];
	var pending = 1;
	var timer = Date.now();
	initBBOalertEvents();
	initInfoSelector();
	clearConfigMenu();
    PluginInit();
	addrecs(at, tab, -1);
}



function shiftChars(s, d) {
	var s1 = s.split('');
	for (var i = 0; i < s1.length; i++) {
		s1[i] = String.fromCharCode(s1[i].charCodeAt(0) + d);
	}
	return s1.join('');
}

function loadScript(url) {
	var url1 = makeDirectLink(url);
	if (DEBUG) console.log('Load JS ' + url1);
	var script = document.createElement('script');
	script.src = url1;
	script.type = "text/javascript";
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(script);
}

function isAutoShortcutsEnabled() {
	return isSettingON(1);
}

function isCollapseOptionsEnabled() {
	return isSettingON(4);
}

function isHoverTopEnabled() {
	return isSettingON(2);
}

function isHoverEnabled() {
	return isSettingON(3);
}


function initBBOalertEvents() {
	var ue = document.body.querySelector("bboalert-events");
	if (ue != null) ue.parentNode.removeChild(ue);
	ue = document.createElement("bboalert-events");
	document.body.appendChild(ue);
	ue = document.body.querySelector("bboalert-events");
	return ue;
}


function addBBOalertEvent(ev, fn) {
	var ue = BBOalertEvents();
	ue.addEventListener(ev, fn, false);
}

function BBOalertEvents() {
	var ue = document.body.querySelector("bboalert-events");
	if (ue == null) ue = initBBOalertEvents();
	return ue;
}


function beep(f, d) {
	var context = new window.AudioContext();
	var osc = context.createOscillator();
	osc.type = 'square';
	osc.frequency.value = f;
	osc.connect(context.destination);
	osc.start();
	osc.stop(context.currentTime + d);
}

function openDropbox(url) {
	window.open(url, '', 'width=100,height=100');
}

function toggleAlertList(el, expandTree) {
	function ulLevel(ul) {
		if (ul.tagName.toLowerCase() != "ul") return -1;
		try {
			return parseInt(ul.classList[1].split("-")[2]);
		} catch {
			return -1;
		}
	}
	var l = $("p,li");
	for (let i = 0; i < l.length; i++) {
		l[i].itemNr = i;
		l[i].level = ulLevel(l[i].parentNode);
	}
	var l0 = el.level;
	var l1 = l[el.itemNr + 1].level;
	//    if (l0 < 0) return;
	var treeVisible = $(l[el.itemNr + 1]).is(":visible");
	for (let i = el.itemNr + 1; i < l.length; i++) {
		if ((l[i].level <= l0) || i == (l.length - 1)) {
			for (let i = 0; i < l.length - 1; i++) {
				if ($(l[i]).is(":visible") && $(l[i + 1]).is(":hidden")) {
					$(l[i]).css("background-color", COLLAPSED_BG_COLOR);
					$(l[i]).children().css("background-color", COLLAPSED_BG_COLOR);
					//					l[i].style.color = COLLAPSED_TEXT_COLOR;
				} else {
					$(l[i]).css("background-color", "");
					$(l[i]).children().css("background-color", "");
				}
			}
			return false;
		}
		if (treeVisible) {
			if (l[i].level > l0) {
				$(l[i]).hide();
			}
		} else {
			if ((l[i].level == l1) || expandTree) {
				$(l[i]).show();
			}
		}

	}
}


function replaceSuitSymbolsInRecord(r) {
	var rx = r.split(",");
	if (rx.length < 3) return r;
    switch (rx[0].trim()) {
        case "Option":
            return r;
        case "Import":
            return r;
        case "Alias":
            return r;
        case "Button":
            rx[2] = replaceSuitSymbols(rx[2], "!");
            break;
        case "Shortcut":
            rx[2] = replaceSuitSymbols(rx[2], "!");
            break;
        default:
            rx[0] = replaceSuitSymbols(rx[0], "");
            rx[1] = replaceSuitSymbols(rx[1], "");
            rx[2] = replaceSuitSymbols(rx[2], "!");
            break;
    }
	return rx.join(",");
}

function replaceSuitSymbols(txt, prefix) {
	var t = txt;
	t = t.replace(/♣/g, prefix + "C");
	t = t.replace(/♧/g, prefix + "C"); // white clubs
	t = t.replace(/♦/g, prefix + "D");
	t = t.replace(/♢/g, prefix + "D"); // white diamonds
	t = t.replace(/♥/g, prefix + "H");
	t = t.replace(/♡/g, prefix + "H"); // white hearts
	t = t.replace(/♠/g, prefix + "S");
	t = t.replace(/♤/g, prefix + "S"); // white spades
	if (prefix == '') t = t.replace(/NT/g, prefix + "N");
	return t;
}

userScriptMap = new Map();
function setUserScript(n, f) {
	userScriptMap.set(n, f);
}

function getUserScript(n) {
	var f = userScriptMap.get(n);
	if (f == undefined) return function () { return "not_found"; };
	else return f;
}

function scriptArg(S) {
	var i1 = S.indexOf("\(");
	var i2 = S.indexOf("\)");
	if (i1 == -1) return "";
	if (i2 < i1) return "";
	return S.slice(i1 + 1, i2);
}

function BBOcontext() {
	if (document.title != 'Bridge Base Online') return window.parent.document;
	return document;
}

function parseMarkdown(data) {
	var txtTable;
	var recList = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	txtTable = data.split("\n");
	var txt = "";
	var lvl = 0;
	txtTable.forEach(function (l) {
		var l1 = l.replaceAll("\t", "    ").replace("*", "-");
		if (l1.trim().startsWith("- ") && ((l1.indexOf("-") % 4) == 0)) {
			lvl = l1.indexOf("-") / 4 + 1;
			var t = elimine2Spaces(l.trim().substr(1).trim());
			t = t.split("\n")[0];
			var i0 = t.indexOf(" ");
			t0 = t.substr(0, i0);
			t1 = t.substr(i0 + 1);
			var oppsBid = "--";
			if (t0.split(",").length > 1) {
				oppsBid = t0.split(",")[0];
				t = t0.split(",")[1] + "," + t1;
			} else {
				t = t0 + "," + t1;
			}
			t = elimineSpaces(recList[lvl - 1].split(",")[0] + recList[lvl - 1].split(",")[1] + oppsBid + ",") + t;
			recList[lvl] = t;
			txt = txt + t + "\n";
		} else {
			lvl = 0;
			txt = txt + l.trim() + "\n";
			recList[lvl] = elimine2Spaces(l.trim()) + ",,";
		}
	});
	var tr = txt.split("\n");
	for (let i = 0; i < tr.length; i++) {
		tr[i] = replaceSuitSymbolsInRecord(tr[i]);
	}
	return tr.join("\n");
}

function replaceSpacesByUnderscore(txt) {
	var txt1 = txt.replace(/ /g, '_').slice(0, 40);
	while (txt1.length < 40) txt1 = txt1 + '_';
	return txt1;
}

function decodeEntities(encodedStr) {
	if (!encodedStr) return '';
	return $.parseHTML(encodedStr)[0].textContent;
}

$.fn.onAny = function(cb){
	for(var k in this[0])
	  if(k.search('on') === 0)
		this.on(k.slice(2), function(e){
		  // Probably there's a better way to call a callback function with right context, $.proxy() ?
		  cb.apply(this,[e]);
		});
	return this;
  }; 

