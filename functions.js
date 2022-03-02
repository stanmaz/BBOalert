// Global variables
var alertData = "";
var alertOriginal = "";
var alertTable = alertData.split("\n");
const CHECKED_CHAR = "✔";

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
	var nb = document.querySelector('.navBarClass');
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
	var db = document.querySelector('mat-dialog-container');
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
 * click OK button programatically
 */
function clickOK() {
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	setTimeout(function () {
		elBiddingButtons[16].click();
	}, 300);
}

/**
 * when OK button appears, click it promatically
 */
function confirmBid() {
	var n = 0;
	var t = setInterval(function () {
		n++;
		if (n > 100) clearInterval(t);
		if (buttonOKvisible()) {
			clearInterval(t);
			if (trustedBid) {
				clickOK();
			}
		}
	}, 10);
}

/**
 * @ignore
 */
function normalize(s) {
	return elimine2Spaces(s.replace(/,+/g, ';')).trim();
}

var version = chrome.runtime.getManifest().name + ' ' + chrome.runtime.getManifest().version;
var logText = version + '\n';
logText = logText + navigator.userAgent + '\n';

/**
 * get main BBO panel div element
 * @returns div element
 */
function getNavDiv() {
	return document.getElementById('navDiv');
}

/**
 * returns div element containing chat dialog
 */
function getChatDiv() {
	return document.getElementById('chatDiv');
}

/**
 * returns current BBO user-id
 */
function whoAmI() {
	var nb = document.querySelector('.navBarClass');
	if (nb == null) {
		addLog('whoAmI .navBarClass not found');
		return '';
	}
	var nt = document.querySelector('.nameTagClass');
	if (nt == null) {
		addLog('whoAmI .nameTagClass not found');
		return '';
	}
	return (nt.textContent.trim().toLowerCase());
}

/**
 * @ignore
 */
function myDirection() {
	if ((nd = getNavDiv()) == null) return '';
	var cs = nd.querySelector('.coverClass');
	if (cs == null) return '';
	var nd = cs.querySelectorAll('.nameDisplayClass');
	if (nd == null) return '';
	if (nd.length != 4) return '';
	var dc = cs.querySelectorAll('.directionClass');
	if (dc == null) return '';
	if (dc.length != 4) return '';
	var me = whoAmI();
	if (me == '') return '';
	for (var i = 0; i < 4; i++) {
		if (nd[i].textContent.trim().toLowerCase() == me) {
			return dc[i].textContent.trim();
		}
	} {
		addLog(me + ' seat not found');
		return '';
	}
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
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
		elem.dispatchEvent(evt);
	};

	// fetch target elements
	var elemDrag = document.querySelector(selectorDrag);
	var elemDrop = document.querySelector(selectorDrop);
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
 * generate UNDO menu command programmatically
 */
function undoCommand() {
	if ((nd = getNavDiv()) == null) return;
	var menu = nd.querySelector('.moreClass');
	if (menu == null) return;
	if (getContext() == '') return;
	menu.click();
	var n = 0;
	var t = setInterval(function () {
		var mc = document.querySelectorAll('.menuClass');
		if (mc != null) {
			for (var i = 0; i < mc.length; i++) {
				for (var j = 0; j < mc[i].children.length; j++) {
					if (isUndoCommand(mc[i].children[j].textContent)) {
						clearInterval(t);
						mc[i].children[j].firstChild.click();
						return;
					}

				}
			}
		}
		n++;
		if (n == 10) clearInterval(t);
	}, 100);
}

/**
 * @ignore
 */
function setUndo() {
	if ((nd = getNavDiv()) == null) return;
	var cells = nd.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return;
	if (cells.length != 4) return;
	if (cells[0].onclick == null) cells[0].onclick = undoCommand;
	if (cells[1].onclick == null) cells[1].onclick = undoCommand;
	if (cells[2].onclick == null) cells[2].onclick = undoCommand;
	if (cells[3].onclick == null) cells[3].onclick = undoCommand;
}

/**
 * @ignore
 */
function addBBOalertButton() {
	if (document.getElementById('myButton') != null) return;
	var b = document.createElement("button");
	b.style.width = '100%';
	b.style.height = '100%';
	b.style.backgroundColor = 'blue';
	b.textContent = 'Ale\nrt';
	b.style.color = 'white';
	b.style.display = 'block';
	b.id = 'myButton';
	b.style.zIndex = "1";
	b.onclick = toggleOptions;
	var cc = document.querySelector('.connectionClass');
	for (var i = 0; i < cc.children.length; i++) cc.children[i].style.display = 'none';
	cc.appendChild(b);
}


/**
 * retrieve my direction from the auction box 'S' 'W' 'N' 'E' or '' if not found
 */
function mySeat() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	return cells[3].innerText.slice(0, 1);
}

/**
 * retrieve our vulnerability tag
 */
function ourVulnerability() {
	var vultab = ["", "NS", "EW", "NSEW", "NS", "EW", "NSEW", "", "EW", "NSEW", "", "NS", "NSEW", "", "NS", "EW"];
	var sd = getDealNumber();
	if (sd == '') return '';
	var nd = parseInt(sd);
	if (isNaN(nd)) return '';
	if (nd < 1) return '';
	nd = (nd - 1) % 16;
	if (vultab[nd].includes(mySeat())) return '@v';
	return '@n';
}

/**
 * @ignore
 */
function openAccountTab() {
	var vc = document.querySelectorAll('.verticalClass');
	if (vc.length < 4) return false;
	vc[3].click();
	return true;
}


/**
 * check if confirm bids switch is ON
 * returns 'Y' 'N' or '' if not found
 */
function confirmBidsSet() {
	var rd = document.getElementById('rightDiv');
	if (rd == null) return '';
	var sc = rd.querySelectorAll('.settingClass');
	if (sc.length < 6) {
		if (sc.length == 0) return '';
	}
	if (document.querySelectorAll('.settingClass')[4].querySelector('mat-slide-toggle').classList[2] == "mat-checked") return 'Y';
	else return 'N';
}

/**
 * return true if OK button is visible
 */
function buttonOKvisible() {
	if ((nd = getNavDiv()) == null) return false;
	var elBiddingBox = nd.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	return (elBiddingButtons[16].style.display != 'none');
}

/**
 * toggle BBOalert panel display
 */
function toggleOptions() {
	var adPanel0 = document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	if (adPanel0.style.display == 'none') {
		setOptions(true);
	} else {
		setOptions(false);
	}
}

/**
 * @ignore
 */

function toggleButtons(inp) {
	if (!isSettingON(1)) return;
	var ap2 = document.getElementById('adpanel2');
	var btt = document.getElementById('bttab-buttons');
	if (ap2 == null) return;
	if (inp == null) return;
	ap2.inputObject = inp;
	ap2.display = !ap2.display;
	if (ap2.display) {
		var clr = "rgb(211,211,211";
		ap2.children[0].style.backgroundColor = clr;
		ap2.children[1].style.backgroundColor = clr;
		ap2.children[2].style.backgroundColor = clr;
		ap2.style.backgroundColor = clr;
		btt.style.backgroundColor = clr;
		btt.click();
		return;
	}
	if (btt.openTab == "none") {
		setTimeout(() => {
			setOptionsOff();
		}, 100);
		return;
	}
	if (btt.openTab == "data") {
		setTimeout(() => {
			$("#bttab-bboalert")[0].click();
		}, 100);
		return;
	}
	if (btt.openTab == "options") {
		setTimeout(() => {
			$("#bttab-options")[0].click();
		}, 100);
		return;
	}
	if (btt.openTab == "buttons") {
		setTimeout(() => {
			$("#bttab-buttons")[0].click();
		}, 100);
		return;
	}
	if (btt.openTab == "info") {
		setTimeout(() => {
			$("#bttab-info")[0].click();
		}, 100);
		return;
	}
}

