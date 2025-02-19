/**
 * click OK button programatically
 */
function clickOK() {
	setTimeout(function () {
		$(".biddingBoxButtonClass:eq(16)", PWD).trigger("click");
	}, 300);
}

/**
 * when OK button appears, click it programatically
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
	return PWD.getElementById('navDiv');
}
/**
 * returns div element containing chat dialog
 */
function getChatDiv() {
	return PWD.getElementById('chatDiv');
}

/**
 * returns current BBO user-id
 */
function whoAmI() {
	return localStorage.getItem('userID');
}

/**
 * @ignore
 */
function myDirection() {
	return mySeat();
}

/**
 * retrieve my direction from the auction box 'S' 'W' 'N' 'E' or '' if not found
 */
function mySeat() {
	return $('.auction-box-header-cell:eq(3)', getNavDiv()).text().trim().slice(0, 1);
}

function partnerSeat() {
	return $('.auction-box-header-cell:eq(1)', getNavDiv()).text().trim().slice(0, 1);
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
 * returns 'Y' or 'N'
 */
function confirmBidsSet() {
	return localStorage.getItem(whoAmI() + "_confirm_bids") === "y" ? 'Y' : 'N';
}

/**
 * check if keyboard entry switch is ON
 * returns 'Y' or 'N'
 */
function keyboardEntrySet() {
	return localStorage.getItem(whoAmI() + "_keyboard_entry") === "y" ? 'Y' : 'N';
}

/**
 * check if account setting switch is ON
 * returns 'Y' 'N' or '' if not found
 */
function accountSettingsSet(idx) {
	switch ($($("settings-list ion-toggle", PWD).get(idx)).attr("aria-checked")) {
		case "false":
			return 'N';
		case "true":
			return 'Y';
		default:
			return '';
	}
}

/**
 * return true if OK button is visible
 */
function buttonOKvisible() {
	return (!$("#navDiv .biddingBoxClass button:eq(16):visible", PWD).length == 0);
}

/**
 * return true if OK button is pressed (mouse down)
 */
function buttonOKpressed() {
	return ($("#navDiv .biddingBoxClass button:eq(16):visible", PWD).hasClass("cdk-focused"));
}

/**
 * display BBOalert panel if on=true. Otherwise hide it
 */
function setOptions(on) {
	setTabEvents();
	var adPanel0 = parent.document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	if (on) {
		$("#rightDiv .verticalTabBarClass tab-bar-button", parent.document).not("#bboalert-tab").find(".verticalClass").addClass("covered");
		adPanel0.style.display = 'block';
		if (adPanel0.getBoundingClientRect().width < 350) {
			triggerDragAndDrop('.hDividerClass', '.hDividerClass', (adPanel0.getBoundingClientRect().width) - 400);
		}
	} else {
		$("#rightDiv .verticalTabBarClass tab-bar-button", parent.document).not("#bboalert-tab").find(".verticalClass").removeClass("covered")
		adPanel0.style.display = 'none';
	}
	if (on) {
		$("#bboalert-tab .verticalClass", PWD).css("background-color", "rgb(49, 96, 191)").css("color", "white")
	} else {
		$("#bboalert-tab .verticalClass", PWD).css("background-color", "white").css("color", "black")
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
	var t = tabs[1].cloneNode(true);
	t.querySelector('.verticalClass').textContent = 'BBOalert';
	t.id = 'bboalert-tab';
	t.onclick = toggleOptions;
	t.style.color = 'white';
	t.style.display = "none";
	t.backgroundColor = 'red';
	vt.appendChild(t);
	t = parent.document.getElementById('bboalert-tab');
	t.onclick = toggleOptions;
}

/**
 * retrieve our vulnerability tag from the auction box
 */
function areWeVulnerable() {
	if (mySeat() == '') return '';
	if ($('.auction-box-header-cell:eq(3)', getNavDiv()).hasClass("vulnerable")) return '@v';
	return '@n';
}

/**
 * retrieve opponent's vulnerability tag from the auction box
 */
function areTheyVulnerable() {
	if (mySeat() == '') return '';
	if ($('.auction-box-header-cell:eq(2)', getNavDiv()).hasClass("vulnerable")) return '@V';
	return '@N';
}

/**
 * retrieve current board number
 */
function getDealNumber() {
	return $('.vulPanelInnerPanelClass', getNavDiv()).text().trim();
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
	return $(".messageInputClass:visible", getChatDiv()).get(0)
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
 * send call explanation chat message programatically
 */
function sendAlertChat() {
	var elMessage = getChatInput();
	if (elMessage == null) return;
	cb = getChatSendButton(elMessage);
	if (cb == null) return;
	var msgList = replaceSuitSymbols(getChatMessage(), "!").split("<br>");
	var eventInput = new Event('input');

	var i = 0;
	var it = setInterval(function () {
		if (i == msgList.length) {
			elMessage.value = "";
			elMessage.dispatchEvent(eventInput);
			clearInterval(it);
		} else {
			elMessage.value = msgList[i];
			elMessage.dispatchEvent(eventInput);
			cb.click();
		}
		i++;
	}, 100);
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
	if (DEBUG) console.log("setInputMessage 1 " + msg);
	var eventInput = new Event('input');
	if (elMessage == null) return;
	var msgList = msg.split(/\\n/);
	var sb = getChatSendButton(elMessage);
	// if not chat messaqge set text
	if (DEBUG) console.log("setInputMessage sb " + sb);
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
		if (DEBUG) console.log("setInputMessage 2 " + msgList[i]);
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
	if (elMessage == undefined) return;
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
	if (elMessage == undefined) return '';
	return elMessage.value;
}

/**
 * retrieve bidding box element
 */
function getBiddingBox() {
	var bb = $("#navDiv .biddingBoxClass", PWD).get(0);
	if (bb == undefined) return null;
	return bb;
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
	var elInput = elExplainCallBox.querySelector('input');
	if (elInput == null) return;
	var txtar = txt.split("#");
	if (txtar.length == 1) {
		if (txt.length > 39) {
			txtar = ("See chat#" + txt).split("#");
		}
	}
	elInput.value = txtar[0];
	var eventInput = new Event('input');
	elInput.dispatchEvent(eventInput);
	if (txtar.length > 1) {
		setChatMessage(txtar[1]);
	}
}

function getExplainCallAlert() {
	var b = translateCall($(".headingClass", getExplainCallBox()).text().split(" ").at(-1));
	var c = getContext().substring(0, getContext().indexOf(b));
	return alertHistoryMap.get(c + b);
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
	return localStorage.getItem(whoAmI() + "_general_split") === "y" ? 'true' : 'false';
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
	window.xxxx = tabs;
	if (parent.document.querySelector(".verticalTabBarClass").onmouseup == null)
		parent.document.querySelector(".verticalTabBarClass").onmouseup = function () {
			$("tab-bar-button", parent.document).css("pointer-events", "");
		}
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].textContent.search('BBOalert') == -1) {
			if (tabs[i].onmousedown == null) tabs[i].onmousedown = function () {
				$("tab-bar-button", parent.document).has(".selected.covered").css("pointer-events", "none");
				setOptionsOff();
			}
		}
	}
}

