function getBBOalertHeaderMsg() {
	try {
		var r = alertTable[0].split(',')[1];
		if (r == undefined) return '';
		return ' ' + r.trim() + ' ';
	} catch {
		return '';
	}
}

function stringToCC(s) {
	if (s == undefined) return '';
	if (s == null) return '';
	if (s == '') return '';
	var ref = s.replace(/\n/g, '←');
	ref = ref.replace(/\t/g, '→');
	ref = ref.replace(/!/g, '↓');
	ref = ref.replace(/ /g, '…');
	return ref;
}

function CCtoString(s) {
	if (s == undefined) return '';
	if (s == null) return '';
	if (s == '') return '';
	var ref = s.replace(/←/g, '\n');
	ref = ref.replace(/→/g, '\t');
	ref = ref.replace(/↓/g, '!');
	ref = ref.replace(/…/g, ' ');
	return ref;
}

function userScript(S, CR, C, BR, B) {
	R = '';
	try {
		eval(S);
		return R;
	} catch {
		return 'ERROR';
	}
}

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

function setPageReload() {
	var nb = document.querySelector('.navBarClass');
	if (nb == null) return;
	var nadc = nb.querySelector('.nonAnonDivClass');
	if (nadc == null) return;
	var lob = nadc.querySelector('button');
	if (lob == null) return;
	if (lob.onclick == null) lob.onclick = preparePageReload;
}

function preparePageReload() {
	var db = document.querySelector('mat-dialog-container');
	if (db == null) return;
	var bt = db.querySelector('button');
	if (bt == null) return;
	bt.onclick = pageReload;
}

function pageReload() {
	setOptions(false);
}

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

function normalize(s) {
	return elimine2Spaces(s.replace(/,+/g, ';')).trim();
}

var version = 'BBOalert ' + chrome.runtime.getManifest().version;
var logText = version + '\n';
logText = logText + navigator.userAgent + '\n';

function getNavDiv() {
	return document.getElementById('navDiv');
}

function getChatDiv() {
	return document.getElementById('chatDiv');
}

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


function addLog(txt) {
	logText = logText + getNow(true) + ',' + txt + '\n';
}

function exportLogData() {
	bboalertLog(version + " : " + (logText.split('\n').length - 1) + ' records exported');
	writeToClipboard(logText);
}


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
					if (mc[i].children[j].textContent.search('Undo') != -1) {
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

// set BBOalert toggling button at top-right
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


// This file contaoins all stand-alone functione

function mySeat() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	return cells[3].innerText.slice(0, 1);
}

function ourVulnerability() {
	var vultab = ["", "NS", "EW", "NSEW", "NS", "EW", "NSEW", "", "EW", "NSEW", "", "NS", "NSEW", "", "NS", "EW"];
	var sd = getDealNumber();
	if (sd == '') return '';
	var nd = parseInt(sd);
	if (nd == NaN) return '';
	if (nd < 1) return '';
	nd = (nd - 1) % 16;
	if (vultab[nd].includes(mySeat())) return '@v';
	return '@n';
}

function openAccountTab() {
	var vc = document.querySelectorAll('.verticalClass');
	if (vc.length < 4) return false;
	vc[3].click();
	return true;
}


function confirmBidsSet() {
	var sc = document.querySelectorAll('.settingClass');
	if (sc.length < 6) {
		if (sc.length == 0) return '';
	}
	if (document.querySelectorAll('.settingClass')[5].querySelector('mat-slide-toggle').classList[2] == "mat-checked") return 'Y';
	else return 'N';
}

function buttonOKvisible() {
	if ((nd = getNavDiv()) == null) return false;
	var elBiddingBox = nd.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	return (elBiddingButtons[16].style.display != 'none');
}

function toggleOptions() {
	var adPanel0 = document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	if (adPanel0.style.display == 'none') {
		setOptions(true);
	} else {
		setOptions(false);
	}
}

