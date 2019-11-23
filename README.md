# BBOalert

Automatic alert in BBO

The software is still under development (Alpha release). 


During the bidding, conventional calls must be alerted and explained to the opponents. Playing artificial bidding systems on BBO becomes unpractical because explaining each alerted call is time consuming and therefore frustrating for all participants.

BBOalert resolves this problem. All artificial bidding sequences can be predefined in a table and opponents get the explanation automatically and immediatly. Explanations entered manually during the game are added to the table for future use.

To install BBO alert :
- download BBOalert project source files into an empty directory
- open Chrome browser session with URL "chrome://extensions"
- make sure the Developer Mode is switched ON
- click at "Load Unpacked" button and navigate to the directory where the BBOalert source files are stored and confirm. the BBOalert extension should appear on the list of installed extensions
- create a bookmark with URL: "https://www.bridgebase.com/v3/?lang=en".

Create a CSV formatted file containing the table of alerted calls. The first line must begin with "BBOalert" keyword. Other lines should contain at least three text fields separated by comma:
- bidding seauence preceding the alerted call including opponent's calls
- your bidding call
- explanation text

The calls should be coded using two-character keywords: 1C 1D 1H 1S 1N Db Rd --
The keyword -- is used for pass for better readability.
In the explanation field, comma must be avoided.
Each field may contain leading or trailing spaces ot tabs for better readability during coding.
Fourth field is optional and may be used for comments

To use BBOalert you should :
- open the table file with your favorite text editor and keep it open until the end of the BBO session. I advise to use a collaborative online text editor (e.g. https://cryptpad.fr/code) which allows you to share the file with your partner in real time
- select all text
- copy it to clipboard
- open BBO session using URL https://www.bridgebase.com/v3/?lang=en
- after you correctly login into BBO, a dialog box should appear confirming that the table has been loaded from clipboard

If you alert manually during the game, the clipboard wil contain the text to be appended to the table file by pasting it.


