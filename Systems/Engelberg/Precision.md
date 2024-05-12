BBOalert,Precision
# Precision based on the book Standard Modern Precision
    Javascript,https://github.com/stanmaz/BBOalert/blob/master/Plugins/stanmazPlugin.js
    Shortcut,prehi,Hi! Precision: 1C 16+; 1D may be short; 1NT 14-16 balanced; standard signals\n

    Trusted

## Openings

    Option,Precision,enigmisto+bhohe,enigmisto+billhohe
    ,1C,Artificial 16+ pts
    ,1D,11-15 pts; 2+!D; denies 5-card major
    ,1H,11-15 pts; 5+!H
    ,1S,11-15 pts; 5+!S
    ,1N,14-16 pts; balanced
    ,2C,Artificial: 11-15 pts; 6+!C
    ,2D,Artificial: 11-15 pts; three-suited with short diamonds
    ,2H,weak preempt; 5-6!H
    ,2S,weak preempt; 5-6!S
    ,2N,20-21 pts; balanced

    Untrusted

    ,3C,weak preempt; 7!C
    ,3D,weak preempt; 7!D
    ,3H,weak preempt; 7!H
    ,3S,weak preempt; 7!S
    ,3N,solid 7+ card minor suit
    ,4C,8+ !H with strong hand
    ,4D,8+ !S with strong hand

## 1N Opening

    1N--,2C,Stayman; 9+ pts; might not have 4-card major
    1N--,2D,Transfer to hearts; 5+!H
    1N--2D--,2H,Accept transfer
    1N--2D--,3H,Super-accept transfer; 4+!H and max NT hand
    1N--2H--,2S,Accept transfer
    1N--2H--,3S,Super-accept transfer; 4+!S and max NT hand
    1N--,2H,Transfer to spades; 5+!S
    1N--,2S,Transfer to clubs; 6+!C
    1N--2S--,2N,Not interested in 3NT
    1N--2S--2N--,3C,correct to !C
    1N--2S--2N--,3D,game forcing strength; short !D
    1N--2S--2N--,3H,game forcing strength; short !H
    1N--2S--2N--,3S,game forcing strength; short !S
    1N--2S--,3C,Accept transfer with interest in 3NT
    1N--2S--3C--,3D,game forcing strength; short !D
    1N--2S--3C--,3H,game forcing strength; short !H
    1N--2S--3C--,3S,game forcing strength; short !S
    1N--,2N,Transfer to diamonds; 6+!D
    1N--2N--,3C,Not interested in 3NT
    1N--2N--3C--,3D,correct to !D
    1N--2N--3C--,3H,game forcing strength; short !H
    1N--2N--3C--,3S,game forcing strength; short !S
    1N--2N--,3D,Accept transfer with interest in 3NT
    1N--2N--3D--,3H,game forcing strength; short !H
    1N--2N--3D--,3S,game forcing strength; short !S

