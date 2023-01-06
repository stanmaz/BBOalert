//BBOalert,Custom syntax library Version 1.3
/*
Import,https://github.com/stanmaz/BBOalert/blob/master/Scripts/CustomSyntax/CustomSyntaxBase.js
*/
//Script,_raise_,R = bidSymbol("RAISE",C , B, getBidFromContext(2,0,5));
//Script,_jump_raise_,R = bidSymbol("JUMP_RAISE",C , B, getBidFromContext(2,0,10));
//Script,_cuebid_rho_,R = bidSymbol("CUEBID_RHO",C , B, getBidFromContext(3,0,5));
//Script,_cuebid_lho_,R = bidSymbol("CUEBID_LHO",C , B, getBidFromContext(1,0,5));
//Script,_suit_bid_,R = "!" + B.slice(-1);
//Script,_shift_
var bid = getBidFromContext(2,0,0);
var R = "(";
for (var i = 1; i < 5; i++) {
    if (getCallbyIndex(bid, i).slice(-1) == "N") continue;
    R = R + getCallbyIndex(bid, i);
    if (i < 4) R = R + "|";
}
R = R + ")";
R = bidSymbol("SHIFT",C , B, R);
//Script
//Script,_jump_shift_
var bid = getBidFromContext(2,0,5);
var R = "(";
for (var i = 1; i < 5; i++) {
    if (getCallbyIndex(bid, i).slice(-1) == "N") continue;
    R = R + getCallbyIndex(bid, i);
    if (i < 4) R = R + "|";
}
R = R + ")";
R = bidSymbol("JUMP_SHIFT",C , B, R);
//Script
Script,_opening_
console.log("B = " + B);
if (matchContext(C+B, B)) {
    console.log("Set opening bid : " + bidSymbol("opening_bid","" , B, B));
    bidSymbol("opening_bid","" , B, B);
} else {
    R = "??";
}
//Script
//Script,_step1_,R = bidSymbol("step1",C , B, getBidFromContext(2,-1,1));
//Script,_step2_,R = bidSymbol("step1",C , B, getBidFromContext(2,-1,2));
//Script,_step3_,R = bidSymbol("step1",C , B, getBidFromContext(2,-1,3));
//Script,_step4_,R = bidSymbol("step1",C , B, getBidFromContext(2,-1,4));
//Script,_opening_bid_,R = bidSymbolMap.get("opening_bid");
//Script,_opening_suit_,R = bidSymbolMap.get("opening_bid").slice(-1);