/**
 * retrieve my partner's user id
 */
function myPartner() {
	return $('bridge-screen deal-viewer .directionClass:contains("' + partnerSeat() + '")', PWD)
		.siblings("div.nameDisplayClass").text()
}

/**
 * retrieve active player direction and user id
 */
function getActivePlayer() {
    var name = $('bridge-screen deal-viewer .nameBarClass', PWD)
        .filter(function () {
            return this.style.backgroundColor === "rgb(255, 206, 0)";
        }).find(".nameDisplayClass").text().toLowerCase();
    if (name != '') return name;
    return $('bridge-screen deal-viewer .nameBarClass', PWD)
        .filter(function () {
            return this.style.backgroundColor === "rgb(204, 204, 154)";
        }).find(".nameDisplayClass").text().toLowerCase();
}

/**
 *	retrieve opponent's user id. LHO if lho=true 
 * @param {*} lho 
 */
function myOpponent(lho) {
	if (lho) return $('bridge-screen deal-viewer .directionClass:contains("' + directionLHO() + '")', PWD)
		.siblings("div.nameDisplayClass").text();
	return $('bridge-screen deal-viewer .directionClass:contains("' + directionRHO() + '")', PWD)
		.siblings("div.nameDisplayClass").text()
}

/**
 * retrieve Alert button state (true = ON)
 */
function isAlertON() {
	try {
		return $("#navDiv .biddingBoxClass button:eq(15):visible", PWD)[0].style.backgroundColor != "rgb(255, 255, 255)";
	}
	catch {
		return false;
	}
}

/**
 * set alert button state (on=true = ON)
 */
function setAlert(on) {
	if (isAlertON() == on) return on;
	$("#navDiv .biddingBoxClass button:eq(15):visible", PWD).click();
	return on;
}

/**
 * @ignore
 */