##  1C Opening

    1C--,1D,0-7 pts any shape
    1C--,1H,8-11 pts any shape; game forcing
    1C--,1S,12+ pts; 5+!S
    1C--,1N,12+ pts; balanced
    1C--,2C,12+ pts; 5+!C
    1C--,2D,12+ pts; 5+!D
    1C--,2H,12+ pts; 5+!H
    1C--,2S,12+ pts; 4441 shape with unspecified singleton
    ----1C--,1H,8-10 pts; 5+!H; game forcing
    ----1C--,1S,8-10 pts; 5+!S; game forcing
    ----1C--,1N,8-10 pts; balanced; game forcing
    ----1C--,2C,8-10 pts; 5+!C; game forcing
    ----1C--,2D,8-10 pts; 5+!D; game forcing
    ----1C--,2S,8-10 pts; 4441 shape with unspecified singleton; game forcing
    ------1C--,1H,8-10 pts; 5+!H; game forcing
    ------1C--,1S,8-10 pts; 5+!S; game forcing
    ------1C--,1N,8-10 pts; balanced; game forcing
    ------1C--,2C,8-10 pts; 5+!C; game forcing
    ------1C--,2D,8-10 pts; 5+!D; game forcing
    ------1C--,2S,8-10 pts; 4441 shape with unspecified singleton; game forcing

    1C--1D--,1H,4+!H forcing one round
    1C--1D--,1S,4+!S forcing one round
    1C--1D--,1N,17-19 pts; balanced
    1C--1D--,2C,6+!C or 5!C 4!D; denies 4-card major
    1C--1D--,2D,6+!D or 5!D 4!C; denies 4-card major
    1C--1D--,2H,GF balanced or GF hearts; asks partner to bid 2S
    1C--1D--2H--,2S,waiting
    1C--1D--,2S,GF spades
    1C--1D--,2N,22-24 pts; balanced
    1C--1D--,3C,GF clubs with no 4-card major
    1C--1D--,3D,GF diamonds with no 4-card major

    1C--1D--1H,1S,4+!S; denies 4+ hearts; 0-7 pts; forcing
    1C--1D--1H--1S--,1N,not forcing; likely three suited short spades
    1C--1D--1H--1S--,2C,4+!C
    1C--1D--1H--1S--,2D,4+!D
    1C--1D--1H--1S--,2H,6+!H
    1C--1D--1H--1S--,2S,3+!S 16-19 pts
    1C--1D--1H--1S--,3S,3+!S 18+ pts
    1C--1D--1H--1S--,2N,21-22 pts; likely three suited short spades
    1C--1D--1H--1S--,3C,4+!S 5+!C; game forcing
    1C--1D--1H--1S--,3D,4+!S 5+!D; game forcing
    1C--1D--1H--1S--,3H,long good heart suit inviting to game
    1C--1D--1H--1S--,3N,to play
    1C--1D--1H--1S--,4[HS],to play
    1C--1D--1H--1S--,4C,splinter; 20+ pts; 0-1!C
    1C--1D--1H--1S--,4D,splinter; 20+ pts; 0-1!D

    1C--1D--1H,1N,0-5 pts without 4+ card heart support or 4+ spades
    1C--1D--1S,1N,0-5 pts without 4+ card spade support
    1C--1D--1[HS]--1N--,2C,4+!C
    1C--1D--1[HS]--1N--,2D,4+!D
    1C--1D--1H--1N--,2H,6+!H usually
    1C--1D--1S--1N--,2S,6+!S usually
    1C--1D--1H--1N--,2S,reverse (5+!H 4+!S 21+ pts)
    1C--1D--1S--1N--,2H,4+!H
    1C--1D--1[HS]--1N--,2N,22-23 pts
    1C--1D--1[HS]--1N--,3C,5+!C game forcing
    1C--1D--1[HS]--1N--,3D,5+!D game forcing
    1C--1D--1H--1N--,3H,long good heart suit inviting to game
    1C--1D--1S--1N--,3S,long good spade suit inviting to game
    1C--1D--1[HS]--1N--,3N,to play
    1C--1D--1[HS]--1N--,4[HS],to play

    1C--1D--1[HS]--,2C,6-7 pts; no fit
    1C--1D--1[HS]--2C--,2D,minimum hand waiting bid
    1C--1D--1H--2C--,2H,6+!H
    1C--1D--1S--2C--,2S,6+!S
    1C--1D--1H--2C--,2S,reverse (5+!H 4+!S 21+ pts)
    1C--1D--1S--2C--,2H,4+!H
    1C--1D--1[HS]--2C--,2N,game forcing waiting bid
    1C--1D--1[HS]--2C--,3C,5+!C game forcing
    1C--1D--1[HS]--2C--,3D,5+!D game forcing
    1C--1D--1[HS]--2C--,3H,sets hearts as trump
    1C--1D--1[HS]--2C--,3S,sets spades as trump

    1C--1D--1H--,2D,5-7 pts; 3+!H
    1C--1D--1S--,2D,5-7 pts; 3+!S
    1C--1D--1H--2D--,2H,sign-off
    1C--1D--1S--2D--,2S,sign-off
    1C--1D--1H--2D--,2S,natural; 4+!S
    1C--1D--1S--2D--,2H,natural; 4+!H
    1C--1D--1[HS]--2D--,2N,artificial game-force
    1C--1D--1[HS]--2D--,3C,5+!C game forcing
    1C--1D--1[HS]--2D--,3D,5+!D game forcing
    1C--1D--1H--2D--,3H,invite
    1C--1D--1S--2D--,3S,invite
    1C--1D--1[HS]--2D--,3N,to play

    1C--1D--1H--,2H,4+!H; 0-4 pts
    1C--1D--1H--,3H,4+!H; 5-7 pts
    1C--1D--1S--,2S,4+!S; 0-4 pts
    1C--1D--1S--,3S,4+!S; 5-7 pts
    1C--1D--1S--,2H,6-7 pts; 5+!H; denies 3 spades
    1C--1D--1H--,2N,mini-splinter; 4+!H; 5-7 pts; singleton or void somewhere
    1C--1D--1S--,2N,mini-splinter; 4+!S; 5-7 pts; singleton or void somewhere
    1C--1D--1[HS]--2N--,3C,asks responder to show singleton or void; game forcing
    1C--1D--1[HS]--2N--3C--,3D,0-1!C
    1C--1D--1[HS]--2N--3C--,3H,0-1!D
    1C--1D--1H--2N--3C--,3S,0-1!S
    1C--1D--1S--2N--3C--,3S,0-1!H
    1C--1D--1[HS]--2N--,3[HS],sign-off
    1C--1D--1[HS]--2N--,4[HS],sign-off
    1C--1D--1[HS]--,3[CD],6+ card suit; 4-7 pts in this suit
    1C--1D--1H--,2S,6+!S; 4-7 pts in this suit
    1C--1D--1S--,3H,6+!H; 4-7 pts in this suit
    1C--1D--1[HS]--,4[CD],splinter; 6-7 pts; 5+ trumps; singleton or void in this suit
    1C--1D--1H--,3S,splinter; 6-7 pts; 5+!H; 0-1!S
    1C--1D--1S--,4H,splinter; 6-7 pts; 5+!S; 0-1!H

    1C--1D--2C--,2H,5+!H; 6-7 pts
    1C--1D--2D--,2S,5+!S; 6-7 pts
    1C--1D--2[CD]--,2N,6-7 pts
    1C--1D--2C--,3[DHS],good long suit with 4-6 pts in that suit
    1C--1D--2D--,3[HS],good long suit with 4-6 pts in that suit
    1C--1D--2D--,4C,good long suit with 4-6 pts in that suit

    1C--1D1[HS],Db,takeout double or strong hand
    1C--1D2[CD],Db,takeout double or strong hand
    1C--1D1N,Db,penalty double
    1C--1D1H,2H,Michael's cuebid 5+!S 5+ minor
    1C--1D1S,2S,Michael's cuebid 5+!S 5+ minor
    1C--1D1[HS],2N,Unusual 2NT 5+!C 5+!D
    1C--1D2C,3C,Michael's cuebid 5+!H 5+!S
    1C--1D2D,3D,Michael's cuebid 5+!H 5+!S
    1C--1D2H,3H,cuebid showing interest in 3N
    1C--1D2S,3S,cuebid showing interest in 3N
    1C--1D2[HS],2N,14-18 balanced
    1C--1D2N,Db,penalty double
    1C--1D1H,2S,strong invitational hand in spades
    1C--1D1[HS],3C,strong invitational hand in clubs
    1C--1D1[HS],3D,strong invitational hand in diamonds
    1C--1D1S,3H,strong invitational hand in hearts
    1C--1D2C,3D,strong invitational hand in diamonds
    1C--1D2[CD],3H,strong invitational hand in hearts
    1C--1D2[CD],3S,strong invitational hand in spades

    1C--1H--,1S,5+!S
    1C--1H--,2C,5+!C
    1C--1H--,2D,5+!D
    1C--1H--,2H,5+!H
    1C--1H--,1N,balanced
    1C--1H--,2S,4441 shape with unspecified singleton
    1C--1H--2S--,2N,asks partner to clarify singleton
    1C--1H--2S--2N--,3C,club singleton
    1C--1H--2S--2N--,3D,diamond singleton
    1C--1H--2S--2N--,3H,heart singleton
    1C--1H--2S--2N--,3S,spade singleton
    1C--1H--,3[CDHS],sets suit as trump; initiates control bidding

    1C1[DHS],Db,6-7 pts any shape
    1C1[DHS],1N,8+ pts; balanced; stopper
    1C1D,2D,8+ pts; balanced; no stopper
    1C1D,3D,8+ pts; three-suited short diamonds
    1C1D,1H,8+ pts; 5+!H
    1C1D,1S,8+ pts; 5+!S
    1C1D,2C,8+ pts; 5+!C
    1C1H,2H,8+ pts; balanced; no stopper
    1C1H,3H,8+ pts; three-suited short hearts
    1C1H,1S,8+ pts; 5+!S
    1C1H,2C,8+ pts; 5+!C
    1C1H,2D,8+ pts; 5+!D
    1C1S,2S,8+ pts; balanced; no stopper
    1C1S,3S,8+ pts; three-suited short spades
    1C1S,2C,8+ pts; 5+!C
    1C1S,2D,8+ pts; 5+!D
    1C1S,2H,8+ pts; 5+!H
    1C2[CDHS],Db,6-7 pts
    1C2[CDHS],2N,8+ pts; balanced; stopper
    1C2C,3C,8+ pts; three-suited short clubs
    1C2C,2D,8+ pts; 5+!D
    1C2C,2H,8+ pts; 5+!H
    1C2C,2S,8+ pts; 5+!S
    1C2D,3D,8+ pts; three-suited short diamonds
    1C2D,2H,8+ pts; 5+!H
    1C2D,2S,8+ pts; 5+!S
    1C2D,3C,8+ pts; 5+!C
    1C2H,3H,8+ pts; three-suited short hearts
    1C2H,2S,8+ pts; 5+!S
    1C2H,3C,8+ pts; 5+!C
    1C2H,3D,8+ pts; 5+!D
    1C2S,3S,8+ pts; three-suited short spades
    1C2S,3C,8+ pts; 5+!C
    1C2S,3D,8+ pts; 5+!D
    1C2S,3H,8+ pts; 5+!H

    1C1D,2[HS],long suit with 5-7 pts in that suit
    1C1D,3C,long suit with 5-7 pts in that suit
    1C1H,2S,long suit with 5-7 pts in that suit
    1C1H,3[CD],long suit with 5-7 pts in that suit
    1C1S,3[CDH],long suit with 5-7 pts in that suit
    1C2C,3[DHS],long suit with 5-7 pts in that suit
    1C2D,3[HS],long suit with 5-7 pts in that suit
    1C2H,3S, long suit with 5-7 pts in that suit

    1C3[CDHS],Db,7+ pts
    1C4[CDHS],Db,8+ pts
    1C3[CDHS],3N,8-11 pts; balanced; stopper
    1C3C,3D,game forcing;5+!D
    1C3[CD],3H,game forcing;5+!H
    1C3[CDH],3S,game forcing;5+!S

    1CDb,--,0-5 pts
    1CDb,1D,5+!D GF
    1CDb,1H,5+!H GF
    1CDb,1S,5+!S GF
    1CDb,1N,balanced GF
    1CDb,2C,5+!C GF
    1CDb,2D,6+!D; 5-7 pts in that suit
    1CDb,2H,6+!H; 5-7 pts in that suit
    1CDb,2S,6+!S; 5-7 pts in that suit
    1CDb,3C,7+!C; 5-7 pts in that suit
    1CDb,3D,7+!D; 5-7 pts in that suit
    1CDb,3H,7+!H; 5-7 pts in that suit
    1CDb,3S,7+!S; 5-7 pts in that suit
    1CDb,Rd,6-7 pts
    1CDbRd--,1N,17-19 pts; balanced
    1CDbRd--,2N,22-24 pts; balanced
    1CDbRd--,3N,25-27 pts; balanced
    1CDbRd--1N--,2C,Stayman; 6+ pts; might not have 4-card major
    1CDbRd--1N--,2D,Transfer to hearts; 5+!H
    1CDbRd--1N--,2H,Transfer to spades; 5+!S
    1CDbRd--1N--,2S,Transfer to clubs; 6+!C
    1CDbRd--1N--2S--,2N,Not interested in 3NT
    1CDbRd--1N--2S--2N--,3C,correct to !C
    1CDbRd--1N--2S--2N--,3D,game forcing strength; short !D
    1CDbRd--1N--2S--2N--,3H,game forcing strength; short !H
    1CDbRd--1N--2S--2N--,3S,game forcing strength; short !S
    1CDbRd--1N--2S--,3C,Accept transfer with interest in 3NT
    1CDbRd--1N--2S--3C--,3D,game forcing strength; short !D
    1CDbRd--1N--2S--3C--,3H,game forcing strength; short !H
    1CDbRd--1N--2S--3C--,3S,game forcing strength; short !S
    1CDbRd--1N--,2N,Transfer to diamonds; 6+!D
    1CDbRd--1N--2N--,3C,Not interested in 3NT
    1CDbRd--1N--2N--3C--,3D,correct to !D
    1CDbRd--1N--2N--3C--,3H,game forcing strength; short !H
    1CDbRd--1N--2N--3C--,3S,game forcing strength; short !S
    1CDbRd--1N--2N--,3D,Accept transfer with interest in 3NT
    1CDbRd--1N--2N--3D--,3H,game forcing strength; short !H
    1CDbRd--1N--2N--3D--,3S,game forcing strength; short !S
    1CDbRd--,1H,5+!H
    1CDbRd--,1S,5+!S
    1CDbRd--,2C,5+!C
    1CDbRd--,2D,5+!D
    1CDbRd--,2H,5+!H; 21+ pts
    1CDbRd--,2S,5+!S; 21+ pts
    1CDbRd--,3C,5+!C; 21+ pts
    1CDbRd--,3D,5+!D; 21+ pts
    1CDb----,1N,17-19 pts; balanced
    1CDb----,2N,22-24 pts; balanced
    1CDb----,3N,25-27 pts; balanced
    1CDb----1N--,2C,Stayman; 6+ pts; might not have 4-card major
    1CDb----1N--,2D,Transfer to hearts; 5+!H
    1CDb----1N--,2H,Transfer to spades; 5+!S
    1CDb----1N--,2S,Transfer to clubs; 6+!C
    1CDb----1N--2S--,2N,Not interested in 3NT
    1CDb----1N--2S--2N--,3C,correct to !C
    1CDb----1N--2S--2N--,3D,game forcing strength; short !D
    1CDb----1N--2S--2N--,3H,game forcing strength; short !H
    1CDb----1N--2S--2N--,3S,game forcing strength; short !S
    1CDb----1N--2S--,3C,Accept transfer with interest in 3NT
    1CDb----1N--2S--3C--,3D,game forcing strength; short !D
    1CDb----1N--2S--3C--,3H,game forcing strength; short !H
    1CDb----1N--2S--3C--,3S,game forcing strength; short !S
    1CDb----1N--,2N,Transfer to diamonds; 6+!D
    1CDb----1N--2N--,3C,Not interested in 3NT
    1CDb----1N--2N--3C--,3D,correct to !D
    1CDb----1N--2N--3C--,3H,game forcing strength; short !H
    1CDb----1N--2N--3C--,3S,game forcing strength; short !S
    1CDb----1N--2N--,3D,Accept transfer with interest in 3NT
    1CDb----1N--2N--3D--,3H,game forcing strength; short !H
    1CDb----1N--2N--3D--,3S,game forcing strength; short !S
    1CDb----,1H,5+!H
    1CDb----,1S,5+!S
    1CDb----,2C,5+!C
    1CDb----,2D,5+!D
    1CDb----,2H,5+!H; 21+ pts
    1CDb----,2S,5+!S; 21+ pts
    1CDb----,3C,5+!C; 21+ pts
    1CDb----,3D,5+!D; 21+ pts

    1CDb,1N,8+ pts; balanced; no 5-card suit
    1CDb1N--,2C,Stayman
    1CDb1N--,2D,5+!D
    1CDb1N--,2H,5+!H
    1CDb1N--,2S,5+!S
    1CDb1N--,3C,5+!C
    1CDb1N--,3D,5+!D; slam interest
    1CDb1N--,3H,5+!H; slam interest
    1CDb1N--,3S,5+!S; slam interest
    1CDb1N--,4C,5+!C; slam interest

