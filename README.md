# BBOalert
Automatic alert in BBO

During the bidding, conventional calls must be alerted and explained to the opponents. Plaing artificial bidding systems becomes unpractical because explaining each alerted call is time consuming and therefore frustrating for all participants.

BBOalert resolves this problem. All artificial bidding sequences can be predefined in a table and opponents get the explanation automatically. Explanations entered manually during the game are added to the table and are automatically used in the future.

To install BBO alert :
- download BBOalert project source files to an empty directory
- open Chrome browser session with URL "chrome://extensions"
- make sure the Developer Mode is switched ON
- click at "Load Unpacked" button and navigate to the directory where the BBOalert source files are stored and confirm. the BBOalert extension should appear on the list of installed extensions
- make a bookmark with URL: "https://www.bridgebase.com/v3/?lang=en".

Create a CSV formatted file containing the table of alerted calls. The first line must begin with "BBOalert" keyword. Other lines should contain at least three text fields separated by comma:
- bidding seauence preceding the alerted call
- call itself
- explanation text

The calls should be coded using two-character keywords: 1C 1D 1H 1S 1N Db Rd --
The keyword -- is used for pass for better readability.
In the alert explanation field, comma must be avoided.
Each field may contain leading or trailing spaces ot tabs for better readability during coding.
Fourth field is optional and may be used for comments

Example for :

,1C,17+HCP any distribution,this is the 1C opening for Precision system
1C--,1D,0-7HCP any distribution,this is the negative response to 1C opening
1C--1D--,1N,17-19HCP balanced hand,this is the first rebid of the opener

Note : -- represents opponents "pass" but may be replaced by an overcall if any

To use BBOalert you should :
- open the table file with your favorite text editor
- select all text
- copy it to clipboard
