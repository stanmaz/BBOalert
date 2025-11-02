function loadJS(url) {
	var url1 = makeDirectLink(url);
	fetch(url1)
		.then(x => x.text())
		.then(y => {
			eval(y);
		})
		.catch(error => console.log("Error : " + error));
}

function makeDirectLink(s) {
	var url = s;
	if (url.indexOf(".blogspot.com") != -1) {
		return getBlogPostURL(url);
	}
	if (url.indexOf("www.dropbox.com") != -1) {
		return url.replace("www.dropbox.com", "dl.dropbox.com");
	}
	if (url.indexOf("https://github.com") != -1) {
		return url.replace("blob/", "").replace("https://github.com", "https://raw.githubusercontent.com");
	}
	if (url.startsWith("https://drive.google.com/file/d/")) {
		var idx = url.indexOf("/view");
		if (idx != -1) {
			return url.substring(0, idx) + "/preview";
		}
	}
	if (url.startsWith("https://1drv.ms/")) {
		var idx1 = url.indexOf("s!");
		var idx2 = url.indexOf("?e=");
		if ((idx1 != -1) && (idx2 != -1)) {
			return "https://api.onedrive.com/v1.0/shares/s!" + url.substring(idx1 + 2, idx2) + "/root/content";
		}
	}
	return url;
}