## 1D Opening

    1D--,1H,natural; 4+!H
    1D--,1S,natural; 4+!S
    1D--,1N,7-11 balanced; denies 4-card major
    1D--,2C,4+!C; 11+ pts; no 4-card major unless 6-4+; forcing
    1DDb,2[CD],to play
    1DDb,2N,invitational diamond raise
    ----1D--,2C,5+!C; 9-10 pts; denies 4-card major
    ----1D--,2D,5+!D; 9-10 pts; denies 4-card major
    1D--,2D,4+!D; 11+ pts; no 4-card major unless 6-4+; forcing
    1D--,2H,5!S 4-5!H; less than invitational
    1D--,2S,5!S 4-5!H; invitational
    1DDb,2H,5!S 4-5!H; less than invitational
    1DDb,2S,5!S 4-5!H; invitational
    1D--,2N,11-12 pts balanced; denies 4-card major
    1D--,3C,5-4 minors at least; either could be longer; less than invitational
    1D--,3D,6+!D; 5-10 pts
    1D1[HS],3C,5-4 minors at least; either could be longer; less than invitational
    1D1[HS],3D,6+!D; 5-10 pts
    1DDb,3C,5-4 minors at least; either could be longer; less than invitational
    1DDb,3D,6+!D; 5-10 pts
    1D--,3H,7+!H; 6-9 pts
    1D--,3S,7+!S; 6-9 pts
    1D--,4D,7+!D; 6-9 pts
    1D--,3N,13-16 pts balanced; denies 4-card major
    1D--,4C,5+!C 5+!D; less than invitational
    1D--,4[HS],to play
    1D--,5[CD],to play

    1D1H,2H,Game forcing hand without stopper
    1D1S,2S,Game forcing hand without stopper
    1D2C,3C,Game forcing hand without stopper
    1D2H,3H,Game forcing hand without stopper
    1D2S,3S,Game forcing hand without stopper
    1D[1HS],2N,Invites to 3N with stopper
    1D2[CHS],2N,Invites to 3N with stopper
    1DDb,Rd,11+ pts
    1D----Db----,Rd,Warns of short diamonds

    1D--1H--,1S,natural; 4+!S
    1D--1[HS]--,1N,11-13 pts balanced
    1D--1[HS]--,2C,8+ cards in the minors; unbalanced shape
    1D--1[HS]--,2D,6+!D
    1D--1S--,2H,14-15 pts; 5+!D 4+!H
    1D--1[HS]--,2N,14-15 pts; 6!D; no singleton or void
    1D--1[HS]--,3C,13-15 pts; 5+!C 5+!D
    1D--1[HS]--,3D,long good diamond suit; average or maximum hand
    1D--1H--,3S,4+!H 0-1!S game force
    1D--1[HS]--,4C,support for major; short clubs; game force
    1D--1[HS]--,4D,support for major; short diamonds; game force
    1D--1S--,4H,4+!S 0-1!H game force

    1D--2C--,2D,5+!D; unbalanced; denies 4+ clubs
    1D--2C--2D--,3C,non-forcing
    1D--2[CD]--,2H,artificial; 11-13 balanced
    1D--2[CD]--2H--,2S,puppet to 2NT
    1D--2[CD]--2H--2S--,2N,was forced to bid 2NT
    1D--2[CD]--2H--2S--2N--,3[CD],game forcing; slam interest
    1D--2[CD]--2H--2S--2N--,3[HS],6+ of the minor; exactly 4 of the major; game forcing
    1D--2[CD]--2H--2S--2N--,3N,to play
    1D--2[CD]--2H--,2N,slam interest; balanced; asks for 4+card minor
    1D--2C--2H--,3C,invite non-forcing
    1D--2D--2H--,3D,invite non-forcing
    1D--2D--2H--,3C,invite both minors non-forcing
    1D--2[CD]--2H--,3[HS],6 of the minor; 5 of the major; game forcing
    1D--2[CD]--2H--,3N,to play
    1D--2[CD]--,2S,artificial; undisclosed splinter for partner's minor; game forcing
    1D--2[CD]--2S--,2N,asks which suit is the short suit
    1D--2C--,2N,4!S 4!H 4!D 1!C min hand
    1D--2C--,3N,4!S 4!H 4!D 1!C max hand
    1D--2D--,2N,6!D no singleton or void; min hand
    1D--2D--,3N,6!D no singleton or void; max hand
    1D--2C--,3C,artificial; 3!C 5!D and a 4-card major; game forcing
    1D--2D--,3C,artificial; 3!D 5!C and a 4-card major; game forcing
    1D--2[CD]--3C--,3D,which major?
    1D--2[CD]--,3D,very good 6+card diamond suit; game forcing
    1D--2[CD]--,3H,6+!D 5+!H; game forcing
    1D--2[CD]--,3S,6+!D 5+!S; game forcing

    1D--2[HS]--,3C,at least 5-5 in the minors
    1D--2[HS]--,3D,rebidding diamonds
    1D--2[HS]--,2N,game interest
    1D--2[HS]--2N--,3C,minimum 5!S 4!H
    1D--2[HS]--2N--,3D,maximum 5!S 4!H
    1D--2[HS]--2N--,3H,minimum 5!S 5!H
    1D--2[HS]--2N--,3S,maximum 5!S 5!H
    
