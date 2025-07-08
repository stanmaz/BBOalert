//BBOalert,Custom syntax library Version 1.4
//Script,_raise_,R = getBidFromContext(2,0,5);
//Script,_jumpraise_,R = getBidFromContext(2,0,10);
//Script,_cuebidrho_,R = getBidFromContext(3,0,5);
//Script,_cuebidlho_,R = getBidFromContext(1,0,5);
//Script,_suitbid_,R = "!" + B.slice(-1);
//Script,_shift_
var bid = getBidFromContext(2,0,0);
R = "(";
for (var i = 1; i < 5; i++) {
    if (getCallbyIndex(bid, i).slice(-1) == "N") continue;
    R = R + getCallbyIndex(bid, i);
    if (i < 4) R = R + "|";
}
R = R + ")";
//Script
//Script,_jump_shift_
var bid = getBidFromContext(2,0,5);
R = "(";
for (var i = 1; i < 5; i++) {
    if (getCallbyIndex(bid, i).slice(-1) == "N") continue;
    R = R + getCallbyIndex(bid, i);
    if (i < 4) R = R + "|";
}
R = R + ")";
//Script
//Script,_step1_,R = getBidFromContext(2,-1,1);
//Script,_step2_,R = getBidFromContext(2,-1,2);
//Script,_step3_,R = getBidFromContext(2,-1,3);
//Script,_step4_,R = getBidFromContext(2,-1,4);
//Script,_steps_
var bid = getBidFromContext(2,-1,0);
R = "(";
var b;
for (var i = 1; i < 40; i++) {
    b = getCallbyIndex(bid, i);
    R = R + b;
    if (b != "7N") R = R + "|";
    if (b == "7N") break;
}
R = R + ")";
//Script
//Script,_select_
var list = bidSymbolMap.get("foundRecord").split(",");
var idx = (BR.indexOf(B)-1)/3 + 3;
if (idx < list.length) R = list[idx].trim();
//Script

