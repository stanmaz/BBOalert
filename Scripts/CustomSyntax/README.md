Prerequisite : BBOalert version 7.3 Beta or higher

    https://chrome.google.com/webstore/detail/bboalert-beta/bpjekdfacgkngnchpkbcmjnpeanfamch?hl=en&authuser=0

BBOalert uses the record structure :

    ***context***,***call***,***explanation***

The ***call*** field can be defined dynamically using a script. Example :

    Script,_raise_,R = getBidFromContext(2,0,5);

In this example the the arguments of bidSymbol are :
- "raise" = arbitrary name
- getBidFromContext function computing the call field content dynamically. The arguments are :
    - 2 = partner (0=caller;1=LHO;2=partner;3=RHO)
    - 0 = partner's first bid (opening bid)
    - 5 = fifth step above the opening it (e.g. after opening 1H the raise of 2H is the fifth step)

An alias should be defined to link the script with a symbol used in the alert code. Tag @C should be added to limit the use of the alias to the ***context*** and the @B tag to limit the use of the alias to the ***call*** field.

    Alias,RAISE,%_raise_%,@C@B

The BBOalert code example :

    Alias,RAISE,%_raise_%,@C@B
    ,1[HS],5 cards suit
    1[HS]--,RAISE,8-10p 3+ cards fit
    1[HS]--RAISE--,2N,trial bid; no shortness

Finally we can improve the code by using the buletted lists (see BBOalert README file) :

    Alias,RAISE,%_raise_%,@C@B
    ,1[HS],5 cards suit
    - RAISE     8-10p 3+ cards fit
        - 2N         trial bid; no shortness