##  XYZ Two-Way checkback Stayman
    1D--1H--1[SN]--,2C,artificial invite or wants to signoff in 2D
    1[DH]--1S--1N--,2C,artificial invite or wants to signoff in 2D
    1D--1H--1[SN]--,2D,artificial game forcing checkback
    1[DH]--1S--1N--,2D,artificial game forcing checkback
    1D--1H--1[SN]--,2H,to play
    1[DH]--1S--1N--,2H,to play
    1D--1H--1[SN]--,2S,natural
    1[DH]--1S-1N--,2S,natural
    1D--1H--1[SN]--,3C,5+!H 5+!C slam interest
    1[DH]--1S--1N--,3C,5+!S 5+!C slam interest
    1D--1H--1[SN]--,3D,5+!H 5+!D slam interest
    1[DH]--1S--1N--,3D,5+!S 5+!D slam interest
    1D--1H--1[SN]--,3H,6+!H  slam interest
    1[DH]--1S--1N--,3H,5+!S 5+!H slam interest
    1[DH]--1S--1N--,3S,6+!S slam interest
    1D--1H--1S--,4[CD],splinter support for spades

    1D--1H--1[SN]--2C--,2D,mandatory response
    1[DH]--1S--1N--2C--,2D,mandatory response
    1D--1H--1[SN]--2C--2D--,2H,mild invite
    1[DH]--1S--1N--2C--2D--,2S,mild invite
    1D--1H--1[SN]--2C--2D--,2N,solid invite to 3N with 5+!H
    1[DH]--1S--1N--2C--2D--,2N,solid invite to 3N with 5+!S
    1D--1H--1[SN]--2C--2D--,3C,invite with 4!H 6+!C
    1[DH]--1S--1N--2C--2D--,3C,invite with 4!S 6+!C
    1D--1H--1[SN]--2C--2D--,3D,invite with 4!H 6+!D
    1[DH]--1S--1N--2C--2D--,3D,invite with 4!S 6+!D
    1D--1H--1[SN]--2C--2D--,3H,invite with 6+!H
    1[DH]--1S--1N--2C--2D--,3S,invite with 6+!S
    1D--1H--1S--2C--2D--,3S,invite with 4!S
    1D--1H--1[SN]--2C--2D--,3N,choice of game
    1[DH]--1S--1N--2C--2D--,3N,choice of game

