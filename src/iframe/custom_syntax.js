/**
 * @description Functions related to the custom syntax coding
 */


/**
 * 
 * @param {String} bids string representing a bidding sequence
 * @returns bidding sequence transformed to a array of bids
 */
function bidArray(bids) {
    let bidarr = [];
    for (var i = 0; i < bids.length; i = i + 2) {
        bidarr.push(bids.slice(i, i + 2));
    }
    return bidarr;
}

/**
 * 
 * @param {String} bid : valid 2-characters bid 
 * @param {Number} idx : offset
 * @returns relative bid using idx as offset
 * @example getCallbyIndex("1H", 2) will return "1N"
 */
function getCallbyIndex(bid, idx = 0) {
    if (idx < 0) return "??";
    var i1 = allBids.indexOf(bid);
    if (i1 == -1) return "??";
    var i2 = i1 + idx;
    if (i2 > 34) return "??";
    return allBids[i2];
}


/**
 * 
 * @param {Number} who (0=me, 1=LHO, 2=partner, 3=RHO)
 * @param {Number} idx (0=first, 1=second, ... -1=last)
 * @param {Number} offset 
 * @returns specified bid from context
 * @example getBidFromContext(2, 0, 5) will return "2H" from the auction "1H--" (simple raise)
 * BBOalert code example :
 * 
 *     Script,raise,R = getBidFromContext(2, 0, 5);
 *     Alias,RAISE,%raise%,@C@B
 *     1[HS]--,RAISE,8-10p 3+p cards fit
 *     1[HS]--RAISE--,2N,trial bid; no shortness
 * 
 * Note : @C@B tags are limiting the Alias to the context or call field, not the explanation.
 */
function getBidFromContext(who, idx, offset) {
    if (idx < 0) {
        let i = ctxArray.length + who + (idx) * 4;
        if (i >= 0) return getCallbyIndex(ctxArray[i], offset);
    } else {
        if (who >= (4 - ctxArray.length % 4)) {
            let i = idx * 4 + who - (4 - ctxArray.length % 4);
            if (i < ctxArray.length) return getCallbyIndex(ctxArray[i], offset);
        } else {
            let i = 4 + idx * 4 + who - (4 - ctxArray.length % 4);
            if (i < ctxArray.length) return getCallbyIndex(ctxArray[i], offset);
        }
    }
    return "??";
};

/**
 * 
 * @param {String} bidName arbitrary name
 * @param {String} context current bidding context; should be always the variable C in the script
 * @param {String} bid     current bid; should be always the variable B in the script
 * @param {String} refbid  pattern to be used to match the bid. May be A single bid or RegEx pattern from getBidFromContext function
 * @returns the bid if matched with refbid
 * @example bidSymbol("raise", C, B, getBidFromContext(2, 0, 5))
 * will return "2H" if the bid B is "2H" and the context C is "1H--"
 * BBOalert code :
 */
function bidSymbol(bidName, context = "", bid = "", refbid = "") {
    if (DEBUG) console.log(bidName + " " + refbid + " " + bid);
    if (bidSymbolMap.get(bidName) == undefined) {
        if (DEBUG) console.log("not found");
        if (matchContext(refbid, bid)) {
            if (DEBUG) console.log("match");
            bidSymbolMap.set(bidName, context + bid);
            return bid;
        } else {
            if (DEBUG) console.log("no match");
            return "??";
        }
    } else {
        if (bidSymbolMap.get(bidName).length == (context.length+2)) {
            if (matchContext(refbid, bid)) {
                bidSymbolMap.set(bidName, context + bid);
                return bid;
            } else {
                return "??";
            }
        } else {
            if (context.startsWith(bidSymbolMap.get(bidName))) {
                return bidSymbolMap.get(bidName).slice(-2);
            } else {
                return "??";
            }
        }
    }
}

