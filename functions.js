

// This file contaoins all stand-alone functione

function confirmBidsSet() {
	return (document.querySelectorAll('.settingClass')[5].querySelector('mat-slide-toggle').classList[2] == "mat-checked");
}

function buttonOKvisible() {
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	return (elBiddingButtons[16].style.display != 'none');
}

function toggleOptions() {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	sc = document.querySelector('.statsClass');
	if (adPanel.style.display == 'none') {
		if (sc != null) {
			if (isVisible(sc)) adPanel.style.top = Math.ceil(sc.getBoundingClientRect().top).toString() + 'px';
		}
		adPanel.style.display = 'block';
	} else {
		adPanel.style.display = 'none';
	}
}

function addBBOalertTab() {
	if (document.getElementById('bboalert-tab') != null) return;
	var vt = document.querySelectorAll('.verticalTabBarClass');
	if (vt == null) return;
	vt = vt[1];
	tabs = vt.children;
	if (tabs == null) return;
	if (tabs.length < 2) return;
	t = tabs[1].cloneNode(true);
	t.querySelector('.verticalClass').textContent = 'BBOalert';
	t.id = 'bboalert-tab';
	vt.appendChild(t);
	t = document.getElementById('bboalert-tab');
	t.onclick = toggleOptions;
}

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
	if (c.startsWith('------')) return '@4';
	if (c.startsWith('----')) return '@3';
	if (c.startsWith('--')) return '@2';
	return '@1';
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
	if (matchContextOld(refContext, actContext)) return true;
	var ref = refContext.replace(/\*/g, '.');
	ref = ref.replace(/_/g, '.');
	var re = new RegExp(ref);
	if (!re.test(actContext)) return false;
	return (actContext.match(re)[0].length == actContext.length);
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
	if (bar == null) return false;
	if (!isVisible(bar)) return false;
	if (bar.querySelector('#bboalert-b3') == null) {
		var b3 = document.createElement("button");
		b3.textContent = "Export";
		b3.id = 'bboalert-b3';
		b3.style.fontSize = "22px";
		b3.style.verticalAlign = 'middle';
		b3.style.marginRight = "5px";
		bar.insertBefore(b3, bar.firstChild);
	}
	if (bar.querySelector('#bboalert-b2') == null) {
		var b2 = document.createElement("button");
		b2.textContent = "Append";
		b2.id = 'bboalert-b2';
		b2.style.fontSize = "22px";
		b2.style.verticalAlign = 'middle';
		b2.style.marginRight = "5px";
		bar.insertBefore(b2, bar.firstChild);
	}
	if (bar.querySelector('#bboalert-b1') == null) {
		var b1 = document.createElement("button");
		b1.textContent = "Import";
		b1.id = 'bboalert-b1';
		b1.style.fontSize = "22px"
		b1.style.verticalAlign = 'middle';
		b1.style.marginRight = "5px";
		bar.insertBefore(b1, bar.firstChild);
	}
	if (bar.querySelector('#bboalert-b0') == null) {
		var b0 = document.createElement("button");
		b0.textContent = "Options";
		b0.id = 'bboalert-b0';
		b0.style.fontSize = "22px"
		b0.onmousedown = toggleOptions;
		b0.style.verticalAlign = 'middle';
		b0.style.marginRight = "5px";
		b0.style.top = "47px";
		bar.insertBefore(b0, bar.firstChild);
		return true;
	}
	return false;
}


function setAdPanel() {
	if (document.getElementById("adpanel") != null) return;
	appPanel = document.getElementById("bbo_app");
	//	sc = document.querySelector('.statsClass');
	//	bboad1Panel = document.getElementById("bbo_ad1");
	adPanel = document.createElement("div");
	adPanel.style.position = 'absolute';
	adPanel.style.left = '0px';
	adPanel.style.top = '47px';
	adPanel.style.width = '161px';
	adPanel.style.height = '100%';
	adPanel.id = "adpanel";
	adPanel.style.backgroundColor = 'red';
	adPanel.style.display = "none";
	adPanel.style.overflow = "scroll";
	adPanel.style.overflowX = "hidden";
	adPanel.style.zIndex = "1";
	var optionsSelector = document.createElement('select');
	optionsSelector.id = 'bboalert-ds';
	optionsSelector.style.width = "100%";
	optionsSelector.style.fontSize = "16px";
	optionsSelector.add(new Option('Select-All'));
	optionsSelector.add(new Option('Select-None'));
	//	optionsSelector.onchange = optionsSelectorChanged;
	adPanel.appendChild(optionsSelector);
	document.body.insertBefore(adPanel, appPanel);
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
		if (btns[i].disable == true) continue;
		if (btns[i].style.backgroundColor == 'white') continue;
		if (txt.trim() == r[1].trim()) {
			return true;
		}
	}
	return false;
}

