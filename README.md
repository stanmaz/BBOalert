# BBOalert

Automatic alert in Bridge Base Online service (www.bridgebase.com)

We assume that you are familiar with BBO.

## Purpose

Tired of repeating always the same story while alerting your bids in BBO. If yes, this extension is your friend.

During the bidding, conventional calls must be alerted and explained to the opponents. Playing artificial bidding systems on BBO is not practical because explaining each alerted call is time consuming and therefore frustrating for all participants.

BBOalert resolves this problem. Artificial bidding sequences can be predefined in a table. Opponents get the explanation automatically and immediately. Explanations entered manually during the game are recorded for future use.

BBOalert has similar functionality as "Full Disclosure" which is no longer supported by BBO. One difference should be emphasized :

- "Full Disclosure" served the purpose of formal and complete description of a bidding system to be maintained on BBO server. The readability of the code is extremely low due to its complexity.
- BBOalert is strictly for personal use and should help to automate the disclosure of specific agreements. The simplicity of the code makes it readable.

The program can read "Full Disclosure" old BSS files.

BBOalert is useful for all types of BBO users :

- <b>casual players without a fixed partner</b> : the common bidding system for all BBO users is SAYC. In such a case, only few bids should be alerted 'pro forma' because all players are supposed to know SAYC basics. BBOalert will record each alerted bid and will automatically recall it if identical situation occurs. You only alert once ! The program enables you to define also keyboard shortcuts for frequently used expressions.
- <b>'natural' players with a fixed partner</b> : SAYC is simple but inefficient in many situations. Adding some gadgets gives obvious advantages. BBOalert will help to document particular agreements. By using a common database with the partner, the explanation given to the opponents will be coherent. Practicing natural systems other than SAYC imply frequent alerting because of few, but essential differences.
- <b>'artificial' players with a fixed partner</b> : playing an artificial system on BBO is an impossible task. Practically every bid should be alerted and explained. Frustrated opponents will quickly abandon your table. BBOalert enables the formal description of the system in all details and the opponents will receive correct information. Advanced features enable you to differentiate seat dependent openings and to program different defense schemes depending on conventions used by opponents.
\pagebreak
## Installation

### Firefox

This extension can be installed with Firefox browser using the link :

https://addons.mozilla.org/en-US/firefox/addon/bboalert

Windows, Linux and Android platforms are supported

### Chrome

The extension is not yet officially published in Google's web-store. Therefore you should install it in CHROME browser manually from source code :

- download BBOalert project source files in a ZIP-container ("Clone or Download" button, then "Download ZIP")
- Navigate to the "Downloads" directory, open the ZIP-container and expand it. This will create a subdirectory "BBOalert-master" containing project's source files.
- open Chrome browser session with URL "chrome://extensions"
- make sure the Developer Mode is switched ON (in right-upper corner)
- click at "Load Unpacked" button and navigate to the "BBOalert-master" directory and confirm. BBOalert should appear on the list of installed extensions

Note : CHROME does not support extensions under Android. You should use YANDEX browser instead. The installation procedure is identical, except the last step : you should select the manifest.json file to complete the installation.

## How to use

The data should be stored in a CSV-formatted text file. BBOalert uses the clipboard to read this file and to send eventual updates.

To use BBOalert you should :

- open the table file with your favorite text editor
- select all text
- copy it to clipboard
- open BBO session using URL https://www.bridgebase.com/v3/?lang=en
- make sure that BBO is in 'Split Screen' mode (Account + Settings + Split Screen switch)
- press "Import" button

'Append' button allows to add code to the already imported code. This allows to split data in more than one file. Eg. separate file for openings and development, the second for overcalls and the third for keyboard shortcuts.

<b>Only BBOalert native code can be appended, not BSS data.</b> Appending BBOalert native data to the previously imported BSS data is allowed.

BBOalert records manually alerted calls during the game, To copy the data to the clipboard use "Export" button. In the text editor, navigate to the end of the file, and do 'Paste', The records imported from BBO alert will contain a timestamp and the deal number. You can retrieve from BBO the deals to review the alerted calls before committing the changes.

"Confirm bids" option in BBO ("Account" + "Settings") is required to be able to enter or review alert's explanation before confirming the call. You are responsible for the explanation sent to the opponents.

## Recommended way of using BBOalert

We use the "You only alert once" principle.

It is needless to code your entire system at once. It is a huge task. In each bidding system there are sequences which almost never occur.

The program records each alerted call for which no explanation has been found in the data file. Use this feature to complete your code with the bidding sequences as they come during the game. Your data file will grow as needed.

I recommend to proceed this way :

