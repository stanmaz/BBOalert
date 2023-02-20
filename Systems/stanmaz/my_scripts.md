    Script,SUIT_BID,R=B.slice(-1);
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
    Script
    Script,shortBeep,beep(600,0.2);
    Script,longBeep,beep(1000,1);
    Import,https://github.com/stanmaz/BBOalert/blob/master/Scripts/setTeachingTable.js
