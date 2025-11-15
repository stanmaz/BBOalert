

// --- Alternative Synchronous Method (For quick scripts) ---

const fs = require('fs');

if (process.argv[2]) {
  console.log('BBOalert,   ' + process.argv[2]);
  const fileNameSync = process.argv[2];
  try {
    const fileContentSync = fs.readFileSync(fileNameSync, 'utf8');
    console.log(parseLatex(fileContentSync));
  } catch (error) {
    console.error('Synchronous Read Error:', error.message);
  }
} else {
  console.log('No input file defined ');
}



function parseLatex(tex) {
    const CR = "\r";
    const LF = "\n";
    const allBidsRegex = /([1234567][!][CDHSN]|--|Db|Rd|<|>|enchbox)/g;
    var prefix = "";
    var outar = [];
    var txt = "";
    var ctx = "";

    function decodeSuits(t) {
        t = t
            .replaceAll("\\\Pass", "--")
            .replaceAll("\\\Double", "Db")
            .replaceAll("\\\Redouble", "Rd")
            .replaceAll("\\\T", "!C")
            .replaceAll("\\\K", "!D")
            .replaceAll("\\\C", "!H")
            .replaceAll("\\\P", "!S")
            .replaceAll("\\\NT", "!N");
        return t;
    }
    var d = tex.replaceAll(CR, "").split(LF);

    try {
        for (let i = 0; i < d.length - 1; i++) {

            txt = d[i].trim();
            if (txt.length == 0) continue;
            txt = txt.replaceAll("\\ieme", "ième");
            txt = txt.replaceAll("\\rb", "");
            txt = txt.replaceAll("\\ra", "");
            txt = txt.replaceAll("\\rw", "");
            txt = txt.replaceAll("\\quad", "");
            txt = decodeSuits(txt);
            if (txt.startsWith("\\include{")) {
                txt = elimineSpaces(txt);
                txt = txt.replace("\\\include", "Import,");
                outar.push(txt);
                continue;
            }
            if (txt.startsWith("\\input{")) {
                txt = elimineSpaces(txt);
                txt = txt.replace("\\\input", "Import,");
                outar.push(txt);
                continue;
            }
            if (txt.startsWith("\\enchbox")) {
                outar.push(txt);
                txt = elimineSpaces(txt);
                txt = decodeSuits(txt);
                txt = txt.match(allBidsRegex).join("").replace("enchbox", "");
                outar.push(txt.replaceAll("&", " ").replaceAll("  ", " ").replaceAll("<", "").replaceAll(">", ""));
                ctx = txt.replaceAll("&", " ").replaceAll("  ", " ");
                continue;
            }
            txt = txt.replaceAll("\\\\", "").trim();
            if (txt.startsWith("&&")) {
                outar[outar.length - 1] += txt.replaceAll("&", " ").replaceAll("  ", " ");
                continue;
            }
            if (txt.includes("&")) {
                txt = txt.replaceAll("&", "").trim().replaceAll("  ", " ");
                prefix = "";
                // Table of opening bids
                if (ctx == "") {
                    prefix = ","
                }
                // RHO's overcall
                if (ctx.endsWith(">")) {
                    prefix = ","
                }
                // level 2 bullets
                if (txt.startsWith("->->")) {
                    txt = "        - " + txt.substring(4).replaceAll("  ", " ");
                    // level 1 bullets
                } else if (txt.startsWith("->")) {
                    txt = "    - " + txt.substring(2).replaceAll("  ", " ");
                    // level 0 bullets
                } else {
                    txt = "- " + prefix + txt;
                }
                txt = txt.replaceAll("<", "").replaceAll(">", "");
                outar.push(txt);
                continue;
            }
            //		out.push("skip " + txt);

        }
    } catch {
        outar.push("error " + txt);
        return (outar.join("\n") + "\n");
    }
    return outar.join("\n") + "\n";
}

function elimineSpaces(str) {
	var s = str.replace(/\s+/g, '');
	s = s.replace(/\t+/g, '');
	return s;
}