function toggleButtons(inp) {
	var ap2 = document.getElementById('adpanel2');
	if (ap2 == null) return;
	if (inp == null) return;
	var clr = "rgb(204,204,154";
	if (inp.getAttribute("class").startsWith("messageInputClass")) clr = "rgb(211,211,211";
	ap2.children[0].style.backgroundColor = clr;
	ap2.children[1].style.backgroundColor = clr;
	ap2.children[2].style.backgroundColor = clr;
	ap2.style.backgroundColor = clr;
	if (ap2.inputObject != inp) {
		setButtonPanel(true);
		ap2.inputObject = inp;
		return;
	}
	if (ap2.style.display == 'none') {
		setButtonPanel(true);
		return;
	} else {
		setButtonPanel(false);
	}
}

function setInputClickEvents () {
	var mi = document.querySelectorAll('input');
	if (mi.length > 0) {
		for (var i = 0; i < mi.length; i++) {
			if (mi[i].getAttribute('placeholder') == 'Explain') {
				    if (mi[i].onclick == null) mi[i].onclick = function () {toggleButtons(this);};
			}
		}
	}
	mi = document.getElementById('chatDiv').querySelectorAll('input');
	if (mi.length > 0) {
		for (var i = 0; i < mi.length; i++) {
			if (mi[i].getAttribute('placeholder') == 'Message') {
				    if (mi[i].onclick == null) mi[i].onclick = function () {toggleButtons(this);};
			}
		}
	}
	var ap2 = document.getElementById('adpanel2');
	if (ap2.inputObject == null) return;
	if (!isVisible(ap2.inputObject)) setButtonPanel(false);
}

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

function setButtonPanel(on) {
	var adPanel2 = document.getElementById("adpanel2");
	if (adPanel2 == null) return;
	if (on) {
		var b = document.querySelector('#bboalert-sc');
		if (b != null) {
			if (b.style.backgroundColor =="red") return;
		}
		adPanel2.style.display = 'block';
		if (adPanel2.getBoundingClientRect().width < 250) {
			triggerDragAndDrop('.hDividerClass', '.hDividerClass', (adPanel2.getBoundingClientRect().width) - 300);
		}
	} else {
		adPanel2.style.display = 'none';
		adPanel2.inputObject = null;
	}
}



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

// match vulnerability and seat conditions in text
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



// match vulnerability and seat conditions in text
function matchVulSeatOld(v, s, t) {
	// set option only during the first round of bidding
	if (s == '') return '';
	var n = t.split('@').length - 1;
	// if no @ tags in option name, let the option unchanged
	if (n == 0) return '';
	// if only one tag in option name, v or s must match 
	if (n == 1) {
		if (t.indexOf(v) > 0) return 'Y';
		if (t.indexOf(s) > 0) return 'Y';
		return 'N';
	}
	// if no vulnerability specified match seat
	if ((t.indexOf('@n') == -1) && (t.indexOf('@v') == -1)) {
		if (t.indexOf(s) > 0) return 'Y';
		return 'N';
	}
	// if only more than one tag in option name, v and s must match
	if ((t.indexOf(v) > 0) && (t.indexOf(s) > 0)) return 'Y';
	return 'N';
}


