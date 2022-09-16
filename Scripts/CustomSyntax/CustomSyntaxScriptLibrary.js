//BBOalert, custom syntax script library version 001
//Script,onDataLoad,bidSymbolMap = new Map();
//Script,onAuctionBegin,console.log("New map");bidSymbolMap = new Map();
//Script,onNewAuction,console.log("Reset map");if (getContext() == '') bidSymbolMap = new Map();
//Script,_raise_,R = bidSymbol("RAISE", B, getBidFromContext(2,0,5));
//Script,_jump_raise_,R = bidSymbol("JUMP_RAISE", B, getBidFromContext(2,0,10));
//Script,_cuebid_rho_,R = bidSymbol("CUEBID_RHO", B, getBidFromContext(3,0,5));
//Script,_cuebid_lho_,R = bidSymbol("CUEBID_LHO", B, getBidFromContext(1,0,5));
/*
Script,_shift_
var bid = getBidFromContext(2,0,0);
var R = "(";
for (var i = 1; i < 5; i++) {
    if (getCallbyIndex(bid, i).slice(-1) == "N") continue;
    R = R + getCallbyIndex(bid, i);
    if (i < 4) R = R + "|";
}
R = R + ")";
R = bidSymbol("SHIFT", B, R);
Script
Script,_jump_shift_
var bid = getBidFromContext(2,0,5);
var R = "(";
for (var i = 1; i < 5; i++) {
    if (getCallbyIndex(bid, i).slice(-1) == "N") continue;
    R = R + getCallbyIndex(bid, i);
    if (i < 4) R = R + "|";
}
R = R + ")";
R = bidSymbol("JUMP_SHIFT", B, R);
Script
Alias,RAISE,%_raise_%
Alias,JUMP_RAISE,%_jump_raise_%
Alias,SHIFT,%_shift_%
Alias,JUMP_SHIFT,%_jump_shift_%
Alias,CUE_RHO,%_cuebid_rho%
Alias,CUE_LHO,%_cuebid_lho%
*/
