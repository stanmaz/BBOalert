// This file contaoins all stand-alone functione


// match vulnerability and seat conditions in text
function matchVulSeat(v, s, t) {
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
function getNow() {
	now = new Date();
	yyyy = now.getFullYear().toString();
	m = now.getMonth() + 1;
	mm = m.toString();
    if (mm.length == 1) mm = '0' + mm;
	dd = now.getDate().toString();
	if (dd.length == 1) dd = '0' + dd;
	hh = now.getHours().toString();
	mn = now.getMinutes().toString();
	if (mn.length == 1) mn = '0' + mn;
	return yyyy + mm + dd + "_" + hh + ":" + mn;
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
	navigator.clipboard.writeText(txt).then(function() {
	}
		, function() {
		}
	);
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
//	console.log(el);
	if (el.length > 1) {
		el = el.substr(0, 2);
		if (el.charCodeAt(1) == 9827) {
			return el[0] + 'C'
		};
		if (el.charCodeAt(1) == 9830) {
			return el[0] + 'D'
		};
		if (el.charCodeAt(1) == 9829) {
			return el[0] + 'H'
		};
		if (el.charCodeAt(1) == 9824) {
			return el[0] + 'S'
		};
		return el[0] + 'N'
	}
	return el;
}

function getSeatNr() {
	var c = getContext();
	if (c == '') return '@1';
	if (c == '--') return '@2';
	if (c == '----') return '@3';
	if (c == '------') return '@4';
	return '';
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
		el = translateCall(auction[i].innerText);
		ctx = ctx + el;
		//	Translate Double, Redouble and Pass from different language interfaces
	};
	return ctx;
}

function areWeVulnerable() {
	cells = document.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (cells[3].style.backgroundColor == "rgb(255, 255, 255)") return '@n';
	return '@v';
}

function getDealNumber() {
	vpi = document.querySelector('.vulPanelInnerPanelClass');
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

function getBiddingBox() {
	return document.querySelector(".biddingBoxClass");
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
	eventInput = new Event('input');
	elAlertExplain.dispatchEvent(eventInput);
};

function isSplitScreen() {
	var nb = document.querySelector('.navBarClass');
	return isVisible(nb);
}

function isAdBlockerOn() {
	app = document.getElementById('bbo_app');
	return (app.style.left =="0px");
}

function isBBOready() {
	return (isVisible(document.querySelector('.infoStat')));
}

function setStatTextDiv () {
	if (document.getElementById('statText') != null) return;
	var st = document.createElement('div');
	st.style.height = '100%';
	st.id = 'statText';
	st.textContent = 'BBOalert';
	is = document.querySelector('.infoStat');
	isp = is.parentNode;
	isp.insertBefore(st, isp.firstChild);
}

function setStatText (txt) {
	var st = document.getElementById('statText');
	if (st == null) return;
	st.textContent = txt;
	if (txt != '') {
		st.style.backgroundColor = 'coral';
	} else {
		st.style.backgroundColor = '#e7eaed';
	}
}

