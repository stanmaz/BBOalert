/**
 * @ignore
 */
function addBBOalertButton() {
	if (document.getElementById('myButton') != null) return;
	var b = document.createElement("button");
	b.style.width = '100%';
	b.style.height = '100%';
	b.style.backgroundColor = 'blue';
	b.textContent = 'Alert';
	b.style.color = 'white';
	b.style.display = 'block';
	b.id = 'myButton';
	b.style.zIndex = "1";
	b.onclick = toggleOptions;
	var cc = parent.document.querySelector('.connectionClass');
	for (var i = 0; i < cc.children.length; i++) cc.children[i].style.display = 'none';
	cc.appendChild(b);
}


/**
 * toggle BBOalert panel display
 */
function toggleOptions() {
	var adPanel0 = parent.document.getElementById("adpanel0");
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
 * display button panel if on=true. Otherwise hide it
 */
function setButtonPanel(on) {
	var adPanel2 = document.getElementById("adpanel2");
	var adPanel0 = document.getElementById("adpanel0");
	if (adPanel0 == null) return;
	if (on) {
		var b = parent.document.querySelector('#bboalert-sc');
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
				readNewData("BBOalert\nImport," + this.options[this.selectedIndex].value);
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
		settingsSelector.add(new Option('Disable recording'));
		settingsSelector.add(new Option('Disable auto-alerts'));
		settingsSelector.add(new Option('Silent startup'));
		settingsSelector.add(new Option('BBOalert button'));
		settingsSelector.add(new Option('Deferred alerts'));
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
				if (this.selectedIndex = 8) {
					setBBOalertButton(isSettingON(8));
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
		configSelector.style.display = "block";
		configSelector.add(new Option('Plugin settings ...'));
		configSelector.onchange = function () {
			if (this.selectedIndex == 0) {
				//				$("#bboalert-config-panel").hide();
			} else {
				var cfgsel = document.querySelector('#bboalert-menu-config');
				var s = localStorage.getItem('BBOalertPlugin ' + cfgsel.options[cfgsel.selectedIndex].label);
				if (s != null) {
					$.extend({}, this.options[this.selectedIndex].cfgObj, JSON.parse(s));
				}
				setConfigBox(this.options[this.selectedIndex].cfgLabel, this.options[this.selectedIndex].cfgObj);
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
		$("#bboalert-p1").css("font-family", "Arial, Helvetica, sans-serif");
		return true;
	}
	return false;
}

function setBBOalertButton(on) {
    if (on) {
		if(PWD.getElementById("bboalert-button") != null) return;
        $("#bboalert-button",parent.window.document).remove();
        var bbb = parent.window.document.createElement("div");
        $('.nameTagClass',parent.window.document).eq(0).parent().append(bbb);
        bbb.outerHTML = BBOalertButtonHTML;
        $("#bboalert-button",parent.window.document).click(toggleOptions);
        $("#bboalert-tab",parent.window.document).hide();
    } else {
		if($("#bboalert-tab:visible", PWD).length != 0) return;
        $("#bboalert-button",parent.window.document).remove();
        $("#bboalert-tab",parent.window.document).show();       
    }
}


/**
 * @ignore
 */
function setAdPanel() {
	if (document.getElementById("adpanel") != null) return;
	var appPanel = parent.document.getElementById("rightDiv");
	if (appPanel == null) return;
	var adPanel0 = document.createElement("div");
	adPanel0.id = 'adpanel0';
	adPanel0.style.position = 'absolute';
	adPanel0.style.top = '0px';
	adPanel0.style.left = '0px';
	adPanel0.style.backgroundColor = 'black';
	adPanel0.style.zIndex = "5000";
	adPanel0.style.display = 'block';
	adPanel0.style.height = '97%';
	adPanel0.style.width = '100%';
	//	adPanel0.style.right = '57px';
	document.body.appendChild(adPanel0);

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
function setUI() {
	setAdPanel();
	return setControlButtons();
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