/**
 * @ignore
 */
function setExplainInputClickEvents() {
	var ap2 = document.getElementById('"adpanel2"');
	if (ap2.inputObject == null) return;
	if (!isVisible(ap2.inputObject)) setButtonPanel(false);
}

/**
 * @ignore
 */
function setChatInputClickEvents() {
	var ap2 = document.getElementById('"adpanel2"');
	if (ap2.inputObject == null) return;
	if (!isVisible(ap2.inputObject)) setButtonPanel(false);
}

/**
 * @ignore
 */
function setInputClickEvents() {
	var ap2 = document.getElementById('adpanel2');
	if (ap2.inputObject == null) return;
	if (!isVisible(ap2.inputObject)) setButtonPanel(false);
}

/**
 * @ignore
 */
function toggleOptions1() {
	var adPanel0 = document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	var ap2 = document.getElementById('adpanel2');
	if (adPanel0.style.display != 'none') {
		if (ap2 != null) {
			if (ap2.style.display == 'none') {
				ap2.style.display = 'block';
				return;
			} else {
				ap2.style.display = 'none';
			}
		}
		setOptions(false);
	} else {
		if (ap2 != null) {
			ap2.style.display = 'none';
		}
		setOptions(true);
	}
}

/**
 * display BBOalert panel if on=true. Otherwise hide it
 */
function setOptions(on) {
	var adPanel0 = document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	if (on) {
		adPanel0.style.display = 'block';
		if (adPanel0.getBoundingClientRect().width < 250) {
			triggerDragAndDrop('.hDividerClass', '.hDividerClass', (adPanel0.getBoundingClientRect().width) - 300);
		}
	} else {
		adPanel0.style.display = 'none';
	}
	var b = document.getElementById('bboalert-tab');
	if (b == null) return;
	var t = b.querySelector('.verticalClass');
	if (t == null) return;
	if (on) {
		t.style.backgroundColor = "green";
		t.style.color = 'white';
	} else {
		t.style.backgroundColor = "rgb(209, 214, 221)";
		t.style.color = 'black';
	}
}

/**
 * display button panel if on=true. Otherwise hide it
 */
function setButtonPanel(on) {
	var adPanel2 = document.getElementById("adpanel2");
	var adPanel0 = document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	if (on) {
		var b = document.querySelector('#bboalert-sc');
		if (b != null) {
			if (b.style.backgroundColor == "red") return;
		}
		//		adPanel2.style.display = 'block';
		//		if (adPanel0.getBoundingClientRect().width < 250) {
		//			triggerDragAndDrop('.hDividerClass', '.hDividerClass', (adPanel0.getBoundingClientRect().width) - 300);
		//		}
		setOptionsOn();
		document.getElementById("bttab-buttons").click();
	} else {
		setOptionsOff();
		//		adPanel2.style.display = 'none';
		//		adPanel2.inputObject = null;
	}
}


/**
 * @ignore
 */
function addBBOalertTab() {
	if (document.getElementById('bboalert-tab') != null) return;
	var rd = document.getElementById('rightDiv');
	if (rd == null) return;
	var vt = rd.querySelector('.verticalTabBarClass');
	if (vt == null) return;
	tabs = vt.children;
	if (tabs == null) return;
	if (tabs.length < 2) return;
	t = tabs[1].cloneNode(true);
	t.querySelector('.verticalClass').textContent = 'BBOalert';
	t.id = 'bboalert-tab';
	t.onclick = toggleOptions;
	t.style.color = 'white';
	t.backgroundColor = 'red';
	vt.appendChild(t);
	t = document.getElementById('bboalert-tab');
	t.onclick = toggleOptions;
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
	navigator.clipboard.writeText(txt).then(function () {}, function () {});
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
	if ((nd = getNavDiv()) == null) return '??';
	ctx = '';
	bs = nd.querySelectorAll('bridge-screen');
	if (bs.length == 0) {
		return "??";
	}
	auction = bs[0].querySelectorAll('.auctionBoxCellClass');
	if (auction.length == 0) {
		return "??";
	}
	if (auction.length == 1) {
		return "";
	}
	for (var i = 1; i < auction.length; i++) {
		el = translateCall(auction[i].innerText);
		ctx = ctx + el;
		//	Translate Double, Redouble and Pass from different language interfaces
	}
	return ctx;
}

/**
 * retrieve our vulnerability tag from the auction box
 */
function areWeVulnerable() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (cells[3].style.backgroundColor == "rgb(255, 255, 255)") return '@n';
	return '@v';
}

/**
 * retrieve opponent's vulnerability tag from the auction box
 */
function areTheyVulnerable() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (cells[2].style.backgroundColor == "rgb(255, 255, 255)") return '@N';
	return '@V';
}


/**
 * retrieve current board number
 */
function getDealNumber() {
	if ((nd = getNavDiv()) == null) return '';
	vpi = nd.querySelector('.vulPanelInnerPanelClass');
	if (vpi == null) return '';
	if (!isVisible(vpi)) return '';
	return vpi.textContent.trim();
}

/**
 * @ignore
 */
function setTitle(txt) {
	t = document.querySelectorAll('div.titleSpanClass');
	if (t.length == 0) return;
	for (var i = 0; i < t.length; i++) {
		t[i].textContent = txt;
	}
}

/**
 * @ignore
 */