function HTMLpage2text(html, url, urlOriginal) {
	if (html.startsWith("#")) {
		return parseMarkdown(html);
	}
	if (url.startsWith("https://www.googleapis.com/blogger/v3/blogs/byurl?url=")) {
		return registerBlogId(html, url, urlOriginal);
	}
	if (url.startsWith("https://blogger.googleapis.com/v3/blogs/")) {
		return bloggerPostData(html, url, urlOriginal);
	}
	if (url.startsWith("https://docs.google.com/document/")) {
		var i1 = html.indexOf("<body");
		var i2 = html.indexOf("</body>");
		if ((i2 == -1) || (i2 == -1)) return html;
		var d = document.createElement("div");
		d.innerHTML = html;
		addInfoOption(d.querySelector("title").textContent, url);
		html = html.slice(i1 + 6, i2);
		d.innerHTML = html;
		var p = d.querySelectorAll("p,ul,li");
		var txt = "";
		var lvl = 0;
		var recList = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
		for (i = 0; i < p.length; i++) {
			if (p[i].tagName.toLowerCase() == "p") {
				lvl = 0;
				recList[lvl] = elimine2Spaces(p[i].textContent.replace(/\u00A0/g, ' ')).trim() + ",,";
				txt = txt + p[i].textContent + "\n";
			} else if (p[i].tagName.toLowerCase() == "ul") {
				lvl = parseInt(p[i].classList[1].split("-")[2]) + 1;
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
	} else if (html.startsWith("<?xml")) {
		return getXMLfile(html);
	} else {
		var i1 = html.indexOf("<body");
		var i2 = html.indexOf("</body>");
		if ((i2 == -1) || (i2 == -1)) return html;
		var d = document.createElement("div");
		d.innerHTML = html;
		addInfoOption(d.querySelector("title").textContent, url);
		html = html.slice(i1 + 6, i2);
		return parseHTML(html);
	}
}

function getGoogleDriveFile(gdURL, success, failure) {
	const controller = new AbortController();
	function getData(event) {
		if (event.data.url != gdURL) return;
		clearTimeout(tmr);
		if (event.data.text.length > 0) {
			if (event.data.text.length == 262122) {
				failure("File too large");
			} else {
				success(event.data.text);
			}
		} else {
			failure("Error no data loaded");
		}
		gdifrm.remove();
		controller.abort();
	}
	var gdifrm = document.createElement("iframe");
	gdifrm.allow = "clipboard-read; clipboard-write";
	gdifrm.sandbox = 'allow-scripts allow-same-origin allow-modals';
	gdifrm.id = 'googledrive-iframe';
	gdifrm.width = "100%";
	gdifrm.height = "100%";
	gdifrm.src = gdURL;
	document.body.appendChild(gdifrm);
	window.addEventListener("message", getData, { signal: controller.signal });
	var tmr = setTimeout(function () {
		failure(gdURL + "\n time out error");
		gdifrm.remove();
		controller.abort();
	}, 5000);
}


function fetchWebData(url, success, failure) {
	if (url.startsWith("https://drive.google.com/file/d/")) {
		getGoogleDriveFile(url, success, failure);
	} else if (url.startsWith("https://tinyurl.com/")) {
		importTinyURL(url, success, failure);
	} else if (url.includes(".odt")) {
		fetch(url)       // 1) fetch the url
			.then(function (response) {                       // 2) filter on 200 OK
				if (response.status === 200 || response.status === 0) {
					return Promise.resolve(response.blob());
				} else {
					return Promise.reject(new Error(response.statusText));
				}
			})
			.then(JSZip.loadAsync)                            // 3) chain with the zip promise
			.then(function (zip) {
				return zip.file("content.xml").async("string"); // 4) chain with the text content promise
			})
			.then((text) => {                    // 5) display the result
				success(text);
			}, function error(e) {
				failure(e);
			});
	} else {
		fetch(url, {
			cache: "no-store"
		})
			.then(x => x.text())
			.then(data => { success(data); })
			.catch(error => { failure(error) });
	}

}

function loadBBOalertWebDataFile(url, urlOriginal, success, failure) {
	var url1 = makeDirectLink(url);
	fetchWebData(url1, function (data) {
		consoleLog("data : " + data);
		var txt = HTMLpage2text(data, url1, urlOriginal);
		if (getDataType(txt) == "BBOalert") {
			success(txt);
		} else {
			failure("not BBOalert data");
		}
	}, function (error) {
		consoleLog("error : " + error);
		failure("Error : " + error);
	});
}

function consoleLog(txt) {
	if (DEBUG) console.log("consoleLog : " + txt);
}


function initBBOalertEvents() {
	var ue = document.body.querySelector("bboalert-events");
	if (ue != null) ue.parentNode.removeChild(ue);
	ue = document.createElement("bboalert-events");
	document.body.appendChild(ue);
	ue = document.body.querySelector("bboalert-events");
	return ue;
}

function importTinyURL(shortURL, success, failure) {
	var longURL = listTinyURL.get(shortURL);
	if (longURL != undefined) {
		success("Import," + longURL);
		return;
	}
	var popup = null;
	var id = shortURL.replace("https://tinyurl.com/", "");
	$("#" + id).remove();
	t = document.createElement("tinyurl");
	t.id = shortURL.replace("https://tinyurl.com/", "");
	document.body.appendChild(t);
	document.getElementById(id).addEventListener("tinyurl", (event) => {
		try {
			var longURL = event.detail.data.split(",")[1];
			listTinyURL.set(shortURL, longURL);
			saveTinyURL();
			if (shortURL == importedURL) importedURL = longURL;
			success("Import," + longURL);
			popup.close();
		} catch {
			failure("Error conversion of tinyURL");
		}
	});
	popup = window.open(shortURL, shortURL, "width=100,height=100,visible=none,popup");
	if (popup == null) {
		alertButton(
			"A pop-up window is required to process the TinyURL <b>" + shortURL + "</b><br>" +
			"Your browser is currently blocking pop-ups, which will interrupt the data loading.<br>" +
			"To avoid this interruption, please disable your pop-up blocker for <br><b>https://www.bridgebase.com</b>.<br><br>" +
			"Click here to continue"
			, function () {
				popup = window.open(shortURL, shortURL, "width=100,height=100,visible=none,popup");
				this.remove();
			});

	}
}

window.addEventListener("message", (event) => {
	try {
		if (event.data.startsWith("https://tinyurl.com")) {
			var id = event.data.split(",")[0].replace("https://tinyurl.com/", "");
			var ev = new CustomEvent("tinyurl", { detail: { data: event.data } });
			document.getElementById(id).dispatchEvent(ev);
		}
	} catch {
	}
});

function alertButton(txt, f) {
	p = $("#bboalert-p1");
	b = $("<button style='width:100%'>" + txt + "</button>");
	$(b).on("click", f);
	$(p).after(b);
}

function saveTinyURL() {
	window.localStorage.BBOalertTinyURL = JSON.stringify(Array.from(listTinyURL.entries()));
}

function loadTinyURL() {
	try {
		listTinyURL = new Map(JSON.parse(localStorage.BBOalertTinyURL));
	} catch { }
}

function getXMLfile(xml) {
	function getListNestingLevel(e) {
		var n = 0;
		var rootTable = false;
		e1 = e;
		while (e1.parent().length != 0) {
			if (e1.parent().prop("nodeName") == "text:list") {
				rootTable = false;
				n++;
			}
			if (e1.parent().prop("nodeName") == "table:table") {
				n++;
				rootTable = true;
			}
			e1 = e1.parent();
		}
		if (rootTable) n--;
		return n;
	}
	function getListNestingIndent(n) {
		if (n == 0) return "";
		var indent = "- ";
		n--;
		while (n > 0) {
			indent = "    " + indent;
			n--;
		}
		return indent;
	}
	function firstCellInRow(cell) {
		if ($(cell).parent().find("table\\:table-cell:first").is(cell)) return true;
		return false;
	}
	function lastCellInRow(cell) {
		if ($(cell).parent().find("table\\:table-cell:last").is(cell)) return true;
		return false;
	}
	function isHeaderRow(cell) {
		while (cell.parent().length > 0) {
			if (cell.parent().prop("nodeName") == "table:table-header-rows") return true;
			cell = cell.parent();
		}
		return false;
	}
	window.xmlFile = xml;
	var xmlDoc = $.parseXML(xmlFile.replaceAll("<text:tab/>", " "));
	window.xmlDoc = xmlDoc;
	var txt = [];
	$xml = $(xmlDoc);
	$xml.find("office\\:text text\\:p").each(function () {
		//		console.log(this.parentNode.nodeName + " " + this.nextSibling.parentNode.nodeName + " " + this.textContent);
		// handle table cells
		if ($(this).parent().prop("nodeName") == 'table:table-cell') {
			var recPrefix = "";
			var sep = ",";
			var nl = getListNestingLevel($(this).parent());
			//			console.log("nesting level = " + nl + " " + this.textContent);
			if (nl > 0) {
				recPrefix = getListNestingIndent(nl);
				sep = " ";
			}
			if (firstCellInRow($(this).parent())) {
				if (isHeaderRow($(this).parent())) recPrefix = "";
				txt.push(recPrefix + this.textContent);
				if (lastCellInRow($(this).parent())) return;
			} else {
				txt[txt.length - 1] = txt[txt.length - 1] + sep + this.textContent;
			}
			return;
		}
		var tableHeader = "";
		// skip annotation and frame objects but not its content
		if ($(this).find("office\\:annotation").length > 0) return;
		if ($(this).find("draw\\:frame").length > 0) return;
		// Handle lists
		if ($(this).parent().prop("nodeName") == 'text:list-item') {
			//			console.log("level = " + getListNestingLevel($(this).parent()) + " " + this.textContent)
			txt.push(getListNestingIndent(getListNestingLevel($(this).parent())) + this.textContent);
			return;
		}
		// copy paragraph to the output
		txt.push(this.textContent);
	})
	var txtout = [];
	txt.forEach(function (e) {
		if (e.trim() == "-") return;
		txtout.push(e);
	})
	//	console.log(txtout);
	return txtout.join("\n");
}
