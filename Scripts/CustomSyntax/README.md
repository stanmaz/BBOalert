Prerequisite : BBOalert version 7.2.2 Beta


https://chrome.google.com/webstore/detail/bboalert-beta/bpjekdfacgkngnchpkbcmjnpeanfamch?hl=en&authuser=0

To use your own BBOalert syntax the file should import the base script :

    Import,https://github.com/stanmaz/BBOalert/blob/master/Scripts/CustomSyntax/CustomSyntaxBase.js
    
Then you should define scripts computing the call field depending on the actual bidding context. In most cases it will be a simple script as in the example :

    Script,raise,R = R = bidSymbol("raise",C ,B, getBidFromContext(2,0,5));

In this example the the arguments of bidSymbol are :
- "raise" = arbitrary name
- C = mandatory global variable which contains the current bidding context
- B = mandatory global variable which contains the current call
- getBidFromContext function computing the call field content dynamically. The arguments are :
    - 2 = partner
    - 0 = partner's first bid (opening bid)
    - 5 = fifth bid above the opening wich is the raise call
 
The BBOalert code example :

    ,1[HS],5 cards suit
    1[HS]--,%raise%,8-10p 3+ cards fit
    1[HS]--%raise%--,2N,trial bid; no shortness

To make the code more readable we can substitute the %raise% script call by can be substituted by an alias of your choice. By default the alias is used in all fields. To avoid the unpredictable effects we can limit its usage to the context and to the call field by @C@B tags. Also the script and alias names must be different.

    Alias,RAISE,%raise%,@C@B
    ,1[HS],5 cards suit
    1[HS]--,RAISE,8-10p 3+ cards fit
    1[HS]--RAISE--,2N,trial bid; no shortness

Finally we can improve the code by using the buletted lists (see BBOalert README file) :

    Alias,RAISE,%raise%,@C@B
    ,1[HS],5 cards suit
    - RAISE     8-10p 3+ cards fit
        - 2N         trial bid; no shortness