function setTitleText(txt) {
	t = document.querySelector('.titleClass');
	if (t == null) return;
	if (isVisible(t)) {
		t.innerText = '';
		setTimeout(function () {
			t.innerText = txt;
		}, 500);
		return;
	}
	t = document.querySelectorAll('div.titleSpanClass');
	if (t.length == 0) return;
	for (var i = 0; i < t.length; i++) {
		t[i].textContent = '';
		setTimeout(function () {
			t[i].textContent = txt;
		}, 500);
	}
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
 * retrieve visible chat input element
 */
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

/**
 * send chat message programatically
 */
function sendChat() {
	cr = document.querySelectorAll('.chatRowClass');
	if (cr.length == 0) return;
	var elMessage = getChatInput();
	if (elMessage == null) return;
	cb = getChatSendButton(elMessage);
	if (cb == null) return;
	if (!isVisible(cb)) return;
	cb.click();
}
/**
 * send chat message programatically
 */
function sendAlertChat() {
	var elMessage = getChatInput();
	if (elMessage == null) return;
	cb = getChatSendButton(elMessage);
	if (cb == null) return;
	var msgList = replaceSuitSymbols(getChatMessage(), "!").split("<br>");
	var eventInput = new Event('input');
	for (let i = 0; i < msgList.length; i++) {
		elMessage.value = msgList[i];
		elMessage.dispatchEvent(eventInput);
		cb.click();
	}
	elMessage.value = "";
	elMessage.dispatchEvent(eventInput);
}

/**
 * send chat message text to msg
 * If send=true send it immediately
 */
function setChatInputMessage(msg, send, elMessage) {
	var eventInput = new Event('input');
	if (elMessage == null) return;
	msgList = msg.split(/\\n/);
	if (msgList.length == 1) {
		elMessage.value = msg;
		elMessage.dispatchEvent(eventInput);
		return;
	}
	if (send) {
		for (i = 0; i < msgList.length; i++) {
			elMessage.value = msgList[i];
			elMessage.dispatchEvent(eventInput);
			if (i < msgList.length - 1) sendChat();
		}
	} else {}
}

/**
 * send chat message text to msg
 * If send=true send it immediately
 */
function setInputMessage(msg, send, elMessage) {
	var eventInput = new Event('input');
	if (elMessage == null) return;
	msgList = msg.split(/\\n/);
	var sb = getChatSendButton(elMessage);
	// if not chat messaqge set text
	if (sb == null) {
		elMessage.value = msgList[0];
		elMessage.dispatchEvent(eventInput);
		return;
	}
	// if only one line set the message text and send if send flag set
	if (msgList.length == 1) {
		elMessage.value = msg;
		elMessage.dispatchEvent(eventInput);
		if (send) sb.click();
		return;
	}
	// multiline message : send all except the last if no send flag
	for (i = 0; i < msgList.length; i++) {
		elMessage.value = msgList[i];
		elMessage.dispatchEvent(eventInput);
		if (i < msgList.length - 1) sb.click();
		else if (send) sb.click();
	}
}



/**
 * send chat message text to msg
 * If send=true send it immediately
 */
function setChatMessage(msg, send) {
	var eventInput = new Event('input');
	var elMessage = getVisibleMessageInput();
	if (elMessage == null) return;
	msgList = msg.split(/\\n/);
	if (msgList.length == 1) {
		elMessage.value = msg;
		elMessage.dispatchEvent(eventInput);
		return;
	}
	if (send) {
		for (i = 0; i < msgList.length; i++) {
			elMessage.value = msgList[i];
			elMessage.dispatchEvent(eventInput);
			if (i < msgList.length - 1) sendChat();
		}
	} else {

	}
}

/**
 * retrieve actual chat message input text
 */
function getChatMessage() {
	var elMessage = getVisibleMessageInput();
	if (elMessage == null) return '';
	return elMessage.value;
}

/**
 * retrieve bidding box element
 */
function getBiddingBox() {
	if ((nd = getNavDiv()) == null) return null;
	return nd.querySelector(".biddingBoxClass");
}

/**
 * retrieve call explain box element
 */
function getExplainCallBox() {
	if ((nd = getNavDiv()) == null) return null;
	return nd.querySelector(".explainCallClass");
}

function getDealEndPanel() {
	if ((nd = getNavDiv()) == null) return null;
	return nd.querySelector(".deal-end-panel");
}


/**
 * set explain call box input text
 */
function setExplainCallText(txt) {
	var elExplainCallBox = getExplainCallBox();
	if (!isVisible(elExplainCallBox)) return;
	elInput = elExplainCallBox.querySelector('input');
	if (elInput == null) return;
	elInput.value = txt;
	var eventInput = new Event('input');
	elInput.dispatchEvent(eventInput);
}

/**
 * retrieve explain call box text input element
 */
function getExplainCallInput() {
	var elExplainCallBox = getExplainCallBox();
	if (elExplainCallBox == null) return null;
	return elExplainCallBox.querySelector('input');
}

/**
 * retrieve bidding box text input element
 */
function getExplainInput() {
	var bbox = getBiddingBox();
	if (bbox == null) return null;
	if (!isVisible(bbox)) return null;
	return bbox.querySelector(".mat-form-field-infix").querySelector('input');
}

/**
 * retrieve chat text input element
 */
function getChatInput() {
	var cd = document.getElementById('chatDiv');
	if (cd == null) return null;
	return cd.querySelector(".messageInputClass");
}

/**
 * set bidding box explanation text
 */
function setExplainText(txt) {
	var elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	elAlertExplain.value = txt;
	var eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
}

/**
 * @ignore
 */
function isSplitScreen() {
	var nb = document.querySelector('.navBarClass');
	return isVisible(nb);
}

/**
 * @ignore
 */
function isAdBlockerOn() {
	app = document.getElementById('bbo_app');
	return (app.style.left == "0px");
}

/**
 * @ignore
 */
function isBBOready() {
	return (isVisible(document.querySelector('.infoStat')));
}

/**
 * @ignore
 */
function setStatTextDiv() {
	if (document.getElementById('statText') != null) return;
	var st = document.createElement('div');
	st.style.height = '100%';
	st.id = 'statText';
	st.textContent = 'BBOalert';
	is = document.querySelector('.infoStat');
	isp = is.parentNode;
	isp.insertBefore(st, isp.firstChild);
}

/**
 * @ignore
 */
function setStatText(txt) {
	var st = document.getElementById('statText');
	if (st == null) return;
	st.textContent = txt;
	if (txt != '') {
		st.style.backgroundColor = 'coral';
	} else {
		st.style.backgroundColor = '#e7eaed';
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
		console.log(i + " " + r[0] + " " + r[1]);
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
	opt.style.backgroundColor = "white";
	fileSelector.add(opt, 9);
	$(fileSelector.options[8]).show();
	saveRecentURL();
}

/**
 * @ignore
 */
function setControlButtons() {
	var adPanel = document.getElementById("adpanel1");
	if (adPanel == null) return false;
	if (adPanel.querySelector('#bboalert-menu-file') == null) {
		var fileSelector = document.createElement('select');
		fileSelector.id = 'bboalert-menu-file';
		fileSelector.style.width = "50%";
		fileSelector.style.fontSize = "18px";
		fileSelector.style.backgroundColor = "lightblue";
		fileSelector.add(new Option('Data...'));
		fileSelector.add(new Option('   Paste (New)'));
		fileSelector.add(new Option('   Paste (Append)'));
		fileSelector.add(new Option('   Clear'));
		fileSelector.add(new Option('   Copy All'));
		fileSelector.add(new Option('   Copy New'));
		fileSelector.add(new Option('   Copy Log'));
		fileSelector.add(new Option('   Copy Original'));
		fileSelector.add(new Option('   Clear Recent URLs'));
		$(fileSelector.options[8]).hide();
		fileSelector.onchange = function () {
			if (this.selectedIndex == 1) importClipboardData();
			if (this.selectedIndex == 2) appendClipboardData();
			if (this.selectedIndex == 3) clearData();
			if (this.selectedIndex == 4) exportAlertData();
			if (this.selectedIndex == 5) exportUpdateData();
			if (this.selectedIndex == 6) exportLogData();
			if (this.selectedIndex == 7) exportOriginalData();
			if (this.selectedIndex == 8) clearRecentURL();
			if (this.selectedIndex > 8) {
				writeToClipboard(this.options[this.selectedIndex].value);
				getClipboardData(true);
			}
			this.selectedIndex = 0;
		};
		adPanel.appendChild(fileSelector);
		loadRecentURL();
	}
	if (adPanel.querySelector('#bboalert-menu-settings') == null) {
		var settingsSelector = document.createElement('select');
		settingsSelector.id = 'bboalert-menu-settings';
		settingsSelector.style.width = "50%";
		settingsSelector.style.fontSize = "18px";
		settingsSelector.style.backgroundColor = "aquamarine";
		settingsSelector.add(new Option('Settings ...'));
		settingsSelector.add(new Option('Shortcuts'));
		settingsSelector.add(new Option('Hover BBOalert Tabs'));
		settingsSelector.add(new Option('Hover BBO Tabs'));
		settingsSelector.add(new Option('Collapse Options'));
		settingsSelector.onchange = function () {
			if (this.selectedIndex > 0) {
				if (this.options[this.selectedIndex].textContent.slice(0, 1) == CHECKED_CHAR) {
					this.options[this.selectedIndex].textContent = this.options[this.selectedIndex].textContent.slice(1);
				} else {
					this.options[this.selectedIndex].textContent = CHECKED_CHAR + this.options[this.selectedIndex].textContent;
				}
				if (this.selectedIndex == 4) {
					showAllActiveOptions();
					hideUnusedOptions();
				}
			}
			saveSettings();
			this.selectedIndex = 0;
		};
		adPanel.appendChild(settingsSelector);
	}
	if (adPanel.querySelector('#bboalert-menu-config') == null) {
		var configSelector = document.createElement('select');
		configSelector.id = 'bboalert-menu-config';
		configSelector.style.width = "100%";
		configSelector.style.fontSize = "18px";
		configSelector.style.backgroundColor = "bisque";
		configSelector.style.display = "none";
		configSelector.add(new Option('Plugin settings ...'));
		configSelector.onchange = function () {
			if (this.selectedIndex == 0) {
//				$("#bboalert-config-panel").hide();
			} else {
				var cfgsel = document.querySelector('#bboalert-menu-config');
				var s = localStorage.getItem('BBOalertConfig ' + cfgsel.options[cfgsel.selectedIndex].label);
				if (s != null) {
					$.extend({}, this.options[this.selectedIndex].cfgObj, JSON.parse(s));
				}
				setConfigBox(this.options[this.selectedIndex].cfgLabel,this.options[this.selectedIndex].cfgObj);
			}
			cfgsel.selectedIndex = 0;
		};
		adPanel.appendChild(configSelector);
	}
	if (adPanel.querySelector('#bboalert-p1') == null) {
		var p1 = document.createElement("p");
		p1.textContent = version;
		p1.id = 'bboalert-p1';
		p1.style.margin = "5px";
		adPanel.appendChild(p1);
		return true;
	}
	return false;
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
function setAdPanel() {
	if (document.getElementById("adpanel") != null) return;
	var appPanel = document.getElementById("rightDiv");
	if (appPanel == null) return;
	var adPanel0 = document.createElement("div");
	adPanel0.id = 'adpanel0';
	adPanel0.style.position = 'absolute';
	adPanel0.style.top = '0px';
	adPanel0.style.left = '0px';
	adPanel0.style.backgroundColor = 'black';
	adPanel0.style.zIndex = "5000";
	adPanel0.style.display = 'none';
	adPanel0.style.height = '97%';
	adPanel0.style.right = '57px';
	appPanel.appendChild(adPanel0);

	var adPanelTabs = document.createElement("div");
	adPanelTabs.id = 'adpanel-tabs';
	//	adPanelTabs.style.position = 'absolute';
	//	adPanelTabs.style.top = '0px';
	//	adPanelTabs.style.left = '0px';
	adPanelTabs.style.zIndex = "5000";
	adPanelTabs.style.backgroundColor = 'white';
	adPanelTabs.style.height = '24px';
	adPanelTabs.style.width = '100%';

	adPanel0.appendChild(adPanelTabs);

	var btBBOalert = document.createElement("button");
	btBBOalert.textContent = "Data";
	btBBOalert.id = "bttab-bboalert";
	btBBOalert.style.width = "25%";
	btBBOalert.style.height = "100%";
	btBBOalert.style.fontSize = "16px";
	btBBOalert.style.backgroundColor = 'blue';
	btBBOalert.style.color = 'white';
	btBBOalert.style.display = "inline";
	btBBOalert.onclick = function () {
		$("#adpanel").hide();
		$("#adpanel1").show();
		$("#adpanel2").hide();
		$("#adpanel3").hide();
		document.activeElement.blur();
	};
	btBBOalert.onmouseenter = function () {
		if (isHoverTopEnabled()) $("#bttab-bboalert")[0].click();
	};

	adPanelTabs.appendChild(btBBOalert);

	var btOptions = document.createElement("button");
	btOptions.textContent = "Options";
	btOptions.id = "bttab-options";
	btOptions.style.width = "25%";
	btOptions.style.height = "100%";
	btOptions.style.fontSize = "16px";
	btOptions.style.backgroundColor = 'red';
	btOptions.style.color = 'white';
	btOptions.style.display = "inline";
	btOptions.onclick = function () {
		$("#adpanel").show();
		$("#adpanel1").hide();
		$("#adpanel2").hide();
		$("#adpanel3").hide();
		document.activeElement.blur();
	};
	btOptions.onmouseenter = function () {
		if (isHoverTopEnabled()) $("#bttab-options")[0].click();
	};
	adPanelTabs.appendChild(btOptions);

	var btButtons = document.createElement("button");
	btButtons.textContent = "Shortcuts";
	btButtons.id = "bttab-buttons";
	btButtons.style.width = "25%";
	btButtons.style.height = "100%";
	btButtons.style.fontSize = "16px";
	btButtons.style.backgroundColor = "rgb(211,211,211";
	btButtons.style.color = 'black';
	btButtons.style.display = "inline";
	btButtons.openTab = "";
	btButtons.onclick = function () {
		if (!isVisible($("#adpanel0")[0])) this.openTab = "none";
		if (isVisible($("#adpanel1")[0])) this.openTab = "data";
		if (isVisible($("#adpanel")[0])) this.openTab = "options";
		//		if (isVisible($("#adpanel2")[0])) this.openTab = "buttons";
		if (isVisible($("#adpanel3")[0])) this.openTab = "info";
		$("#adpanel0").show();
		$("#adpanel").hide();
		$("#adpanel1").hide();
		$("#adpanel2").show();
		$("#adpanel3").hide();
		document.activeElement.blur();
	};
	btButtons.onmouseenter = function () {
		if (isHoverTopEnabled()) $("#bttab-buttons")[0].click();
	};
	adPanelTabs.appendChild(btButtons);

	var btInfo = document.createElement("button");
	btInfo.textContent = "Documents";
	btInfo.id = "bttab-info";
	btInfo.style.width = "25%";
	btInfo.style.height = "100%";
	btInfo.style.fontSize = "16px";
	btInfo.style.backgroundColor = "palegreen";
	btInfo.style.color = 'black';
	btInfo.style.display = "inline";
	btInfo.onclick = function () {
		$("#adpanel").hide();
		$("#adpanel1").hide();
		$("#adpanel2").hide();
		$("#adpanel3").show();
		document.activeElement.blur();
	};
	btInfo.onmouseenter = function () {
		if (isHoverTopEnabled()) $("#bttab-info")[0].click();
	};
	adPanelTabs.appendChild(btInfo);

	var adPanel = document.createElement("div");
	adPanel.id = "adpanel";
	adPanel.style.overflow = "hidden auto";
	adPanel.style.zIndex = "5000";
	adPanel.style.backgroundColor = 'red';
	adPanel.style.width = "100%";
	adPanel.style.height = "100%";
	adPanel.style.display = "none";
	var optionsSelector = document.createElement('select');
	optionsSelector.id = 'bboalert-ds';
	optionsSelector.style.width = "100%";
	optionsSelector.style.fontSize = "18px";
	optionsSelector.style.backgroundColor = "yellow";
	optionsSelector.onchange = optionsSelectorChanged;
	optionsSelector.add(new Option('Options-All'));
	optionsSelector.add(new Option('Options-None'));
	optionsSelector.add(new Option('Disable-Alerts'));
	adPanel.appendChild(optionsSelector);
	adPanel0.appendChild(adPanel);

	var adPanel1 = document.createElement("div");
	adPanel1.id = "adpanel1";
	adPanel1.style.width = "100%";
	adPanel1.style.height = "100%";
	adPanel1.style.display = "block";
	adPanel1.style.zIndex = "5000";
	adPanel1.style.overflow = "hidden auto";
	adPanel1.style.backgroundColor = 'blue';
	adPanel1.style.color = 'white';


	adPanel0.appendChild(adPanel1);

	var adPanel2 = document.createElement("div");
	adPanel2.id = "adpanel2";
	adPanel2.style.height = '100%';
	adPanel2.style.width = '100%';
	adPanel2.style.backgroundColor = "rgb(211,211,211";
	adPanel2.style.display = 'none';
	//	adPanel2.style.right = '35px';
	adPanel2.style.zIndex = "5000";
	adPanel2.inputObject = null;
	adPanel2.display = false;
	adPanel2.style.overflow = "hidden auto";

	adPanel0.appendChild(adPanel2);

	var adPanel3 = document.createElement("div");
	adPanel3.id = "adpanel3";
	adPanel3.style.height = '100%';
	adPanel3.style.width = '100%';
	adPanel3.style.backgroundColor = "white";
	adPanel3.style.display = 'none';
	//	adPanel2.style.right = '35px';
	adPanel2.style.zIndex = "5000";
	adPanel3.inputObject = null;
	adPanel3.style.overflow = "hidden auto";
	var infoSelector = document.createElement('select');
	infoSelector.id = 'bboalert-is';
	infoSelector.style.width = "100%";
	infoSelector.style.fontSize = "18px";
	infoSelector.style.backgroundColor = "palegreen";
	infoSelector.onchange = infoSelectorChanged;
	infoSelector.add(new Option('Release Notes', srcRelnotes));
	adPanel3.appendChild(infoSelector);

	var iframeRelnotes = document.createElement("iframe");
	iframeRelnotes.src = srcRelnotes;
	iframeRelnotes.style.height = "100%";
	iframeRelnotes.style.width = "100%";
	iframeRelnotes.id = "bboalert-relnotes";
	adPanel3.appendChild(iframeRelnotes);
	adPanel0.appendChild(adPanel3);
	infoSelectorChanged();
}

function initInfoSelector() {
	var infoSel = document.getElementById("bboalert-is");
	if (infoSel == null) return;
	$(infoSel).children().remove();
	infoSel.add(new Option('Release Notes', srcRelnotes));
	infoSel.selectedIndex = 0;
	infoSelectorChanged();
}


function infoSelectorChanged() {
	var infoSel = document.getElementById("bboalert-is");
	if (infoSel == null) return;
	var ifrm = document.getElementById("bboalert-relnotes");
	if (ifrm == null) return;
	ifrm.src = infoSel.options[infoSel.selectedIndex].value;
}

function addInfoOption(txt, val) {
	var infoSel = document.getElementById("bboalert-is");
	if (infoSel == null) return;
	infoSel.add(new Option(txt, val));
}


/**
 * hide BBOalert panel
 */
function setOptionsOff() {
	setOptions(false);
}

/**
 * display BBOalert panel
 */
function setOptionsOn() {
	setOptions(true);
}

/**
 * @ignore
 */
function setTabEvents() {
	var rd = document.getElementById('rightDiv');
	if (rd == null) return;
	var vt = rd.querySelector('.verticalTabBarClass');
	if (vt == null) return;
	var tabs = vt.children;
	if (tabs == null) return;
	if (tabs.length == 0) return;
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].textContent.search('BBOalert') == -1) {
			if (tabs[i].onmousedown == null) tabs[i].onmousedown = setOptionsOff;
		}
	}
}