##  2-over-1 for 1M openings

    1[HS]--,1N,forcing
    ----1[HS]--,1N,not forcing
    ------1[HS]--,1N,not forcing
    1[HS]--,2C,game force; 4+!C
    1[HS]--,2D,game force; 4+!D
    1S--,2H,game force; 5+!H
    ----1[HS]--,2C,3-card invitational support


## 2C Opening

    2C--,2D,11+ pts; artificial ask for hand description
    2C--,2H,8-11 pts; 5+!H
    2C--,2S,8-11 pts; 5+!S
    2C--,2N,puppet to 3C
    2C--2N--,3C,forced bid
    2C--2N--3C--,3D,5+!H 5+!S game force
    2C--2N--3C--,3H,5+!D 5+!H game force
    2C--2N--3C--,3S,5+!D 5+!S game force
    2C--,3C,6+!D invitational or better
    2C--,3D,6+!H invitational or better
    2C--,3H,6+!S invitational or better
    2C--,3S,6+!S 4+!H game force
    2C--,4C,Preemptive club raise 5-9 pts
    2C--,3N,To play
    2C--,4[HS],To play

    2C--2D--,2H,any 4-card major
    2C--2D--2H--,2S,which 4-card major?
    2C--2D--2H--2S--,2N,4+!H 10-13 pts
    2C--2D--2H--2S--2N--,3C,signoff
    2C--2D--2H--2S--2N--,3D,slam try in clubs
    2C--2D--2H--2S--2N--,3H,invite to game
    2C--2D--2H--2S--2N--,3S,slam try in hearts
    2C--2D--2H--2S--2N--,3N,to play
    2C--2D--2H--2S--2N--,4[HS],to play
    2C--2D--2H--2S--,3C,4+!S 10-13 pts
    2C--2D--2H--2S--3C--,3D,slam try in clubs
    2C--2D--2H--2S--3C--,3H,slam try in spades
    2C--2D--2H--2S--3C--,3S,invite to game
    2C--2D--2H--2S--3C--,3N,to play
    2C--2D--2H--2S--3C--,4[HS],to play

    2C--2D--2H--2S--,3D,4+!H 14-15 pts
    2C--2D--2H--2S--3D--,3H,slam try in hearts
    2C--2D--2H--2S--3D--,3N,to play
    2C--2D--2H--2S--3D--,4[HS],to play
    2C--2D--2H--2S--,3H,4+!S 14-15 pts
    2C--2D--2H--2S--3H--,3S,slam try in spades
    2C--2D--2H--2S--3H--,3N,to play
    2C--2D--2H--2S--3H--,4[HS],to play

    2C--2D--,2S,4+!S; 12-15 pts; no 4-card major
    2C--2D--2S--,2N,relay
    2C--2D--2S--2N--,3C,12-13 pts
    2C--2D--2S--2N--,3D,14-15 pts with 0-1!D
    2C--2D--2S--2N--,3H,14-15 pts with 0-1!H
    2C--2D--2S--2N--,3S,14-15 pts with 0-1!S
    2C--2D--2S--2N--,3N,14-15 pts; no singleton or void
    2C--2D--2S--,3C,signoff
    2C--2D--2S--,3D,slam try in clubs
    2C--2D--2S--,3H,5!H game force
    2C--2D--2S--,3S,5!S game force

    2C--2D--,2N,14-15 pts; no 4-card major; stoppers in majors
    2C--2D--2N--,3D,slam try in clubs
    2C--2D--2N--,3H,5!H game force
    2C--2D--2N--,3S,5!S game force

    2C--2D--,3C,11-12 pts with no 4-card major
    2C--2D--3C--,3D,slam try in clubs
    2C--2D--3C--,3H,5!H game force
    2C--2D--3C--,3S,5!S game force
    2C--2D--,3D,5+!D game force
    2C--2D--,3H,5+!H game force
    2C--2D--,3S,5+!S game force
    2C--2D--,3N,to play

    2CDb,Rd,10+ pts and defensive hand
    2C2[HS],3C,natural
    2C2[HS],Db,negative double; 4-card major
    2C2H,2S,natural; forcing one round
    2C2H,3H,good club raise
    2C2S,3S,good club raise
    2C2H,3D,diamonds; game force
    2C2H,3S,spades; game force
    2C2S,3D,diamonds; game force
    2C2S,3H,hearts; game force
    
    2CDb,2D,11+ pts; artificial ask for hand description
    2CDb,2H,8-11 pts; 5+!H
    2CDb,2S,8-11 pts; 5+!S
    2CDb,2N,puppet to 3C
    2CDb2N--,3C,forced bid
    2CDb2N--3C--,3D,5+!H 5+!S game force
    2CDb2N--3C--,3H,5+!D 5+!H game force
    2CDb2N--3C--,3S,5+!D 5+!S game force
    2CDb,3C,6+!D invitational or better
    2CDb,3D,6+!H invitational or better
    2CDb,3H,6+!S invitational or better
    2CDb,3S,6+!S 4+!H game force
    2CDb,4C,Preemptive club raise 5-9 pts
    2CDb,3N,To play
    2CDb,4[HS],To play

    2CDb2D--,2H,any 4-card major
    2CDb2D--2H--,2S,which 4-card major?
    2CDb2D--2H--2S--,2N,4+!H 10-13 pts
    2CDb2D--2H--2S--2N--,3C,signoff
    2CDb2D--2H--2S--2N--,3D,slam try in clubs
    2CDb2D--2H--2S--2N--,3H,invite to game
    2CDb2D--2H--2S--2N--,3S,slam try in hearts
    2CDb2D--2H--2S--2N--,3N,to play
    2CDb2D--2H--2S--2N--,4[HS],to play
    2CDb2D--2H--2S--,3C,4+!S 10-13 pts
    2CDb2D--2H--2S--3C--,3D,slam try in clubs
    2CDb2D--2H--2S--3C--,3H,slam try in spades
    2CDb2D--2H--2S--3C--,3S,invite to game
    2CDb2D--2H--2S--3C--,3N,to play
    2CDb2D--2H--2S--3C--,4[HS],to play

    2CDb2D--2H--2S--,3D,4+!H 14-15 pts
    2CDb2D--2H--2S--3D--,3H,slam try in hearts
    2CDb2D--2H--2S--3D--,3N,to play
    2CDb2D--2H--2S--3D--,4[HS],to play
    2CDb2D--2H--2S--,3H,4+!S 14-15 pts
    2CDb2D--2H--2S--3H--,3S,slam try in spades
    2CDb2D--2H--2S--3H--,3N,to play
    2CDb2D--2H--2S--3H--,4[HS],to play

    2CDb2D--,2S,4+!S; 12-15 pts; no 4-card major
    2CDb2D--2S--,2N,relay
    2CDb2D--2S--2N--,3C,12-13 pts
    2CDb2D--2S--2N--,3D,14-15 pts with 0-1!D
    2CDb2D--2S--2N--,3H,14-15 pts with 0-1!H
    2CDb2D--2S--2N--,3S,14-15 pts with 0-1!S
    2CDb2D--2S--2N--,3N,14-15 pts; no singleton or void
    2CDb2D--2S--,3C,signoff
    2CDb2D--2S--,3D,slam try in clubs
    2CDb2D--2S--,3H,5!H game force
    2CDb2D--2S--,3S,5!S game force
    
    2CDb2D--,2N,14-15 pts; no 4-card major; stoppers in majors
    2CDb2D--2N--,3D,slam try in clubs
    2CDb2D--2N--,3H,5!H game force
    2CDb2D--2N--,3S,5!S game force

    2CDb2D--,3C,11-12 pts with no 4-card major
    2CDb2D--3C--,3D,slam try in clubs
    2CDb2D--3C--,3H,5!H game force
    2CDb2D--3C--,3S,5!S game force
    2CDb2D--,3D,5+!D game force
    2CDb2D--,3H,5+!H game force
    2CDb2D--,3S,5+!S game force
    2CDb2D--,3N,to play

    2C2D,Db,11+ pts; artificial ask for hand description
    2C2D,2H,8-11 pts; 5+!H
    2C2D,2S,8-11 pts; 5+!S
    2C2D,2N,puppet to 3C
    2C2D2N--,3C,forced bid
    2C2D2N--3C--,3D,5+!H 5+!S game force
    2C2D2N--3C--,3H,5+!D 5+!H game force
    2C2D2N--3C--,3S,5+!D 5+!S game force
    2C2D,3C,6+!D invitational or better
    2C2D,3D,6+!H invitational or better
    2C2D,3H,6+!S invitational or better
    2C2D,3S,6+!S 4+!H game force
    2C2D,4C,Preemptive club raise 5-9 pts
    2C2D,3N,To play
    2C2D,4[HS],To play

    2C2DDb--,2H,any 4-card major
    2C2DDb--2H--,2S,which 4-card major?
    2C2DDb--2H--2S--,2N,4+!H 10-13 pts
    2C2DDb--2H--2S--2N--,3C,signoff
    2C2DDb--2H--2S--2N--,3D,slam try in clubs
    2C2DDb--2H--2S--2N--,3H,invite to game
    2C2DDb--2H--2S--2N--,3S,slam try in hearts
    2C2DDb--2H--2S--2N--,3N,to play
    2C2DDb--2H--2S--2N--,4[HS],to play
    2C2DDb--2H--2S--,3C,4+!S 10-13 pts
    2C2DDb--2H--2S--3C--,3D,slam try in clubs
    2C2DDb--2H--2S--3C--,3H,slam try in spades
    2C2DDb--2H--2S--3C--,3S,invite to game
    2C2DDb--2H--2S--3C--,3N,to play
    2C2DDb--2H--2S--3C--,4[HS],to play

    2C2DDb--2H--2S--,3D,4+!H 14-15 pts
    2C2DDb--2H--2S--3D--,3H,slam try in hearts
    2C2DDb--2H--2S--3D--,3N,to play
    2C2DDb--2H--2S--3D--,4[HS],to play
    2C2DDb--2H--2S--,3H,4+!S 14-15 pts
    2C2DDb--2H--2S--3H--,3S,slam try in spades
    2C2DDb--2H--2S--3H--,3N,to play
    2C2DDb--2H--2S--3H--,4[HS],to play

    2C2DDb--,2S,4+!S; 12-15 pts; no 4-card major
    2C2DDb--2S--,2N,relay
    2C2DDb--2S--2N--,3C,12-13 pts
    2C2DDb--2S--2N--,3D,14-15 pts with 0-1!D
    2C2DDb--2S--2N--,3H,14-15 pts with 0-1!H
    2C2DDb--2S--2N--,3S,14-15 pts with 0-1!S
    2C2DDb--2S--2N--,3N,14-15 pts; no singleton or void
    2C2DDb--2S--,3C,signoff
    2C2DDb--2S--,3D,slam try in clubs
    2C2DDb--2S--,3H,5!H game force
    2C2DDb--2S--,3S,5!S game force

    2C2DDb--,2N,14-15 pts; no 4-card major; stoppers in majors
    2C2DDb--2N--,3D,slam try in clubs
    2C2DDb--2N--,3H,5!H game force
    2C2DDb--2N--,3S,5!S game force

    2C2DDb--,3C,11-12 pts with no 4-card major
    2C2DDb--3C--,3D,slam try in clubs
    2C2DDb--3C--,3H,5!H game force
    2C2DDb--3C--,3S,5!S game force
    2C2DDb--,3D,5+!D game force
    2C2DDb--,3H,5+!H game force
    2C2DDb--,3S,5+!S game force
    2C2DDb--,3N,to play

