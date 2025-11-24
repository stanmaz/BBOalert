const fs = require('fs');

if (process.argv[2]) {
  const fileNameSync = process.argv[2];
  try {
    const fileContentSync = fs.readFileSync(fileNameSync, 'utf8');
    console.log(renuùberBoards(fileContentSync));
  } catch (error) {
    console.error('Synchronous Read Error:', error.message);
  }
} else {
  console.log('No input file defined ');
}



function renuùberBoards(txt) {
    t = txt.split("\n");
    var n = 1;
    for (let i = 0; i < t.length; i++) {
        if (t[i].startsWith("[Board")) {
            t[i] = `[Board "${n}"]`;
            n++;
        }
    }
    txt = t.join("\n");
    return txt;
}