/**
 * @ignore
 */
function setUI() {
	setAdPanel();
	return setControlButtons();
}

/**
 * Clear explanation text field
 */
function clearAlert() {
	elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	elAlertExplain.value = "";
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
}

/**
 * @ignore
 */
function checkOption(r) {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) {
		return false;
	}
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		txt = btns[i].textContent;
		if (!btns[i].optionActive) continue;
		//		if (btns[i].style.display == 'none') continue;
		if (btns[i].style.backgroundColor != 'lightgreen') continue;
		if (txt.trim() == r[1].trim()) {
			return true;
		}
	}
	return false;
}

/**
 * @ignore
 */
function findOption(lbl) {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) {
		return -1;
	}
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].textContent == lbl) return i;
	}
	return -1;
}

/**
 * @ignore
 */
function setOptionColor(bt) {
	if (bt.optionSelected && bt.optionValid) bt.style.backgroundColor = "lightgreen";
	if (bt.optionSelected && !bt.optionValid) bt.style.backgroundColor = "lightgray";
	if (!bt.optionSelected && bt.optionValid) bt.style.backgroundColor = "white";
	if (!bt.optionSelected && !bt.optionValid) bt.style.backgroundColor = "white";
	if (bt.id.indexOf("@s") != -1) bt.style.backgroundColor = "cyan";
}

