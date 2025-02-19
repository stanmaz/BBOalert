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