// Add option selection button
function addOptionButton(lbl) {
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var bt = document.createElement("button");
	bt.textContent = lbl.split(',')[1].trim();
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
		btns[i].style.backgroundColor = 'white';
	}
}

// For each group of options, select only the first one
function initOptionDefaults() {
	var adPanel = document.getElementById("adpanel");
	var oldPrefix = "";
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].disabled == true) {
			btns[i].style.backgroundColor = 'white';
			continue;
		}
		txt = btns[i].textContent;
		txt1 = txt.split(" ");
		if (txt1[0] == oldPrefix) {
			btns[i].style.backgroundColor = 'white';
		} else {
			btns[i].style.backgroundColor = 'lightgreen';
			//			btns[i].style.marginTop = "10px";
		}
		oldPrefix = txt1[0];
	}
	//	setOptionsSelector();
	checkOptionsVulnerability();
}

// Add option selector avoiding duplication
function addOptionsSelectorOption(optionText) {
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector == null) return;
	var opt;
	for (var i = 2, len = optionsSelector.options.length; i < len; i++) {
		opt = optionsSelector.options[i];
		if (opt.text == optionText) return;
	}
	optionsSelector.add(new Option(optionText));
}

// Erase all BBOalert buttons
function clearOptionButtons() {
	adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	clearOptionsSelector();
	btns = adPanel.querySelectorAll('button');
	for (var i = btns.length - 1; i > -1; i--) adPanel.removeChild(btns[i]);
}


// Make sure thet only the selected option is acvite
function checkOptionsSeat() {
	var vText = '@' + areWeVulnerable()
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

// Make sure thet only the selected option is active
function checkOptionsVulnerability() {
	var vText = areWeVulnerable()
	if (vText == '') return;
	sText = getSeatNr();
	if (sText == '') return;
	var adPanel = document.getElementById("adpanel");
	if (adPanel == null) return;
	var btns = adPanel.querySelectorAll('button');
	if (btns == null) return;
	for (var i = 0; i < btns.length; i++) {
		// Clear all auto selectable options 
		var txt = btns[i].textContent.trim();
		if (matchVulSeat(vText, sText, txt) == '') continue;
		if (matchVulSeat(vText, sText, txt) == 'Y') btns[i].style.backgroundColor = 'lightgreen';
		if (matchVulSeat(vText, sText, txt) == 'N') btns[i].style.backgroundColor = 'white';
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
		if (optionsSelector.selectedIndex == 0) {
			btns[i].disabled = false;
			continue;
		} else if (optionsSelector.selectedIndex == 1) {
			btns[i].disabled = true;
			continue;
		}
		var r1 = btns[i].id.split(',');
		if (optionsSelector.selectedIndex > 1) {
			if (r1.length < 3) {
				btns[i].disabled = false;
			} else {
				var r = elimine2Spaces(r1[2].trim()).split(' ');
				btns[i].disabled = true;
				for (var j = 2; j < r1.length; j++) {
					if (seletedText == r1[j].trim()) btns[i].disabled = false;
				}
			}
		}
	}
	initOptionDefaults();
}

function myPartner() {
	var nd = document.querySelectorAll('.nameDisplayClass');
	if (nd == null) return '';
	if (nd.length != 4) return '';
	return nd[2].textContent.trim();
}

function searchOptionsSelector (optionText) {
	var optionsSelector = document.getElementById('bboalert-ds');
	if (optionsSelector == null) return;
	var opt;
	for (var i = 2, len = optionsSelector.options.length; i < len; i++) {
		opt = optionsSelector.options[i];
		if (opt.text == optionText) return i;
	}
	return -1;
}

function partnershipOptions () {
	if (myPartner() == '') return;
	var i = searchOptionsSelector(myPartner());
	if (i == -1) return;
	var optionsSelector = document.getElementById('bboalert-ds');
	optionsSelector.selectedIndex = i;
	optionsSelectorChanged();
}

function documentOnKeyup (key) {
	if (key.altKey) {
		setChatMessage('Alt' + key.key.toUpperCase(), true);
		sendChat();
	}
}

function isAlertON() {
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	var elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	if (elBiddingButtons[15].style.backgroundColor == "rgb(255, 255, 255)") return false;
	return true;
}

function setAlert(on) {
	var elBiddingBox = document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	var elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.lebgth < 17) return false;
	if (elBiddingButtons[15].style.backgroundColor == "rgb(255, 255, 255)") {
		if (on) elBiddingButtons[15].click();
	} else {
		if (!on) elBiddingButtons[15].click();	
	};
	return true;
}


