function bidArray(bids) {
    let bidarr = [];
    for (var i = 0; i < bids.length; i = i + 2) {
        bidarr.push(bids.slice(i, i + 2));
    }
    return bidarr;
}

function getCallbyIndex(bid, idx = 0) {
    if (idx < 0) return "??";
    var i1 = allBids.indexOf(bid);
    if (i1 == -1) return "??";
    var i2 = i1 + idx;
    if (i2 > 34) return "??";
    return allBids[i2];
}

var bidSymbolMap = new Map();

function getBidFromContext (who, idx, offset) {
    if (idx < 0) {
        let i = ctxArray.length + who + (idx) * 4;
        if (i >= 0) return getCallbyIndex(ctxArray[i], offset);
    } else {
        if (who >= (4 - ctxArray.length % 4)) {
            let i = idx*4 + who - (4 - ctxArray.length % 4);
            if (i < ctxArray.length) return getCallbyIndex(ctxArray[i], offset);
        } else {
            let i = 4 + idx*4 + who - (4 - ctxArray.length % 4);
            if (i < ctxArray.length) return getCallbyIndex(ctxArray[i], offset);
        }
    }
    return "??";
};

bidSymbol = function (bidName,bid = "", refbid = "") {
    if (matchContext(refbid, bid)) {
        bidSymbolMap.set(bidName,bid);   
        return bid;
    } else {
        if (bidSymbolMap.has(bidName)) return bidSymbolMap.get(bidName);
        return "??";
    }
}



