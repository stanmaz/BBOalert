var IntoBridgePatchVerion = "1.0.2";
document.title = document.title + " IntoBridgePatch " + IntoBridgePatchVerion;

function isIntoBridge() {
	return parent.window.location.href.startsWith("https://play.intobridge.com/table/");
}

/**
 * click OK button programatically
 */
function clickOK() {
	setTimeout(function () {
		$("button[data-testid='confirm-bid']", PWD).trigger("click");
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
	return PWD.querySelector("header");
}
/**
 * returns div element containing chat dialog
 */
function getChatDiv() {
	return PWD.querySelector("form");
}

/**
 * returns current BBO user-id
 */
function whoAmI() {
	return localStorage.getItem('username');
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
	return $("div[data-testid='bottom-seat-slot']", PWD).text().charAt(0);
}

function partnerSeat() {
	return $("div[data-testid='top-seat-slot']", PWD).text().charAt(0);
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

function theirVulnerability() {
	var vultab = ["", "NS", "EW", "NSEW", "NS", "EW", "NSEW", "", "EW", "NSEW", "", "NS", "NSEW", "", "NS", "EW"];
	var sd = getDealNumber();
	if (sd == '') return '';
	var nd = parseInt(sd);
	if (isNaN(nd)) return '';
	if (nd < 1) return '';
	nd = (nd - 1) % 16;
	if (vultab[nd].includes(directionLHO())) return '@V';
	return '@N';
}


/**
 * check if confirm bids switch is ON
 * returns 'Y' or 'N'
 */
function confirmBidsSet() {
	return 'Y';
}

/**
 * check if keyboard entry switch is ON
 * returns 'Y' or 'N'
 */
function keyboardEntrySet() {
	return 'N';
}

/**
 * check if account setting switch is ON
 * returns 'Y' 'N' or '' if not found
 */
function accountSettingsSet(idx) {
	return '';
}

/**
 * return true if OK button is visible
 */
function buttonOKvisible() {
	return (!$("button[data-testid='confirm-bid']:visible", PWD).length == 0);
}

/**
 * return true if OK button is pressed (mouse down)
 */
function buttonOKpressed() {
	return false;
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
	return;
}

/**
 * retrieve our vulnerability tag from the auction box
 */
function areWeVulnerable() {
	return ourVulnerability();
}

/**
 * retrieve opponent's vulnerability tag from the auction box
 */
function areTheyVulnerable() {
	return theirVulnerability();
}

/**
 * retrieve current board number
 */
function getDealNumber() {
	return $("#vulnerability-wrapper", PWD).text().replaceAll("D", "");
}

/**
 * @ignore
 */
function setTitle(txt) {

}

/**
 * @ignore
 */
function setTitleText(txt) {

}

/**
 * retrieve visible chat input element
 */
function getVisibleMessageInput() {
	return $("input[name='message']:visible", PWD).get(0);
}

/**
 * send chat message programatically
 */
function sendChat() {
	$("button[aria-label='Send']", PWD).get(0).click()
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
	sendPrivateChat(myOpponent(true), msg.replaceAll("\\n", " "));
	setTimeout(function () {
		sendPrivateChat(myOpponent(false), msg.replaceAll("\\n", " "));
	}, 2000);
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
	var bb = $("#bidding-box", PWD).get(0);
	if (bb == undefined) return null;
	setBiddingButtonEvents();
	return bb;
}

/**
 * retrieve call explain box element
 */
function getExplainCallBox() {
	return null;
}

function getDealEndPanel() {
	return null;
}

/**
 * set explain call box input text
 */
function setExplainCallText(txt) {

}

function getExplainCallAlert() {

}

/**
 * retrieve explain call box text input element
 */
function getExplainCallInput() {

}

/**
 * retrieve bidding box text input element
 */
function getExplainInput() {
	setAlert(true);
	return $("input[name='alert']", PWD).get(0);
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
	setAlert(true);
	setTimeout(function () {
		if (DEBUG) console.log("setExplainText " + txt);
		setNativeValue(getExplainInput(), txt);
	}, 100);
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
		}).find("div:lt(2)").text();
	if (name == '') {
		name = $('bridge-screen deal-viewer .nameBarClass', PWD)
			.filter(function () {
				return this.style.backgroundColor === "rgb(204, 204, 154)";
			}).find("div:lt(2)").text();
	}
	// return direction + UID in lower case
	return name.charAt(0) + name.substring(1).toLowerCase();
}

/**
 *	retrieve opponent's user id. LHO if lho=true 
 * @param {*} lho 
 */
function myOpponent(lho) {
	if (lho) return $($("#opponents-row p", PWD).get(0)).text();
	return $($("#opponents-row p", PWD).get(1)).text();
}

/**
 * retrieve Alert button state (true = ON)
 */
function isAlertON() {
	return $(getAlertButton()).attr("aria-pressed") == "true";
}

function getAlertButton() {
	return $("button[data-testid='bid-alert']", PWD).get(0);
}

/**
 * set alert button state (on=true = ON)
 */
function setAlert(on) {
	if (isAlertON() == on) return on;
	$(getAlertButton()).click();
	return on;
}

/**
 * @ignore
 */
function tableType() {
	// no deal number = no table
	if (getDealNumber() == '') return 'no';
	if ($('#navDiv deal-viewer .nameDisplayClass:visible', PWD).text().includes("Robot")) return 'robot';
	if ($('#navDiv deal-viewer .nameDisplayClass:visible', PWD).filter(function () {
		return this.textContent.toLowerCase() == whoAmI().toLowerCase();
	}).text() == '') return 'kibitz';
	// if no score panel -> practice table
	if ($('#navDiv deal-viewer .score-panel:visible', PWD).text() == '') return "practice";
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

/*
$('div[data-testid="left-seat-slot"]').find('button:eq(0)').click();
$('button[data-testid="open chat"]').click();
*/



/**
 * send chat message to specified user id
 */
function sendPrivateChat(uid, text) {
	if (1 == 1) return;
	var configObserver = {
		attributes: true,
		//		attributeFilter: ['id', 'class', 'style'],
		childList: true,
		subtree: true
	};
	var asideNode = PWD;
	var step = 2;
	setTimeout(function () {
		$("aside button[aria-label='People']", PWD).click();
	}, 200);
	var tout = setTimeout(function () {
		setTimeout(function () {
			$("#navigation-menu-toggle", PWD).click();
		}, 2000);
	}, 5000);
	var asideObserver = new MutationObserver(observerCallback);

	asideObserver.observe(asideNode, configObserver);

	function observerCallback(mutationsList, observer) {
		console.log(" mutationsList.length: " + mutationsList.length + " step: " + step);
		observer.disconnect();
		if (mutationsList.length > 0) {
			switch (step) {
				case 2:
					// Open chat
					if ($("input[data-testid='people-search']", PWD).length != 0) {
						//						console.log(" mutationsList.length: " + mutationsList.length + " step: " + step);
						step++;
						setTimeout(function () {
							setNativeValue($("input[placeholder='Search any player']", PWD).get(0), uid);
						}, 100);
					}
					break;
				case 3:
					// Select user id
					if ($("button[aria-label='" + uid + "']", PWD).length != 0) {
						//						console.log(" mutationsList.length: " + mutationsList.length + " step: " + step);
						step++;
						setTimeout(function () {
							$("button[aria-label='" + uid + "']", PWD).click();
						}, 100);
					}
					break;
				case 4:
					// Open chat
					if ($("button[data-testid='start chat']:eq(0)", PWD).length != 0) {
						//						console.log(" mutationsList.length: " + mutationsList.length + " step: " + step);
						step++;
						setTimeout(function () {
							$("button[data-testid='start chat']:eq(0)", PWD).click();
						}, 100);
					}
					break;
				case 5:
					// Set chat text
					if ($("input[name='message']", PWD).length != 0) {
						//						console.log(" mutationsList.length: " + mutationsList.length + " step: " + step);
						step++;
						setTimeout(function () {
							setNativeValue($("input[name='message']", PWD).get(0), text);
						}, 100);
					}
					break;
				case 6:
					// Close chat tab
					if ($("button[aria-label='Send']:eq(0)", PWD).length != 0) {
						//						console.log(" mutationsList.length: " + mutationsList.length + " step: " + step);
						step++;
						clearTimeout(tout);
						setTimeout(function () {
							$("button[aria-label='Send']:eq(0)", PWD).click();
						}, 100);
					}
				case 7:
					if ($("#navigation-menu-toggle", PWD).length != 0) {
						step++;
						console.log("sendPrivateChat completed");
						clearTimeout(tout);
						setTimeout(function () {
							$("#navigation-menu-toggle", PWD).click();
						}, 100);
					}
					return;
				default:
					clearTimeout(tout);
					return;
			}
		}
		asideObserver.observe(asideNode, config);
	};
}

/**
 * retrieve my hand into a string
 */
function getMyHand() {
	return getHandBySeat(mySeat());
}

/**
 * retrieve partner's hand if visible
 */
function getPartnerHand() {
	return getHandBySeat(partnerSeat());
}

function getHandBySeat(seat) {
	var zidx = ("SWNE".indexOf(seat) + 1).toString();
	return $('#navDiv .cardClass .topLeft:visible', PWD).filter(function () {
		return this.parentElement.parentElement.parentElement.style.zIndex.startsWith(zidx)
	}).text().replaceAll("10", "T");
}

/**
 * retrieve auction box element. Returns undefined if none found
 * 
 */
function getAuctionBox() {
	return $("#bids-history", PWD).get(0);
}

function getCard(index) {
	if (isIntoBridge()) return undefined;
	return $('#navDiv .cardClass .topLeft', PWD).filter(function () {
		return this.parentElement.parentElement.parentElement.style.zIndex == index.toString();
	}).text().replaceAll("10", "T");
}

function getLastChatMessaage() {
	if (isIntoBridge()) return undefined;
	return $("#chatDiv .chatOutputClass chat-list-item:eq(-1)", PWD).text();
}

function getPlayedCards() {
	if (isIntoBridge()) return undefined;
	return getCard(90) + getCard(91) + getCard(92) + getCard(93);
}

function getAnnouncementPanel() {
	if (isIntoBridge()) return undefined;
	return parent.$("bridge-screen .announcementPanelClass")[0];
}

function getNotificationPanel() {
	if (isIntoBridge()) return undefined;
	return parent.$("bridge-screen .notificationClass")[0];
}

function getCallExplanationPanel() {
	if (isIntoBridge()) return undefined;
	return parent.$("bridge-screen .callExplanationClass")[0];
}

function getCallExplanationText() {
	if (isIntoBridge()) return undefined;
	return parent.$("bridge-screen .callExplanationClass .textClass").text();
}

function getChatSendButton(inp) {
	if (isIntoBridge()) return undefined;
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
	if (isIntoBridge()) {
		elBiddingButtons = $("#bidding-box button", PWD).toArray();
		if (elBiddingButtons.length == 0) return null;
		return elBiddingButtons;
	}
	elBiddingButtons = $("#navDiv .biddingBoxClass .biddingBoxButtonClass", PWD).toArray();
	if (elBiddingButtons.length == 0) return null;
	return elBiddingButtons;
}

/**
 * Clear explanation text field
 */
function clearAlert() {
	setExplainText("");
}

function openAccountTab() {
	$('#rightDiv .verticalClass:eq(3):not(.selected)', PWD).click();
}

function openMessageTab() {
	$('#rightDiv .verticalClass:eq(0):not(.selected)', PWD).click();
}

function getMyCall() {
	var suits = ['??', 'C', 'D', 'H', 'S'];
	var suitSymbols = $("#bidding-box path", PWD).map(function () {
		return this.getAttribute("d");
	});
	suitSymbols = suitSymbols.toArray();
	var ctx = '';
	var cc = $("button[data-testid='confirm-bid']:visible", PWD).each(function () {
		var ct = $(this).text().trim().replaceAll("Confirm", "");
		var cp = $(this).find("path").attr("d");
		if (cp != undefined) {
			ct = ct + suits[suitSymbols.indexOf(cp) + 1];
		}
		if (ct == '') ct = '??';
		if (ct == 'Pass') ct = '--';
		if (ct == 'X') ct = 'Db';
		if (ct == 'XX') ct = 'Rd';

		ct = ct.replaceAll("NT", "N");
		ct = ct.replaceAll("A", "");
		ctx = ctx + ct;
	});
	return ctx;
}

/**
 * @ignore
 */
function setBiddingButtonEvents() {
	if (isIntoBridge()) {
		$("#bidding-box button", PWD).on('mousedown', function (event) {
			if (DEBUG) console.log("box button pressed" + $(this).text());
			ct = "";
			$("#bidding-box button[data-active]", PWD).each(function () {
				ct = ct + $(this).attr("data-testid").replaceAll("bid-level-", "")
					.replaceAll("bid-trump-", "")
					.replaceAll("bid-pass", "--")
					.replaceAll("bid-double", "Db")
					.replaceAll("bid-redouble", "Rd")
					;
			});
			setTimeout(function () {
				ct = getMyCall();
				if (ct.length == 2) {
					if (DEBUG) console.log("call test: " + ct);
					callText = ct;
					getAlert();
					$("button[data-testid='confirm-bid']", PWD).on('mousedown', function (event) {
						if (DEBUG) console.log("confirm button pressed" + $(this).text());
						if (DEBUG) console.log("lastQueryExplanation " + lastQueryExplanation);
						lastUserExplanation = getExplainInput().value;
						if (DEBUG) console.log("lastUserExplanation  " + lastUserExplanation);
						saveAlert();
					});
				}
			}, 500);
		});
		return;
	}
}

function getBiddingBoxButtonIndexByText(txt) {

	return -1;
}

function disableSplitScreenSwitch() {

}

function getPlayerAtSeat(seat) {
	return '';
}

function getOpenProfile() {
	return '';
}

function getOpenProfileBBOid() {
	return '';
}

function getOpenProfileBBOalertURL() {
	return '';
}

function loadBBOalertURLinProfile() {
	return '';
}

function addBBOalertButtonToProfile() {
	return '';
}

function removeBBOalertButtonFromProfile() {
	return '';
}

function enableAutoShortcuts() {
	/*	if ($("#adpanel2").length == 1) {
			if (parent.document.activeElement.tagName.toLowerCase() == "input") {
				if (!$("#rightDiv", PWD)[0].contains(parent.document.activeElement)) {
					$("#adpanel2")[0].inputObject = parent.document.activeElement;
					if (parent.document.activeElement.onclick == null) {
						parent.document.activeElement.onclick = function () {
							toggleButtons(this);
						};
					}
				}
			}
		}*/
}

/**
 * Get actual bidding context
 */
function getContext() {
	var suits = ['??', 'C', 'D', 'H', 'S'];
	var suitSymbols = $("#bidding-box path", PWD).map(function () {
		return this.getAttribute("d");
	});
	suitSymbols = suitSymbols.toArray();
	var ctx = '';
	var cc = $("#bids-history tbody button", PWD).each(function () {
		var ct = $(this).text().trim();
		var cp = $(this).find("path").attr("d");
		if (cp != undefined) {
			ct = ct + suits[suitSymbols.indexOf(cp) + 1];
		}
		if (ct == '') ct = '??';
		if (ct == '?') ct = '';
		if (ct == 'Pass') ct = '--';
		if (ct == 'X') ct = 'Db';
		if (ct == 'XX') ct = 'Rd';
		ct = ct.replaceAll("NT", "N");
		ct = ct.replaceAll("A", "");
		ctx = ctx + ct;
	});
	return ctx;
}

function getTable() {
	return parent.document.getElementById('board');
}

function getReactElement(domElement) {
	if (!domElement) return null;

	// React attaches internal properties starting with '__reactFiber$' or '__reactInternalInstance$'
	const key = Object.keys(domElement).find(
		(k) =>
			k.startsWith('__reactFiber$') ||
			k.startsWith('__reactInternalInstance$') ||
			k.startsWith('__reactProps$')
	);

	if (!key) return null;

	return domElement[key];
}

function setReactInputValue(inputElement, value) {
	if (!inputElement) return;

	// 1. Get the original native property descriptor for 'value' from HTMLInputElement
	var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
		parent.window.HTMLInputElement.prototype,
		'value'
	).set;

	// 2. Call the native setter with the input element as 'this' context
	nativeInputValueSetter.call(inputElement, value);

	// 3. Dispatch an 'input' event so React's SyntheticEvent subsystem catches the change
	const event = new Event('input', { bubbles: true });
	inputElement.dispatchEvent(event);
}

function setNativeValue(element, value) {
	if (!element) return;
	let lastValue = element.value;
	element.value = value;
	let event = new Event("input", { target: element, bubbles: true });
	// React 15
	event.simulated = true;
	// React 16
	let tracker = element._valueTracker;
	if (tracker) {
		tracker.setValue(lastValue);
	}
	element.dispatchEvent(event);
}

function setBBOalertButton(on) {
	if (PWD.getElementById("bboalert-button") != null) return;
	$("#bboalert-button", PWD).remove();
	$("header > div:eq(0)", PWD).after("<div id=bboalert-button><div>");
	$("header > div:eq(0)", PWD).css("margin-right", "20px")
	$("#bboalert-button", PWD)[0].outerHTML = BBOalertButtonHTML;
	$("#bboalert-button", PWD)[0].onclick = toggleOptions;
	return;
}

async function chatToOpponents(msg) {
	await waitForElm("div[data-testid='left-seat-slot'] button:eq(0):visible").then((el) => {$(el).click()})
	.then(waitForElm("button[data-testid='open chat']:eq(0):visible")).then((el) => {$(el).click()});
	await waitForElm("form input[name='message']:visible").then((el) => {setNativeValue($(el).get(0), msg)});
	await waitForElm("button[aria-label='Send']:eq(0):visible").then((el) => {$(el).click()});
	await waitForElm("#navigation-menu-toggle:visible").then((el) => {$(el).click()});
/*
	el = await waitForElm("div[data-testid='right-seat-slot'] button:eq(0):visible");el.click();
	el = await waitForElm("button[data-testid='open chat']:eq(0):visible");el.click();
	el = await waitForElm("form input[name='message']");setNativeValue($(el).get(0), msg);
	el = await waitForElm("button[aria-label='Send']:eq(0):visible");el.click();
	el = await waitForElm("button[aria-label='Send']:eq(0):visible");el.click();
	el = await waitForElm("#navigation-menu-toggle");el.click();*/
}