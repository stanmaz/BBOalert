oldStr = '';
newStr = '';

/**
 * @ignore
 */
class BBOalertData {
    constructor() {
        // Set cursor at the beginning of the table
        this.alertTableCursor = 0;
        this.matchOption = true;
        this.aliasList = [];
        this.trimOn = true;
    }
    setData(text) {
        alertData = text;
        if (alertData.endsWith("\n")) alertData = alertData.slice(0, -1);
        alertTable = alertData.split("\n");
        alertData = alertTable.join("\n");
    }
    appendData(text) {
        alertData = alertData + "\n" + text;
        // Strip trailing linefeed if any
        if (alertData.endsWith("\n")) alertData = alertData.slice(0, -1);
        alertTable = alertData.split("\n");
        alertData = alertTable.join("\n");
    }
    resetScan() {
        // Set cursor at the beginning of the table
        this.alertTableCursor = 0;
        this.matchOption = true;
        this.aliasList = [];
        this.trimOn = true;
    }
    addAlias(r) {
        this.aliasList.push(r);
    }

    replaceAliases(t, field = "") {
        var oldText = '';
        var newText = t;
        var i = 0;
        while (oldText != newText) {
            if (i++ > 10) return newText;
            oldText = newText;
            newText = this.replaceAlias(oldText, field);
        }
        return newText;
    }

    replaceAlias(t, field) {
        var oldStr = '';
        var newStr = '';
        for (var i = 0; i < this.aliasList.length; i++) {
            var r = this.aliasList[i].split(',');
            if (r.length < 3) continue;
            if (r.length > 3) {
                if (field != "") {
                    if ((r[3] != "") && (r[3].indexOf(field) == -1)) continue;
                } else {
                    if (t.indexOf(r[1]) != -1) {
                        oldStr = r[1];
                        newStr = r[2];
                    }
                }
            }
            if (t.indexOf(r[1]) != -1) {
                oldStr = r[1];
                newStr = r[2];
            }
        }
//        if (newStr == '') return t;
        return t.replace(oldStr, newStr);
    }

    getNextLine() {
        if (this.alertTableCursor >= alertTable.length) return null;
        var txt = alertTable[this.alertTableCursor];
        if (this.trimOn) txt = txt.trim();
        // Concatenate records ending with backslash
        while (txt.endsWith('\\')) {
            this.alertTableCursor++;
            if (this.trimOn) {
                txt = txt.slice(0, txt.length - 1) + alertTable[this.alertTableCursor].trim();
            } else {
                txt = txt.slice(0, txt.length - 1) + alertTable[this.alertTableCursor];
            }
            if (this.alertTableCursor >= alertTable.length) return txt;
        }
        this.alertTableCursor++;
        return txt;
    }

    getNextRecord() {
        var txt, rec, keyword;
        while ((txt = this.getNextLine()) != null) {
            if (txt == "") continue;
            rec = txt.split(",");
            keyword = elimineSpaces(rec[0].trim());
            if (keyword == 'Option') {
                if (rec.length < 2) {
                    this.matchOption = true;
                } else {
                    this.matchOption = checkOption(rec);
                }
            } else if (keyword == 'Alias') {
                if (this.matchOption) this.addAlias(txt);
            } else {
                if (this.matchOption) {
                    txt = this.replaceAliases(txt, "@G");
                    return txt.replaceAll("&comma;",",");
                }
            }
        }
        return null;
    }
}

function testBBOalertData() {
    var scan = new BBOalertData();
    var txt;
    scan.resetScan();
    while ((txt = scan.getNextRecord()) != null) {
        console.log(txt);
    }
}
