/**
 * click OK button programatically
 */
function clickOK() {
	var elBiddingBox = parent.document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return false;
	var elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return false;
	if (elBiddingButtons.length < 17) return false;
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
 * get main BBO panel div element
 * @returns div element
 */
function getNavDiv() {
	return parent.document.getElementById('navDiv');
}
/**
 * returns div element containing chat dialog
 */
function getChatDiv() {
	return parent.document.getElementById('chatDiv');
}

/**
 * returns current BBO user-id
 */
function whoAmI() {
	var nb = parent.document.querySelector('.navBarClass');
	if (nb == null) {
		addLog('whoAmI .navBarClass not found');
		return '';
	}
	var nt = parent.document.querySelector('.nameTagClass');
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
			var dir = dc[i].textContent.trim();
			return dir;
		}
	} {
		addLog(me + ' seat not found');
		return '';
	}
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
 * retrieve my direction from the auction box 'S' 'W' 'N' 'E' or '' if not found
 */
function mySeat() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auction-box-header-cell');
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
 * check if confirm bids switch is ON
 * returns 'Y' 'N' or '' if not found
 */
function confirmBidsSet() {
	return accountSettingsSet(4);
}

/**
 * check if keyboard entry switch is ON
 * returns 'Y' 'N' or '' if not found
 */
function keyboardEntrySet() {
	return accountSettingsSet(7);
}

/**
 * check if account setting switch is ON
 * returns 'Y' 'N' or '' if not found
 */
function accountSettingsSet(idx) {
	var rd = parent.document.getElementById('rightDiv');
	if (rd == null) return '';
	var sc = rd.querySelectorAll('.settingClass');
	if (sc.length < 6) {
		if (sc.length == 0) return '';
	}
	try {
		if (parent.document.querySelectorAll('.settingClass')[idx].querySelector('ion-toggle').getAttribute("aria-checked") == "true") return 'Y';
		else return 'N';	
	} catch {
		return '';
	}
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
	if (elBiddingButtons.length < 17) return false;
	return (elBiddingButtons[16].style.display != 'none');
}

/**
 * display BBOalert panel if on=true. Otherwise hide it
 */
function setOptions(on) {
	var adPanel0 = parent.document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	if (on) {
		adPanel0.style.display = 'block';
		if (adPanel0.getBoundingClientRect().width < 350) {
			triggerDragAndDrop('.hDividerClass', '.hDividerClass', (adPanel0.getBoundingClientRect().width) - 400);
		}
	} else {
		adPanel0.style.display = 'none';
	}
	var b = parent.document.getElementById('bboalert-tab');
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
 * @ignore
 */
function addBBOalertTab() {
	if (parent.document.getElementById('bboalert-tab') != null) return;
	var rd = parent.document.getElementById('rightDiv');
	if (rd == null) return;
	var vt = rd.querySelector('.verticalTabBarClass');
	if (vt == null) return;
	var tabs = vt.children;
	if (tabs == null) return;
	if (tabs.length < 2) return;
	t = tabs[1].cloneNode(true);
	t.querySelector('.verticalClass').textContent = 'BBOalert';
	t.id = 'bboalert-tab';
	t.onclick = toggleOptions;
	t.style.color = 'white';
	t.backgroundColor = 'red';
	vt.appendChild(t);
	t = parent.document.getElementById('bboalert-tab');
	t.onclick = toggleOptions;
}

/**
 * retrieve our vulnerability tag from the auction box
 */
function areWeVulnerable() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auction-box-header-cell');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (!$(cells[3]).hasClass("vulnerable")) return '@n';
	return '@v';
}

/**
 * retrieve opponent's vulnerability tag from the auction box
 */
function areTheyVulnerable() {
	if ((nd = getNavDiv()) == null) return '';
	var cells = nd.querySelectorAll('.auction-box-header-cell');
	if (cells == null) return '';
	if (cells.length != 4) return '';
	if (!$(cells[2]).hasClass("vulnerable")) return '@N';
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
	t = parent.document.querySelectorAll('div.titleSpanClass');
	if (t.length == 0) return;
	for (var i = 0; i < t.length; i++) {
		t[i].textContent = txt;
	}
}

/**
 * @ignore
 */
function setTitleText(txt) {
	t = parent.document.querySelector('.titleClass');
	if (t == null) return;
	if (isVisible(t)) {
		t.innerText = '';
		setTimeout(function () {
			t.innerText = txt;
		}, 500);
		return;
	}
	t = parent.document.querySelectorAll('div.titleSpanClass');
	if (t.length == 0) return;
	for (var i = 0; i < t.length; i++) {
		t[i].textContent = '';
		setTimeout(function () {
			t[i].textContent = txt;
		}, 500);
	}
}

