function getBlogPostURL (postURL) {
    var urlPath = postURL.split(".blogspot.com")[1];
    var urlBlog = postURL.split(".blogspot.com")[0];
    // retrieve blog ID
    var blogId = getBlogId(postURL);
    // if blog already registered return the direct download link to the post
    if (blogId != "") {
        urlPath = urlPath.slice(0, urlPath.indexOf(".html")+5);
        urlPath = urlPath.replace(/\//g, "%2F");
        var prefix = "https://blogger.googleapis.com/v3/blogs/";
        return prefix + blogId + "/posts/bypath?path=" + urlPath + "&key=" + apiKey;
    // if blog not yet registered return the direct download link to the blog info record
    } else {
        var url = urlBlog + ".blogspot.com/&key=" + apiKey;
        url = "https://www.googleapis.com/blogger/v3/blogs/byurl?url=" + url;
        return url;
    }
} 

// process the HTML content of the post
function bloggerPostData(html, url, urlOriginal) {
    postHTML = html;
    postContent = JSON.parse(html).content;
    postTitle = JSON.parse(html).title;
    postURL = JSON.parse(html).url;
    addInfoOption(postTitle, postURL.replace("http:","https:"));
    return parseHTML(postContent);    
}

function parseHTML(html) {
    var d = document.createElement("div");
	d.innerHTML = html;
    var txt = "";
	var lvl = 0;
    var p = d.querySelectorAll("p,ul,li,pre,iframe");
	var recList = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	for (i = 0; i < p.length; i++) {
		if (p[i].tagName.toLowerCase() == "iframe") {
            lvl = 0;
            var src = p[i].src;
            var idx = src.indexOf("/pub");
            if (src.startsWith("https://docs.google.com/document"))
            if (idx != -1) {
                src = src.substr(0, idx+4);
                txt = txt + "Import," + src + "\n";
            }
		}
		if (p[i].tagName.toLowerCase() == "p") {
            if (p[i].textContent != '') {
                if (p[i].parentElement.tagName.toLowerCase() != "li") {
                    lvl = 0;
                    recList[lvl] = elimine2Spaces(p[i].textContent.replace(/\u00A0/g, ' ')).trim() + ",,";
                    p[i].innerHTML = p[i].innerHTML.replaceAll("<br>","\n");
                    lastRec = p[i].textContent.split("\n");
                    lastRec = lastRec[lastRec.length-1];
                    recList[lvl] = elimine2Spaces(lastRec.replace(/\u00A0/g, ' ')).trim() + ",,";
                    if (p[i].innerText.endsWith("\n")) {
                        txt = txt + p[i].innerText;
                    } else {
                        txt = txt + p[i].innerText + "\n";
                    }
                }    
            }
		}
		if (p[i].tagName.toLowerCase() == "pre") {
            if (p[i].parentElement.tagName.toLowerCase() != "li") {
                lvl = 0;
                lastRec = p[i].textContent.split("\n");
                lastRec = lastRec[lastRec.length-1];
                recList[lvl] = elimine2Spaces(p[i].textContent.replace(/\u00A0/g, ' ')).trim() + ",,";
                txt = txt + p[i].textContent + "\n";    
            }
		}
		if (p[i].tagName.toLowerCase() == "li") {
			lvl = liNestingLevel(p[i]);
			var t = elimine2Spaces(p[i].textContent.replace(/\u00A0/g, ' ')).trim();
            t = t.split("\n")[0];
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

}

// return the nesting level of the list element
function liNestingLevel(li) {
    var lvl = 0;
    var lix = li; 
    while (lix.parentElement != null) {
        if (lix.parentElement.tagName.toLowerCase() == "ul") lvl++;
        lix = lix.parentElement;
    }
    return lvl;
}

// return blog ID from the list of registered blogs
function getBlogId (url) {
    var i = url.indexOf(".");
    if (i == -1) return "";
    var blogName = url.slice(8, i);
    i =  blogNames.indexOf(blogName);
    if (i == -1) return "";
    return blogIds[i];   
}

// return the name of blog from the post URL
function getBlogName (url) {
    var i = url.indexOf(".blogspot.com");
    if (i == -1) return "";
    return url.slice(8, i);
}

// register blog and return the original post URL for the second attempt
function registerBlogId (data, url, urlOriginal) {
    var blogInfo = {};
    if (data.indexOf("error") != -1) {
        return "Error \n" + data + "\n";
    }
    try {
        blogInfo = JSON.parse(data);
    } catch {
        return "Error \n" + data + "\n";
    }
    blogNames.push(getBlogName(urlOriginal));
    blogIds.push(blogInfo.id);
    return "Import," + urlOriginal + "\n";
}