/**
 * @ignore
 */
function addOptionButton(lbl) {
	if (lbl == '') return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	if (findOption(lbl.split(',')[1].trim()) != -1) return;
	var bt = document.createElement("button");
	bt.textContent = lbl.split(',')[1].trim().split('@s')[0].trim();
	bt.id = lbl;
	bt.style.width = "100%";
	bt.style.backgroundColor = 'white';
	bt.style.textAlign = 'left';
	bt.style.display = 'block';
	if (bt.id.indexOf("@s") != -1) bt.style.textAlign = 'center';
	//	bt.style.display = "white";
	bt.optionSelected = true;
	bt.optionValid = true;
	bt.optionActive = true;
	bt.optionTime = 0;
	bt.optionGroup = bt.textContent.trim().split(" ")[0];
	bt.onclick = function () {
		this.optionTime = Date.now();
		this.optionSelected = !this.optionSelected;
		if (this.optionSelected) unselectOtherButtons(this.textContent);
		setOptionColor(this);
		clearShortcutButtons();
		setShortcutButtons();
		setScriptList();
	};
	bt.onmouseenter = function () {
		moveOptionButtons(this.optionGroup, "20px");
		showOptionButtons(this.optionGroup);
	};
	bt.onmouseleave = function () {
		moveOptionButtons(this.optionGroup, "0px");
		hideOptionButtons(this.optionGroup);
	};
	adPanel.appendChild(bt);
}

function moveOptionButtons(grp, mrg) {
	$("#adpanel button").each(function () {
		if (this.id.indexOf("@s") != -1) return;
		if (this.optionGroup == grp) this.style.marginLeft = mrg;
	});
}

function showOptionButtons(grp) {
	$("#adpanel button").each(function () {
		if (this.optionGroup == grp) {
			if (this.optionActive) this.style.display = "block";
			else this.style.display = "none";
		}
	});
}

function hideOptionButtons(grp) {
	if (!isCollapseOptionsEnabled()) return;
	var t = 0;
	var lastButton = null;
	var found = false;
	$("#adpanel button").each(function () {
		if (!this.optionActive) return;
		if (this.optionGroup != grp) return;
		if (this.style.backgroundColor == "white") {
			this.style.display = "none";
			if (this.optionTime > t) {
				t = this.optionTime;
				lastButton = this;
			}
		} else {
			found = true;
		}
	});
	if (found) return;
	lastButton.style.display = "block";
}

/**
 * @ignore
 */
