# BBOstat

To install the script include the following record in the data :

    Import,https://github.com/stanmaz/BBOalert/blob/master/Scripts/BBOstat.txt

The script will log all relevant events during the game. By default logging is disabled.

The script uses shortcuts :

- BBOLOG to start or stop logging immediately
- NXTLOG to start logging at the beginning of the next deal
- EXPLOG to export the log into the clipboard
- CLRLOG to clear log data

The script produces data in CSV format that can be imported into a spreadsheet :

- Column A : time stamp
- Column B : event type
- Column C : board number
- Column D : direction of the active player
- Column E : UID of the active player
- Column F : elapsed time (in ms) for action (bid or play)
- Column G : text related to the event

Sample of log data of a complete board history :

    20210605_09:20:51,onNewAuction,181,N,17590,8366,1D
    20210605_09:20:59,onNewAuction,181,E,egil70,7960,1D--
    20210605_09:21:03,onNewAuction,181,S,cobra12,4577,1D--3D
    20210605_09:21:27,onNewAuction,181,W,terry2555,24236,1D--3D--
    20210605_09:21:32,onNewAuction,181,N,17590,4141,1D--3D--3N
    20210605_09:21:32,onNewAuction,181,N,17590,82,1D--3D--3N--
    20210605_09:21:53,onNewAuction,181,S,cobra12,21270,1D--3D--3N--5D
    20210605_09:22:01,onNewAuction,181,W,terry2555,7821,1D--3D--3N--5D--
    20210605_09:22:03,onNewAuction,181,N,17590,2031,1D--3D--3N--5D----
    20210605_09:22:03,onNewAuction,181,N,17590,86,1D--3D--3N--5D------
    20210605_09:22:04,onNewPlayedCard,181,E,Robot,999,7♠
    20210605_09:22:12,onNewPlayedCard,181,S,cobra12,7732,7♠J♠
    20210605_09:22:15,onNewPlayedCard,181,W,terry2555,3427,7♠J♠Q♠
    20210605_09:22:18,onNewPlayedCard,181,N,17590,2959,7♠J♠Q♠A♠
    20210605_09:22:23,onNewPlayedCard,181,N,17590,4665,Q♦
    20210605_09:22:23,onNewPlayedCard,181,E,Robot,805,Q♦9♦
    20210605_09:22:25,onNewPlayedCard,181,S,Robot,1422,Q♦9♦4♦
    20210605_09:22:27,onNewPlayedCard,181,W,terry2555,2164,Q♦9♦4♦2♦
    20210605_09:22:30,onNewPlayedCard,181,N,17590,2858,J♦
    20210605_09:22:31,onNewPlayedCard,181,E,Robot,791,J♦T♦
    20210605_09:22:33,onNewPlayedCard,181,S,Robot,2104,J♦T♦5♦
    20210605_09:22:35,onNewPlayedCard,181,W,terry2555,1758,J♦T♦5♦A♦
    20210605_09:22:48,onNewPlayedCard,181,W,terry2555,13088,3♥
    20210605_09:22:52,onNewPlayedCard,181,N,17590,3979,3♥Q♥
    20210605_09:22:52,onNewPlayedCard,181,E,Robot,809,3♥Q♥A♥
    20210605_09:22:54,onNewPlayedCard,181,S,Robot,1837,3♥Q♥A♥9♥
    20210605_09:22:56,onNewPlayedCard,181,E,Robot,2006,8♣
    20210605_09:23:03,onNewPlayedCard,181,S,Robot,6772,8♣A♣
    20210605_09:23:05,onNewPlayedCard,181,W,terry2555,1815,8♣A♣2♣
    20210605_09:23:06,onNewPlayedCard,181,N,17590,1349,8♣A♣2♣6♣
    20210605_09:23:16,onNewPlayedCard,181,S,Robot,9882,Q♣
    20210605_09:23:18,onNewPlayedCard,181,W,terry2555,1917,Q♣K♣
    20210605_09:23:20,onNewPlayedCard,181,N,17590,1809,Q♣K♣9♣
    20210605_09:23:21,onNewPlayedCard,181,E,Robot,810,Q♣K♣9♣3♣
    20210605_09:23:28,onNewPlayedCard,181,W,terry2555,7104,2♠
    20210605_09:23:32,onNewPlayedCard,181,N,17590,4018,2♠3♠
    20210605_09:23:33,onNewPlayedCard,181,E,Robot,807,2♠3♠5♠
    20210605_09:23:36,onNewPlayedCard,181,S,Robot,3303,2♠3♠5♠T♠
    20210605_09:23:41,onNewPlayedCard,181,S,Robot,4803,K♠
    20210605_09:23:42,onNewPlayedCard,181,W,terry2555,1765,K♠6♠
    20210605_09:23:43,onNewPlayedCard,181,N,17590,1105,K♠6♠8♠
    20210605_09:23:44,onNewPlayedCard,181,E,Robot,806,K♠6♠8♠5♥
    20210605_09:23:56,onNewPlayedCard,181,S,Robot,11268,4♠
    20210605_09:23:59,onNewPlayedCard,181,W,terry2555,3722,4♠6♥
    20210605_09:24:01,onNewPlayedCard,181,N,17590,1270,4♠6♥9♠
    20210605_09:24:01,onNewPlayedCard,181,E,Robot,798,4♠6♥9♠4♥
    20210605_09:24:08,onAnnouncementDisplayed,181,N,17590,,"17590: I claim 4 more tricks. Contract down 1.  "
    20210605_09:24:43,onNotificationDisplayed,181,N,17590,,"Claim rejected"
    20210605_09:24:43,onNewPlayedCard,181,N,17590,41839,8♥
    20210605_09:24:44,onNewPlayedCard,181,E,Robot,779,8♥2♥
    20210605_09:24:45,onNewPlayedCard,181,S,Robot,797,8♥2♥K♦
    20210605_09:24:50,onNewPlayedCard,181,W,terry2555,5422,8♥2♥K♦7♥
    20210605_09:24:52,onNewPlayedCard,181,S,Robot,2013,8♦
    20210605_09:24:55,onNewPlayedCard,181,W,terry2555,3037,8♦5♣
    20210605_09:24:56,onNewPlayedCard,181,N,Robot,808,8♦5♣3♦
    20210605_09:24:57,onNewPlayedCard,181,E,Robot,797,8♦5♣3♦4♣
    20210605_09:24:59,onNewPlayedCard,181,S,Robot,2017,7♦
    20210605_09:25:04,onNewPlayedCard,181,W,terry2555,5390,7♦7♣
    20210605_09:25:05,onNewPlayedCard,181,N,Robot,799,7♦7♣J♣
    20210605_09:25:06,onNewPlayedCard,181,E,Robot,802,7♦7♣J♣T♣
    20210605_09:25:08,onNewPlayedCard,181,S,Robot,2009,6♦
    20210605_09:25:09,onNewPlayedCard,181,W,terry2555,1034,6♦T♥
    20210605_09:25:10,onNewPlayedCard,181,N,Robot,793,6♦T♥K♥
    20210605_09:25:10,onNewPlayedCard,181,E,Robot,805,6♦T♥K♥J♥
    20210605_09:25:13,onDealEnd,181,S,Robot,,10 Tricks taken -100


