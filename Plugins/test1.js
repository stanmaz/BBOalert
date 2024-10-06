//BBOalert, test modified OK button
/*
Import,https://github.com/stanmaz/BBOalert/blob/master/Scripts/setTeachingTable.js
*/
//Script,onDataLoad
modified_OK_button = function (on) {
    //    if (!buttonOKvisible()) return;
    console.log("Plugin : call selected " + callText);
    var btok = $("bridge-screen bidding-box-button button", BBOcontext())[16];
    var btok_span = $("span", btok)[0];
    console.log("Plugin : html " + btok.innerHTML);
    var i = btok.innerHTML.indexOf("<");
    btok.innerHTML = btok.innerHTML.substring(i);
    console.log("Plugin : html " + i);
    if (on) {
        if (callText.length == 2) {
            var txt1 = ""
            var txt2 = "OK";
            var btnt = $("bridge-screen bidding-box-button button", BBOcontext())[11];
            var bkg = "white";
            var clr = "black";
            var fntsiz = "";
            switch (callText) {
                case "Db":
                    txt2 = 'Dbl';
                    bkg = "rgb(203, 0, 0)";
                    clr = "white";
                    break;
                case "Rd":
                    txt2 = 'Rdbl';
                    bkg = "rgb(67, 119, 169";
                    clr = "white";
                    break;
                case "--":
                    txt2 = 'Pass';
                    bkg = "rgb(16, 102, 16)";
                    clr = "white";
                    break;
                default:
                    txt1 = callText.charAt(0);
                    bkg = "rgb(255, 206, 0)";
                    switch (callText.charAt(1)) {
                        case "N":
                            txt2 = btnt.textContent;
                            clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(11).find("span").first().css("color");
                            fntsiz = $("bridge-screen bidding-box-button button", BBOcontext()).eq(11).find("span").first().css("font-size");
                            break
                        case "C":
                            txt2 = "♣";
                            clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(7).find("span").first().css("color");
                            fntsiz = "larger";
                            break
                        case "D":
                            txt2 = "♦";
                            clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(8).find("span").first().css("color");
                            fntsiz = "larger";
                            break
                        case "H":
                            txt2 = "♥";
                            clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(9).find("span").first().css("color");
                            fntsiz = "larger";
                            break
                        case "S":
                            txt2 = "♠";
                            clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(10).find("span").first().css("color");
                            fntsiz = "larger";
                            break
                    }
                    //                    btok_span.style.fontSize = "larger";
                    //                    btok_span.textContent = elimineSpaces(txt);
                    //                    btok_span.style.color = $("bridge-screen bidding-box-button button", BBOcontext()).eq(7).find("span").first().css("color");
                    break;
            }
            setTimeout(function() {
                console.log("Plugin 2 : " + txt1 + txt2 + " " + bkg + " " + clr + " " + fntsiz);
                btok_span.textContent = txt2;
                $(btok_span).css("background-color", bkg);
                $(btok_span).css("color", clr);
                if (fntsiz != "") $(btok_span).css("text-size", fntsiz);
                console.log("Plugin 3 : span outer html " + btok_span.outerHTML);
                btok_span.outerHTML = txt1 + btok_span.outerHTML;
                console.log("Plugin 4 : span outer html " + btok_span.outerHTML);    
            }, 1000 );
        }
    } else {
        btok.style.backgroundColor = "rgb(255, 206, 0)";
        btok_span.style.color = "black";
        btok_span.textContent = "OK";
    };
}
//Script
//Script,onNewCallSelected
modified_OK_button(true);
//Script