function addShortcutButton(lbl) {
	if (lbl == '') return;
	var adPanel = document.getElementById("adpanel2");
	if (adPanel == null) return;
	var bt = document.createElement("button");
	bt.textContent = lbl.split(',')[1].trim();
	if (lbl.split(',').length > 2) bt.value = lbl.split(',')[2];
	else bt.value = lbl.split(',')[2];
	bt.style.backgroundColor = 'white';
	bt.style.textAlign = 'center';
	bt.style.display = "inline";
	bt.style.fontSize = "20px";
	bt.style.width = "50%";
	if (lbl.split(',').length > 3) {
		var st = lbl.split(',')[3].trim();
		for (var i = 0; i < st.split(' ').length; i++) {
			var prop = st.split(' ')[i].trim().split('=');
			if (prop.length == 2) {
				bt.style[prop[0]] = prop[1];
			}
		}
	}
	bt.onclick = function () {
		if (!isVisible(adPanel.inputObject)) adPanel.inputObject = getChatInput();
		var text1 = adPanel.inputObject.value;
		var text1a = text1.slice(0, adPanel.inputObject.selectionStart);
		var text1b = text1.slice(adPanel.inputObject.selectionStart, text1.length);
		text2 = text1a + execUserScript(this.value) + text1b;
		if (text1 != text2) {
			setInputMessage(text2, false, adPanel.inputObject);
			adPanel.inputObject.focus();
			adPanel.inputObject.selectionStart = text2.length - text1b.length;
			adPanel.inputObject.selectionEnd = text2.length - text1b.length;
		}
	};
	adPanel.appendChild(bt);
}

/**
 * @ignore
 */
function unselectOtherButtons(selectedOption) {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	var txt0 = selectedOption.split(" ");
	for (var i = 0; i < btns.length; i++) {
		var txt = btns[i].textContent;
		var txt1 = txt.split(" ");
		if (txt.trim() == selectedOption.trim()) continue;
		if (txt0[0] != txt1[0]) continue;
		btns[i].optionSelected = false;
		setOptionColor(btns[i]);
	}
}


/**
 * @ignore
 */
function initOptionDefaults() {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var oldPrefix = "";
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		if (!btns[i].optionActive) {
			btns[i].style.display = "none";
			continue;
		}
		//		if (btns[i].style.display == 'none') continue;
		btns[i].style.display = "block";
		btns[i].optionSelected = true;
		btns[i].optionValid = true;
		txt = btns[i].textContent;
		txt1 = txt.split(" ");
		if (txt1[0] == oldPrefix) btns[i].optionSelected = false;
		oldPrefix = txt1[0];
	}
	checkOptionsVulnerability();
}

/**
 * @ignore
 */
function addOptionsSelectorOption(optionText) {
	if (optionText == '') return;
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector == null) return;
	var opt;
	for (var i = 3, len = optionsSelector.options.length; i < len; i++) {
		opt = optionsSelector.options[i];
		if (opt.text.toLowerCase() == optionText.toLowerCase()) return;
	}
	optionsSelector.add(new Option(optionText.toLowerCase()));
}

/**
 * @ignore
 */
function clearOptionButtons() {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	clearOptionsSelector();
	btns = adPanel.querySelectorAll('button');
	for (var i = btns.length - 1; i > -1; i--) adPanel.removeChild(btns[i]);
}

/**
 * @ignore
 */
function clearShortcutButtons() {
	adPanel = document.getElementById("adpanel2");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	for (var i = btns.length - 1; i > -1; i--) adPanel.removeChild(btns[i]);
	addShortcutButton('Button,⌫ Char');
	addShortcutButton('Button,⌫ Word');
	addShortcutButton('Button,⌫ All');
	btns = adPanel.querySelectorAll('button');
	btns[0].style.width = "33%";
	btns[1].style.width = "33%";
	btns[2].style.width = "34%";
	btns[0].onclick = function () {
		var ad2 = document.getElementById('adpanel2');
		if (ad2.inputObject == null) return;
		if (!isVisible(ad2.inputObject)) return;
		var eventInput = new Event('input');
		ad2.inputObject.value = ad2.inputObject.value.slice(0, -1);
		ad2.inputObject.dispatchEvent(eventInput);
		ad2.inputObject.focus();
	};
	btns[1].onclick = function () {
		var ad2 = document.getElementById('adpanel2');
		if (ad2.inputObject == null) return;
		if (!isVisible(ad2.inputObject)) return;
		var eventInput = new Event('input');
		var res = ad2.inputObject.value.split(" ");
		res.pop();
		ad2.inputObject.value = res.join(" ");
		ad2.inputObject.dispatchEvent(eventInput);
		ad2.inputObject.focus();
	};
	btns[2].onclick = function () {
		var ad2 = document.getElementById('adpanel2');
		if (ad2.inputObject == null) return;
		if (!isVisible(ad2.inputObject)) return;
		var eventInput = new Event('input');
		ad2.inputObject.value = '';
		ad2.inputObject.dispatchEvent(eventInput);
		ad2.inputObject.focus();
	};
}

/**
 * @ignore
 */
function checkOptionsSeat() {
	var vText = '@' + areWeVulnerable();
	if (vText == '@') return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		var txt = btns[i].textContent.trim();
		if (vText == '@n') {
			if (txt.indexOf('@n') != -1) {
				btns[i].style.backgroundColor = 'lightgreen';
			}
			if (txt.indexOf('@v') != -1) btns[i].style.backgroundColor = 'white';
		} else {
			if (txt.indexOf('@v') != -1) {
				btns[i].style.backgroundColor = 'lightgreen';
			}
			if (txt.indexOf('@n') != -1) btns[i].style.backgroundColor = 'white';
		}
	}
}

/**
 * @ignore
 */
function setOptionColors() {
	if ((nd = getNavDiv()) == null) return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		setOptionColor(btns[i]);
	}
}


function hideUnusedOptions() {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	for (var i = 0; i < btns.length; i++) {
		btns[i].optionValid = true;
		//		setOptionColor(btns[i]);
		if (isCollapseOptionsEnabled())
			if (btns[i].style.backgroundColor == "white") btns[i].style.display = 'none';
	}
}

function showAllActiveOptions() {
	if (isCollapseOptionsEnabled()) return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].optionActive) btns[i].style.display = 'block';
	}
}

/**
 * @ignore
 */
function checkOptionsVulnerability() {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	//	if (getDealNumber() == '') {
	for (var i = 0; i < btns.length; i++) {
		btns[i].optionValid = true;
		setOptionColor(btns[i]);
	}
	//	}
	if ((nd = getNavDiv()) == null) return;
	var abc = nd.querySelector('.auctionBoxClass');
	if (!isVisible(abc)) return;
	var vText = areWeVulnerable();
	vText = ourVulnerability();
	if (vText == '') return;
	VText = areTheyVulnerable();
	if (VText == '') return;
	sText = getSeatNr();
	if (sText == '') return;
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		// Clear all auto selectable options 
		var txt = btns[i].textContent.trim();
		if (matchVulSeat(vText, VText, sText, txt) == '') continue;
		if (matchVulSeat(vText, VText, sText, txt) == 'Y') btns[i].optionValid = true;
		if (matchVulSeat(vText, VText, sText, txt) == 'N') btns[i].optionValid = false;
	}
}

/**
 * @ignore
 */
function optionsSelectorChanged() {
	var optionsSelector = document.getElementById('bboalert-ds');
	var seletedText = optionsSelector.options[optionsSelector.selectedIndex].text;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		btns[i].optionValid = true;
		btns[i].optionSelected = true;
		if (optionsSelector.selectedIndex == 0) {
			btns[i].optionActive = true;
			//			btns[i].style.display = 'inline';
			continue;
		} else if (optionsSelector.selectedIndex == 1) {
			btns[i].optionActive = false;
			//			btns[i].style.display = 'none';
			continue;
		} else if (optionsSelector.selectedIndex == 2) {
			continue;
		}
		var r1 = btns[i].id.split(',');
		if (optionsSelector.selectedIndex > 2) {
			if (r1.length < 3) {
				btns[i].optionActive = true;
				//				btns[i].style.display = 'inline';
			} else {
				var r = normalize(r1[2]).split(' ');
				btns[i].optionActive = false;
				//				btns[i].style.display = 'none';
				for (var j = 2; j < r1.length; j++) {
					if (seletedText.trim().toLowerCase() == r1[j].trim().toLowerCase()) btns[i].optionActive = true;
					//					if (seletedText.trim().toLowerCase() == r1[j].trim().toLowerCase()) btns[i].style.display = 'inline';
				}
			}
		}
	}
	setScriptList();
	initOptionDefaults();
	hideUnusedOptions();
	clearShortcutButtons();
	setShortcutButtons();
	//	if (optionsSelector.selectedIndex != 1) initOptionDefaults();
}

