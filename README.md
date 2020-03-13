# BBOalert

Automatic alert in Bridge Base Online service (www.bridgebase.com)

We assume that you are familiar with BBO.

## Purpose

Tired of repeating always the same story while alerting your bids in BBO. If yes, this browser extension is your friend.

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

## Installation

### Firefox

This extension can be installed with Firefox browser using the link :

https://addons.mozilla.org/en-US/firefox/addon/bboalert

Windows, Linux and Android platforms are supported

### Chrome

The extension is not yet officially published in Google's web-store. Therefore you should install it in the CHROME browser manually from source code :

- download BBOalert project source files in a ZIP-container ("Clone or Download" button, then "Download ZIP")
- Navigate to the "Downloads" directory, open the ZIP-container and expand it. This will create a subdirectory "BBOalert-master" containing project's source files.
- open Chrome browser tab with "chrome://extensions"
- make sure the Developer Mode is switched ON (in right-upper corner)
- click at "Load Unpacked" button and navigate to the "BBOalert-master" directory and confirm. BBOalert should appear on the list of installed extensions

Note : CHROME does not support extensions under Android. You should use YANDEX browser instead. The installation procedure is identical, except the last step : you should select the manifest.json file to complete the installation.

## How to use

The data should be stored in a CSV-formatted text file. BBOalert uses the clipboard to read this file and to export eventual updates.

BBOalert requires following conditions :

- ad blockers disabled globally or selectivelly for the URL www.bridgebase.com
- BBO in split screen mode (Account + Settings + Split Screen)
- BBO used with 'Confirm Bids' enabled (Account + Settings + Confirm Bids)
- BBO should be started using URL https://www.bridgebase.com/v3/?lang=en ensuring english language user interface

At each BBO session, you should :

- open the data file using your favorite text editor (see sections : 'Data file format'
- select all text
- copy it to clipboard
- press "Import" button on the BBO page

'Append' button allows to add code to the already imported code. This allows to split data in more than one file. Eg. separate file for openings and development, the second for overcalls and the third for keyboard shortcuts.

<b>Only BBOalert native code can be appended, not BSS data.</b> Appending BBOalert native data to the previously imported BSS data is allowed.

BBOalert saves in its memory all calls manually alerted during the game, With the 'Export' button you can copy this data to the clipboard and paste it into the text editor. The records imported this way will contain a timestamp and the deal number. You can retrieve from BBO the deals to review the manually alerted calls before committing the changes in your data file.

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

The best method to learn BBOalert is to create e teaching table and to experiment with data.

## Data file format

The file must begin with the <b>BBOalert</b> keyword (case sensitive) to be recognized by the program.

Comma separated value (CSV) format is used for each record.

Alerted calls should contain at least three text fields separated by commas :

	<context>,<call>,<explanation>[,optional text ignored by BBOalert]
	
where <context> is the bidding sequence preceding the <call>. In those two fields we use two-characters self-explaining tokens :

	1C 1D 1H 1S 1N Db Rd 2C 2D ....
	
To increase the readability of the code, we use '--' token for pass and not 'Pa'. Outside of the data records free text is allowed for documentation purposes. Leading and trailing spaces and tabs are allowed in data fields.

### Examples

#### Opening bid

	,1N,12-14p balanced

Note : 
- empty "context" field in the first record, because there is no bid before the opening
- Eventual passes preceding the opening are ignored

#### Development

	1N--,2C,Stayman can be weak 
	1N--2C--,2D,No 4 card major

Note : -- codes mean pass by opponents

#### Development with opponents overcall

	1HDb,Rd,9+p misfit !H penalty redouble

#### Overcall

	1D,2D,Major two-suiter

### Advanced features

#### Seat dependent openings

An empty <context> field means seat independent opening. By using -- codes you can define seat dependent opening. Placed after seat independent opening code, it will override it for the specified seat. Example
	
	,1S,12-21p 5+!S,	This is the normal opening for all seats
	----,1S,8-21 5+!S,	except after two passes. It can be weaker
	----1S--,2C,Drury,	in such a case Drury is used

#### Continued context

If the context is identical with the previous record, the '+' character can be used in the <context> field

Example : instead of code 

	1N--,	2C,	Stayman
	1N--,	2D,	Texas !H
	1N--,	2H,	Texas !S
	
you can use code 

	1N--,	2C,	Stayman
	+,	2D,	Texas !H
	+,	2H,	Texas !S
	
#### Long explanation text

If you need more than 39 characters to explain the alerted call, the solution is to place in the middle of the text the '#' character. It will split the text into two parts : the first will be used in the explanation field of the bidding box. The second part will be set in the chat box. The chat messaage should be sent to the opponents to complete the alert procedure. 

Example :

	1S,2C,Please read chat for explanation#Natural overcall with at least a decent 5-card suit

#### Wild cards

In the cases where the meaning of the call is not influenced by an eventual overcall, wildcards can be used in the <context> field. This can make the code more readable and more compact. Two characters are allowed as wildcard '*' or '_'. They match one caracter and have the same effect. In the example :

	1N__,2H,Transfer->!S
	
the code means : whatever the opponents do, 2H remains a mandatory transfer to 2S. Otherwise code should be privided for all possible overcalls made by opponents.

### Optional code

Almost everyone on BBO is using SAYC bidding system. But SAYC is not the world standard and some pairs will use another bidding system like ACOL or French Standard. If you play on BBO with your partner to practice a sophisticated defense system with particular agreements depending on the conventions used by opponents, you must be able to switch on-the-fly between different defense options during the game.

To resolve this problem, the keyword 'Option' is used followed by option name. The optional block of code is ended by another block or by bare 'Option' keyword. The selectable options will be displayed at the left side of the screen.

The susequent options having the common prefix word will be automatically grouped. Within the group only one option can be selected to avoid conficting codes. You are free to disable any option. Initially the first memeber of each group is enabled.

It is recommended to provide all overcalls in as optional code blocks for each possible opening. This will enable you to unselect portions of code if necessary.

Example :

	Option,NT 15-17
		1N,Db,any 6 card suit (DONT)	 
	Option,NT 12-14
		1N,Db,for penalties
	Option,2H weak
		... code specific for the defense against weak-2 opening
	Option,2H weak 5!H and 4+m
		... code specific for the defense against Muiderberg opening
	Option

In this example two separated groups of options are created.

### Shortcuts

Shortcut format :

	Shortcut,<token>,<full text>
	
In the axample :

	Shortcut,TH,Texas->!H
	
TH string will be immediately expanded to the "Texas->!H" during text entry in the Message or Explanation text box. The tokens can be of any length , but we advise to use uppercase two-character tokens to avoid confusion during normal text entry. 

You are allowed also to define Alt-key shortcuts like this :

	Shortcut,AltA,this text will be inserted if you press Alt-A key
	
Note : check for potential conflicts with Alt key shortcuts of the browser.

### Full Diclosure BSS file support

BBOalert can read BSS files in the same way as native BBOalert :

- open the BSS file with a text editor
- select all text and copy it to the clipboard
- in BBOalert use 'Import' button.

BBOalert converts BSS data internally to the BBOalert native format. Actually seat- and vulnerability dependent calls are ignored and reported with error code.

With the 'Export' button the converted data will be written to the clipboard. You can paste it into the text editor and use as starting point for further modifications. Another possible scenario is to keep importing the original BSS file and to create an overriding code (in BBOalert native format) in a sepatated file to be appendend ('Append' button).