## 2D Opening

    2D--,2[HS],signoff
    2D--,3[CN],signoff
    2D--,4[HS],signoff
    2D--,2N,invite to game; asks for hand description
    2D--2N--,3C,11-13 pts
    2D--2N--3C--,3D,relay
    2D--2N--3C--3D--,3H,4!S 3!H 1!D 5!C
    2D--2N--3C--3D--,3S,3!S 4!H 1!D 5!C
    2D--2N--3C--3D--,3N,4!S 4!H 0-1!D 4-5!C
    2D--2N--,3D,14-15 pts; 4!S 4!H 0-1!D 4-5!C
    2D--2N--3D--,3H,sets hearts as suit
    2D--2N--3D--,3S,sets spades as suit
    2D--2N--,3H,14-15 pts; 4!S 3!H 1!D 5!C
    2D--2N--,3S,14-15 pts; 3!S 4!H 1!D 5!C

    2DDb,Rd,Asks for better major
    2D2[HS],Db,penalty double
    2D2[HS],2N,invite to game; asks for hand description
    2D2[HS]2N--,3C,11-13 pts
    2D2[HS]2N--3C--,3D,relay
    2D2[HS]2N--3C--3D--,3H,4!S 3!H 1!D 5!C
    2D2[HS]2N--3C--3D--,3S,3!S 4!H 1!D 5!C
    2D2[HS]2N--3C--3D--,3N,4!S 4!H 0-1!D 4-5!C
    2D2[HS]2N--,3D,14-15 pts; 4!S 4!H 0-1!D 4-5!C
    2D2[HS]2N--3D--,3H,sets hearts as suit
    2D2[HS]2N--3D--,3S,sets spades as suit
    2D2[HS]2N--,3H,14-15 pts; 4!S 3!H 1!D 5!C
    2D2[HS]2N--,3S,14-15 pts; 3!S 4!H 1!D 5!C
    
