if (DEBUG) console.log("BBOalertFind");

class BBOalertFind {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.trustedBid = false;
        this.alertedBid = false;
        this.deferredExplanation = isSettingON(9);
        this.foundContext = '';
        this.lastContext = "";
        this.foundCall = '';
        this.trustedZone = false;
        this.alertText = "";
        this.txt = '';
        this.matchFound = false;
        this.foundRecord = "";
        this.bidSymbolMap = new Map();
    }

    findAlert(context, call) {
        this.initialize();
        var trustedZone = false;
        var lastContext = "";
        var alertText = "";
        var txt = '';
        var matchFound = false;
        var symkey;
        var symval;
        var foundRecord = "";
        if (document.getElementById('bboalert-ds').selectedIndex == 2) return "";
        console.time("findalert");
        var scan = new BBOalertData();
        while ((txt = scan.getNextRecord()) != null) {
            // Keyword Option alone end optional block
            if (txt == 'Trusted') trustedZone = true;
            if (txt == 'Untrusted') trustedZone = false;
            if (txt == 'Option') matchOption = true;
            var rec = txt.split(",");
            if (rec.length < 3) continue;
            var recTemp = rec;
            rec[1] = elimineSpaces(rec[1].replace(/!/g, "").trim());
            var rec1old = rec[1];
            rec[1] = scan.replaceAliases(rec[1], "@B");
            rec[1] = execUserScript(rec[1]);
            // replace map keys by values
            this.bidSymbolMap.forEach(function (values, keys) {
                rec[0] = rec[0].replaceAll(keys, values);
            });
            rec[0] = scan.replaceAliases(rec[0], "@C");
            rec[0] = elimineSpaces(rec[0].replace(/!/g, "").trim());
            var currentContext = rec[0];
            if (currentContext == "+") {
                currentContext = this.lastContext;
            } else {
                this.lastContext = currentContext;
            }
            currentContext = execUserScript(scan.replaceAliases(currentContext, "C"));
            var foundComment = "";
            var suffix = "";
            if (rec[1] == "") continue;
            if (rec[1] != "") {
                if (!matchContext(rec[1], call)) continue;
            } else {
                suffix = call; // if call field is empty then append the current call for matching
            }
            if (matchContext(currentContext, stripContext(context) + suffix)) {
                matchFound = true;
                alertText = scan.replaceAliases(rec[2], "E");
                this.trustedBid = trustedZone;
                this.foundContext = currentContext;
                this.foundCall = rec[1].trim();
                symkey = rec1old;
                symval = rec[1];
                if (rec.length > 3) foundComment = rec[3];
                foundRecord = rec.join(",");
            }
            if (matchContext(currentContext, context + suffix)) {
                matchFound = true;
                alertText = scan.replaceAliases(rec[2], "E");
                this.trustedBid = trustedZone;
                this.foundContext = currentContext;
                this.foundCall = rec[1].trim();
                symkey = rec1old;
                symval = rec[1];
                if (rec.length > 3) foundComment = rec[3];
                foundRecord = rec.join(",");
            }
        }
        // if rec[1] contains a script, add symbol to the map
        if (symkey != symval) {
            this.bidSymbolMap.set(symkey, symval);
        }
        // case of regex group of bids and multiple explanations
        if (this.foundCall.startsWith("("))
            if (this.foundCall.endsWith(")")) {
                let callList = this.foundCall.replaceAll("(", "").replaceAll(")", "").split("|");
                let expList = foundRecord.split(",").slice(2);
                let idx = callList.indexOf(call);
                if (idx != -1) {
                    if (idx < expList.length - 1) alertText = expList[idx]
                    else alertText = expList[expList.length - 1];
                }
            }
        alertText = normalize(alertText);
        // Confirm bid id match not found
        if (!matchFound) this.trustedBid = false;
        alertText = decodeEntities(alertText);
        alertText = updateAlertText(alertText);
        addLog('find:[' + getDealNumber() + '|' + mySeat() + '|' + areWeVulnerable() + '|' + ourVulnerability() + '|' + getSeatNr() +
            '|' + context + '|' + call + '|' + matchFound + '|' + alertText + '|' + this.trustedBid + ']');
        console.timeEnd("findalert");
        if (isSettingON(6)) return "";
        if (alertText.includes("@T")) {
            this.trustedBid = true;
            alertText = alertText.replaceAll("@T", "");
        }
        if (alertText.includes("@t")) {
            this.trustedBid = false;
            alertText = alertText.replaceAll("@t", "");
        }
        if (alertText.includes("@A")) {
            this.alertedBid = true;
            alertText = alertText.replaceAll("@A", "");
        }
        if (alertText.includes("@D")) {
            this.deferredExplanation = true;
            alertText = alertText.replaceAll("@D", "");
        }
        if (alertText.includes("@d")) {
            this.deferredExplanation = false;
            alertText = alertText.replaceAll("@d", "");
        }
        return alertText.trim();
    }
}

function getCallExplanation(context, call) {
    var fae = new BBOalertFind();
    return fae.findAlert(context, call);
}