/**
 * retrieve visible chat input element
 */
function getVisibleMessageInput() {
	cr = parent.document.querySelectorAll('.chatRowClass');
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
	cr = parent.document.querySelectorAll('.chatRowClass');
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
	} else { }
}

/**
 * send chat message text to msg
 * If send=true send it immediately
 */
function setInputMessage(msg, send, elMessage) {
	console.log("setInputMessage 1 " + msg);
	var eventInput = new Event('input');
	if (elMessage == null) return;
	msgList = msg.split(/\\n/);
	var sb = getChatSendButton(elMessage);
	// if not chat messaqge set text
	console.log("setInputMessage sb " + sb);
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
	var i = 0;
	ti = setInterval(() => {
		console.log("setInputMessage 2 " + msgList[i]);
		elMessage.value = msgList[i];
		elMessage.dispatchEvent(eventInput);
		if (i < msgList.length - 1) sb.click();
		else {
			if (send) sb.click();
			clearInterval(ti);
		}
		i++;
	}, 100);
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
	var cd = parent.document.getElementById('chatDiv');
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
	var nb = parent.document.querySelector('.navBarClass');
	return isVisible(nb);
}

/**
 * @ignore
 */
function isAdBlockerOn() {
	app = parent.document.getElementById('bbo_app');
	return (app.style.left == "0px");
}

/**
 * @ignore
 */
function isBBOready() {
	return (isVisible(parent.document.querySelector('.infoStat')));
}

/**
 * @ignore
 */
function setStatTextDiv() {
	if (parent.document.getElementById('statText') != null) return;
	var st = parent.document.createElement('div');
	st.style.height = '100%';
	st.id = 'statText';
	st.textContent = 'BBOalert';
	is = parent.document.querySelector('.infoStat');
	isp = is.parentNode;
	isp.insertBefore(st, isp.firstChild);
}

/**
 * @ignore
 */