function tableType() {
	// no deal number = no table
	if (getDealNumber() == '') return 'no';
	// if no score panel -> practice table
	if ($('#navDiv deal-viewer .score-panel:visible', PWD).text() == '') return "practice";
	if ($('#navDiv deal-viewer .nameDisplayClass:visible', PWD).filter(function () {
		return this.textContent.toLowerCase() == whoAmI().toLowerCase();
	}).text() == '') return 'kibitz';
	return 'game';
}

/**
 * retrieve current chat destination
 */
function getCurrentChatDestination() {
	return $('#chatDiv .messageInputDivClass .channelButtonClass:eq(0)', PWD).text();
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
    return $('#navDiv .cardClass .topLeft', PWD).filter(function () {
        return this.parentElement.parentElement.parentElement.style.zIndex.startsWith("1")
    }).text().replaceAll("10", "T");
}

/**
 * retrieve partner's hand if visible
 */
function getPartnerHand() {
    return $('#navDiv .cardClass .topLeft', PWD).filter(function () {
        return this.parentElement.parentElement.parentElement.style.zIndex.startsWith("3")
    }).text().replaceAll("10", "T");
}

/**
 * retrieve auction box element. Returns undefined if none found
 * 
 */
function getAuctionBox() {
	return parent.$('bridge-screen .auctionBoxClass')[0];
}

function getCard(index) {
	return $('#navDiv .cardClass .topLeft', PWD).filter(function () {
		return this.parentElement.parentElement.parentElement.style.zIndex == index.toString();
	}).text().replaceAll("10", "T");
}

function getLastChatMessaage() {
	return $("#chatDiv .chatOutputClass chat-list-item:eq(-1)", PWD).text()
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
	return $(inp).parent().parent().parent().parent().parent().next().get(0)
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
	return $("html", PWD).attr("lang");
}

function redisplayBiddingBox(time = 100) {
	var bb = getBiddingBox();
	if (!isVisible(bb)) return;
	bb.style.display = "none";
	setTimeout(function () {
		bb.style.display = "inline-block";
	}, time);
}


function getBiddingBoxButtons() {
	elBiddingButtons = $("#navDiv .biddingBoxClass .biddingBoxButtonClass", PWD).toArray();
	if (elBiddingButtons.length == 0) return null;
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

function openAccountTab() {
	$('#rightDiv .verticalClass:eq(3):not(.selected)', PWD).click();
}

function openMessageTab() {
	$('#rightDiv .verticalClass:eq(0):not(.selected)', PWD).click();
}

function getMyCall() {
	var c = $("#navDiv .biddingBoxClass button:lt(15):visible", PWD).filter(function () {
		return (this.style.backgroundColor == "rgb(255, 206, 0)");
	}).text().replaceAll(" ", "");
	return translateCall(c);
}

/**
 * @ignore
 */
function setBiddingButtonEvents() {
	// get bidding box button labels
	var biddingButtonsText = $("#navDiv .biddingBoxClass button", PWD).off('mousedown touchstart')
		.map(function () { return this.textContent.trim() }).get();
	$("#navDiv .biddingBoxClass button", PWD).on('mousedown touchstart', function (event) {
		// find which button has been pressed
		$(".mat-ripple-element", this).remove();
		var buttonIndex = biddingButtonsText.indexOf(event.target.textContent.trim());
		// if call level button pressed
		if ((buttonIndex >= 0) && (buttonIndex <= 6)) {
			callText = (buttonIndex + 1).toString();
			// if suit button pressed
		} else if (buttonIndex <= 11) {
			callText = callText.charAt(0) + "1234567CDHSN".charAt(buttonIndex);
			// if other buttons pressed
		} else {
			switch (buttonIndex) {
				case 12:
					callText = "--"; break;
				case 13:
					callText = "Db"; break;
				case 14:
					callText = "Rd"; break;
				case 15:
					if (DEBUG) console.log("Alert pressed");
					addLog('click:[Alert]');
					if (isAlertON()) {
						setExplainText('');
						setChatMessage('', false);
					}
					return;
				default:
					if (DEBUG) console.log("OK pressed ");
					addLog('click:[OK]');
					saveAlert();
					sendAlertChat();
					return;
			}
		}
		// if call level selected
		if (callText.length == 1) {
			addLog('click:[' + callText + ' ]');
			if ((confirmBidsSet() != 'N')) clearAlert();
			if (DEBUG) console.log('Selected level :' + " > " + callText);
			// if call selected
		} else {
			addLog('click:[' + callText + ' ]');
			getAlert();
			if ((confirmBidsSet() == 'Y')) confirmBid(trustedBid);
			if (DEBUG) console.log('Selected call  :' + " > " + callText);
		}
	}
	);
}