## Weak Twos
    2[HS]--,2N,16+ pts; asks for hand description
    2[HS]--2N--,3C,5 card suit
    2[HS]--2N--3C--,3D,asks for hand strength
    2[HS]--2N--3C--3D--,3H,minimum strength
    2[HS]--2N--3C--3D--,3S,max strength without 3 cards in other major
    2[HS]--2N--3C--3D--,3N,max strength with 3 cards in other major
    2H--2N--3C--,3H,sign off
    2S--2N--3C--,3S,sign off
    2[HS]--2N--,3D,6 card suit; minimum strength
    2H--2N--3D--,3H,sign off
    2S--2N--3D--,3S,sign off
    2H--2N--3D--,3S,5!S
    2S--2N--3D--,3H,5!H
    2[HS]--2N--,3H,6 card suit; medium strength
    2[HS]--2N--,3S,6 card suit; max strength without 3 cards in other major
    2[HS]--2N--,3N,6 card suit; max strength with 3 cards in other major

## Puppet Stayman

    2N--,3C,Puppet Stayman asks for 4 or 5-card major
    2N--3C--,3D,No 5-card major; at least one 4-card major
    2N--3C--,3H,5!H
    2N--3C--,3S,5!S
    2N--3C--,3N,No 4 or 5-card major
    2N--3C--3D--,3H,4!S
    2N--3C--3D--,3S,4!H
    2N--3C--3D--,3N,No 4-card major
    2N--3C--3D--,4C,4+!H 4+!S with slam interest
    2N--3C--3D--,4D,4+!H 4+!S without slam interest

##  DONT
    1N,Db,Single-suited hand; relays to 2!C
    1N----,Db,Single-suited hand; relays to 2!C
    1N,2C,Clubs and a higher suit
    1N----,2C,Clubs and a higher suit
    1N,2D,Diamonds and a higher suit
    1N----,2D,Diamonds and a higher suit
    1N,2H,Hearts and Spades
    1N----,2H,Hearts and Spades
    1N,2S,Single-suited spades
    1N----,2S, Single-suited spades
    1N----,2N,5+!C 5+!D
    
