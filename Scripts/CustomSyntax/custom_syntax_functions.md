## Functions

<dl>
<dt><a href="#bidArray">bidArray(bids)</a> ⇒</dt>
<dd></dd>
<dt><a href="#getCallbyIndex">getCallbyIndex(bid, idx)</a> ⇒</dt>
<dd></dd>
<dt><a href="#getBidFromContext">getBidFromContext(who, idx, offset)</a> ⇒</dt>
<dd></dd>
<dt><a href="#bidSymbol">bidSymbol(bidName, context, bid, refbid)</a> ⇒</dt>
<dd></dd>
</dl>

<a name="bidArray"></a>

## bidArray(bids) ⇒
**Kind**: global function  
**Returns**: bidding sequence transformed to a array of bids  

| Param | Type | Description |
| --- | --- | --- |
| bids | <code>String</code> | string representing a bidding sequence |

<a name="getCallbyIndex"></a>

## getCallbyIndex(bid, idx) ⇒
**Kind**: global function  
**Returns**: relative bid using idx as offset  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bid | <code>String</code> |  | : valid 2-characters bid |
| idx | <code>Number</code> | <code>0</code> | : offset |

**Example**  
```js
getCallbyIndex("1H", 2) will return "1N"
```
<a name="getBidFromContext"></a>

## getBidFromContext(who, idx, offset) ⇒
**Kind**: global function  
**Returns**: specified bid from context  

| Param | Type | Description |
| --- | --- | --- |
| who | <code>Number</code> | (0=me, 1=LHO, 2=partner, 3=RHO) |
| idx | <code>Number</code> | (0=first, 1=second, ... -1=last) |
| offset | <code>Number</code> |  |

**Example**  
```js
getBidFromContext(2, 0, 5) will return "2H" from the auction "1H--" (simple raise)
BBOalert code example :

    Script,raise,R = getBidFromContext(2, 0, 5);
    Alias,RAISE,%raise%,@C@B
    1[HS]--,RAISE,8-10p 3+p cards fit
    1[HS]--RAISE--,2N,trial bid; no shortness

Note : @C@B tags are limiting the Alias to the context or call field, not the explanation.
```
<a name="bidSymbol"></a>

## bidSymbol(bidName, context, bid, refbid) ⇒
**Kind**: global function  
**Returns**: the bid if matched with refbid  

| Param | Type | Description |
| --- | --- | --- |
| bidName | <code>String</code> | arbitrary name |
| context | <code>String</code> | current bidding context; should be always the variable C in the script |
| bid | <code>String</code> | current bid; should be always the variable B in the script |
| refbid | <code>String</code> | pattern to be used to match the bid. May be A single bid or RegEx pattern from getBidFromContext function |

**Example**  
```js
bidSymbol("raise", C, B, getBidFromContext(2, 0, 5))
will return "2H" if the bid B is "2H" and the context C is "1H--"
BBOalert code :
```