// Check if element is visible
function isVisible(e) {
	if (e == null) return false;
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

// Get formatted actual date and time
function getNow(secs) {
	var now = new Date();
	var yyyy = now.getFullYear().toString();
	var m = now.getMonth() + 1;
	mm = m.toString();
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

// Elimine spaces and tabs
function elimine2Spaces(str) {
	var s = str.replace(/\t+/g, ' ');
	s = s.replace(/\s\s+/g, ' ');
	return s;
}


// Elimine spaces and tabs
function elimineSpaces(str) {
	var s = str.replace(/\s+/g, '');
	s = s.replace(/\t+/g, '');
	return s;
}

// Write text to clipboard
function writeToClipboard(txt) {
	navigator.clipboard.writeText(txt).then(function () {}, function () {});
}

// Strip context from leading passes
function stripContext(ctx) {
	if (ctx.startsWith('------')) return ctx.substr(6);
	if (ctx.startsWith('----')) return ctx.substr(4);
	if (ctx.startsWith('--')) return ctx.substr(2);
	return ctx;
}

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

function getSeatNr() {
	var c = getContext();
	if (c.startsWith('------')) return '@4';
	if (c.startsWith('----')) return '@3';
	if (c.startsWith('--')) return '@2';
	return '@1';
}

// Get actual bidding context
function getContext() {
	if ((nd = getNavDiv()) == null) return 'xx';
	ctx = '';
	bs = nd.querySelectorAll('bridge-screen');
	if (bs.length == 0) {
		return "yy";
	}
	auction = bs[0].querySelectorAll('.auctionBoxCellClass');
	if (auction.length == 0) {
		return "xx";
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

function areWeVulnerable() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (cells[3].style.backgroundColor == "rgb(255, 255, 255)") return '@n';
	return '@v';
}

function areTheyVulnerable() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (cells[2].style.backgroundColor == "rgb(255, 255, 255)") return '@N';
	return '@V';
}


function getDealNumber() {
	if ((nd = getNavDiv()) == null) return '';
	vpi = nd.querySelector('.vulPanelInnerPanelClass');
	if (vpi == null) return '';
	if (!isVisible(vpi)) return '';
	return vpi.textContent.trim();
}

function setTitle(txt) {
	t = document.querySelectorAll('div.titleSpanClass');
	if (t.length == 0) return;
	for (var i = 0; i < t.length; i++) {
		t[i].textContent = txt;
	}
}

// BBO titile bar is used to show BBOalert messages
function setTitleText(txt) {
	t = document.querySelector('.titleClass');
	if (t == null) return;
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

// Check if actual bidding context matches refeence context from the table
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

// Check if actual bidding context matches refeence context from the table
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

function sendChat() {
	cr = document.querySelectorAll('.chatRowClass');
	if (cr.length == 0) return;
	cb = cr[0].querySelector('.sendButtonClass');
	if (cb == null) return;
	if (!isVisible(cb)) return;
	cb.click();
}

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

function getChatMessage() {
	var elMessage = getVisibleMessageInput();
	if (elMessage == null) return '';
	return elMessage.value;
}

function getBiddingBox() {
	if ((nd = getNavDiv()) == null) return null;
	return nd.querySelector(".biddingBoxClass");
}

function getExplainInput() {
	var bbox = getBiddingBox();
	if (bbox == null) return null;
	if (!isVisible(bbox)) return null;
	return bbox.querySelector(".mat-form-field-infix").querySelector('input');
}

function setExplainText(txt) {
	var elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	elAlertExplain.value = txt;
	var eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
};

function isSplitScreen() {
	var nb = document.querySelector('.navBarClass');
	return isVisible(nb);
}

function isAdBlockerOn() {
	app = document.getElementById('bbo_app');
	return (app.style.left == "0px");
}

function isBBOready() {
	return (isVisible(document.querySelector('.infoStat')));
}

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

// Reset option selector
function clearOptionsSelector() {
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector == null) return;
	for (var i = optionsSelector.options.length; i > 1; i--) {
		optionsSelector.remove(i);
	}

}

function setControlButtons() {
	var bar = document.querySelector('.moreMenuDivClass');
	var adPanel = document.getElementById("adpanel1");
	if (bar == null) return false;
	if (!isVisible(bar)) return false;
	//	addBBOalertButton();
	addBBOalertTab();
	if (adPanel.querySelector('#bboalert-b1') == null) {
		var b3 = document.createElement("button");
		b3.textContent = "Import";
		b3.id = 'bboalert-b1';
		b3.style.fontSize = "22px";
		b3.style.width = '100%';
		adPanel.appendChild(b3);
	}
	if (adPanel.querySelector('#bboalert-b2') == null) {
		var b3 = document.createElement("button");
		b3.textContent = "Append";
		b3.id = 'bboalert-b2';
		b3.style.fontSize = "22px";
		b3.style.width = '100%';
		adPanel.appendChild(b3);
	}
	if (adPanel.querySelector('#bboalert-b3') == null) {
		var b3 = document.createElement("button");
		b3.textContent = "Export All";
		b3.id = 'bboalert-b3';
		b3.style.fontSize = "22px";
		b3.style.width = '100%';
		adPanel.appendChild(b3);
	}
	if (adPanel.querySelector('#bboalert-bnew') == null) {
		var bnew = document.createElement("button");
		bnew.textContent = "Export New";
		bnew.id = 'bboalert-bnew';
		bnew.style.fontSize = "22px";
		bnew.style.width = '100%';
		adPanel.appendChild(bnew);
	}
	if (adPanel.querySelector('#bboalert-log') == null) {
		var blog = document.createElement("button");
		blog.textContent = "Export Log";
		blog.id = 'bboalert-log';
		blog.style.fontSize = "22px";
		blog.style.width = '100%';
		adPanel.appendChild(blog);
	}
	if (adPanel.querySelector('#bboalert-sc') == null) {
		var sc = document.createElement("button");
		sc.textContent = "Shortcuts";
		sc.id = 'bboalert-sc';
		sc.style.fontSize = "22px";
		sc.style.width = '100%';
		sc.style.color = "white";
		sc.style.backgroundColor = "red";
		adPanel.appendChild(sc);
	}
	if (adPanel.querySelector('#bboalert-p1') == null) {
		var p1 = document.createElement("p");
		p1.textContent = version;
		p1.id = 'bboalert-p1';
		adPanel.appendChild(p1);
		return true;
	}
	return false;
}

function bboalertLog(txt) {
	var p1 = document.getElementById('bboalert-p1');
	if (p1 == null) return;
	p1.textContent = txt;
}

function setAdPanel() {
	if (document.getElementById("adpanel") != null) return;
	var appPanel = document.getElementById("rightDiv");
	if (appPanel == null) return;
	var adPanel0 = document.createElement("div");
	adPanel0.id = 'adpanel0';
	adPanel0.style.position = 'absolute';
	adPanel0.style.top = '0px';
	adPanel0.style.left = '0px';
	adPanel0.style.backgroundColor = 'yellow';
	adPanel0.style.zIndex = "5000";
	adPanel0.style.display = 'none';
	adPanel0.style.height = '100%';
	adPanel0.style.right = '35px';
	appPanel.appendChild(adPanel0);

	var adPanel = document.createElement("div");
	adPanel.setAttribute('class', 'split left');
	adPanel.id = "adpanel";
	adPanel.style.overflow = "hidden auto";
	adPanel.style.zIndex = "5000";
	var optionsSelector = document.createElement('select');
	optionsSelector.id = 'bboalert-ds';
	optionsSelector.style.width = "100%";
	optionsSelector.style.fontSize = "16px";
	optionsSelector.add(new Option('Show-All'));
	optionsSelector.add(new Option('Show-None'));
	adPanel.appendChild(optionsSelector);
	adPanel0.appendChild(adPanel);

	var adPanel1 = document.createElement("div");
	adPanel1.setAttribute('class', 'split right');
	adPanel1.style.position = 'absolute';
	adPanel1.id = "adpanel1";
	adPanel1.style.overflow = "hidden auto";

	adPanel0.appendChild(adPanel1);

	var adPanel2 = document.createElement("div");
	adPanel2.style.position = 'absolute';
	adPanel2.style.height = '100%';
	adPanel2.style.width = '100%';
	adPanel2.style.backgroundColor = 'yellow';
	adPanel2.style.display = 'none';
//	adPanel2.style.right = '35px';
	adPanel2.style.zIndex = "5001";
	adPanel2.inputObject = null;
	adPanel2.id = "adpanel2";
	adPanel2.style.overflow = "hidden auto";

	appPanel.appendChild(adPanel2);

}

function setOptionsOff() {
	setOptions(false);
}

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


function setUI() {
	setAdPanel();
	return setControlButtons();
}

// Clear explanation text field
function clearAlert() {
	elAlertExplain = getExplainInput();
	if (elAlertExplain == null) return;
	elAlertExplain.value = "";
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
};

// Check if the selected option matches table option
function checkOption(r) {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) {
		return false;
	}
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		txt = btns[i].textContent;
		if (btns[i].style.display == 'none') continue;
		if (btns[i].style.backgroundColor != 'lightgreen') continue;
		if (txt.trim() == r[1].trim()) {
			return true;
		}
	}
	return false;
}

