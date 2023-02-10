


function getGoogleDriveFile(gdURL, success, failure) {
    const controller = new AbortController();
    function getData(event) {
        if (event.data.url != gdURL) return;
        clearTimeout(tmr);
        if (event.data.text.length > 0) {
            success(event.data.text);
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

function OK(text) {
    console.log("OK \n" + text.length);
}
function NOK(text) {
    console.log("NOK \n" + text);
}

var URL2 = "https://drive.google.com/file/d/1RUFTe2gLN2NW8ukGp4oZv6p_zoEs47Bz/preview";
getGoogleDriveFile(URL2, OK, NOK);
var URL1 = "https://drive.google.com/file/d/1Hm3RzqgFmIyW7Hr-w0Thp4d4-s8Z9LRv/preview";
getGoogleDriveFile(URL1, OK, NOK);



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

var URL3 = "https://drive.google.com/file/d/1Hm3RzqgFmIyW7Hr-w0Thp4d4-s8Z9LRv/preview";
fetchWebData(URL3, OK, NOK);
