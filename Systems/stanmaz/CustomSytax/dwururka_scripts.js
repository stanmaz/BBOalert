// BBOalert, Dwururka syntax scripts Version 1.0.100

//Import,https://github.com/stanmaz/BBOalert/blob/master/Scripts/CustomSyntax/CustomSyntaxBase.js

//Script,1CD
if (matchContext("1[CD]", B)) {
    R = bidSymbol("1CD","" , B, B);
    bidSymbol("1CD_M1","", getCallbyIndex(B,2), getCallbyIndex(B,2));
} else {
    R = "??";
}
//Script
//Script,1CD_M1,R = bidSymbolMap.get("1CD_M1");
//Script,1HS
if (matchContext("1[HS]", B)) {
    R = bidSymbol("1HS","" , B, B);
    bidSymbol("1HS_M1","", B, B);
} else {
    R = "??";
}
//Script
//Script,1HS_M1,R = bidSymbolMap.get("1HS_M1");
/*
Shortcut,1CD,R=%1CD%
Alias,1m,%1CD%
Alias,1M,%1HS%
,1m,4+card %1CD_M1% 
,1M,5+card %1HS_M1% 
*/
