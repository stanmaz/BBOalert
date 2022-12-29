    BBOalert,lang_pl version 4.2
    Script,_dd_,let d = new Date();if (d.getHours() < 18) {R="Dzień dobry";} else {R = "Dobry wieczór";};
    Alias, or , albo ,
    Alias, and , i ,
    Alias,if,jeżeli
    Alias,any,jakikolwiek
    Alias,denies,neguje
    Alias,with,z
    Alias,double,kontra
    Alias,negative double,kontra negatywna
    Alias,without,bez
    Alias,suit,kolor
    Alias,card,kart
    Alias,weak,słaby
    Alias,strong,silne
    Alias,preempt,blok
    Alias,Relay,relay
    Alias,Clubs,Trefle
    Alias,Diamonds,Karo
    Alias,Hearts,Kiery
    Alias,Spades,Piki
    Alias,NoTrump,BezAtu
    Alias,Control,Kontrola
    Alias,stopper,zatrzymanie
    Alias,possible,możliwy
    Alias,no stopper,bez zatrzymania
    Alias,balanced,zrównoważona
    Alias, natural,;naturalne
    Alias,mandatory,przymusowe
    Alias,preference,preferencja
    Alias,losers,lew przegrywających
    Alias,short,krótkość
    Alias,sign-off,wybór kontraktu
    Alias,may be weak,może być słabe
    Alias,game inviting,inwit do dogranej
    Alias,game forcing,forsing do dogranej
    Alias,at least,co najmniej
    Alias,to play,do grania
    Alias,minimum hand,ręka minimalna
    Alias,slam try,próba szlemowa
    Alias,game or slam try,inwit do szlema lub dogranej
    Alias,key cards,karty kluczowe
    Alias,Even nr. key cards,parzysta ilość kart kluczowych
    Alias,asking suit,pytanie o kolor
    Alias,all shapes,rozkład dowolny
    Alias,any shape,rozkład dowolny
    Alias,non solid,niesolidny
    Alias,any solid 6 card suit,nieznany solidny kolor
    Alias,No shortness,brak krótkości
    Alias,eccentric hand,ręka nie zrównoważona
    Alias,asking opener’s force,pytanie o siłę
    Alias,pass or correct,pas lub korekcja
    Alias,major 2suiter,starsza dwukolorowka
    Alias,if weak - no preference,brak preferencji przy słabości
    Alias,weak opening,słabe otwarcie
    Alias,undefined force,dowolna siła
    Alias,any 6 card suit with max 1.5 loser,dowolny kolor 6-kartowy z maximum 1.5 przegrywającej
    
    Shortcut,Raccourcis clavier,,width=100% backgroundColor=Cyan fontSize=16px
    Shortcut,ww,Czesc; używamy uproszczonej DWURURKI:\notwarcie 1x na podwójnym Texasie (1T=4+!H;1K=4+!S;1C=5+!C albo zrównoważone;1P=5+!D)\npierwsza odpowiedź=relay albo Texas. Potem naturalnie.\nAtak 3cia lub 5ta ; Najwyższa z sekwencji (przeciw BA) lub odwrotnie (przeciw kontraktowi w kolor).\nPo ataku partnera :niska jest zachęcająca\nWłoskie zrzutki nieparzysta=zachęcająca parzysta=Lavinthal\n
    Shortcut,GTG,Niestety muszę odejść; Dzięki; Do następnego razu\n
    Shortcut,ML,Ostatnie rozdanie; Dzięki\n
    Shortcut,dd,%_dd_%\n
    Shortcut,zz,Cześć\n
    Shortcut,SP,Sorry\n
    Shortcut,Raccourcis enchères,,width=100% backgroundColor=Cyan fontSize=16px
    Shortcut,TC,Texas !C
    Shortcut,TD,Texas !D
    Shortcut,TH,Texas !H
    Shortcut,TS,Texas !S

    Shortcut,XC,Transfer->!C
    Shortcut,XD,Transfer->!D
    Shortcut,XH,Transfer->!H
    Shortcut,XS,Transfer->!S

    Shortcut,CC,Kontrola !C
    Shortcut,CD,Kontrola !D
    Shortcut,CH,Kontrola !H
    Shortcut,CS,Kontrola !S

    Shortcut,SC,Zatrzymanie !C
    Shortcut,SD,Zatrzymanie !D
    Shortcut,SH,Zatrzymanie !H
    Shortcut,SS,Zatrzymanie !S

    Shortcut,KE,Parzysta ilość kart kluczowych,width=20%
    Shortcut,KC,Nieparzysta ilość kart kluczowych; Kontrola !C,width=20%
    Shortcut,KD,Nieparzysta ilość kart kluczowych; Kontrola !D,width=20%
    Shortcut,KH,Nieparzysta ilość kart kluczowych; Kontrola !H,width=20%
    Shortcut,KS,Nieparzysta ilość kart kluczowych; Kontrola !S,width=20%

    Shortcut,Raccourcis entame,,width=100% backgroundColor=Cyan fontSize=16px
    Shortcut,NA,Wyjście przeciw BA : A = typowe AKx\n,width=20%
    Shortcut,NK,Wyjście przeciw BA : K = typowe AKW AKD KDW ou KD10\n,width=20%
    Shortcut,NQ,Wyjście przeciw BA : D = typowe DW10 or DW\n,width=20%
    Shortcut,NJ,Wyjście przeciw BA : W = typowe ADW or W10x\n,width=20%
    Shortcut,N10,Wyjście przeciw BA : 10 = typowe AW10 or RW10 ot 109x\n,width=20%

    Shortcut,SA,Wyjście przeciw kolorowi : A = typiquement AR even number of cards\n,width=20%
    Shortcut,SK,Wyjście przeciw kolorowi : R = typiquement AR odd number of cards\n,width=20%
    Shortcut,SQ,Wyjście przeciw kolorowi : D = typiquement RDx\n,width=20%
    Shortcut,SJ,Wyjście przeciw kolorowi : V = typiquement DVx\n,width=20%
    Shortcut,ST,Wyjście przeciw kolorowi : 10 = typiquement V10x\n,width=20%

    Button,♣, !C,width=18% fontSize=40px borderRadius=100%
    Button,♦, !D,width=18% fontSize=40px borderRadius=100% color=red
    Button,♥, !H,width=18% fontSize=40px borderRadius=100% color=red
    Button,♠, !S,width=18% fontSize=40px borderRadius=100%
    Button,SA, SA,borderRadius=20% width=28% fontSize=40px
    Button,Control,Kontrola !%suitBid%,width=100% backgroundColor=Red color=white
    Button,Transfer, Transfer -> %transfer%,backgroundColor=Chartreuse
    Button,Texas, Texas -> %texas%,backgroundColor=LightSalmon
    Button,Turbo pair,Parzysta ilość kart kluczowych,\
                width=100% backgroundColor=Orange fontSize=24px
    Button,Turbo impair,Nieparzysta ilość kart kluczowych; Kontrola !%suitBid%,\
                width=100% backgroundColor=Cyan fontSize=24px
    Button,Forcing, Forcing,backgroundColor=Pink
    Button,Forcing manche, Forsing do dogranej,backgroundColor=Green color=white
    Button,Invitation, Inwit,backgroundColor=Blue color=white
    Button,Non Forcing, Nie forsujące,backgroundColor=DarkRed color=white
    Button,Emotions,,width=100% backgroundColor=Cyan fontSize=16px
    Button,😀, 😀,width= borderRadius=100% fontSize=40px
    Button,😞, 😞,width= borderRadius=100% fontSize=40px
    Button,😢, 😢,width= borderRadius=100% fontSize=40px
    Button,😬, 😬,width= borderRadius=100% fontSize=40px

    Button,😛, 😛,width= borderRadius=100% fontSize=40px
    Button,👹, 👹,width= borderRadius=100% fontSize=40px
    Button,👍, 👍,width= borderRadius=100% fontSize=40px
    Button,👎, 👎,width= borderRadius=100% fontSize=40px
    /*
    *   Polish shortcuts, buttons and aliases
    */

    Shortcut,TIMEOUT,%longBeep%,width=50%
    Shortcut,TIMEOUT_WARNING,%shortBeep%,width=50%