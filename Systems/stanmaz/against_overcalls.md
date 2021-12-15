BBOALERT,Development after overcall
### Development after overcall by opponents

>In the BBOalert code below, we show only bids altered by opponent’s overcall. Other bids should be alerted manually as they come. Exhaustive coding is practically impossible. 

    1CDb,   1D,	    6+p 3!H
    1C1D,	Db,	    6+p 3!H
    +,      2C,	    5+!C no !D stopper
    1C1S,	Db,	    Texas->NT with or without stopper !S
    +,		1N,	    Stopper !S; Texas->!C or natural
    +,		2C,	    Texas->!D
    +,		2D,	    6+p 3!H or 6-9p and 4+!H
    +,		2H,	    Texas !C no !S stopper
    +,		2S,	    10-12p solid undefined minor (2 top honors)
    +,		2N,	    4!H at least invitational
    +,		3C,	    10-12p 6!C
    +,		3D,	    10-12p 6!D
    1C2C,	Db,	    4-5!S
    +,		2D,	    6+p 3!H or 6-9p and 4+!H
    +,		2H,	    Texas->!S
    +,		2S,	    10+p 6!C
    +,		2N,	    10-12p Natural
    +,		3C,	    10+p Texas->!D
    +,		3D,	    Texas->!H 4+!H at least invitational
    +,		3N,	    to play
    1C1N,	Db,	    Transfer>!C
    +,		2C,	    Transfer->!D
    +,		2D,	    Transfer->!H
    +,		2H,	    Transfer->!S

    1DDb,	1H,	    6+p 3!S
    1D1H,	Db,	    6+p 3!S
    +,		1N,	    Stopper; Texas->!C or natural
    1D2C,	Db,	    take-out (misfit !S; no 6 own card)
    +,		2D,	    Texas->!H
    +,		2H,	    Texas->!S fit 6+p 3!S or 6-9p 4+!S
    +,		2S,
    +,		2N, 	10-12p Natural
    +,		3C,	    Texas->!D 10+p at least invitational
    +,		3D,
    +,		3H, 	Texas->!S 4+!S at least invitational
    +,		3N, 	to play

<div style="page-break-after: always;"></div>

>When 4th hand overcalls after a negative response

    1C--1D1S,	Db,	    16+p 5+!H or 20+p any distribution
    +,		    1N,	    16-19p balanced
    +,		    2C,	    16-19p 4!H 5+!C
    +,		    2D,	    16-19p 4!H 5+!D
    +,		    2H,	    16-19p 6!H
    +,		    2N,	    20-22p balanced
    +,		    3C,	    12-13p 4!H 6+!C
    +,		    3D,	    12-13p 4!H 6+!D

    1C--1DDb,	Rd,     16+p 5+!H or 20+p any distribution
    +,		    1H,	    12-15p 5+!H
    +,		    1S,	    12-19p 4+!H5+!S
    +,		    1N,	    16-19p balanced
    +,		    2C,	    16-19p 4!H 5+!C
    +,		    2D,	    16-19p 4!H 5+!D
    +,		    2H,	    16-19p 6!H
    +,		    2N,	    20-22p balanced
    +,		    3C,	    12-13p 4!H 6+!C
    +,		    3D,	    12-13p 4!H 6+!D

    1C__2DDb,	--,	    8 losers
    +,  	    Rd,	    7 losers
    +,      	2H,	    6 losers
    +,      	2S,	    5 losers
    +,      	2N,	    4 losers
    +,      	3C,	    4 losers

    1C__2D2S,	--,	    8 losers
    +,      	Db,	    7 losers
    +,      	2N,	    6 losers
    +,      	3C,	    5 losers
    +,      	3D,	    4 losers
    +,      	3H,	    4 losers

    1D2D,		Db,	    Texas->!H
    +,  		2H,	    Texas->!S fit 3+!S 7+p
    +,  		2S,	    Texas->NT Stopper !D
    +,  		2N,	    10-12p Natural
    +,  		3C,	    Natural 10+p at least invitational
    +,  		3D,	    Texas->!H 10+ 6!H at least invitational
    +,  		3H,	    Texas->!S 4+!H at least invitational
    +,  		3S,	    preempt
    +,  		3N,	    to play
    +,  		Db,	    Texas->!C
    +,  		2C,	    Texas->!D
    +,  		2D,	    Texas->!H
    +,  		2H,	    Texas->!S

<div style="page-break-after: always;"></div>

>When 4th hand overcalls after a negative response

    1D--1H1S,	Db,	    16+p 5+!S or 20+p any distribution
    +,  		1N,	    16-19p balanced
    +,	    	2C,	    16-19p 4!S 5+!C
    +,		    2D,	    16-19p 4!S 5+!D
    +,  		2H,	    16-19p 6!S
    +,	    	2N,	    20-22p balanced
    +,		    3C,	    12-13p 4!S 6+!C
    +,		    3D,	    12-13p 4!S 6+!D

    1D--1HDb,	Rd,	    16+p 5+!S or 20+p any distribution
    +,  		1S,	    12-15p 5+!S
    +,	    	1N,	    16-19p balanced
    +,		    2C,	    16-19p 4!S 5+!C
    +,  		2D,	    16-19p 4!S 5+!D
    +,	    	2S,	    16-19p 6!S
    +,		    2N,	    20-22p balanced
    +,  		3C,	    12-13p 4!S 6+!C
    +,	    	3D,	    12-13p 4!S 6+!D

    1HDb,	Rd,	    7+p stopper !H stopper !S possible
    1HDb,	1S,	    7+p stopper !S not !H
    1H1S,	Db,	    7+p forcing

    1SDb,	Rd,	    7+p forcing
    1S2H,	Db,	    5!S

    1D__2HDb,	--,	    8 losers
    +,      	Rd,	    7 losers
    +,      	2S,	    6 losers
    +,      	2N,	    5 losers
    +,      	3C,	    4 losers
    +,      	3D,	    4 losers

    1N2C,	Db,	    Transfer->2!D
    1N2D,	Db,	    Transfer->2!H
    1N2H,	Db,	    Transfer->2!S
    1N2S,	Db,	    5+!H game inviting

    2DDb,	--,	    To play 2!D
    +,		Rd,	    Forcing; invitational or weak
    +,		2H,	    to play

    2HDb,	--,	    To play 2!H doubled
    +,		Rd,	    Forcing; invitational or weak
    +,		2S,	    to play

>After preempt

    1C2S,   Db,     10+p 5+!C or 4+!C4+!D
    +,      2N,     10-12p  stopper !S misfit !H
    +,      3C,     10+p 5+!D misfit !H
    +,      3D,     3+!H at least limit hand
    +,      3H,     6+!C half !S stopper
    +,      3S,     6+!C game forcing no !S stopper

    1C2SDb--,   2N,     Preference !D

>After opening 1NT

    1NDb,   --,     no preference in minors or 44 in majors
    +,      Rd,     preference !C 4-5!C 2+!D
    +,      2C,     preference 4!D 2!C

    1N----Db,   2C,     5!C
    +,          2D,     5!D
    +,          Rd,     4!C4!D
    +,          --,     4-3 in minors
    1N----Db----,   Rd,     no preference
    +,          ,   2C,     4!C
    +,          ,   2D,     4!D
    +,          ,   2H,     4!H4!S