## After NT Interference

    1NDb,2C,Stayman; 9+ pts; might not have 4-card major
    1NDb,2D,Transfer to hearts; 5+!H
    1NDb2D--,2H,Accept transfer
    1NDb2D--,3H,Super-accept transfer; 4+!H and max NT hand
    1NDb2H--,2S,Accept transfer
    1NDb2H--,3S,Super-accept transfer; 4+!S and max NT hand
    1NDb,2H,Transfer to spades; 5+!S
    1NDb,2S,Transfer to clubs; 6+!C
    1NDb2S--,2N,Not interested in 3NT
    1NDb2S--2N--,3C,correct to !C
    1NDb2S--2N--,3D,game forcing strength; short !D
    1NDb2S--2N--,3H,game forcing strength; short !H
    1NDb2S--2N--,3S,game forcing strength; short !S
    1NDb2S--,3C,Accept transfer with interest in 3NT
    1NDb2S--3C--,3D,game forcing strength; short !D
    1NDb2S--3C--,3H,game forcing strength; short !H
    1NDb2S--3C--,3S,game forcing strength; short !S
    1NDb,2N,Transfer to diamonds; 6+!D
    1NDb2N--,3C,Not interested in 3NT
    1NDb2N--3C--,3D,correct to !D
    1NDb2N--3C--,3H,game forcing strength; short !H
    1NDb2N--3C--,3S,game forcing strength; short !S
    1NDb2N--,3D,Accept transfer with interest in 3NT
    1NDb2N--3D--,3H,game forcing strength; short !H
    1NDb2N--3D--,3S,game forcing strength; short !S

    1N2C,Db,Stayman; 9+ pts; might not have 4-card major
    1N2C,2D,Transfer to hearts; 5+!H
    1N2C2D--,2H,Accept transfer
    1N2C2D--,3H,Super-accept transfer; 4+!H and max NT hand
    1N2C2H--,2S,Accept transfer
    1N2C2H--,3S,Super-accept transfer; 4+!S and max NT hand
    1N2C,2H,Transfer to spades; 5+!S
    1N2C,2S,Transfer to clubs; 6+!C
    1N2C2S--,2N,Not interested in 3NT
    1N2C2S--2N--,3C,correct to !C
    1N2C2S--2N--,3D,game forcing strength; short !D
    1N2C2S--2N--,3H,game forcing strength; short !H
    1N2C2S--2N--,3S,game forcing strength; short !S
    1N2C2S--,3C,Accept transfer with interest in 3NT
    1N2C2S--3C--,3D,game forcing strength; short !D
    1N2C2S--3C--,3H,game forcing strength; short !H
    1N2C2S--3C--,3S,game forcing strength; short !S
    1N2C,2N,Transfer to diamonds; 6+!D
    1N2C2N--,3C,Not interested in 3NT
    1N2C2N--3C--,3D,correct to !D
    1N2C2N--3C--,3H,game forcing strength; short !H
    1N2C2N--3C--,3S,game forcing strength; short !S
    1N2C2N--,3D,Accept transfer with interest in 3NT
    1N2C2N--3D--,3H,game forcing strength; short !H
    1N2C2N--3D--,3S,game forcing strength; short !S
    
    1N2D,2[HS],natural
    1N2H,2S,natural
    1N2D,3D,game forcing stayman
    1N2H,3H,game forcing stayman
    1N2S,3S,game forcing stayman
    1N2D,3[CHS],game forcing showing 5+ cards in suit
    1N2H,3[CDS],game forcing showing 5+ cards in suit
    1N2S,3[CDH],game forcing showing 5+ cards in suit
    1N2[DHS],Db,takeout; 8+ pts
    1N2[DHS],2N,9-10 pts
    1N2[DHS],4D,Transfer to hearts
    1N2[DHS],4H,Transfer to spades
    
## Two-suited Bids

    1C,2C,5+!H 5+!S; 7-11 or 15-18 pts
    1D,2D,5+!H 5+!S; 7-11 or 15-18 pts
    1H,2H,5+!S and a minor; 7-11 or 15-18 pts
    1H2H--,2N,Asks for minor
    1S,2S,5+!H and a minor; 7-11 or 15-18 pts
    1S2S--,2N,Asks for minor

    1C----,2C,5+!H 5+!S; 7-11 or 15-18 pts
    1D----,2D,5+!H 5+!S; 7-11 or 15-18 pts
    1H----,2H,5+!S and a minor; 7-11 or 15-18 pts
    1H----2H--,2N,Asks for minor
    1S----,2S,5+!H and a minor; 7-11 or 15-18 pts
    1S----2S--,2N,Asks for minor

    1C,2N,5+!D 5+!H; 7-11 or 15-18 pts
    1D,2N,5+!C 5+!H; 7-11 or 15-18 pts
    1[HS],2N,5+!C 5+!D; 7-11 or 15-18 pts
    1C----,2N,5+!D 5+!H; 7-11 or 15-18 pts
    1D----,2N,5+!C 5+!H; 7-11 or 15-18 pts
    1[HS]----,2N,5+!C 5+!D; 7-11 or 15-18 pts

    ------1C,1N,5+!D 5+!H
    ------1D,1N,5+!C 5+!H
    ------1[HS],1N,5+!C 5+!D
    ------1C----,1N,5+!D 5+!H
    ------1D----,1N,5+!C 5+!H
    ------1[HS]----,1N,5+!C 5+!D

    --1C----,1N,5+!D 5+!H
    --1D----,1N,5+!C 5+!H
    --1[HS]----,1N,5+!C 5+!D
    ----1C----,1N,5+!D 5+!H
    ----1D----,1N,5+!C 5+!H
    ----1[HS]----,1N,5+!C 5+!D

    3C,4C,5+!H 5+!S
    3D,4D,5+!H 5+!S
    3H,4H,5+!S and a minor
    3H4H--,4N,asks for minor
    3S,4S,5+!H and a minor
    3S4S--,4N,asks for minor
    3[HS],4N,5+!C 5+!D
    4S,4N,Any 5-5 or better hand

    3C----,4C,5+!H 5+!S
    3D----,4D,5+!H 5+!S
    3H----,4H,5+!S and a minor
    3H----4H--,4N,asks for minor
    3S----,4S,5+!H and a minor
    3S----4S--,4N,asks for minor
    3[HS]----,4N,5+!C 5+!D
    4S----,4N,Any 5-5 or better hand

    2[DHS],4C,5+!C and 5 of a major
    2[HS],4D,5+!D and 5 of a major
    2D4C--,4D,Asks for major
    2[DHS]----,4C,5+!C and 5 of a major
    2[HS]----,4D,5+!D and 5 of a major
    2D----4C--,4D,Asks for major
    1H--2H,4C,5+!C 5+!S
    1H--2H,4D,5+!D 5+!S
    1S--2S,4C,5+!C 5+!H
    1S--2S,4D,5+!D 5+!S
    
## Defense against preempts

    2D,3D,Asks for stopper for 3N
    2H,3H,Asks for stopper for 3N
    2S,3S,Asks for stopper for 3N
    2D----,3D,Asks for stopper for 3N
    2H----,3H,Asks for stopper for 3N
    2S----,3S,Asks for stopper for 3N
    2D,3H,6+!H 16+ pts
    2[DH],3S,6+!S 16+ pts
    2D----,3H,6+!H 16+ pts
    2[DH]----,3S,6+!S 16+ pts

## Support Doubles

    1D--1H1S,Db,3+!H
    1D--1HDb,Rd,3+!H
    1D--1SDb,Rd,3+!S