/**
 * retrieve my partner's user id
 */
function myPartner() {
	if ((nd = getNavDiv()) == null) return '';
	var nd1 = nd.querySelectorAll('.nameDisplayClass');
	if (nd1 == null) return '';
	if (nd1.length != 4) return '';
	var me = whoAmI();
	if (me == '') return '';
	for (var i = 0; i < 4; i++) {
		if (nd1[i].textContent.trim().toLowerCase() == me) {
			return (nd1[(i + 2) % 4].textContent.trim().toLowerCase());
		}
	}
	return '';
}

/**
 * retrieve active player direction and user id
 */
function getActivePlayer() {
	if ((nd = getNavDiv()) == null) return '';
	var nd1 = nd.querySelectorAll('.nameBarClass');
	if (nd1 == null) return '';
	if (nd1.length != 4) return '';
	for (var i = 0; i < 4; i++) {
		if (nd1[i].style.backgroundColor == "rgb(255, 206, 0)") {
			return nd1[i].textContent;
		}
	}
	return '';
}

/**
 *	retrieve opponent's user id. LHO if lho=true 
 * @param {*} lho 
 */
function myOpponent(lho) {
	var idx = 3;
	if (lho) idx = 1;
	if ((nd = getNavDiv()) == null) return '';
	var nd1 = nd.querySelectorAll('.nameDisplayClass');
	if (nd1 == null) return '';
	if (nd1.length != 4) return '';
	var me = whoAmI();
	if (me == '') return '';
	for (var i = 0; i < 4; i++) {
		if (nd1[i].textContent.trim().toLowerCase() == me) {
			return (nd1[(i + idx) % 4].textContent.trim().toLowerCase());
		}
	}
	return '';
}

/**
 * @ignore
 */
function searchOptionsSelector(optionText) {
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector == null) return;
	var opt;
	for (var i = 2, len = optionsSelector.options.length; i < len; i++) {
		opt = optionsSelector.options[i];
		if (opt.text.toLowerCase() == optionText.toLowerCase()) return i;
	}
	return -1;
}

/**
 * @ignore
 */
function partnershipOptions() {
	if (myPartner() == '') return;
	var i = searchOptionsSelector(myPartner() + '+' + whoAmI());
	if (i == -1) {
		i = searchOptionsSelector(whoAmI() + '+' + myPartner());
		if (i == -1) {
			i = searchOptionsSelector(myPartner());
		}
	}
	if (i == -1) return;
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector.selectedIndex == i) return;
	optionsSelector.selectedIndex = i;
	optionsSelectorChanged();
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
 * retrieve Alert button state (true = ON)
 */
function isAlertON() {
	if ((nd = getNavDiv()) == null) return false;
	var elBiddingBox = nd.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	var elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	if (elBiddingButtons[15].style.backgroundColor == "rgb(255, 255, 255)") return false;
	return true;
}


/**
 * set alert button state (on=true = ON)
 */
function setAlert(on) {
	if ((ds = getNavDiv()) == null) return false;
	var elBiddingBox = nd.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	var elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	if (elBiddingButtons[15].style.backgroundColor == "rgb(255, 255, 255)") {
		if (on) elBiddingButtons[15].click();
	} else {
		if (!on) elBiddingButtons[15].click();
	}
	return true;
}

/**
 * @ignore
 */
function tableType() {
	// get score panel
	var sp = document.querySelector('.scorePanelClass');
	// if no score panel element -> no table
	if (sp == null) return 'no';
	// if score panel not displayed -> practice table
	if (sp.style.display == 'none') return 'practice';
	// if score panel displayed -> game table
	return 'game';
}


/**
 * @ignore
 */
function getPartnerAlert() {
	var partnerContext = getContext().slice(0, -4);
	var partnerCall = getContext().slice(-4, -2);
	return findAlertText(partnerContext, partnerCall);
}

/**
 * retrieve current chat destination
 */
function getCurrentChatDestination() {
	var mi = $('#chatDiv .channelButtonClass');
	if (mi.length == 0) return '';
	return mi[0].textContent;
}

/**
 * @ignore
 */
function getChatDestinationMenuItem(t) {
	var mi = $('#chatDiv menu-item div');
	for (var i = 0; i < mi.length; i++) {
		if (mi[i].textContent.trim().toLowerCase() == t.toLowerCase()) {
			return mi[i];
		}
		if (mi[i].textContent.trim() == "→" + t) {
			return mi[i];
		}
		if (t == 'Table') {
			if (isTable(mi[i].textContent)) return mi[i];
		}
		if (t == 'Opponents') {
			if (isOpponents(mi[i].textContent)) return mi[i];
		}
	}
	return null;
}


function isChatDestinationOK(t) {
	var cb = $('#chatDiv .messageInputDivClass .channelButtonClass')[0];
	if (cb.textContent.slice(1).toLowerCase() == t.toLowerCase()) return true;
	if (t == 'Table') {
		if (isTable(cb.textContent)) return true;
	}
	if (t == 'Opponents') {
		if (isOpponents(cb.textContent)) return true;
	}
	return false;
}

/**
 * set chat destinatiop to t
 */
function setChatDestination(t) {
	if (isChatDestinationOK(t)) return;
	var cb = $('#chatDiv .messageInputDivClass .channelButtonClass')[0];
	var ok = false;
	$('#chatDiv .menuClass').hide();
	$('#chatDiv .messageInputDivClass .channelButtonClass')[0].click();
	var dmi = getChatDestinationMenuItem(t);
	setTimeout(function () {
		if (dmi != null) {
			dmi.click();
			ok = true;
		}
		$('#chatDiv .menuClass').hide();
	}, 100);
}

/**
 * set chat destination to table
 */
function setChatToTable() {
	if (isTable(getCurrentChatDestination())) return;
}

/**
 * send chat message to specified user id
 */
function sendPrivateChat(uid, text) {
	var t = text;
	if (!t.endsWith('\\n')) t = t + '\\n';
	var od = $('#chatDiv .messageInputDivClass .channelButtonClass')[0].textContent;
	setChatDestination('Private');
	//    var cd = $('#chatDiv .messageInputDivClass .channelButtonClass span');
	var cd = $('#chatDiv .getStringDialogClass .messageInputClass');
	var bt = $('#chatDiv .getStringDialogClass button');
	setTimeout(function () {
		cd[0].value = uid;
		var eventInput = new Event('input');
		cd[0].dispatchEvent(eventInput);
		bt[0].click();
		setChatMessage(t, true);
		setChatDestination(od);
	}, 200);
}


/**
 * sen chat text to both opponents
 */
function sendMessageToOpponents(text) {
	sendPrivateChat(myOpponent(true), text);
	sendPrivateChat(myOpponent(false), text);
}

/**
 * retrieve my hand into a string
 */