function setOptionColor(bt) {
	if (bt.optionSelected && bt.optionValid) bt.style.backgroundColor = "lightgreen";
	if (bt.optionSelected && !bt.optionValid) bt.style.backgroundColor = "lightgray";
	if (!bt.optionSelected && bt.optionValid) bt.style.backgroundColor = "white";
	if (!bt.optionSelected && !bt.optionValid) bt.style.backgroundColor = "white";
}

// Add option selection button
function addOptionButton(lbl) {
	if (lbl == '') return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var bt = document.createElement("button");
	bt.textContent = lbl.split(',')[1].trim();
	bt.id = lbl;
	bt.style.width = "100%";
	bt.style.backgroundColor = 'white';
	bt.style.textAlign = 'left';
	bt.style.display = "inline";
	bt.optionSelected = true;
	bt.optionValid = true;
	bt.onclick = function () {
		this.optionSelected = !this.optionSelected;
		if (this.optionSelected) unselectOtherButtons(this.textContent);
		setOptionColor(this);
	};
	adPanel.appendChild(bt);
}

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
		if (this.value.split(/\\n/).length > 1) {
			setChatMessage(this.value, true);
			return;			
		}
		var ad2 = document.getElementById('adpanel2');
		this.blur();
		if (ad2.inputObject == null) return;
		if (!isVisible(ad2.inputObject)) return;
		var eventInput = new Event('input');
		ad2.inputObject.value += updateAlert(this.value);
		ad2.inputObject.dispatchEvent(eventInput);
		ad2.inputObject.focus();
	};
	adPanel.appendChild(bt);
}