function setStatText(txt) {
	var st = parent.document.getElementById('statText');
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
function setTabEvents() {
	var rd = parent.document.getElementById('rightDiv');
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
	var hover_i = -1;
	for (var i = 0; i < 4; i++) {
		if (nd1[i].style.backgroundColor == "rgb(204, 204, 154)") {
			hover_i = i;
		}
	}
	if (hover_i == -1) {
		for (var i = 0; i < 4; i++) {
			if (nd1[i].style.backgroundColor == "rgb(255, 206, 0)") {
				return nd1[i].textContent;
			}
		}
		return '';
	}
	for (var i = 0; i < 4; i++) {
		if (nd1[i].style.backgroundColor == "rgb(255, 206, 0)") {
			return nd1[i].textContent;
		}
	}
	return nd1[hover_i].textContent;
}

function getActivePlayer_old() {
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
	var sp = parent.document.querySelector('.scorePanelClass');
	// if no score panel element -> no table
	if (sp == null) return 'no';
	// if score panel not displayed -> practice table
	if (sp.style.display == 'none') return 'practice';
	// if score panel displayed -> game table
	return 'game';
}

/**
 * retrieve current chat destination
 */
function getCurrentChatDestination() {
	var mi = parent.$('#chatDiv .channelButtonClass');
	if (mi.length == 0) return '';
	return mi[0].textContent;
}

/**
 * @ignore
 */
function getChatDestinationMenuItem(t) {
	var mi = parent.$('#chatDiv menu-item div');
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
	var cb = parent.$('#chatDiv .messageInputDivClass .channelButtonClass')[0];
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
	var cb = parent.$('#chatDiv .messageInputDivClass .channelButtonClass')[0];
	var ok = false;
	parent.$('#chatDiv .menuClass').hide();
	parent.$('#chatDiv .messageInputDivClass .channelButtonClass')[0].click();
	var dmi = getChatDestinationMenuItem(t);
	setTimeout(function () {
		if (dmi != null) {
			dmi.click();
			ok = true;
		}
		parent.$('#chatDiv .menuClass').hide();
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
	var od = parent.$('#chatDiv .messageInputDivClass .channelButtonClass')[0].textContent;
	setChatDestination('Private');
	//    var cd = $('#chatDiv .messageInputDivClass .channelButtonClass span');
	var cd = parent.$('#chatDiv .getStringDialogClass .messageInputClass');
	var bt = parent.$('#chatDiv .getStringDialogClass button');
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
 * retrieve my hand into a string
 */
function getMyHand() {
	var yref = 0;
	var hand = '';
	var cc = parent.$('#navDiv .cardClass .topLeft');
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
	var cc = parent.$('.cardClass .topLeft');
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
 * retrieve auction box element. Returns undefined if none found
 * 
 */
function getAuctionBox() {
	return parent.$('bridge-screen .auctionBoxClass')[0];
}

function getCard(index) {
	var card = parent.$(".cardClass").filter(function () {
		return $(this).css('z-index') == index;
	}).text();
	if (card.length == 6) {
		card = "T" + card.slice(-1);
	} else card = card.slice(0, 2);
	return card;
}

function getLastChatMessaage() {
	try {
		var ci = parent.$("#chatDiv .chatOutputClass chat-list-item").toArray();
		return ci[ci.length - 1].textContent;
	} catch {
		return '';
	}
}

function getPlayedCards() {
	return getCard(90) + getCard(91) + getCard(92) + getCard(93);
}

function getAnnouncementPanel() {
	return parent.$("bridge-screen .announcementPanelClass")[0];
}

function getNotificationPanel() {
	return parent.$("bridge-screen .notificationClass")[0];
}

function getCallExplanationPanel() {
	return parent.$("bridge-screen .callExplanationClass")[0];
}

function getCallExplanationText() {
	return parent.$("bridge-screen .callExplanationClass .textClass").text();
}

function getChatSendButton(inp) {
	var cr = $(".chatRowClass", window.parent.document);
	if (cr.length == 0) return null;
	for (var i = 0; i < cr.length; i++) {
		if (cr[i].contains(inp)) {
			var sb = cr[i].querySelectorAll("button");
			if (sb.length < 2) return null;
			return sb[1];
		}
	}
}

function hover_bboalert() {
	try {
		var t = window.parent.document.getElementById('bboalert-tab');
		var rd = window.parent.document.getElementById('rightDiv');
		var vt = rd.querySelector('.verticalTabBarClass');
		var tabs = vt.querySelectorAll('.verticalClass');
		if (t.onmouseenter == null) t.onmouseenter = function () {
			if (isHoverEnabled()) {
				setOptions(true);
				parent.$("#bboalert-tab")[0].focus();
			}
		};
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].textContent.search('BBOalert') == -1) {
				if (tabs[i].onmouseenter == null) tabs[i].onmouseenter = function () {
					if (isHoverEnabled()) {
						setOptionsOff();
						window.parent.document.activeElement.blur();
						if ((this.className.indexOf("selected") == -1) || ($("#adpanel0").width() == 0)) {
							this.click();
						}
					}
				};
			}
		}
	} catch { }
}

function getFinalContractPanel() {
	try {
		return parent.$("bridge-screen .tricksPanelClass")[0];
	} catch {
		return null;
	}
}

function isDebuggingTable() {
	if ((nd = getNavDiv()) == null) return false;
	var nd1 = nd.querySelectorAll('.nameDisplayClass');
	if (nd1 == null) return false;
	if (nd1.length != 4) return false;
	for (var i = 0; i < 4; i++) {
		if (nd1[i].textContent != whoAmI()) return false;
	}
	return true;
}

function partnerDirection() {
	var md = myDirection();
	if (md == "S") return "N";
	if (md == "W") return "E";
	if (md == "N") return "S";
	if (md == "E") return "W";
	return '';
}

function directionRHO() {
	var md = myDirection();
	if (md == "S") return "E";
	if (md == "W") return "S";
	if (md == "N") return "W";
	if (md == "E") return "N";
	return '';
}

function directionLHO() {
	var md = myDirection();
	if (md == "S") return "W";
	if (md == "W") return "N";
	if (md == "N") return "E";
	if (md == "E") return "S";
	return '';
}

function getLanguage() {
	var lang = "en";
	var i = window.parent.location.href.indexOf('lang=');
	if (i != -1) {
		lang = window.parent.location.href.slice(i + 5, i + 7);
	} else {
		lang = navigator.language.slice(0, 2);
	}
	return lang;
}

function redisplayBiddingBox(time = 100) {
	var bb = getBiddingBox();
	if (!isVisible(bb)) return;
	bb.style.display = "none";
	setTimeout(function () {
		bb.style.display = "inline-block";
	}, time);
}

function getBiddingBoxButtons () {
	var elBiddingBox = parent.document.querySelector(".biddingBoxClass");
	if (elBiddingBox == null) return null;
	var elBiddingButtons = elBiddingBox.querySelectorAll(".biddingBoxButtonClass");
	if (elBiddingButtons == null) return null;
	if (elBiddingButtons.length < 17) return null;
	return elBiddingButtons;
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

