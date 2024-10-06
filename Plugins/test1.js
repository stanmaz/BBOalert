//BBOalert, test modified OK button v1
/*
Import,https://github.com/stanmaz/BBOalert/blob/master/Scripts/setTeachingTable.js
*/
//Script,onDataLoad
modified_OK_button = function (on) {
    //    if (!buttonOKvisible()) return;
    console.log("Plugin : call selected " + callText);
    var btok = $("bridge-screen bidding-box-button button", BBOcontext())[16];
    var btok_span = $("span", btok)[0];
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
                            txt1 = txt1 + elimineSpaces(btnt.textContent);
                            txt2 = "";
                            clr = $("bridge-screen bidding-box-button button", BBOcontext()).eq(11).find("span").first().css("color");
                            fntsiz = "";
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
                    break;
            }
            console.log("Plugin 2 : " + txt1 + txt2 + " " + bkg + " " + clr + " " + fntsiz);
            var h ='<span class="temp">' + txt1 + '</span><span class="temp" style="color:' + clr + '; font-size: ' + fntsiz +';">' + txt2 +'</span>';
            console.log("Plugin 3 : " + h);
            $(btok_span).hide();
            $(btok).find(".temp").remove();
            $(btok_span).after(h);

        }
    } else {
        $(btok_span).hide();
        $(btok).find(".temp").remove();
    };
}
//Script
//Script,onNewCallSelected
modified_OK_button(true);
//Script
