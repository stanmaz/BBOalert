    //Script,toggleButtons,$('#adpanel2').toggle();
    Shortcut,AltX,%toggleButtons%,display=none

    Script,suitBid,R=B.slice(-1);
    Script,transfer,\
    var suit = B.slice(-1);\
    if (/C/.test(suit)) R=B.slice(0,1) + "!D";\
    if (/D/.test(suit)) R=B.slice(0,1) + "!H";\
    if (/H/.test(suit)) R=B.slice(0,1) + "!S";\
    if (/S/.test(suit)) R=B.slice(0,1) + "NT";\
    if (/N/.test(suit)) R="!C";
    Script,texas,\
    var suit = B.slice(-1);\
    if (/C/.test(suit)) R="!D";\
    if (/D/.test(suit)) R="!H";\
    if (/H/.test(suit)) R="!S";\
    if (/S/.test(suit)) R="NT";\
    if (/N/.test(suit)) R="!C";
    Script,selectSuit
        var bb = getBiddingBox();
        var us = document.createElement("select");
        us.style.position = "absolute";
        us.style.right = "0px";
        us.style.top = "0px";
        us.style.fontSize = "20px";
        us.style.zIndex = 5000;
        us.style.width = "80px";
        us.style.textAlign = 'center';
        us.add(new Option('♣',' !C'));
        us.add(new Option('♦',' !D'));
        us.add(new Option('♥',' !H'));
        us.add(new Option('♠',' !S'));
        us.options[1].style.color = "red";
        us.options[2].style.color = "red";
        us.size = 4;
        us.selectedIndex = -1;
        us.onchange = function () {
            var selectedText = this.options[this.selectedIndex].value;\
            setExplainText(getExplainInput().value + selectedText);\
            this.remove();
        };
        bb.appendChild(us);
    Script

    Script,onExplainCallDisplayed,setExplainCallText("");
    Script,onAnyMutation,$('.announcementPanelClass').draggable();

    bboalert
    Script,onAnyMutation
    $(".verticalClass mat-icon").remove()
    $(".area-label").css("font-weight", "bold");
    Script

