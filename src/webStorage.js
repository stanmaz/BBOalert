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
    } else {
        fetch(url, {
            cache: "no-store"
        })
            .then(x => x.text())
            .then(data => { success(data); })
            .catch(error => { failure(error)});
    }

}
