// This file contaoins all stand-alone functione


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

function areWeVulnerable() {
	cells = document.querySelectorAll('.auctionBoxHeaderCellClass');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (cells[3].style.backgroundColor == "rgb(255, 255, 255)") return 'n';
	return 'v';
}

function getDealNumber() {
	vpi = document.querySelector('.vulPanelInnerPanelClass');
	if (vpi == null) return '';
	if (!isVisible(vpi)) return '';
	return vpi.textContent.trim();
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