// Make sure thet only the selected option is acvite
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

// For each group of options, select only the first one
function initOptionDefaults() {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var oldPrefix = "";
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].style.display == 'none') continue;
		btns[i].optionSelected = true;
		btns[i].optionValid = true;
		txt = btns[i].textContent;
		txt1 = txt.split(" ");
		if (txt1[0] == oldPrefix) btns[i].optionSelected = false;
		oldPrefix = txt1[0];
	}
	checkOptionsVulnerability();
}

// Add option selector avoiding duplication
function addOptionsSelectorOption(optionText) {
	if (optionText == '') return;
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector == null) return;
	var opt;
	for (var i = 2, len = optionsSelector.options.length; i < len; i++) {
		opt = optionsSelector.options[i];
		if (opt.text.toLowerCase() == optionText.toLowerCase()) return;
	}
	optionsSelector.add(new Option(optionText.toLowerCase()));
}

// Erase all BBOalert buttons
function clearOptionButtons() {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	clearOptionsSelector();
	btns = adPanel.querySelectorAll('button');
	for (var i = btns.length - 1; i > -1; i--) adPanel.removeChild(btns[i]);
}

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


// Make sure thet only the selected option is acvite
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

// Make sure thet only the selected option is active
function checkOptionsVulnerability() {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	if (getDealNumber() == '') {
		for (var i = 0; i < btns.length; i++) {
			btns[i].optionValid = true;
			setOptionColor(btns[i]);
		}
	}
	if ((nd = getNavDiv()) == null) return;
	var abc = nd.querySelector('.auctionBoxClass');
	if (!isVisible(abc)) return;
	var vText = areWeVulnerable();
	vText = ourVulnerability();
	if (vText == '') return;
	var VText = areTheyVulnerable();
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
		setOptionColor(btns[i]);
	}
}

// This function is called when user changes option set
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
			btns[i].style.display = 'inline';
			continue;
		} else if (optionsSelector.selectedIndex == 1) {
			btns[i].style.display = 'none';
			continue;
		}
		var r1 = btns[i].id.split(',');
		if (optionsSelector.selectedIndex > 1) {
			if (r1.length < 3) {
				btns[i].style.display = 'inline';
			} else {
				//				var r = elimine2Spaces(r1[2].trim()).split(' ');
				var r = normalize(r1[2]).split(' ');
				btns[i].style.display = 'none';
				for (var j = 2; j < r1.length; j++) {
					if (seletedText.trim().toLowerCase() == r1[j].trim().toLowerCase()) btns[i].style.display = 'inline';
				}
			}
		}
	}
	if (optionsSelector.selectedIndex != 1) initOptionDefaults();
}

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

function partnershipOptions() {
	if (myPartner() == '') return;
	var i = searchOptionsSelector(myPartner());
	if (i == -1) return;
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector.selectedIndex == i) return;
	optionsSelector.selectedIndex = i;
	optionsSelectorChanged();
}

function documentOnKeyup(key) {
	if (key.altKey) {
		setChatMessage('Alt' + key.key.toUpperCase(), true);
		sendChat();
	}
}

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