- Instead of a simple text editor, create a new file in Google Docs beginning with the keyword BBOalert
- make this file "Shareable" with write access for your partner and send him the URL link. This guarantees to be always in sync.
- enter the code for opening bids and frequently used responses
- start playing using this data (remember : select all text + copy to clipboard before starting BBO session)
- alert your calls by hand if necessary. You can define shortcuts for frequently used phrases and use them while entering explanations.
- at the end of the session, paste the clipboard content at the end of the file. Your partner should do it too.
- review with your partner all newly created alerts and make the necessary corrections

This way, the file is ready for the next session and will contain recently alerted calls.

## Data file format

The file must begin with the <b>BBOalert</b> keyword to be recognized by the program.

The data file can include three sections in the order as shown :

- opening bids and development
- development after opponent's intervention
- our overcalls after opponent's opening

Comma separated value (CSV) format is used. Each record contains three text fields separated by commas :

	<context>,<call>,<explanation>
	
where "context" is the bidding sequence preceding the "call". In those two fields we use two-characters self-explaining tokens :

	1C 1D 1H 1S 1N Db Rd 2C 2D ....
	
To increase the readability of the code, we use -- token for pass and not Pa. Outside of the data records free text is allowed for documentation purposes. Leading and trailing spaces and tabs are allowed in data fields.

If more than 39 characters (BBO's limit) are needed to describe the bid, you can use the '#' character within the first 39 characters of the "explanation" string. BBOalert will display the text preceeding '#' in the alert box and the remaining text will be displayed in chat message box. To complete the alert, you need to send the chat message to the opponents. Example :

	1S,2C,Please read chat for explanation#Natural overcall with at least a decent 5-card suit

### Opening bids and development

Trivial example of code :

	,1N,12-14p balanced
	1N--,2C,Stayman can be weak 
	1N--2C--,2D,No 4 card major
	
Note : empty "context" field in the first record, because there is no bid before the opening. Eventual passes preceding the opening should be ignored, unless the opening is seat dependend as in the typical example where 3rd seat opening can be made below 10p, and the responder after initial pass with 11p uses Drury convention :

	,1S,11-21p 5!S							,this applies to all seats
	----,1S,8-21p 5+!S					,except if explicitly overriden for the 3rd seat
	----1S--,2C,Drury

### Development after opponent's intervention

In the previous section we assumed, that opponents pass. If they make an overcall, we have to use the same structure of records but the -- code should be replaced by the overcall as in example :

	1HDb,Rd,9+p misfit !H penalty redouble
	
In the cases where the meaning of the call is not influenced by an eventual overcall, wildcards can be used in the "context" field. This can make the code more readable and more compact. Two characters are allowed as wildcard '*' or '_'. They match one caracter and have the same effect. In the example :

	1N__,2H,Transfer->!S
	
the code means : whatever the opponents do, 2H remains a mandatory transfer to 2S. Wildcard should be used carefully and require some experience. In our particular bidding system the overcalls at level 1 have little influence on development. Exemple :

	1C1*,2C,Texas->!D	can be weak with 6!D

### Overcalls

Almost everyone on BBO is using SAYC bidding system. But SAYC is not the world standard and some fixed pairs will use another bidding system like ACOL or French Standard. If you do not play with your ususal partner, you are not concerned by this section. You will be condemned to improvise. But if you play on BBO with your partner to practice a sophisticated defense system with particular agreements depending on the conventions used by opponents, you must be able to switch between different defense options. Examples : 

- 1NT opening is normally 15-17p, but if the opponents play ACOL the defense against 12-14p range is totally different
- 2D opening is weak in SAYC, but some players use 2D MULTI
- 2H or 2S are weak openings with 6 card suit. Many players use 2H or 2S Muiderberg (5m and 4+m)

To resolve this problem, the keyword Against is used. Exemple :

Against,Weak_NT
	any code here specific for defense against 1NT 12-14
Against,2D_Multi
	any code here specific for defense against 2D Multi
Against,Muiderberg
	any code here specific for defense against Muiderberg

The 'Against' options should be placed at the very end of the file.

You will be able to select the defense option on-the-fly with the <b>Option</b> drop-down box at the top-left side of the screen.

### Shortcuts

Shortcut format :

	Shortcut,<abbreviation",<full text>
	
In the axample :

	Shortcut,TH,Texas->!H
	
TH string will be immediately expanded to the "Texas->!H" during text entry in the Message or Explanation text box. We advise to use uppercase two-character tokens to avoid confusion during normal text entry. The tokens can be of any length.

You are allowed also to define Alt-key shortcuts like this :

	Shortcut,AltA,this text will be inserted if you press Alt-A key
	
Note : check for potential conflicts with Alt key shortcuts of the browser.

### Full Diclosure BSS file support

BBOalert can read BSS files in the same way as native BBOalert :

- open the BSS file with a text editor
- select all text and copy it to the clipboard
- in BBOalert use 'Import' button

BBOalert converts BSS data internally to the BBOalert native format. With the 'Export' button the converted data will be written to the clipboard.