function getMyHand() {
	var yref = 0;
	var hand = '';
	var cc = $('.cardClass .topLeft');
	if (cc.length == 0) return '';
	for (var i = 0; i < cc.length; i++) {
		if (cc[i].getClientRects().length > 0) {
			var card = cc[i].parentNode.parentNode;
			if (cc[i].getClientRects()[0].y > yref) yref = cc[i].getClientRects()[0].y;
		}
	}
	for (var i = 0; i < cc.length; i++) {
		if (cc[i].getClientRects().length > 0) {
			if (cc[i].getClientRects()[0].y == yref) {
				if ($(cc[i]).text().startsWith('10')) {
					hand = hand + 'T' + $(cc[i]).text().slice(-1);
				} else {
					hand = hand + $(cc[i]).text();
				}
			}
		}
	}
	return hand;
}

/**
 * retrieve partner's hand if visible
 */
function getPartnerHand() {
	var yref = 1000000;
	var hand = '';
	var cc = $('.cardClass .topLeft');
	if (cc.length == 0) return '';
	for (var i = 0; i < cc.length; i++) {
		if (cc[i].getClientRects().length > 0) {
			var card = cc[i].parentNode.parentNode;
			if (cc[i].getClientRects()[0].y < yref) yref = cc[i].getClientRects()[0].y;
		}
	}
	for (var i = 0; i < cc.length; i++) {
		if (cc[i].getClientRects().length > 0) {
			if (cc[i].getClientRects()[0].y == yref) {
				if ($(cc[i]).text().startsWith('10')) {
					hand = hand + 'T' + $(cc[i]).text().slice(-1);
				} else {
					hand = hand + $(cc[i]).text();
				}
			}
		}
	}
	if (hand == getMyHand()) return '';
	return hand;
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

/**
 * retrieve auction box element. Returns undefined if none found
 * 
 */
function getAuctionBox() {
	return $('bridge-screen .auctionBoxClass')[0];
}

function loadJS(url) {
	var url1 = makeDirectLink(url);
	fetch(url1)
		.then(x => x.text())
		.then(y => {
			eval(y);
		})
		.catch(error => console.log("Erreur : " + error));
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
					var url = makeDirectLink(r[1].trim());
					if (findURL(url, parent)) {
						console.log('Error : circular reference :');
						console.log('to  ' + url);
						console.log('in  ' + urls[parent]);
					} else {
						console.log(' Reading ' + url);
						urls.push(url);
						parents.push(parent);
						var myIdx = urls.length - 1;
						pending++;
						fetch(url, {
								cache: "no-store"
							})
							.then(x => x.text())
							.then(data => {
								console.log('Done    ' + url);
								data = HTMLpage2text(data, url);
								console.log('Header  ' + getBBOalertHeader(data));
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
							})
							.catch(error => {
								console.log('Error  ' + error + ' ' + url);
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
			console.timeEnd("Read time");
			console.log('Total ' + tab.flat(999).length + ' records');
			alertData = tab.flat(999).join('\n');
			callback();
		}
	}
	var tab = [];
	var urls = [];
	var parents = [];
	var pending = 1;
	console.time("Read time");
	initBBOalertEvents();
	initInfoSelector();
	addrecs(at, tab, -1);
}

function makeDirectLink(s) {
	var url = s;
	if (url.indexOf("www.dropbox.com") != -1) {
		return url.replace("www.dropbox.com", "dl.dropbox.com");
	}
	if (url.indexOf("https://github.com") != -1) {
		return url.replace("blob/", "").replace("https://github.com", "https://raw.githubusercontent.com");
	}
	return url;
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
	console.log('Load JS ' + url1);
	var script = document.createElement('script');
	script.src = url1;
	script.type = "text/javascript";
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(script);
}

function getCard(index) {
	var card = $(".cardClass").filter(function () {
		return $(this).css('z-index') == index;
	}).text();
	if (card.length == 6) {
		card = "T" + card.slice(-1);
	} else card = card.slice(0, 2);
	return card;
}

function getLastChatMessaage() {
	try {
		var ci = $("#chatDiv .chatOutputClass chat-list-item").toArray();
		return ci[ci.length - 1].textContent;
	} catch {
		return '';
	}
}

function getPlayedCards() {
	return getCard(90) + getCard(91) + getCard(92) + getCard(93);
}

function getAnnouncementPanel() {
	return $("bridge-screen .announcementPanelClass")[0];
}

function getNotificationPanel() {
	return $("bridge-screen .notificationClass")[0];
}

function getCallExplanationPanel() {
	return $("bridge-screen .callExplanationClass")[0];
}

function getCallExplanationText() {
	return $("bridge-screen .callExplanationClass .textClass").text();
}

function getChatSendButton(inp) {
	var cr = $(".chatRowClass");
	if (cr.length == 0) return null;
	for (var i = 0; i < cr.length; i++) {
		if (cr[i].contains(inp)) {
			var sb = cr[i].querySelectorAll("button");
			if (sb.length < 2) return null;
			return sb[1];
		}
	}
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


function hover_bboalert() {
	try {
		var t = document.getElementById('bboalert-tab');
		var rd = document.getElementById('rightDiv');
		var vt = rd.querySelector('.verticalTabBarClass');
		var tabs = vt.querySelectorAll('.verticalClass');
		if (t.onmouseenter == null) t.onmouseenter = function () {
			if (isHoverEnabled()) {
				setOptions(true);
				$("#bboalert-tab")[0].focus();
			}
		};
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].textContent.search('BBOalert') == -1) {
				if (tabs[i].onmouseenter == null) tabs[i].onmouseenter = function () {
					if (isHoverEnabled()) {
						setOptionsOff();
						document.activeElement.blur();
						if ((this.className.indexOf("selected") == -1) || ($("#adpanel0").width() == 0)) {
							this.click();
						}
					}
				};
			}
		}
	} catch {}
}

function getFinalContractPanel() {
	try {
		return $("bridge-screen .tricksPanelClass")[0];
	} catch {
		return null;
	}
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
	var context = new(window.AudioContext || window.webkitAudioContext)();
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

function HTMLpage2text(html, url) {
	var i1 = html.indexOf("<body>");
	if (i1 == -1) return html;
	var i2 = html.indexOf("</body>");
	if (i2 == -1) return html;
	var d = document.createElement("div");
	d.innerHTML = html;
	addInfoOption(d.querySelector("title").textContent, url);
	html = html.slice(i1 + 6, i2);
	d.innerHTML = html;
	var p = d.querySelectorAll("p,ul,li");
	var txt = "";
	var lvl = 0;
	recList = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	for (i = 0; i < p.length; i++) {
		if (p[i].tagName.toLowerCase() == "p") {
			lvl = 0;
			recList[lvl] = elimine2Spaces(p[i].textContent.replace(/\u00A0/g, ' ')).trim() + ",,";
			txt = txt + p[i].textContent + "\n";
		} else if (p[i].tagName.toLowerCase() == "ul") {
			var lvl = parseInt(p[i].classList[1].split("-")[2]) + 1;
		} else if (p[i].tagName.toLowerCase() == "li") {
			var t = elimine2Spaces(p[i].textContent.replace(/\u00A0/g, ' ')).trim();
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
		}
	}
	txt = txt.replace(/\u00A0/g, ' ');
	var tr = txt.split("\n");
	for (let i = 0; i < tr.length; i++) {
		tr[i] = replaceSuitSymbolsInRecord(tr[i]);
	}
	return tr.join("\n");
}


COLLAPSED_BG_COLOR = "yellow";
COLLAPSED_TEXT_COLOR = "black";

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
	rx[0] = replaceSuitSymbols(rx[0], "");
	rx[1] = replaceSuitSymbols(rx[1], "");
	rx[2] = replaceSuitSymbols(rx[2], "!");
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
